
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, Search, Plus, Download } from 'lucide-react';
import EditInitialOilModal from './EditInitialOilModal';

// Mock data for the table
const mockData = [
  { id: 1, date: "2023-01-01", quantity: 100 },
  { id: 2, date: "2023-02-01", quantity: 95 },
  { id: 3, date: "2023-03-01", quantity: 120 },
  { id: 4, date: "2023-04-01", quantity: 110 },
  { id: 5, date: "2023-05-01", quantity: 105 },
];

const InitialOilQuantityTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<typeof mockData[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleEdit = (item: typeof mockData[0]) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleSave = (updatedItem: typeof mockData[0]) => {
    // Here you would update the data in a real application
    console.log("Saving updated item:", updatedItem);
    handleCloseModal();
  };

  const filteredData = mockData.filter(item => 
    formatDate(item.date).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="ค้นหาตามวันที่..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button 
            className="w-full sm:w-auto flex gap-2 items-center bg-transformer-primary hover:bg-transformer-primary/90"
          >
            <Plus className="h-4 w-4" />
            เพิ่มรายการใหม่
          </Button>
          <Button 
            variant="outline" 
            className="w-full sm:w-auto flex gap-2 items-center border-transformer-primary text-transformer-primary hover:bg-transformer-primary hover:text-white"
          >
            <Download className="h-4 w-4" />
            ส่งออก
          </Button>
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50 dark:bg-blue-900/20">
              <TableHead className="font-semibold text-center w-16">ลำดับ</TableHead>
              <TableHead className="font-semibold">วันที่</TableHead>
              <TableHead className="font-semibold text-center">ปริมาณน้ำมันในคลัง [ถัง]</TableHead>
              <TableHead className="font-semibold text-center w-20">จัดการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id} className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 even:bg-gray-50/50 transition-colors">
                <TableCell className="text-center font-medium">{item.id}</TableCell>
                <TableCell className="font-medium">{formatDate(item.date)}</TableCell>
                <TableCell className="text-center">{item.quantity}</TableCell>
                <TableCell className="text-center">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleEdit(item)}
                    className="hover:bg-blue-50 hover:text-transformer-primary transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                  ไม่พบข้อมูล
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
              <PaginationLink href="#" className="hover:bg-blue-50 transition-colors">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" className="hover:bg-blue-50 transition-colors">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" className="hover:bg-blue-50 transition-colors" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {isModalOpen && selectedItem && (
        <EditInitialOilModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal}
          item={selectedItem}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default InitialOilQuantityTable;
