
import React, { useState } from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import VisualInspectionModal from './VisualInspectionModal';
import SearchBar from './SearchBar';
import ActionButtons from './ActionButtons';
import InspectionTable from './InspectionTable';
import { Category, InspectionItem } from './types';

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

  const handleCreateNew = () => {
    setCurrentItem(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleView = (item: InspectionItem) => {
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
      setItems(
        items.map((item) =>
          item.id === currentItem.id
            ? { ...itemData, id: currentItem.id }
            : item
        )
      );
    } else {
      const newId = Math.max(0, ...items.map((item) => item.id)) + 1;
      const newItem: InspectionItem = {
        ...itemData,
        id: newId
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
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ActionButtons onCreateNew={handleCreateNew} />
      </div>

      <InspectionTable 
        items={filteredItems}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

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
