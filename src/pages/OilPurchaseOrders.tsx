
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">รายการสั่งซื้อ/รับน้ำมัน</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="mr-1 h-4 w-4" /> เพิ่มรายการใหม่
            </Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>วันที่ซื้อ</TableHead>
                <TableHead>ปริมาณสั่งซื้อ [ถัง]</TableHead>
                <TableHead>ราคาต่อลิตร [บาท]</TableHead>
                <TableHead>วันที่ได้รับ</TableHead>
                <TableHead>ปริมาณที่ผ่านการทดสอบ [ถัง]</TableHead>
                <TableHead>จัดการ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.purchaseDate}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.pricePerLiter}</TableCell>
                  <TableCell>{order.receiveDate || "-"}</TableCell>
                  <TableCell>{order.testedQuantity !== null ? order.testedQuantity : "-"}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" onClick={() => openEditModal(order)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(order.id)}>
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
        </CardContent>
      </Card>
      
      {/* Add New Order Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>เพิ่มรายการสั่งซื้อ/รับน้ำมันใหม่</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddNewOrder}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="purchaseDate" className="text-right">
                  วันที่ซื้อ
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
                  ราคาต่อลิตร [บาท]
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
                  วันที่ได้รับ
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
              <Button type="submit">บันทึก</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Order Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>แก้ไขรายการสั่งซื้อ/รับน้ำมัน</DialogTitle>
          </DialogHeader>
          {currentOrder && (
            <form onSubmit={handleEditOrder}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-purchaseDate" className="text-right">
                    วันที่ซื้อ
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
                    ราคาต่อลิตร [บาท]
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
                    วันที่ได้รับ
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
                <Button type="submit">บันทึก</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OilPurchaseOrdersPage;
