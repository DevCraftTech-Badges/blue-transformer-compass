
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Edit, Trash2 } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useToast } from '@/hooks/use-toast';

interface WeightData {
  id: number;
  performGroup: string;
  name: string;
  wf: number;
}

const SubequipmentWeightPage = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [editingItem, setEditingItem] = useState<WeightData | null>(null);
  const [formData, setFormData] = useState<WeightData>({
    id: 0,
    performGroup: '',
    name: '',
    wf: 0
  });
  
  // Sample data
  const [data, setData] = useState<WeightData[]>([
    { id: 1, performGroup: 'Bushing', name: 'Bushing Test', wf: 0.30 },
    { id: 2, performGroup: 'Core', name: 'Core Test', wf: 0.25 },
    { id: 3, performGroup: 'OLTC', name: 'OLTC Test', wf: 0.20 },
    { id: 4, performGroup: 'Tank', name: 'Tank Test', wf: 0.15 },
    { id: 5, performGroup: 'Cooling', name: 'Cooling System', wf: 0.10 },
  ]);

  // Reset form when opening dialog
  const openCreateDialog = () => {
    setEditingItem(null);
    setFormData({
      id: data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1,
      performGroup: '',
      name: '',
      wf: 0
    });
    setIsOpen(true);
  };

  // Open edit dialog with existing data
  const openEditDialog = (item: WeightData) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsOpen(true);
  };

  // Open delete confirmation dialog
  const openDeleteDialog = (item: WeightData) => {
    setEditingItem(item);
    setIsDeleteDialogOpen(true);
  };

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'wf' ? parseFloat(value) || 0 : value
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.performGroup || !formData.name || formData.wf === undefined) {
      toast({
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        variant: 'destructive'
      });
      return;
    }

    if (editingItem) {
      // Update existing item
      setData(data.map(item => item.id === formData.id ? formData : item));
      toast({
        title: 'แก้ไขข้อมูลสำเร็จ',
        description: `แก้ไขข้อมูล ${formData.name} เรียบร้อยแล้ว`,
      });
    } else {
      // Add new item
      setData([...data, formData]);
      toast({
        title: 'เพิ่มข้อมูลสำเร็จ',
        description: `เพิ่มข้อมูล ${formData.name} เรียบร้อยแล้ว`,
      });
    }
    
    setIsOpen(false);
  };

  // Handle delete confirmation
  const handleDelete = () => {
    if (editingItem) {
      setData(data.filter(item => item.id !== editingItem.id));
      toast({
        title: 'ลบข้อมูลสำเร็จ',
        description: `ลบข้อมูล ${editingItem.name} เรียบร้อยแล้ว`,
      });
      setIsDeleteDialogOpen(false);
      setEditingItem(null);
    }
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">การจัดการ - Weight อุปกรณ์ย่อย</h1>
          <Button 
            onClick={openCreateDialog} 
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            สร้างรายการใหม่
          </Button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Perform Group</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Wf</TableHead>
                <TableHead>จัดการ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.performGroup}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.wf.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(item)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink 
                    isActive={currentPage === i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* Create/Edit Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'แก้ไขข้อมูล' : 'เพิ่มข้อมูลใหม่'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="performGroup" className="text-right">Perform Group</label>
                <Input 
                  id="performGroup" 
                  name="performGroup" 
                  className="col-span-3" 
                  value={formData.performGroup} 
                  onChange={handleChange} 
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">Name</label>
                <Input 
                  id="name" 
                  name="name" 
                  className="col-span-3" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="wf" className="text-right">Wf (Weight Factor)</label>
                <Input 
                  id="wf" 
                  name="wf" 
                  type="number" 
                  className="col-span-3" 
                  value={formData.wf} 
                  onChange={handleChange} 
                  required
                  min="0"
                  max="1"
                  step="0.01"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">บันทึกข้อมูล</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>ยืนยันการลบ</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>คุณต้องการลบข้อมูล {editingItem?.name} ใช่หรือไม่?</p>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              ยกเลิก
            </Button>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white" 
              onClick={handleDelete}
            >
              ยืนยัน
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default SubequipmentWeightPage;
