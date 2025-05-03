
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import TransformerImportanceTable from '@/components/transformerImportance/TransformerImportanceTable';
import TransformerImportanceModal from '@/components/transformerImportance/TransformerImportanceModal';

const AddTransformerImportancePage = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Layout>
      <div className="space-y-6 p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-1.5 bg-blue-800 rounded-full"></div>
          <h1 className="text-2xl font-semibold text-blue-800">
            รายการความสำคัญของหม้อแปลง
          </h1>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          {/* Search and Add section */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-6">
            <div className="w-full md:w-1/2">
              <div className="flex flex-col space-y-2">
                <label htmlFor="transformer-search" className="font-medium text-blue-800">
                  Transformer Name
                </label>
                <div className="flex gap-2">
                  <Input
                    id="transformer-search"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="ค้นหาหม้อแปลง..."
                    className="border-blue-200"
                  />
                  <Button 
                    type="button"
                    className="bg-blue-700 hover:bg-blue-800 text-white gap-2"
                  >
                    <Search size={18} />
                    ค้นหา
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-800 hover:bg-blue-900 text-white gap-2"
              >
                <Plus size={18} />
                เพิ่มรายการความสำคัญของหม้อแปลง
              </Button>
            </div>
          </div>
          
          {/* Table */}
          <TransformerImportanceTable />
        </div>
      </div>
      
      {/* Modal for adding/editing transformer importance */}
      <TransformerImportanceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </Layout>
  );
};

export default AddTransformerImportancePage;
