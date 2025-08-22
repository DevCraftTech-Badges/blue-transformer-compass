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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import DCResistanceMeasurementForm, { DCResistanceMeasurementData } from './DCResistanceMeasurementForm';

const DCResistanceMeasurementTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [editRecord, setEditRecord] = useState<any>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [formViewOnly, setFormViewOnly] = useState(false);
  const [records, setRecords] = useState([
    {
      id: 1,
      transformer: "TR-001",
      egatSN: "EGAT-2024-001",
      testType: "Standard Test",
      inspectionDate: "2024-01-15",
      workOrderNo: "WO-2024-001",
      inspector: "นาย A สมิท"
    },
    {
      id: 2,
      transformer: "TR-002", 
      egatSN: "EGAT-2024-002",
      testType: "Emergency Test",
      inspectionDate: "2024-01-16",
      workOrderNo: "WO-2024-002",
      inspector: "นาง B จอห์นสัน"
    },
    {
      id: 3,
      transformer: "TR-003",
      egatSN: "EGAT-2024-003", 
      testType: "Routine Test",
      inspectionDate: "2024-01-17",
      workOrderNo: "WO-2024-003",
      inspector: "นาย C วิลเลียมส์"
    },
    {
      id: 4,
      transformer: "TR-004",
      egatSN: "EGAT-2024-004", 
      testType: "Standard Test",
      inspectionDate: "2024-01-18",
      workOrderNo: "WO-2024-004",
      inspector: "นาง D สมิท"
    },
    {
      id: 5,
      transformer: "TR-005",
      egatSN: "EGAT-2024-005", 
      testType: "Emergency Test",
      inspectionDate: "2024-01-19",
      workOrderNo: "WO-2024-005",
      inspector: "นาย E จอห์นสัน"
    }
  ]);

  const ITEMS_PER_PAGE = 5;

  const filteredRecords = records.filter((record) => 
    record.transformer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.egatSN.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.inspector.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.workOrderNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRecords = filteredRecords.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleCreateNew = () => {
    setEditRecord(null);
    setFormViewOnly(false);
    setOpenModal(true);
  };

  const handleView = (record: any) => {
    setEditRecord(record);
    setFormViewOnly(true);
    setOpenModal(true);
  };

  const handleEdit = (record: any) => {
    setEditRecord(record);
    setFormViewOnly(false);
    setOpenModal(true);
  };

  const handleCreateOrUpdate = (formData: any) => {
    if (editRecord) {
      setRecords(records.map(record => 
        record.id === editRecord.id ? { ...record, ...formData } : record
      ));
    } else {
      const newRecord = {
        id: records.length + 1,
        transformer: formData.transformer || '',
        egatSN: `EGAT-2024-${String(records.length + 1).padStart(3, '0')}`,
        testType: formData.testType || '',
        inspectionDate: formData.inspectionDate ? formData.inspectionDate.toISOString().split('T')[0] : '',
        workOrderNo: formData.workOrderNo || '',
        inspector: formData.inspector || ''
      };
      setRecords([...records, newRecord]);
    }
    setOpenModal(false);
    setEditRecord(null);
  };

  const handleDelete = (id: number) => {
    setRecords(records.filter(record => record.id !== id));
    setConfirmDelete(null);
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= maxVisiblePages - 1) {
        for (let i = 1; i <= maxVisiblePages; i++) {
          pages.push(i);
        }
        if (totalPages > maxVisiblePages) {
          pages.push(null);
          pages.push(totalPages);
        }
      } else if (currentPage >= totalPages - (maxVisiblePages - 2)) {
        pages.push(1);
        pages.push(null);
        for (let i = totalPages - (maxVisiblePages - 1); i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(null);
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push(null);
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handleFormSubmit = (data: DCResistanceMeasurementData) => {
    // Map form data back into flat record fields for table list
    const base = {
      transformer: data.general.transformer || '',
      testType: data.general.testType || '',
      inspectionDate: data.general.inspectionDate || '',
      workOrderNo: data.general.workOrderNo || '',
      inspector: data.general.inspector || ''
    };
    if (editRecord) {
      setRecords(records.map(r => r.id === editRecord.id ? { ...r, ...base } : r));
    } else {
      setRecords([...records, { id: records.length + 1, egatSN: `EGAT-2024-${String(records.length + 1).padStart(3,'0')}`, ...base }]);
    }
    setOpenModal(false);
    setEditRecord(null);
  };

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Search Input */}
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
        
        {/* Create Button */}
        <Button onClick={handleCreateNew} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          สร้างรายการใหม่
        </Button>
      </div>

      {/* Table */}
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
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(record)}>
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

      {/* Form Modal */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-[98vw] w-full xl:max-w-[1600px] h-[92vh] flex flex-col p-0">
          <DialogHeader className="px-8 pt-6 pb-4 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <DialogTitle>
              {formViewOnly ? 'ข้อมูล DC Resistance Measurement' : editRecord ? 'แก้ไข DC Resistance Measurement' : 'เพิ่ม DC Resistance Measurement'}
            </DialogTitle>
            <DialogDescription>
              ฟอร์มสำหรับการจัดการข้อมูลการทดสอบความต้านทานกระแสตรง
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-auto px-8 pb-8 pt-4 bg-gradient-to-br from-background to-muted/20">
            <DCResistanceMeasurementForm
              initialData={editRecord ? {
                general: {
                  transformer: editRecord.transformer,
                  inspector: editRecord.inspector,
                  testType: editRecord.testType,
                  inspectionDate: editRecord.inspectionDate,
                  workOrderNo: editRecord.workOrderNo
                },
                hv: [], // empty -> generated inside form
                lv: [],
                tv: []
              } : undefined}
              onSubmit={handleFormSubmit}
              onCancel={() => { setOpenModal(false); setEditRecord(null); }}
              viewOnly={formViewOnly}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
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

export default DCResistanceMeasurementTable;