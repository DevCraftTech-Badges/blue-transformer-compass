
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Edit, Trash2, Package, Search, Calendar, User, FileText, TrendingDown, BarChart } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type DisbursementItem = {
  id: string;
  date: string;
  quantity: number;
  recipient: string;
  purpose: string;
  approvedBy: string;
};

type YearlySummaryItem = {
  id: string;
  year: string;
  quantity: number;
  purchaseQuantity: number;
  pricePerUnit: number;
};

const DisbursementItemsPage: React.FC = () => {
  const { toast } = useToast();
  const [disbursements, setDisbursements] = useState<DisbursementItem[]>([
    {
      id: "1",
      date: "2023-05-15",
      quantity: 5,
      recipient: "สถานีไฟฟ้าแรงสูง กรุงเทพ",
      purpose: "สำหรับหม้อแปลงใหม่",
      approvedBy: "วิศวกร วิศวกรรม"
    },
    {
      id: "2",
      date: "2023-06-20",
      quantity: 3,
      recipient: "สถานีไฟฟ้าแรงสูง นนทบุรี",
      purpose: "เปลี่ยนถ่ายน้ำมันหม้อแปลง",
      approvedBy: "ผู้จัดการ แผนกบำรุงรักษา"
    },
    {
      id: "3",
      date: "2023-07-10",
      quantity: 2,
      recipient: "สถานีไฟฟ้าแรงสูง ปทุมธานี",
      purpose: "เติมน้ำมันหม้อแปลง",
      approvedBy: "วิศวกร วิศวกรรม"
    },
  ]);

  const [yearlySummaries, setYearlySummaries] = useState<YearlySummaryItem[]>([
    {
      id: "1",
      year: "2021",
      quantity: 35,
      purchaseQuantity: 40,
      pricePerUnit: 85.50,
    },
    {
      id: "2",
      year: "2022",
      quantity: 42,
      purchaseQuantity: 45,
      pricePerUnit: 90.75,
    },
    {
      id: "3",
      year: "2023",
      quantity: 28,
      purchaseQuantity: 30,
      pricePerUnit: 95.20,
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentDisbursement, setCurrentDisbursement] = useState<DisbursementItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("details");
  const [isEditSummaryModalOpen, setIsEditSummaryModalOpen] = useState(false);
  const [currentSummary, setCurrentSummary] = useState<YearlySummaryItem | null>(null);

  const handleAddDisbursement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newDisbursement: DisbursementItem = {
      id: Date.now().toString(),
      date: formData.get('date') as string,
      quantity: Number(formData.get('quantity')),
      recipient: formData.get('recipient') as string,
      purpose: formData.get('purpose') as string,
      approvedBy: formData.get('approvedBy') as string,
    };
    
    setDisbursements([...disbursements, newDisbursement]);
    setIsAddModalOpen(false);
    toast({
      title: "เพิ่มรายการสำเร็จ",
      description: "รายการเบิกจ่ายได้ถูกเพิ่มแล้ว",
    });
  };

  const handleEditDisbursement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentDisbursement) return;
    
    const formData = new FormData(e.currentTarget);
    
    const updatedDisbursement: DisbursementItem = {
      ...currentDisbursement,
      date: formData.get('date') as string,
      quantity: Number(formData.get('quantity')),
      recipient: formData.get('recipient') as string,
      purpose: formData.get('purpose') as string,
      approvedBy: formData.get('approvedBy') as string,
    };
    
    setDisbursements(disbursements.map(item => item.id === currentDisbursement.id ? updatedDisbursement : item));
    setIsEditModalOpen(false);
    setCurrentDisbursement(null);
    toast({
      title: "แก้ไขรายการสำเร็จ",
      description: "รายการเบิกจ่ายได้ถูกอัปเดตแล้ว",
    });
  };

  const handleEditSummary = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentSummary) return;
    
    const formData = new FormData(e.currentTarget);
    
    const updatedSummary: YearlySummaryItem = {
      ...currentSummary,
      quantity: Number(formData.get('quantity')),
      purchaseQuantity: Number(formData.get('purchaseQuantity')),
      pricePerUnit: Number(formData.get('pricePerUnit')),
    };
    
    setYearlySummaries(yearlySummaries.map(item => item.id === currentSummary.id ? updatedSummary : item));
    setIsEditSummaryModalOpen(false);
    setCurrentSummary(null);
    toast({
      title: "แก้ไขรายการสำเร็จ",
      description: "ข้อมูลสรุปรายปีได้ถูกอัปเดตแล้ว",
    });
  };

  const handleDelete = (id: string) => {
    setDisbursements(disbursements.filter(item => item.id !== id));
    toast({
      title: "ลบรายการสำเร็จ",
      description: "รายการเบิกจ่ายได้ถูกลบแล้ว",
    });
  };

  const openEditModal = (disbursement: DisbursementItem) => {
    setCurrentDisbursement(disbursement);
    setIsEditModalOpen(true);
  };

  const openEditSummaryModal = (summary: YearlySummaryItem) => {
    setCurrentSummary(summary);
    setIsEditSummaryModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const filteredDisbursements = disbursements.filter(item => {
    // Match search query against multiple fields
    const matchesSearch = 
      formatDate(item.date).toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.approvedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.quantity.toString().includes(searchQuery);
    
    if (dateFilter === "all") {
      return matchesSearch;
    }
    
    // Filter by month if selected
    const itemDate = new Date(item.date);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    if (dateFilter === "this-month") {
      return matchesSearch && 
        itemDate.getMonth() === currentMonth && 
        itemDate.getFullYear() === currentYear;
    }
    
    // Last month filter
    if (dateFilter === "last-month") {
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      return matchesSearch && 
        itemDate.getMonth() === lastMonth && 
        itemDate.getFullYear() === lastMonthYear;
    }
    
    // Last 3 months filter
    if (dateFilter === "last-3-months") {
      const threeMonthsAgo = new Date(currentDate);
      threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
      return matchesSearch && itemDate >= threeMonthsAgo;
    }
    
    return matchesSearch;
  });

  const totalDisbursed = filteredDisbursements.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Layout>
      <div className="p-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-transformer-primary">รายการเบิกจ่าย</h1>
            <p className="text-muted-foreground">จัดการบันทึกการเบิกจ่ายน้ำมันหม้อแปลง</p>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)} className="whitespace-nowrap">
            <Plus className="mr-1 h-4 w-4" /> เพิ่มรายการเบิกจ่าย
          </Button>
        </div>

        <Card className="shadow-md border-t-4 border-t-transformer-primary">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-b pb-4">
            <CardTitle className="flex items-center text-xl font-semibold text-transformer-primary gap-2">
              <TrendingDown className="h-5 w-5" />
              รายการเบิกจ่ายน้ำมัน
            </CardTitle>
            <CardDescription>
              บันทึกและติดตามการเบิกจ่ายน้ำมันหม้อแปลงให้กับหน่วยงานต่างๆ
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="details" className="px-6">รายละเอียดแต่ละครั้ง</TabsTrigger>
                <TabsTrigger value="yearly" className="px-6">สรุปรายปี [ถัง]</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input 
                      placeholder="ค้นหารายการ..." 
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="w-full sm:w-60">
                    <Select value={dateFilter} onValueChange={setDateFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="กรองตามช่วงเวลา" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">ทุกช่วงเวลา</SelectItem>
                        <SelectItem value="this-month">เดือนนี้</SelectItem>
                        <SelectItem value="last-month">เดือนที่แล้ว</SelectItem>
                        <SelectItem value="last-3-months">3 เดือนล่าสุด</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader className="bg-blue-50 dark:bg-blue-900/20">
                      <TableRow>
                        <TableHead className="font-semibold">วันที่</TableHead>
                        <TableHead className="font-semibold text-center">ปริมาณ [ถัง]</TableHead>
                        <TableHead className="font-semibold">ผู้รับ</TableHead>
                        <TableHead className="font-semibold">วัตถุประสงค์</TableHead>
                        <TableHead className="font-semibold">ผู้อนุมัติ</TableHead>
                        <TableHead className="font-semibold text-center w-28">จัดการ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDisbursements.length > 0 ? (
                        filteredDisbursements.map((item) => (
                          <TableRow key={item.id} className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 even:bg-gray-50/50 transition-colors">
                            <TableCell className="font-medium">{formatDate(item.date)}</TableCell>
                            <TableCell className="text-center">
                              <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                {item.quantity}
                              </span>
                            </TableCell>
                            <TableCell>{item.recipient}</TableCell>
                            <TableCell>{item.purpose}</TableCell>
                            <TableCell>{item.approvedBy}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2 justify-center">
                                <Button variant="outline" size="icon" onClick={() => openEditModal(item)} className="h-8 w-8">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" onClick={() => handleDelete(item.id)} className="h-8 w-8 text-red-500 hover:text-red-600">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                            ไม่พบข้อมูลรายการเบิกจ่าย
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="bg-slate-50 p-3 rounded-lg border flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">ปริมาณที่เบิกจ่ายทั้งหมด:</span>
                    <span className="text-xl font-bold text-transformer-primary">{totalDisbursed} ถัง</span>
                  </div>
                
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </TabsContent>
              
              <TabsContent value="yearly" className="space-y-4">
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader className="bg-blue-50 dark:bg-blue-900/20">
                      <TableRow>
                        <TableHead className="font-semibold">ปี</TableHead>
                        <TableHead className="font-semibold text-center">ปริมาณการใช้น้ำมัน [ถัง]</TableHead>
                        <TableHead className="font-semibold text-center">ปริมาณการสั่งซื้อ [ถัง/ปี]</TableHead>
                        <TableHead className="font-semibold text-center">ราคาต่อหน่วย [บาท/ลิตร]</TableHead>
                        <TableHead className="font-semibold text-center w-28">จัดการ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {yearlySummaries.length > 0 ? (
                        yearlySummaries.map((item) => (
                          <TableRow key={item.id} className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 even:bg-gray-50/50 transition-colors">
                            <TableCell className="font-medium">{item.year}</TableCell>
                            <TableCell className="text-center">
                              <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                {item.quantity}
                              </span>
                            </TableCell>
                            <TableCell className="text-center">
                              <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {item.purchaseQuantity}
                              </span>
                            </TableCell>
                            <TableCell className="text-center">
                              {item.pricePerUnit.toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2 justify-center">
                                <Button variant="outline" size="icon" onClick={() => openEditSummaryModal(item)} className="h-8 w-8">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                            ไม่พบข้อมูลสรุปรายปี
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="bg-slate-50 p-3 rounded-lg border flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">ปริมาณการใช้น้ำมันทั้งหมด:</span>
                    <span className="text-xl font-bold text-transformer-primary">
                      {yearlySummaries.reduce((sum, item) => sum + item.quantity, 0)} ถัง
                    </span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Add Disbursement Modal */}
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>เพิ่มรายการเบิกจ่าย</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleAddDisbursement}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    <Calendar className="h-4 w-4 inline mr-1" /> วันที่
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    required
                    className="col-span-3"
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">
                    <Package className="h-4 w-4 inline mr-1" /> ปริมาณ [ถัง]
                  </Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    required
                    className="col-span-3"
                    placeholder="ระบุปริมาณ"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="recipient" className="text-right">
                    <User className="h-4 w-4 inline mr-1" /> ผู้รับ
                  </Label>
                  <Input
                    id="recipient"
                    name="recipient"
                    required
                    className="col-span-3"
                    placeholder="ระบุผู้รับหรือหน่วยงาน"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="purpose" className="text-right">
                    <FileText className="h-4 w-4 inline mr-1" /> วัตถุประสงค์
                  </Label>
                  <Input
                    id="purpose"
                    name="purpose"
                    required
                    className="col-span-3"
                    placeholder="ระบุวัตถุประสงค์การใช้งาน"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="approvedBy" className="text-right">
                    <User className="h-4 w-4 inline mr-1" /> ผู้อนุมัติ
                  </Label>
                  <Input
                    id="approvedBy"
                    name="approvedBy"
                    required
                    className="col-span-3"
                    placeholder="ระบุชื่อผู้อนุมัติ"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>ยกเลิก</Button>
                <Button type="submit">บันทึก</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Disbursement Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>แก้ไขรายการเบิกจ่าย</DialogTitle>
            </DialogHeader>
            
            {currentDisbursement && (
              <form onSubmit={handleEditDisbursement}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-date" className="text-right">
                      <Calendar className="h-4 w-4 inline mr-1" /> วันที่
                    </Label>
                    <Input
                      id="edit-date"
                      name="date"
                      type="date"
                      required
                      className="col-span-3"
                      defaultValue={currentDisbursement.date}
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-quantity" className="text-right">
                      <Package className="h-4 w-4 inline mr-1" /> ปริมาณ [ถัง]
                    </Label>
                    <Input
                      id="edit-quantity"
                      name="quantity"
                      type="number"
                      min="1"
                      required
                      className="col-span-3"
                      defaultValue={currentDisbursement.quantity}
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-recipient" className="text-right">
                      <User className="h-4 w-4 inline mr-1" /> ผู้รับ
                    </Label>
                    <Input
                      id="edit-recipient"
                      name="recipient"
                      required
                      className="col-span-3"
                      defaultValue={currentDisbursement.recipient}
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-purpose" className="text-right">
                      <FileText className="h-4 w-4 inline mr-1" /> วัตถุประสงค์
                    </Label>
                    <Input
                      id="edit-purpose"
                      name="purpose"
                      required
                      className="col-span-3"
                      defaultValue={currentDisbursement.purpose}
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-approvedBy" className="text-right">
                      <User className="h-4 w-4 inline mr-1" /> ผู้อนุมัติ
                    </Label>
                    <Input
                      id="edit-approvedBy"
                      name="approvedBy"
                      required
                      className="col-span-3"
                      defaultValue={currentDisbursement.approvedBy}
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>ยกเลิก</Button>
                  <Button type="submit">บันทึกการแก้ไข</Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
        
        {/* Edit Yearly Summary Modal */}
        <Dialog open={isEditSummaryModalOpen} onOpenChange={setIsEditSummaryModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>แก้ไขข้อมูลสรุปรายปี</DialogTitle>
            </DialogHeader>
            
            {currentSummary && (
              <form onSubmit={handleEditSummary}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-year" className="text-right">
                      <Calendar className="h-4 w-4 inline mr-1" /> ปี
                    </Label>
                    <Input
                      id="edit-year"
                      name="year"
                      required
                      className="col-span-3"
                      defaultValue={currentSummary.year}
                      disabled
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-quantity" className="text-right">
                      <Package className="h-4 w-4 inline mr-1" /> ปริมาณการใช้น้ำมัน [ถัง]
                    </Label>
                    <Input
                      id="edit-quantity"
                      name="quantity"
                      type="number"
                      min="0"
                      required
                      className="col-span-3"
                      defaultValue={currentSummary.quantity}
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-purchase-quantity" className="text-right">
                      <BarChart className="h-4 w-4 inline mr-1" /> ปริมาณการสั่งซื้อ [ถัง/ปี]
                    </Label>
                    <Input
                      id="edit-purchase-quantity"
                      name="purchaseQuantity"
                      type="number"
                      min="0"
                      required
                      className="col-span-3"
                      defaultValue={currentSummary.purchaseQuantity}
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-price-per-unit" className="text-right">
                      <FileText className="h-4 w-4 inline mr-1" /> ราคาต่อหน่วย [บาท/ลิตร]
                    </Label>
                    <Input
                      id="edit-price-per-unit"
                      name="pricePerUnit"
                      type="number"
                      min="0"
                      step="0.01"
                      required
                      className="col-span-3"
                      defaultValue={currentSummary.pricePerUnit}
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsEditSummaryModalOpen(false)}>ยกเลิก</Button>
                  <Button type="submit">บันทึกการแก้ไข</Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default DisbursementItemsPage;
