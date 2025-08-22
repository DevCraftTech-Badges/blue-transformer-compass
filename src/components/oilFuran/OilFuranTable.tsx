// OilFuranForm component for modal CRUD (inline for now)
const OilFuranForm: React.FC<{
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}> = ({ initialData, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    transformer: initialData?.transformer || '',
    testType: initialData?.testType || '',
    inspector: initialData?.inspector || '',
    egatSN: initialData?.egatSN || initialData?.egatSn || '',
    date: initialData?.inspectionDate || initialData?.date || '',
    f2al: initialData?.f2al || '',
    acf2: initialData?.acf2 || '',
    hmf5: initialData?.hmf5 || '',
    fol2: initialData?.fol2 || '',
    mef5: initialData?.mef5 || '',
    workOrderNo: initialData?.workOrderNo || '',
  });
  const viewOnly = initialData?.viewOnly;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewOnly) onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">หม้อแปลงไฟฟ้า</label>
            <select
              name="transformer"
              value={form.transformer}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
              disabled={viewOnly}
            >
              <option value="">เลือกหม้อแปลงไฟฟ้า</option>
              <option value="T1">T1</option>
              <option value="T2">T2</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">รูปแบบการทดสอบ</label>
            <select
              name="testType"
              value={form.testType}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
              disabled={viewOnly}
            >
              <option value="">เลือกรูปแบบการทดสอบ</option>
              <option value="type1">Type 1</option>
              <option value="type2">Type 2</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">ผู้ตรวจสอบ</label>
            <input
              type="text"
              name="inspector"
              value={form.inspector}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={viewOnly}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">2ACF [ppb]</label>
            <input
              type="text"
              name="acf2"
              value={form.acf2}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={viewOnly}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">5HMF [ppb]</label>
            <input
              type="text"
              name="hmf5"
              value={form.hmf5}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={viewOnly}
            />
          </div>
        </div>
        {/* Right column */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">EGAT S/N</label>
            <input
              type="text"
              name="egatSN"
              value={form.egatSN}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={viewOnly}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">วันที่ตรวจสอบ</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={viewOnly}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">2FAL [ppb]</label>
            <input
              type="text"
              name="f2al"
              value={form.f2al}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={viewOnly}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">2FOL [ppb]</label>
            <input
              type="text"
              name="fol2"
              value={form.fol2}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={viewOnly}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">5MEF [ppb]</label>
            <input
              type="text"
              name="mef5"
              value={form.mef5}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={viewOnly}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-8">
        <Button type="button" variant="outline" onClick={onCancel}>
          {viewOnly ? 'ปิด' : 'ยกเลิก'}
        </Button>
        {!viewOnly && (
          <Button type="submit" className="bg-sky-500 text-white hover:bg-sky-600">
            บันทึก
          </Button>
        )}
      </div>
    </form>
  );
};
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Search, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface OilFuranRecord {
  id: number;
  transformer: string;
  egatSN: string;
  testType: string;
  inspectionDate: string;
  workOrderNo: string;
  inspector: string;
}

