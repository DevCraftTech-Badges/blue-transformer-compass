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

const InsulatingOilTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [editRecord, setEditRecord] = useState<any>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
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

  const handleView = (record: any) => {
    setEditRecord({ ...record, viewOnly: true });
    setOpenModal(true);
  };

  const handleEdit = (record: any) => {
    setEditRecord(record);
    setOpenModal(true);
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
        <Button onClick={() => handleCreateNew()} className="w-full sm:w-auto">
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
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editRecord?.viewOnly 
                ? "ข้อมูล Insulating Oil" 
                : editRecord 
                  ? "แก้ไข Insulating Oil" 
                  : "เพิ่ม Insulating Oil"}
            </DialogTitle>
            <DialogDescription>
              ฟอร์มสำหรับการจัดการข้อมูลน้ำมันหม้อแปลง
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* General Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">ข้อมูลทั่วไป</h3>
              
              {/* Row 1 */}
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">หม้อแปลงไฟฟ้า</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="">เลือกหม้อแปลง</option>
                    <option value="TR-001">TR-001</option>
                    <option value="TR-002">TR-002</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">ผู้ตรวจสอบ</label>
                  <Input placeholder="ชื่อผู้ตรวจสอบ" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ambient Temp. (°C)</label>
                  <Input type="number" placeholder="อุณหภูมิ" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Wdg Temp. (°C)</label>
                  <Input type="number" placeholder="อุณหภูมิ" />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-5 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">รูปแบบการทดสอบ</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="">เลือกรูปแบบ</option>
                    <option value="Standard">Standard Test</option>
                    <option value="Emergency">Emergency Test</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">วันที่ตรวจสอบ</label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Humidity (%)</label>
                  <Input type="number" placeholder="ความชื้น" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Weather</label>
                  <Input placeholder="สภาพอากาศ" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Oil Temp. (°C)</label>
                  <Input type="number" placeholder="อุณหภูมิน้ำมัน" />
                </div>
              </div>

              {/* Work Order */}
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">เลขที่คำสั่งปฏิบัติงาน</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="">เลือกคำสั่งงาน</option>
                    <option value="WO-2024-001">WO-2024-001</option>
                    <option value="WO-2024-002">WO-2024-002</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Dielectric Breakdown Voltage Test */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Dielectric Breakdown Voltage Test</h3>
              
              <div className="grid grid-cols-2 gap-6">
                {/* OLTC Section */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-4 text-center">OLTC</h4>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">GAP DISTANCE (ASTM-D1816)</label>
                      <Input type="number" placeholder="ระยะห่าง" />
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">BREAK DOWN</h5>
                      <div className="space-y-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-xs">Xi (BREAK DOWN kV) #{i}</label>
                              <Input type="number" placeholder="0.0" />
                            </div>
                            <div>
                              <label className="text-xs">(Xi - x̄)²</label>
                              <Input disabled value="0.0" className="bg-muted" />
                            </div>
                          </div>
                        ))}
                        <div className="border-t pt-2 space-y-2">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>ΣXi: <span className="font-mono">0.0</span></div>
                            <div>Σ(Xi-x̄)²: <span className="font-mono">0.0</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* MAIN TANK Section */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-4 text-center">MAIN TANK</h4>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">GAP DISTANCE (ASTM-D1816)</label>
                      <Input type="number" placeholder="ระยะห่าง" />
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">BREAK DOWN</h5>
                      <div className="space-y-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-xs">Xi (BREAK DOWN kV) #{i}</label>
                              <Input type="number" placeholder="0.0" />
                            </div>
                            <div>
                              <label className="text-xs">(Xi - x̄)²</label>
                              <Input disabled value="0.0" className="bg-muted" />
                            </div>
                          </div>
                        ))}
                        <div className="border-t pt-2 space-y-2">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>ΣXi: <span className="font-mono">0.0</span></div>
                            <div>Σ(Xi-x̄)²: <span className="font-mono">0.0</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Insulation Power Factor Measurement */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">INSULATION POWER FACTOR MEASUREMENT</h3>
                <div className="flex gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">CF</label>
                    <Input type="text" className="w-20" placeholder="CF" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Test (kV)</label>
                    <Input type="number" className="w-24" placeholder="kV" />
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-24">Type</TableHead>
                      <TableHead>CURRENT (mA)</TableHead>
                      <TableHead>WATT</TableHead>
                      <TableHead>% POWER FACTOR</TableHead>
                      <TableHead>% POWER FACTOR (COR 20°C)</TableHead>
                      <TableHead>REMARK</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">OLTC</TableCell>
                      <TableCell>
                        <Input type="number" placeholder="0.0" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" placeholder="0.0" />
                      </TableCell>
                      <TableCell>
                        <Input disabled value="0.0" className="bg-muted" />
                      </TableCell>
                      <TableCell>
                        <Input disabled value="0.0" className="bg-muted" />
                      </TableCell>
                      <TableCell>
                        <Input placeholder="หมายเหตุ" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">MAIN TANK</TableCell>
                      <TableCell>
                        <Input type="number" placeholder="0.0" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" placeholder="0.0" />
                      </TableCell>
                      <TableCell>
                        <Input disabled value="0.0" className="bg-muted" />
                      </TableCell>
                      <TableCell>
                        <Input disabled value="0.0" className="bg-muted" />
                      </TableCell>
                      <TableCell>
                        <Input placeholder="หมายเหตุ" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setOpenModal(false)}>
              ยกเลิก
            </Button>
            <Button variant="secondary">
              คำนวณ
            </Button>
            <Button onClick={() => setOpenModal(false)}>
              บันทึก
            </Button>
          </DialogFooter>
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

export default InsulatingOilTable;