
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
  DialogDescription,
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
import { Plus, Edit, Trash2, DollarSign, Search, Calendar, FileText } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type ExpenseItem = {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
};

const expenseCategories = [
  { label: "ค่าขนส่ง", value: "transportation" },
  { label: "ค่าทดสอบน้ำมัน", value: "oil_testing" },
  { label: "ค่าบำรุงรักษา", value: "maintenance" },
  { label: "ค่าใช้จ่ายอื่นๆ", value: "others" },
];

const ExpenseItemsPage: React.FC = () => {
  const { toast } = useToast();
  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    {
      id: "1",
      date: "2023-05-10",
      category: "transportation",
      description: "ค่าขนส่งน้ำมันจากโรงงาน",
      amount: 15000,
    },
    {
      id: "2",
      date: "2023-06-15",
      category: "oil_testing",
      description: "ค่าทดสอบคุณภาพน้ำมัน",
      amount: 8500,
    },
    {
      id: "3",
      date: "2023-07-20",
      category: "maintenance",
      description: "ค่าบำรุงรักษาถังเก็บน้ำมัน",
      amount: 12000,
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState<ExpenseItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const handleAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newExpense: ExpenseItem = {
      id: Date.now().toString(),
      date: formData.get('date') as string,
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      amount: Number(formData.get('amount')),
    };
    
    setExpenses([...expenses, newExpense]);
    setIsAddModalOpen(false);
    toast({
      title: "เพิ่มรายการสำเร็จ",
      description: "รายการค่าใช้จ่ายได้ถูกเพิ่มแล้ว",
    });
  };

  const handleEditExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentExpense) return;
    
    const formData = new FormData(e.currentTarget);
    
    const updatedExpense: ExpenseItem = {
      ...currentExpense,
      date: formData.get('date') as string,
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      amount: Number(formData.get('amount')),
    };
    
    setExpenses(expenses.map(expense => expense.id === currentExpense.id ? updatedExpense : expense));
    setIsEditModalOpen(false);
    setCurrentExpense(null);
    toast({
      title: "แก้ไขรายการสำเร็จ",
      description: "รายการค่าใช้จ่ายได้ถูกอัปเดตแล้ว",
    });
  };

  const handleDelete = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
    toast({
      title: "ลบรายการสำเร็จ",
      description: "รายการค่าใช้จ่ายได้ถูกลบแล้ว",
    });
  };

  const openEditModal = (expense: ExpenseItem) => {
    setCurrentExpense(expense);
    setIsEditModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryLabel = (categoryValue: string) => {
    const category = expenseCategories.find(cat => cat.value === categoryValue);
    return category ? category.label : categoryValue;
  };

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = 
      formatDate(expense.date).toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.amount.toString().includes(searchQuery);
    
    if (selectedCategory === "all") {
      return matchesSearch;
    } else {
      return matchesSearch && expense.category === selectedCategory;
    }
  });

  const calculateTotal = () => {
    return filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
  };

  return (
    <Layout>
      <div className="p-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-transformer-primary">รายการค่าใช้จ่าย</h1>
            <p className="text-muted-foreground">จัดการข้อมูลค่าใช้จ่ายที่เกี่ยวข้องกับการจัดการน้ำมันหม้อแปลง</p>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)} className="whitespace-nowrap">
            <Plus className="mr-1 h-4 w-4" /> เพิ่มรายการค่าใช้จ่าย
          </Button>
        </div>

        <Card className="shadow-md border-t-4 border-t-transformer-primary">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-b pb-4">
            <CardTitle className="flex items-center text-xl font-semibold text-transformer-primary gap-2">
              <DollarSign className="h-5 w-5" />
              รายการค่าใช้จ่าย
            </CardTitle>
            <CardDescription>
              บันทึกและติดตามค่าใช้จ่ายที่เกี่ยวข้องกับการจัดการน้ำมันหม้อแปลง
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
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
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกประเภท" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทุกประเภท</SelectItem>
                    {expenseCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader className="bg-blue-50 dark:bg-blue-900/20">
                  <TableRow>
                    <TableHead className="font-semibold">วันที่</TableHead>
                    <TableHead className="font-semibold">ประเภท</TableHead>
                    <TableHead className="font-semibold">รายละเอียด</TableHead>
                    <TableHead className="font-semibold text-right">จำนวนเงิน (บาท)</TableHead>
                    <TableHead className="font-semibold w-28 text-center">จัดการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExpenses.length > 0 ? (
                    filteredExpenses.map((expense) => (
                      <TableRow key={expense.id} className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 even:bg-gray-50/50 transition-colors">
                        <TableCell className="font-medium">{formatDate(expense.date)}</TableCell>
                        <TableCell>
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium 
                            ${expense.category === 'transportation' ? 'bg-amber-100 text-amber-800' : ''}
                            ${expense.category === 'oil_testing' ? 'bg-blue-100 text-blue-800' : ''}
                            ${expense.category === 'maintenance' ? 'bg-green-100 text-green-800' : ''}
                            ${expense.category === 'others' ? 'bg-purple-100 text-purple-800' : ''}
                          `}>
                            {getCategoryLabel(expense.category)}
                          </span>
                        </TableCell>
                        <TableCell>{expense.description}</TableCell>
                        <TableCell className="text-right font-medium">
                          {expense.amount.toLocaleString('th-TH')}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2 justify-center">
                            <Button variant="outline" size="icon" onClick={() => openEditModal(expense)} className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => handleDelete(expense.id)} className="h-8 w-8 text-red-500 hover:text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        ไม่พบข้อมูลรายการค่าใช้จ่าย
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="bg-slate-50 p-3 rounded-lg border flex items-center gap-4">
                <span className="text-sm text-muted-foreground">ยอดรวม:</span>
                <span className="text-xl font-bold text-transformer-primary">{calculateTotal().toLocaleString('th-TH')} บาท</span>
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
          </CardContent>
        </Card>

        {/* Add Expense Modal */}
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>เพิ่มรายการค่าใช้จ่าย</DialogTitle>
              <DialogDescription>
                กรอกข้อมูลรายละเอียดค่าใช้จ่ายที่เกี่ยวข้องกับการจัดการน้ำมันหม้อแปลง
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleAddExpense}>
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
                  <Label htmlFor="category" className="text-right">
                    ประเภท
                  </Label>
                  <div className="col-span-3">
                    <Select name="category" defaultValue="transportation">
                      <SelectTrigger id="category">
                        <SelectValue placeholder="เลือกประเภทค่าใช้จ่าย" />
                      </SelectTrigger>
                      <SelectContent>
                        {expenseCategories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    <FileText className="h-4 w-4 inline mr-1" /> รายละเอียด
                  </Label>
                  <Input
                    id="description"
                    name="description"
                    required
                    className="col-span-3"
                    placeholder="ระบุรายละเอียดค่าใช้จ่าย"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    <DollarSign className="h-4 w-4 inline mr-1" /> จำนวนเงิน (บาท)
                  </Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    className="col-span-3"
                    placeholder="0.00"
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

        {/* Edit Expense Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>แก้ไขรายการค่าใช้จ่าย</DialogTitle>
              <DialogDescription>
                แก้ไขข้อมูลรายละเอียดค่าใช้จ่าย
              </DialogDescription>
            </DialogHeader>
            
            {currentExpense && (
              <form onSubmit={handleEditExpense}>
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
                      defaultValue={currentExpense.date}
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-category" className="text-right">
                      ประเภท
                    </Label>
                    <div className="col-span-3">
                      <Select name="category" defaultValue={currentExpense.category}>
                        <SelectTrigger id="edit-category">
                          <SelectValue placeholder="เลือกประเภทค่าใช้จ่าย" />
                        </SelectTrigger>
                        <SelectContent>
                          {expenseCategories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-description" className="text-right">
                      <FileText className="h-4 w-4 inline mr-1" /> รายละเอียด
                    </Label>
                    <Input
                      id="edit-description"
                      name="description"
                      required
                      className="col-span-3"
                      defaultValue={currentExpense.description}
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-amount" className="text-right">
                      <DollarSign className="h-4 w-4 inline mr-1" /> จำนวนเงิน (บาท)
                    </Label>
                    <Input
                      id="edit-amount"
                      name="amount"
                      type="number"
                      min="0"
                      step="0.01"
                      required
                      className="col-span-3"
                      defaultValue={currentExpense.amount}
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

export default ExpenseItemsPage;
