// OilDGAForm component for modal CRUD (new layout and fields)
const OilDGAForm: React.FC<{
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}> = ({ initialData, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    transformer: initialData?.transformer || '',
    egatSN: initialData?.egatSN || '',
    inspectionDate: initialData?.inspectionDate || '',
    testType: initialData?.testType || '',
    inspector: initialData?.inspector || '',
    co: initialData?.co || '',
    c2h2: initialData?.c2h2 || '',
    o2: initialData?.o2 || '',
    h2: initialData?.h2 || '',
    c2h4: initialData?.c2h4 || '',
    n2: initialData?.n2 || '',
    ch4: initialData?.ch4 || '',
    c2h6: initialData?.c2h6 || '',
    co2: initialData?.co2 || '',
    c3h6: initialData?.c3h6 || '',
    c3h8: initialData?.c3h8 || '',
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Column 1 */}
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
            <label className="block mb-1 font-medium">CO (ppm)</label>
            <input
              type="number"
              name="co"
              value={form.co}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={viewOnly}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">C₂H₂ (ppm)</label>
            <input
              type="number"
              name="c2h2"
              value={form.c2h2}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={viewOnly}
            />
          </div>
        </div>
        {/* Column 2 */}
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
            <label className="block mb-1 font-medium">O₂ (ppm)</label>
            <input
              type="number"
              name="o2"
              value={form.o2}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={viewOnly}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">H₂ (ppm)</label>
            <input
              type="number"
              name="h2"
              value={form.h2}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={viewOnly}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">C₂H₆ (ppm)</label>
            <input
              type="number"
              name="c2h6"
              value={form.c2h6}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={viewOnly}
            />
          </div>
        </div>
        {/* Column 3 */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">วันที่ตรวจสอบ</label>
            <input
              type="date"
              name="inspectionDate"
              value={form.inspectionDate}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={viewOnly}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">N₂ (ppm)</label>
            <input
              type="number"
              name="n2"
              value={form.n2}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={viewOnly}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">CH₄ (ppm)</label>
            <input
              type="number"
              name="ch4"
              value={form.ch4}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={viewOnly}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">C₃H₆ (ppm)</label>
            <input
              type="number"
              name="c3h6"
              value={form.c3h6}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={viewOnly}
            />
          </div>
        </div>
        {/* Column 4 */}
        <div className="space-y-4">
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
            <label className="block mb-1 font-medium">CO₂ (ppm)</label>
            <input
              type="number"
              name="co2"
              value={form.co2}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={viewOnly}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">C₂H₄ (ppm)</label>
            <input
              type="number"
              name="c2h4"
              value={form.c2h4}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={viewOnly}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">C₃H₈ (ppm)</label>
            <input
              type="number"
              name="c3h8"
              value={form.c3h8}
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
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogDescription
} from '@/components/ui/dialog';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface OilDGARecord {
  id: number;
  transformer: string;
  egatSN: string;
  testType: string;
  inspectionDate: string;
  workOrderNo: string;
  inspector: string;
}


const OilDGATable: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [editRecord, setEditRecord] = useState<any>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [records, setRecords] = useState<OilDGARecord[]>([
    {
      id: 1,
      transformer: 'TR-001',
      egatSN: 'EGAT-2024-001',
      testType: 'DGA',
      inspectionDate: '2024-01-15',
      workOrderNo: 'WO-2024-001',
      inspector: 'นาย A สมิท'
    },
    {
      id: 2,
      transformer: 'TR-002',
      egatSN: 'EGAT-2024-002',
      testType: 'DGA',
      inspectionDate: '2024-02-10',
      workOrderNo: 'WO-2024-002',
      inspector: 'นางสาว B สมิท'
    },
    {
      id: 3,
      transformer: 'TR-003',
      egatSN: 'EGAT-2024-003',
      testType: 'DGA',
      inspectionDate: '2024-02-15',
      workOrderNo: 'WO-2024-003',
      inspector: 'นาย C สมิท'
    },
    {
      id: 4,
      transformer: 'TR-004',
      egatSN: 'EGAT-2024-004',
      testType: 'DGA',
      inspectionDate: '2024-02-20',
      workOrderNo: 'WO-2024-004',
      inspector: 'นางสาว D สมิท'
    },
    {
      id: 5,
      transformer: 'TR-005',
      egatSN: 'EGAT-2024-005',
      testType: 'DGA',
      inspectionDate: '2024-02-25',
      workOrderNo: 'WO-2024-005',
      inspector: 'นาย E สมิท'
    }
  ]);

  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const filteredRecords = records.filter((record) =>
    [record.transformer, record.egatSN, record.testType, record.inspector, record.workOrderNo]
      .filter(Boolean)
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
        description: 'บันทึกข้อมูล DGA เรียบร้อยแล้ว',
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
        description: 'เพิ่มข้อมูล DGA เรียบร้อยแล้ว',
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
      description: 'ลบข้อมูล DGA เรียบร้อยแล้ว',
      variant: 'default',
    });
  };

  const handleView = (record: any) => {
    setEditRecord({ ...record, viewOnly: true });
    setOpenModal(true);
  };

  return (
    <div className="space-y-4">
      {/* Search & Create Button */}
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
        <Button className="w-full sm:w-auto" onClick={() => { setEditRecord(null); setOpenModal(true); }}>
          <Plus className="mr-2 h-4 w-4" />
          สร้างรายการใหม่
        </Button>
      </div>

      {/* Modal for create/edit/view */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>
              {editRecord?.viewOnly
                ? "ข้อมูล Oil DGA"
                : editRecord
                  ? "แก้ไข Oil DGA"
                  : "เพิ่ม Oil DGA"}
            </DialogTitle>
            <DialogDescription>
              กรอกข้อมูลผลการทดสอบการวิเคราะห์ก๊าซในน้ำมัน
            </DialogDescription>
          </DialogHeader>
          <OilDGAForm
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

      {/* Table (match Oil Aging style) */}
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
                  <TableCell colSpan={8} className="h-24 text-center">
                    ไม่พบข้อมูล
                  </TableCell>
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

      {/* Pagination */}
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

export default OilDGATable;
