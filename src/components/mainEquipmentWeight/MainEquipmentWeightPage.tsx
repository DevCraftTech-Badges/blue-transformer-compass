
import React, { useState } from "react";
import { PlusCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MainEquipmentWeightTable from "./MainEquipmentWeightTable";
import MainEquipmentWeightModal from "./MainEquipmentWeightModal";
import { MainEquipmentWeightItem } from "@/types/mainEquipmentWeight";

const MainEquipmentWeightPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<MainEquipmentWeightItem | null>(null);
  const [items, setItems] = useState<MainEquipmentWeightItem[]>([
    {
      id: 1,
      activePart: 30,
      bushing: 20,
      arrester: 15,
      oil: 25,
      oltc: 10,
    },
    {
      id: 2,
      activePart: 35,
      bushing: 15,
      arrester: 10,
      oil: 30,
      oltc: 10,
    },
    {
      id: 3,
      activePart: 40,
      bushing: 15,
      arrester: 15,
      oil: 20,
      oltc: 10,
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

  const handleEdit = (item: MainEquipmentWeightItem) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("คุณต้องการลบรายการนี้ใช่หรือไม่?");
    if (confirmDelete) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleSubmit = (itemData: Omit<MainEquipmentWeightItem, "id">) => {
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
      item.id.toString().includes(query) ||
      item.activePart.toString().includes(query) ||
      item.bushing.toString().includes(query) ||
      item.arrester.toString().includes(query) ||
      item.oil.toString().includes(query) ||
      item.oltc.toString().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">การจัดการ - Weight อุปกรณ์หลัก</h1>
      </div>

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

      <MainEquipmentWeightTable
        items={filteredItems}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <MainEquipmentWeightModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          initialData={currentItem || undefined}
          isEditing={!!currentItem}
        />
      )}
    </div>
  );
};

export default MainEquipmentWeightPage;
