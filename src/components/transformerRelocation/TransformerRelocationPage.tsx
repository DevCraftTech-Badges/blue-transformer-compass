
import React from 'react';
import { SearchForm } from './SearchForm';
import { TransformerTable } from './TransformerTable';
import { StatusChangeModal } from './StatusChangeModal';
import { RelocationModal } from './RelocationModal';

export const TransformerRelocationPage = () => {
  const [isStatusModalOpen, setIsStatusModalOpen] = React.useState(false);
  const [isRelocationModalOpen, setIsRelocationModalOpen] = React.useState(false);
  const [selectedTransformer, setSelectedTransformer] = React.useState<any>(null);

  const handleSearch = (equipmentNo: string, status: string) => {
    // Implement search logic
    console.log('Searching for:', { equipmentNo, status });
  };

  const handleStatusChange = (newStatus: string) => {
    console.log('Changing status to:', newStatus);
    setIsStatusModalOpen(false);
  };

  const handleRelocation = (data: any) => {
    console.log('Relocating transformer:', data);
    setIsRelocationModalOpen(false);
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-semibold mb-6">การย้ายหม้อแปลง</h1>
      
      <div className="space-y-6">
        <SearchForm onSearch={handleSearch} />
        
        <TransformerTable
          onStatusChange={(transformer) => {
            setSelectedTransformer(transformer);
            setIsStatusModalOpen(true);
          }}
          onRelocate={(transformer) => {
            setSelectedTransformer(transformer);
            setIsRelocationModalOpen(true);
          }}
        />
      </div>

      <StatusChangeModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        onSubmit={handleStatusChange}
        transformer={selectedTransformer}
      />

      <RelocationModal
        isOpen={isRelocationModalOpen}
        onClose={() => setIsRelocationModalOpen(false)}
        onSubmit={handleRelocation}
        transformer={selectedTransformer}
      />
    </div>
  );
};
