
import React, { useState } from 'react';
import { Plus, Search, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import CoreInsulationResistanceForm from './CoreInsulationResistanceForm';

// Sample data
const mockData = [
  {
    id: 1,
    transformer: 'TF-1000',
    egat_sn: 'EG-001-2023',
    test_type: 'แกนเหล็ก-ถัง',
    test_date: '2023-10-15',
    work_order: 'WO-2023-001',
    inspector: 'นายทดสอบ อุปกรณ์',
    resistance: 12500
  },
  {
    id: 2,
    transformer: 'TF-1001',
    egat_sn: 'EG-002-2023',
    test_type: 'แกนเหล็ก-ถัง',
    test_date: '2023-10-18',
    work_order: 'WO-2023-002',
    inspector: 'นายทดสอบ อุปกรณ์',
    resistance: 11800
  },
  {
    id: 3,
    transformer: 'TF-1002',
    egat_sn: 'EG-003-2023',
    test_type: 'แกนเหล็ก-ถัง',
    test_date: '2023-11-05',
    work_order: 'WO-2023-005',
    inspector: 'นางสาวบำรุง รักษา',
    resistance: 12200
  },
  {
    id: 4,
    transformer: 'TF-1003',
    egat_sn: 'EG-004-2023',
    test_type: 'ระหว่างชั้น',
    test_date: '2023-11-12',
    work_order: 'WO-2023-008',
    inspector: 'นางสาวบำรุง รักษา',
    resistance: 15500
  },
  {
    id: 5,
    transformer: 'TF-1004',
    egat_sn: 'EG-005-2023',
    test_type: 'แกนเหล็ก-ถัง',
    test_date: '2023-12-01',
    work_order: 'WO-2023-010',
    inspector: 'นายไฟฟ้า แรงสูง',
    resistance: 12700
  },
];

const CoreInsulationResistanceTable: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editRecord, setEditRecord] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [records, setRecords] = useState(mockData);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const filteredRecords = records.filter((record) => 
    record.transformer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.egat_sn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.test_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.inspector.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.work_order.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateOrUpdate = (formData: any) => {
    if (editRecord) {
      // Update existing record
      setRecords(records.map(record => 
        record.id === editRecord.id ? { ...record, ...formData } : record
      ));
    } else {
      // Create new record
      const newRecord = {
        id: records.length + 1,
        ...formData
      };
      setRecords([...records, newRecord]);
    }
    setOpenModal(false);
    setEditRecord(null);
  };

  const handleOpenEdit = (record: any) => {
    setEditRecord(record);
    setOpenModal(true);
  };

  const handleDelete = (id: number) => {
    setRecords(records.filter(record => record.id !== id));
    setConfirmDelete(null);
  };

  const handleView = (record: any) => {
    // View only mode
    setEditRecord({ ...record, viewOnly: true });
    setOpenModal(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="ค้นหา..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          onClick={() => {
            setEditRecord(null);
            setOpenModal(true);
          }}
          className="w-full sm:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" />
          สร้างรายการใหม่
        </Button>
      </div>

      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 text-center">No</TableHead>
                <TableHead>หม้อแปลงไฟฟ้า</TableHead>
                <TableHead>EGAT S/N</TableHead>
                <TableHead>รูปแบบการทดสอบ</TableHead>
                <TableHead>วันที่ตรวจสอบ</TableHead>
                <TableHead>เลขที่คำสั่งปฏิบัติงาน</TableHead>
                <TableHead>ผู้ตรวจสอบ</TableHead>
                <TableHead className="text-center">การจัดการ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    ไม่พบข้อมูล
                  </TableCell>
                </TableRow>
              ) : (
                filteredRecords.map((record, index) => (
                  <TableRow key={record.id} className="hover:bg-muted/50">
                    <TableCell className="text-center font-medium">{index + 1}</TableCell>
                    <TableCell>{record.transformer}</TableCell>
                    <TableCell>{record.egat_sn}</TableCell>
                    <TableCell>{record.test_type}</TableCell>
                    <TableCell>{record.test_date}</TableCell>
                    <TableCell>{record.work_order}</TableCell>
                    <TableCell>{record.inspector}</TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleView(record)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleOpenEdit(record)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(record.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editRecord?.viewOnly 
                ? "ข้อมูล Core Insulation Resistance" 
                : editRecord 
                  ? "แก้ไข Core Insulation Resistance" 
                  : "เพิ่ม Core Insulation Resistance"}
            </DialogTitle>
            <DialogDescription>
              กรอกข้อมูลการทดสอบค่าความเป็นฉนวนแกนเหล็ก
            </DialogDescription>
          </DialogHeader>
          <CoreInsulationResistanceForm 
            initialData={editRecord}
            onSubmit={handleCreateOrUpdate}
            onCancel={() => {
              setOpenModal(false);
              setEditRecord(null);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={confirmDelete !== null} onOpenChange={() => setConfirmDelete(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>ยืนยันการลบข้อมูล</DialogTitle>
            <DialogDescription>
              คุณต้องการลบข้อมูลการทดสอบนี้ใช่หรือไม่? การกระทำนี้ไม่สามารถเรียกคืนได้
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>
              ยกเลิก
            </Button>
            <Button variant="destructive" onClick={() => confirmDelete && handleDelete(confirmDelete)}>
              ลบข้อมูล
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoreInsulationResistanceTable;
