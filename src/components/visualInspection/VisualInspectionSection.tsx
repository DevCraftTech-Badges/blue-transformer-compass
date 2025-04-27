
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import InspectionTable from './InspectionTable';
import { useToast } from '@/hooks/use-toast';
import VisualInspectionModal from './VisualInspectionModal';
import { InspectionItem, Category } from './types';
import { useNavigate } from 'react-router-dom';

interface VisualInspectionSectionProps {
  title: string;
  description?: string;
  transformerName?: string;
  egatSN?: string;
  category?: Category; // Add this prop
}

const VisualInspectionSection: React.FC<VisualInspectionSectionProps> = ({
  title,
  description,
  transformerName,
  egatSN,
  category,
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
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
    });
  };

  const handleViewDetails = (item: InspectionItem) => {
    if (title === 'Thermo Scan') {
      navigate('/not-found-thermo-scan');
    } else {
      // Handle other item types
      console.log('View details for item:', item);
    }
  };

  const filteredItems = items.filter((item) =>
    item.transformerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.egatSN.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.testType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="w-full shadow-sm bg-white">
      <CardHeader className="pb-3">
        <div className="flex flex-row justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            {description && <p className="text-gray-500 text-sm mt-1">{description}</p>}
          </div>
          <Button
            onClick={handleOpenModal}
            className="bg-transformer-primary hover:bg-blue-700 text-white"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> เพิ่มรายการใหม่
          </Button>
        </div>
        <div className="mt-4">
          <Input
            placeholder="ค้นหา..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>
      </CardHeader>
      <CardContent>
        <InspectionTable
          items={filteredItems}
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
          onView={handleViewDetails}
          onViewDetails={handleViewDetails}
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
