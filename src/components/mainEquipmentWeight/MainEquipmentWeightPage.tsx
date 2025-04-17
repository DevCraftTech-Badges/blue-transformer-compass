
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import MainEquipmentWeightTable from './MainEquipmentWeightTable';
import MainEquipmentWeightModal from './MainEquipmentWeightModal';
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const initialData = Array(15).fill(null).map((_, index) => ({
  id: index + 1,
  activePart: Math.floor(Math.random() * 30) + 20,
  bushing: Math.floor(Math.random() * 20) + 10,
  arrester: Math.floor(Math.random() * 15) + 5,
  oil: Math.floor(Math.random() * 25) + 15,
  oltc: Math.floor(Math.random() * 20) + 10,
}));

export interface MainEquipmentWeightItem {
  id: number;
  activePart: number;
  bushing: number;
  arrester: number;
  oil: number;
  oltc: number;
}

const MainEquipmentWeightPage = () => {
  const [data, setData] = useState<MainEquipmentWeightItem[]>(initialData);
  const [filteredData, setFilteredData] = useState<MainEquipmentWeightItem[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<MainEquipmentWeightItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const handleCreateNew = () => {
    setCurrentItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: MainEquipmentWeightItem) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    const updatedData = data.filter(item => item.id !== id);
    setData(updatedData);
    filterData(updatedData, searchQuery);
    
    toast({
      title: "รายการถูกลบแล้ว",
      description: `รายการ ID: ${id} ถูกลบออกจากระบบเรียบร้อยแล้ว`,
    });
  };

  const handleSave = (itemData: Omit<MainEquipmentWeightItem, 'id'>) => {
    let updatedData: MainEquipmentWeightItem[];
    
    if (currentItem) {
      // Edit existing item
      updatedData = data.map(item => 
        item.id === currentItem.id 
          ? { ...itemData, id: currentItem.id } 
          : item
      );
      toast({
        title: "อัปเดตข้อมูลสำเร็จ",
        description: `รายการ ID: ${currentItem.id} ได้รับการอัปเดตเรียบร้อยแล้ว`,
      });
    } else {
      // Create new item
      const newId = data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1;
      const newItem = { ...itemData, id: newId };
      updatedData = [...data, newItem];
      toast({
        title: "สร้างรายการใหม่สำเร็จ",
        description: "เพิ่มรายการใหม่เข้าสู่ระบบเรียบร้อยแล้ว",
      });
    }
    
    setData(updatedData);
    filterData(updatedData, searchQuery);
    setIsModalOpen(false);
  };

  const filterData = (dataToFilter: MainEquipmentWeightItem[], query: string) => {
    if (!query.trim()) {
      setFilteredData(dataToFilter);
      return;
    }
    
    const lowercaseQuery = query.toLowerCase();
    const filtered = dataToFilter.filter(item => 
      item.id.toString().includes(lowercaseQuery) ||
      item.activePart.toString().includes(lowercaseQuery) ||
      item.bushing.toString().includes(lowercaseQuery) ||
      item.arrester.toString().includes(lowercaseQuery) ||
      item.oil.toString().includes(lowercaseQuery) ||
      item.oltc.toString().includes(lowercaseQuery)
    );
    
    setFilteredData(filtered);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterData(data, query);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl font-bold">การจัดการ - Weight อุปกรณ์หลัก</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ค้นหา..."
                className="pl-8"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <Button 
              onClick={handleCreateNew} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              สร้างรายการใหม่
            </Button>
          </div>
          
          <MainEquipmentWeightTable 
            data={filteredData} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        </CardContent>
      </Card>

      <MainEquipmentWeightModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave} 
        item={currentItem} 
      />
    </div>
  );
};

export default MainEquipmentWeightPage;
