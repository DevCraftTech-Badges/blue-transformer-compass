
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, FileText, Calendar, DollarSign } from "lucide-react";
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
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/layout/Layout";

type OilPurchaseOrder = {
  id: string;
  purchaseDate: string;
  quantity: number;
  pricePerLiter: number;
  receiveDate: string | null;
  testedQuantity: number | null;
};

const OilPurchaseOrdersPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<OilPurchaseOrder | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  // Mock data for demonstration
  const [orders, setOrders] = useState<OilPurchaseOrder[]>([
    {
      id: "1",
      purchaseDate: "2023-05-15",
      quantity: 150,
      pricePerLiter: 25.75,
      receiveDate: "2023-05-20",
      testedQuantity: 148,
    },
    {
      id: "2",
      purchaseDate: "2023-06-10",
      quantity: 200,
      pricePerLiter: 26.50,
      receiveDate: null,
      testedQuantity: null,
    },
    {
      id: "3",
      purchaseDate: "2023-07-05",
      quantity: 175,
      pricePerLiter: 27.25,
      receiveDate: "2023-07-12",
      testedQuantity: 174,
    },
  ]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleAddNewOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newOrder: OilPurchaseOrder = {
      id: Date.now().toString(),
      purchaseDate: formData.get('purchaseDate') as string,
      quantity: Number(formData.get('quantity')),
      pricePerLiter: Number(formData.get('pricePerLiter')),
      receiveDate: formData.get('receiveDate') as string || null,
      testedQuantity: formData.get('testedQuantity') ? Number(formData.get('testedQuantity')) : null,
    };
    
    setOrders([...orders, newOrder]);
    setIsAddModalOpen(false);
    toast({
      title: "เพิ่มรายการสำเร็จ",
      description: "รายการสั่งซื้อ/รับน้ำมันได้ถูกเพิ่มแล้ว",
    });
  };

  const handleEditOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentOrder) return;
    
    const formData = new FormData(e.currentTarget);
    
    const updatedOrder: OilPurchaseOrder = {
      ...currentOrder,
      purchaseDate: formData.get('purchaseDate') as string,
      quantity: Number(formData.get('quantity')),
      pricePerLiter: Number(formData.get('pricePerLiter')),
      receiveDate: formData.get('receiveDate') as string || null,
      testedQuantity: formData.get('testedQuantity') ? Number(formData.get('testedQuantity')) : null,
    };
    
    setOrders(orders.map(order => order.id === currentOrder.id ? updatedOrder : order));
    setIsEditModalOpen(false);
    setCurrentOrder(null);
    toast({
      title: "แก้ไขรายการสำเร็จ",
      description: "รายการสั่งซื้อ/รับน้ำมันได้ถูกอัปเดตแล้ว",
    });
  };

  const handleDelete = (id: string) => {
    setOrders(orders.filter(order => order.id !== id));
    toast({
      title: "ลบรายการสำเร็จ",
      description: "รายการสั่งซื้อ/รับน้ำมันได้ถูกลบแล้ว",
    });
  };

  const openEditModal = (order: OilPurchaseOrder) => {
    setCurrentOrder(order);
    setIsEditModalOpen(true);
  };

  const filteredOrders = orders.filter(order => 
    formatDate(order.purchaseDate).includes(searchQuery) ||
    order.quantity.toString().includes(searchQuery) ||
    order.pricePerLiter.toString().includes(searchQuery)
  );

  const calculateTotalCost = (quantity: number, pricePerLiter: number): number => {
    return quantity * 200 * pricePerLiter; // Assuming 1 barrel = 200 liters
  };

  return (
    <Layout>
      <div className="container mx-auto py-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-transformer-primary">รายการสั่งซื้อ/รับน้ำมัน</h1>
            <p className="text-muted-foreground">จัดการข้อมูลการสั่งซื้อและการรับน้ำมันหม้อแปลง</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Input
                placeholder="ค้นหารายการ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 w-64"
              />
              <div className="absolute left-2.5 top-2.5 text-gray-400">
                <FileText size={16} />
              </div>
            </div>
            <Button onClick={() => setIsAddModalOpen(true)} className="whitespace-nowrap">
              <Plus className="mr-1 h-4 w-4" /> เพิ่มรายการ
            </Button>
          </div>
        </div>
        
        <Card className="shadow-md border-t-4 border-t-transformer-primary">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-b pb-4">
            <CardTitle className="text-xl font-semibold text-transformer-primary">รายการสั่งซื้อและรับน้ำมัน</CardTitle>
            <CardDescription>
              แสดงรายการสั่งซื้อน้ำมันหม้อแปลงและสถานะการรับน้ำมัน
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader className="bg-blue-50 dark:bg-blue-900/20">
                  <TableRow>
                    <TableHead className="font-semibold">วันที่ซื้อ</TableHead>
                    <TableHead className="font-semibold text-center">ปริมาณสั่งซื้อ [ถัง]</TableHead>
                    <TableHead className="font-semibold text-center">ราคาต่อลิตร [บาท]</TableHead>
                    <TableHead className="font-semibold text-center">มูลค่ารวม [บาท]</TableHead>
                    <TableHead className="font-semibold">วันที่ได้รับ</TableHead>
                    <TableHead className="font-semibold text-center">ปริมาณที่ผ่านการทดสอบ</TableHead>
                    <TableHead className="font-semibold text-center">สถานะ</TableHead>
                    <TableHead className="font-semibold text-center">จัดการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <TableRow key={order.id} className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 even:bg-gray-50/50 transition-colors">
                        <TableCell className="font-medium">{formatDate(order.purchaseDate)}</TableCell>
                        <TableCell className="text-center">{order.quantity}</TableCell>
                        <TableCell className="text-center">{order.pricePerLiter.toFixed(2)}</TableCell>
                        <TableCell className="text-center font-semibold">
                          {calculateTotalCost(order.quantity, order.pricePerLiter).toLocaleString('th-TH')}
                        </TableCell>
                        <TableCell>{formatDate(order.receiveDate)}</TableCell>
                        <TableCell className="text-center">{order.testedQuantity !== null ? order.testedQuantity : "-"}</TableCell>
                        <TableCell>
                          {order.receiveDate ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              ได้รับแล้ว
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                              รอรับน้ำมัน
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2 justify-center">
                            <Button variant="outline" size="icon" onClick={() => openEditModal(order)} className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => handleDelete(order.id)} className="h-8 w-8 text-red-500 hover:text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                        ไม่พบข้อมูลรายการที่ค้นหา
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" className="hover:bg-blue-50 transition-colors" />
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
                    <PaginationNext href="#" className="hover:bg-blue-50 transition-colors" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>
        
        {/* Add New Order Modal */}
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>เพิ่มรายการสั่งซื้อ/รับน้ำมันใหม่</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddNewOrder}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="purchaseDate" className="text-right">
                    <Calendar className="h-4 w-4 inline mr-1" /> วันที่ซื้อ
                  </Label>
                  <Input
                    id="purchaseDate"
                    name="purchaseDate"
                    type="date"
                    required
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">
                    ปริมาณสั่งซื้อ [ถัง]
                  </Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    required
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="pricePerLiter" className="text-right">
                    <DollarSign className="h-4 w-4 inline mr-1" /> ราคาต่อลิตร [บาท]
                  </Label>
                  <Input
                    id="pricePerLiter"
                    name="pricePerLiter"
                    type="number"
                    step="0.01"
                    required
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="receiveDate" className="text-right">
                    <Calendar className="h-4 w-4 inline mr-1" /> วันที่ได้รับ
                  </Label>
                  <Input
                    id="receiveDate"
                    name="receiveDate"
                    type="date"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="testedQuantity" className="text-right">
                    ปริมาณที่ผ่านการทดสอบ [ถัง]
                  </Label>
                  <Input
                    id="testedQuantity"
                    name="testedQuantity"
                    type="number"
                    className="col-span-3"
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
        
        {/* Edit Order Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>แก้ไขรายการสั่งซื้อ/รับน้ำมัน</DialogTitle>
            </DialogHeader>
            {currentOrder && (
              <form onSubmit={handleEditOrder}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-purchaseDate" className="text-right">
                      <Calendar className="h-4 w-4 inline mr-1" /> วันที่ซื้อ
                    </Label>
                    <Input
                      id="edit-purchaseDate"
                      name="purchaseDate"
                      type="date"
                      defaultValue={currentOrder.purchaseDate}
                      required
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-quantity" className="text-right">
                      ปริมาณสั่งซื้อ [ถัง]
                    </Label>
                    <Input
                      id="edit-quantity"
                      name="quantity"
                      type="number"
                      defaultValue={currentOrder.quantity}
                      required
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-pricePerLiter" className="text-right">
                      <DollarSign className="h-4 w-4 inline mr-1" /> ราคาต่อลิตร [บาท]
                    </Label>
                    <Input
                      id="edit-pricePerLiter"
                      name="pricePerLiter"
                      type="number"
                      step="0.01"
                      defaultValue={currentOrder.pricePerLiter}
                      required
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-receiveDate" className="text-right">
                      <Calendar className="h-4 w-4 inline mr-1" /> วันที่ได้รับ
                    </Label>
                    <Input
                      id="edit-receiveDate"
                      name="receiveDate"
                      type="date"
                      defaultValue={currentOrder.receiveDate || ""}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-testedQuantity" className="text-right">
                      ปริมาณที่ผ่านการทดสอบ [ถัง]
                    </Label>
                    <Input
                      id="edit-testedQuantity"
                      name="testedQuantity"
                      type="number"
                      defaultValue={currentOrder.testedQuantity || ""}
                      className="col-span-3"
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
      </div>
    </Layout>
  );
};

export default OilPurchaseOrdersPage;