const OilFuranTable: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [editRecord, setEditRecord] = useState<any>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [records, setRecords] = useState<OilFuranRecord[]>([
    { id: 1, transformer: 'TR-001', egatSN: 'EGAT-2024-001', testType: 'Furan', inspectionDate: '2024-01-15', workOrderNo: 'WO-2024-001', inspector: 'นาย A สมิท' },
    { id: 2, transformer: 'TR-002', egatSN: 'EGAT-2024-002', testType: 'Furan', inspectionDate: '2024-02-10', workOrderNo: 'WO-2024-002', inspector: 'นางสาว B สมิท' },
    { id: 3, transformer: 'TR-003', egatSN: 'EGAT-2024-003', testType: 'Furan', inspectionDate: '2024-02-15', workOrderNo: 'WO-2024-003', inspector: 'นาย C สมิท' },
    { id: 4, transformer: 'TR-004', egatSN: 'EGAT-2024-004', testType: 'Furan', inspectionDate: '2024-02-20', workOrderNo: 'WO-2024-004', inspector: 'นางสาว D สมิท' },
    { id: 5, transformer: 'TR-005', egatSN: 'EGAT-2024-005', testType: 'Furan', inspectionDate: '2024-02-25', workOrderNo: 'WO-2024-005', inspector: 'นาย E สมิท' },
  ]);
  const ITEMS_PER_PAGE = 5;
  const filteredRecords = records.filter((record) =>
    [record.transformer, record.egatSN, record.testType, record.inspector, record.workOrderNo]
      .some(field => field.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  const totalPages = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRecords = filteredRecords.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= maxVisiblePages - 1) {
        for (let i = 1; i <= maxVisiblePages; i++) pages.push(i);
        if (totalPages > maxVisiblePages) { pages.push(null); pages.push(totalPages); }
      } else if (currentPage >= totalPages - (maxVisiblePages - 2)) {
        pages.push(1); pages.push(null);
        for (let i = totalPages - (maxVisiblePages - 1); i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1); pages.push(null);
        pages.push(currentPage - 1); pages.push(currentPage); pages.push(currentPage + 1);
        pages.push(null); pages.push(totalPages);
      }
    }
    return pages;
  };

  const handleChangePage = (page: number) => setCurrentPage(page);

  const handleCreateOrUpdate = (formData: any) => {
    if (editRecord) {
      setRecords(records.map(record => record.id === editRecord.id ? { ...record, ...formData } : record));
      toast({
        title: 'แก้ไขข้อมูลสำเร็จ',
        description: 'บันทึกข้อมูล Furan เรียบร้อยแล้ว',
        variant: 'default',
      });
    } else {
      const newRecord = {
        id: records.length + 1,
        ...formData
      };
      setRecords([...records, newRecord]);
      toast({
        title: 'เพิ่มข้อมูลสำเร็จ',
        description: 'เพิ่มข้อมูล Furan เรียบร้อยแล้ว',
        variant: 'default',
      });
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
    toast({
      title: 'ลบข้อมูลสำเร็จ',
      description: 'ลบข้อมูล Furan เรียบร้อยแล้ว',
      variant: 'default',
    });
  };

  const handleView = (record: any) => {
    setEditRecord({ ...record, viewOnly: true });
    setOpenModal(true);
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="ค้นหา..." className="pl-8" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <Button className="w-full sm:w-auto" onClick={() => { setEditRecord(null); setOpenModal(true); }}>
          <Plus className="mr-2 h-4 w-4" />
          สร้างรายการใหม่
        </Button>
      </div>

      {/* Modal for create/edit/view */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editRecord?.viewOnly
                ? "ข้อมูล Oil Furan"
                : editRecord
                  ? "แก้ไข Oil Furan"
                  : "เพิ่ม Oil Furan"}
            </DialogTitle>
            <DialogDescription>
              กรอกข้อมูลการทดสอบฟูแรนในน้ำมัน
            </DialogDescription>
          </DialogHeader>
          <OilFuranForm
            initialData={editRecord}
            onSubmit={handleCreateOrUpdate}
            onCancel={() => { setOpenModal(false); setEditRecord(null); }}
          />
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Dialog */}
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
          {paginatedRecords.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">ไม่พบข้อมูล</TableCell>
            </TableRow>
          ) : (
            paginatedRecords.map((record, index) => (
              <TableRow key={record.id} className="hover:bg-muted/50">
                <TableCell className="text-center font-medium">{startIndex + index + 1}</TableCell>
                <TableCell>{record.transformer}</TableCell>
                <TableCell>{record.egatSN}</TableCell>
                <TableCell>{record.testType}</TableCell>
                <TableCell>{record.inspectionDate}</TableCell>
                <TableCell>{record.workOrderNo}</TableCell>
                <TableCell>{record.inspector}</TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleView(record)}><Eye className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => handleOpenEdit(record)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(record.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
        </div>
      </div>
      {filteredRecords.length > 0 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) handleChangePage(currentPage - 1);
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {getPageNumbers().map((page, index) => (
              page === null ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <span className="flex h-9 w-9 items-center justify-center">...</span>
                </PaginationItem>
              ) : (
                <PaginationItem key={`page-${page}`}>
                  <PaginationLink 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      handleChangePage(page as number);
                    }}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            ))}
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) handleChangePage(currentPage + 1);
                }}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default OilFuranTable;
