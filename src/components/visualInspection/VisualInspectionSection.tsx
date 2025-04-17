
import React, { useState } from 'react';
import { PlusCircle, Search, Eye, Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import VisualInspectionModal from './VisualInspectionModal';

interface Field {
  name: string;
  type: 'text' | 'select' | 'date';
}

interface Category {
  id: string;
  title: string;
  fields: Field[];
}

interface InspectionItem {
  id: number;
  transformerName: string;
  egatSN: string;
  testType: string;
  testDate: string;
  testTime: string;
  inspector: string;
  [key: string]: any;
}

interface VisualInspectionSectionProps {
  category: Category;
}

const VisualInspectionSection: React.FC<VisualInspectionSectionProps> = ({ category }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<InspectionItem | null>(null);
  const [items, setItems] = useState<InspectionItem[]>([
    {
      id: 1,
      transformerName: 'TR-EGAT-001',
      egatSN: 'SN001',
      testType: 'Weekly Test',
      testDate: '2023-04-15',
      testTime: '09:30',
      inspector: 'ธนกฤต',
      maxLoad: 'Normal',
      sound: 'Normal',
      vibration: 'Normal',
      groundingConnector: 'Normal',
      foundation: 'Normal',
      animalProtection: 'Normal',
    },
    {
      id: 2,
      transformerName: 'TR-EGAT-002',
      egatSN: 'SN002',
      testType: 'Monthly Test',
      testDate: '2023-03-10',
      testTime: '13:45',
      inspector: 'วิชัย',
      maxLoad: 'High',
      sound: 'Abnormal',
      vibration: 'Normal',
      groundingConnector: 'Normal',
      foundation: 'Normal',
      animalProtection: 'Abnormal',
    },
  ]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCreateNew = () => {
    setCurrentItem(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleView = (item: InspectionItem) => {
    // View details implementation
    console.log('View item:', item);
  };

  const handleEdit = (item: InspectionItem) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("คุณต้องการลบรายการนี้ใช่หรือไม่?");
    if (confirmDelete) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleSaveItem = (itemData: Omit<InspectionItem, "id">) => {
    if (currentItem) {
      // Edit existing item
      setItems(
        items.map((item) =>
          item.id === currentItem.id
            ? { ...itemData, id: currentItem.id }
            : item
        )
      );
    } else {
      // Add new item
      const newItem = {
        ...itemData,
        id: Math.max(0, ...items.map((item) => item.id)) + 1,
      };
      setItems([...items, newItem]);
    }
    setIsModalOpen(false);
  };

  const filteredItems = items.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.transformerName.toLowerCase().includes(query) ||
      item.egatSN.toLowerCase().includes(query) ||
      item.testType.toLowerCase().includes(query) ||
      item.inspector.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">{category.title}</h2>
      
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="ค้นหา..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700" 
          onClick={handleCreateNew}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          สร้างรายการใหม่
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>หม้อแปลงไฟฟ้า</TableHead>
              <TableHead>EGAT S/N</TableHead>
              <TableHead>รูปแบบการทดสอบ</TableHead>
              <TableHead>วันที่เริ่มทดสอบ</TableHead>
              <TableHead>เวลาที่เริ่มปฏิบัติงาน</TableHead>
              <TableHead>ผู้ตรวจสอบ</TableHead>
              <TableHead>จัดการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  ไม่พบข้อมูล
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.transformerName}</TableCell>
                  <TableCell>{item.egatSN}</TableCell>
                  <TableCell>{item.testType}</TableCell>
                  <TableCell>{item.testDate}</TableCell>
                  <TableCell>{item.testTime}</TableCell>
                  <TableCell>{item.inspector}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleView(item)}
                        title="แสดงข้อมูล"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleEdit(item)}
                        title="แก้ไขข้อมูล"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(item.id)}
                        title="ลบข้อมูล"
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
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
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {isModalOpen && (
        <VisualInspectionModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveItem}
          item={currentItem}
          category={category}
        />
      )}
    </div>
  );
};

export default VisualInspectionSection;
