
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
import { Edit } from 'lucide-react';
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

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="font-semibold text-center">ลำดับ</TableHead>
            <TableHead className="font-semibold">วันที่</TableHead>
            <TableHead className="font-semibold text-center">ปริมาณน้ำมันในคลัง [ถัง]</TableHead>
            <TableHead className="font-semibold text-center">จัดการ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.map((item) => (
            <TableRow key={item.id} className="hover:bg-gray-50 even:bg-gray-50/50">
              <TableCell className="text-center">{item.id}</TableCell>
              <TableCell>{formatDate(item.date)}</TableCell>
              <TableCell className="text-center">{item.quantity}</TableCell>
              <TableCell className="text-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleEdit(item)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {mockData.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                ไม่พบข้อมูล
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="mt-6">
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
