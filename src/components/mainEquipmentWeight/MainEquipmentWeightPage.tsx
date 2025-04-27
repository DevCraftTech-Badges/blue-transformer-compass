
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import MainEquipmentWeightTable from './MainEquipmentWeightTable';
import MainEquipmentWeightModal from './MainEquipmentWeightModal';
import { MainEquipmentWeightItem } from '@/types/mainEquipmentWeight';

const MainEquipmentWeightPage = () => {
  const [items, setItems] = useState<MainEquipmentWeightItem[]>([
    {
      id: 1,
      name: "Auto Transformer",
      category: "Power Transformer",
      weight: 100,
      activePart: 40,
      bushing: 20,
      arrester: 10,
      oil: 20,
      oltc: 10
    },
    {
      id: 2,
      name: "Power Transformer",
      category: "Power Transformer",
      weight: 150,
      activePart: 60,
      bushing: 25,
      arrester: 15,
      oil: 30,
      oltc: 20
    },
    {
      id: 3,
      name: "Distribution Transformer",
      category: "Power Transformer",
      weight: 80,
      activePart: 30,
      bushing: 15,
      arrester: 10,
      oil: 15,
      oltc: 10
    }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<MainEquipmentWeightItem | undefined>(undefined);
  
  const handleOpenModal = () => {
    setCurrentItem(undefined);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  const handleEditItem = (item: MainEquipmentWeightItem) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };
  
  const handleDeleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  const handleSaveItem = (itemData: Omit<MainEquipmentWeightItem, "id">) => {
    if (currentItem) {
      setItems(items.map(item => 
        item.id === currentItem.id ? { ...item, ...itemData } : item
      ));
    } else {
      const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
      setItems([...items, { id: newId, ...itemData }]);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Main Equipment Weight</h1>
        <Button onClick={handleOpenModal}>
          <Plus className="mr-1 h-4 w-4" />
          Add New
        </Button>
      </div>
      
      <MainEquipmentWeightTable 
        items={items} 
        onEdit={handleEditItem} 
        onDelete={handleDeleteItem}
      />
      
      <MainEquipmentWeightModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSave={handleSaveItem} 
        item={currentItem}
      />
    </div>
  );
};

export default MainEquipmentWeightPage;
