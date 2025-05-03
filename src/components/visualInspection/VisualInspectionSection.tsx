
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import InspectionTable from './InspectionTable';
import { useToast } from '@/hooks/use-toast';
import VisualInspectionModal from './VisualInspectionModal';
import { InspectionItem, Category } from './types';

interface VisualInspectionSectionProps {
  title: string;
  description?: string;
  transformerName?: string;
  egatSN?: string;
  category?: Category;
}

const VisualInspectionSection: React.FC<VisualInspectionSectionProps> = ({
  title,
  description,
  transformerName,
  egatSN,
  category,
}) => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<InspectionItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<InspectionItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenModal = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (item: InspectionItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleSubmit = (data: InspectionItem) => {
    if (selectedItem) {
      // Edit existing item
      setItems(
        items.map((item) => (item.id === selectedItem.id ? { ...data, id: item.id } : item))
      );
      toast({
        title: 'บันทึกข้อมูลสำเร็จ',
        description: 'แก้ไขข้อมูลเรียบร้อยแล้ว',
        variant: 'default',
      });
    } else {
      // Add new item
      const newItem: InspectionItem = {
        ...data,
        id: Math.floor(Math.random() * 10000),
      };
      setItems([...items, newItem]);
      toast({
        title: 'บันทึกข้อมูลสำเร็จ',
        description: 'เพิ่มข้อมูลเรียบร้อยแล้ว',
        variant: 'default',
      });
    }
    setIsModalOpen(false);
  };

  const handleDeleteItem = (id: number) => {
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems);
    toast({
      title: 'ลบข้อมูลสำเร็จ',
      description: 'ลบข้อมูลเรียบร้อยแล้ว',
      variant: 'default',
    });
  };

  const filteredItems = items.filter((item) =>
    item.transformerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.egatSN.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.testType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="w-full shadow-sm bg-white border-0">
      <CardHeader className="pb-3">
        <div className="flex flex-row justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold text-blue-800">{title}</CardTitle>
            {description && <p className="text-gray-500 text-sm mt-1">{description}</p>}
          </div>
          <Button
            onClick={handleOpenModal}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> เพิ่มรายการใหม่
          </Button>
        </div>
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="ค้นหารายการ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-blue-200 focus-visible:ring-blue-400"
          />
        </div>
      </CardHeader>
      <CardContent>
        <InspectionTable
          items={filteredItems}
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
          onView={() => {}}
          onViewDetails={() => {}}
        />
      </CardContent>
      <VisualInspectionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSubmit}
        item={selectedItem}
        category={category}
      />
    </Card>
  );
};

export default VisualInspectionSection;
