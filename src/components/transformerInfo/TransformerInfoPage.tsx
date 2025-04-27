
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import TransformerTable from './TransformerTable';
import TransformerModal from './TransformerModal';

interface Transformer {
  id: number;
  name: string;
  equipmentNo: string;
  manufacturer: string;
  capacity: string;
}

export const TransformerInfoPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTransformer, setCurrentTransformer] = useState<Transformer | null>(null);
  
  // Sample data for the table
  const [transformers, setTransformers] = useState<Transformer[]>([
    { id: 1, name: 'AN-KT1A', equipmentNo: '7000016200', manufacturer: 'ABB', capacity: '50.0' },
    { id: 2, name: 'AN-KT1B', equipmentNo: '7000016201', manufacturer: 'Siemens', capacity: '30.0' },
    { id: 3, name: 'AN-KT2A', equipmentNo: '7000016202', manufacturer: 'GE', capacity: '100.0' },
  ]);

  const areas = ['ทั้งหมด', 'เขตนครหลวง', 'เขตเหนือ', 'เขตตะวันออกเฉียงเหนือ', 'เขตกลาง', 'เขตใต้'];

  const handleOpenModal = () => {
    setCurrentTransformer(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditTransformer = (transformer: Transformer) => {
    setCurrentTransformer(transformer);
    setIsModalOpen(true);
  };

  const handleDeleteTransformer = (id: number) => {
    setTransformers(transformers.filter(transformer => transformer.id !== id));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic here
    console.log('Searching for:', searchTerm, 'in area:', selectedArea);
    // In a real application, you would filter the data based on search term and area
  };

  const handleSaveTransformer = (data: any) => {
    if (currentTransformer) {
      // Edit existing transformer
      setTransformers(transformers.map(item => 
        item.id === currentTransformer.id ? { ...item, ...data } : item
      ));
    } else {
      // Create new transformer
      const newId = Math.max(0, ...transformers.map(t => t.id)) + 1;
      const newTransformer = {
        id: newId,
        name: data.name || `New Transformer ${newId}`,
        equipmentNo: data.equipmentNo || `-`,
        manufacturer: data.manufacturer || '-',
        capacity: data.capacity || '0.0',
      };
      setTransformers([...transformers, newTransformer]);
    }
    handleCloseModal();
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">หม้อแปลงไฟฟ้า</h1>
      
      {/* Search Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <form onSubmit={handleSearch} className="flex flex-wrap gap-4 items-end">
          <div className="w-full md:w-auto flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              ค้นหาข้อมูล
            </label>
            <Input
              id="search"
              placeholder="ระบุคำค้นหา"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="w-full md:w-auto flex-1">
            <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
              เขต
            </label>
            <Select value={selectedArea} onValueChange={setSelectedArea}>
              <SelectTrigger id="area" className="w-full">
                <SelectValue placeholder="เลือกเขต" />
              </SelectTrigger>
              <SelectContent>
                {areas.map((area) => (
                  <SelectItem key={area} value={area}>{area}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Search className="mr-2 h-4 w-4" /> ค้นหา
          </Button>
        </form>
      </div>
      
      {/* Create Button */}
      <div className="mb-6">
        <Button onClick={handleOpenModal} className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" /> เพิ่มหม้อแปลงไฟฟ้า
        </Button>
      </div>
      
      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <TransformerTable 
          transformers={transformers} 
          onEdit={handleEditTransformer}
          onDelete={handleDeleteTransformer}
        />
      </div>
      
      {/* Modal Form */}
      <TransformerModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        onSave={handleSaveTransformer}
        transformer={currentTransformer}
      />
    </div>
  );
};
