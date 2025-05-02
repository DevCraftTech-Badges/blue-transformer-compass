
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";

type DisbursementItem = {
  id: string;
  date: string;
  quantity: number;
};

type AnnualSummary = {
  id: string;
  year: number;
  quantity: number;
  pricePerLiter: number;
};

const DisbursementItemsPage = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAnnualEditModalOpen, setIsAnnualEditModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<DisbursementItem | null>(null);
  const [currentAnnualItem, setCurrentAnnualItem] = useState<AnnualSummary | null>(null);
  const { toast } = useToast();
  
  // Mock data for demonstration
  const [items, setItems] = useState<DisbursementItem[]>([
    {
      id: "1",
      date: "2023-05-15",
      quantity: 5,
    },
    {
      id: "2",
      date: "2023-06-10",
      quantity: 3,
    },
    {
      id: "3",
      date: "2023-07-05",
      quantity: 2,
    },
  ]);

  const [annualSummary, setAnnualSummary] = useState<AnnualSummary[]>([
    {
      id: "1",
      year: 2023,
      quantity: 10,
      pricePerLiter: 25.75,
    },
    {
      id: "2",
      year: 2022,
      quantity: 15,
      pricePerLiter: 24.50,
    },
    {
      id: "3",
      year: 2021,
      quantity: 12,
      pricePerLiter: 23.25,
    },
  ]);

  const handleAddNewItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newItem: DisbursementItem = {
      id: Date.now().toString(),
      date: formData.get('date') as string,
      quantity: Number(formData.get('quantity')),
    };
    
    setItems([...items, newItem]);
    setIsAddModalOpen(false);
    toast({
      title: "เพิ่มรายการสำเร็จ",
      description: "รายการเบิกจ่ายได้ถูกเพิ่มแล้ว",
    });
  };

  const handleEditItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentItem) return;
    
    const formData = new FormData(e.currentTarget);
    
    const updatedItem: DisbursementItem = {
      ...currentItem,
      date: formData.get('date') as string,
      quantity: Number(formData.get('quantity')),
    };
    
    setItems(items.map(item => item.id === currentItem.id ? updatedItem : item));
    setIsEditModalOpen(false);
    setCurrentItem(null);
    toast({
      title: "แก้ไขรายการสำเร็จ",
      description: "รายการเบิกจ่ายได้ถูกอัปเดตแล้ว",
    });
  };

  const handleEditAnnualItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentAnnualItem) return;
    
    const formData = new FormData(e.currentTarget);
    
    const updatedItem: AnnualSummary = {
      ...currentAnnualItem,
      year: Number(formData.get('year')),
      quantity: Number(formData.get('quantity')),
      pricePerLiter: Number(formData.get('pricePerLiter')),
    };
    
    setAnnualSummary(annualSummary.map(item => item.id === currentAnnualItem.id ? updatedItem : item));
    setIsAnnualEditModalOpen(false);
    setCurrentAnnualItem(null);
    toast({
      title: "แก้ไขรายการสำเร็จ",
      description: "สรุปรายปีได้ถูกอัปเดตแล้ว",
    });
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast({
      title: "ลบรายการสำเร็จ",
      description: "รายการเบิกจ่ายได้ถูกลบแล้ว",
    });
  };

  const openEditModal = (item: DisbursementItem) => {
    setCurrentItem(item);
    setIsEditModalOpen(true);
  };

  const openAnnualEditModal = (item: AnnualSummary) => {
    setCurrentAnnualItem(item);
    setIsAnnualEditModalOpen(true);
  };

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">รายการเบิกจ่าย</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">รายละเอียดแต่ละครั้ง</TabsTrigger>
                <TabsTrigger value="annual">สรุปรายปี[ถัง]</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details">
                <div className="mb-6 mt-4">
                  <Button onClick={() => setIsAddModalOpen(true)}>
                    <Plus className="mr-1 h-4 w-4" /> เพิ่มรายการใหม่
                  </Button>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>รายการที่</TableHead>
                      <TableHead>วันที่เบิกน้ำมันไปใช้งาน</TableHead>
                      <TableHead>ปริมาณการเบิก[ถัง]</TableHead>
                      <TableHead>จัดการ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="icon" onClick={() => openEditModal(item)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => handleDelete(item.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-4">
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
              
              <TabsContent value="annual">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>รายการที่</TableHead>
                      <TableHead>ปีที่เบิกจ่ายน้ำมัน</TableHead>
                      <TableHead>ปริมาณการเบิก[ถัง/ปี]</TableHead>
                      <TableHead>ราคา[บาท/ลิตร]</TableHead>
                      <TableHead>จัดการ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {annualSummary.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.year}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.pricePerLiter}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="icon" onClick={() => openAnnualEditModal(item)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Add New Item Modal */}
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>เพิ่มรายการเบิกจ่าย</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddNewItem}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    วันที่เบิกน้ำมันไปใช้งาน
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    required
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">
                    ปริมาณการเบิกต่อครั้ง[ถัง]
                  </Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    required
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">บันทึกข้อมูล</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        
        {/* Edit Item Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>แก้ไขรายการเบิกจ่าย</DialogTitle>
            </DialogHeader>
            {currentItem && (
              <form onSubmit={handleEditItem}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-date" className="text-right">
                      วันที่เบิกน้ำมันไปใช้งาน
                    </Label>
                    <Input
                      id="edit-date"
                      name="date"
                      type="date"
                      defaultValue={currentItem.date}
                      required
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-quantity" className="text-right">
                      ปริมาณการเบิกต่อครั้ง[ถัง]
                    </Label>
                    <Input
                      id="edit-quantity"
                      name="quantity"
                      type="number"
                      defaultValue={currentItem.quantity}
                      required
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">บันทึกข้อมูล</Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
        
        {/* Edit Annual Summary Modal */}
        <Dialog open={isAnnualEditModalOpen} onOpenChange={setIsAnnualEditModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>แก้ไขสรุปรายปี</DialogTitle>
            </DialogHeader>
            {currentAnnualItem && (
              <form onSubmit={handleEditAnnualItem}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-annual-year" className="text-right">
                      ปีที่เบิกจ่ายน้ำมัน
                    </Label>
                    <Input
                      id="edit-annual-year"
                      name="year"
                      type="number"
                      defaultValue={currentAnnualItem.year}
                      required
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-annual-quantity" className="text-right">
                      ปริมาณการเบิก[ถัง/ปี]
                    </Label>
                    <Input
                      id="edit-annual-quantity"
                      name="quantity"
                      type="number"
                      defaultValue={currentAnnualItem.quantity}
                      required
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-annual-price" className="text-right">
                      ราคา[บาท/ลิตร]
                    </Label>
                    <Input
                      id="edit-annual-price"
                      name="pricePerLiter"
                      type="number"
                      step="0.01"
                      defaultValue={currentAnnualItem.pricePerLiter}
                      required
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">บันทึกข้อมูล</Button>
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
