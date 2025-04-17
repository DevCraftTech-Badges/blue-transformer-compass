
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ScoreWeightTestingTable from "./ScoreWeightTestingTable";
import ScoreWeightTestingModal from "./ScoreWeightTestingModal";
import { Plus } from "lucide-react";

export interface ScoreWeightTestingItem {
  id: number;
  performGroup: string;
  subGroup: string;
  morePerform: string;
  evaluation: string;
  variable: string;
  variableMin: number;
  variableMax: number;
}

const ScoreWeightTestingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ScoreWeightTestingItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for demonstration
  const [items, setItems] = useState<ScoreWeightTestingItem[]>([
    {
      id: 1,
      performGroup: "Electrical Testing",
      subGroup: "Winding Resistance",
      morePerform: "HV Windings",
      evaluation: "Resistance Balance",
      variable: "% Deviation",
      variableMin: 0,
      variableMax: 5,
    },
    {
      id: 2,
      performGroup: "Electrical Testing",
      subGroup: "Insulation Resistance",
      morePerform: "HV-Earth",
      evaluation: "Minimum IR",
      variable: "MOhms",
      variableMin: 1000,
      variableMax: 5000,
    },
    {
      id: 3,
      performGroup: "Oil Testing",
      subGroup: "Dielectric Strength",
      morePerform: "Main Tank",
      evaluation: "Breakdown Voltage",
      variable: "kV",
      variableMin: 30,
      variableMax: 80,
    },
    {
      id: 4,
      performGroup: "Oil Testing",
      subGroup: "Moisture Content",
      morePerform: "Main Tank",
      evaluation: "Water Content",
      variable: "ppm",
      variableMin: 5,
      variableMax: 25,
    },
    {
      id: 5,
      performGroup: "Core Testing",
      subGroup: "Core Insulation",
      morePerform: "Core-Ground",
      evaluation: "Resistance",
      variable: "MOhms",
      variableMin: 1,
      variableMax: 10,
    }
  ]);

  const handleOpenModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: ScoreWeightTestingItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("คุณต้องการลบรายการนี้ใช่หรือไม่?")) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleSave = (item: Omit<ScoreWeightTestingItem, "id">) => {
    if (editingItem) {
      // Update existing item
      setItems(items.map(i => 
        i.id === editingItem.id ? { ...item, id: editingItem.id } : i
      ));
    } else {
      // Add new item
      const newId = Math.max(0, ...items.map(item => item.id)) + 1;
      setItems([...items, { ...item, id: newId }]);
    }
    setIsModalOpen(false);
  };

  const filteredItems = items.filter(item =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">การจัดการ - Score และ Weight การทดสอบ</h1>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
        <div className="w-full sm:w-1/2">
          <Input
            type="text"
            placeholder="ค้นหาคะแนน..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <Button 
          onClick={handleOpenModal}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          สร้างรายการใหม่
        </Button>
      </div>
      
      <ScoreWeightTestingTable 
        items={filteredItems} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />

      <ScoreWeightTestingModal
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingItem}
      />
    </div>
  );
};

export default ScoreWeightTestingPage;
