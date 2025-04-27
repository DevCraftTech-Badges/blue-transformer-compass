
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import OilContactTable from '@/components/oltcMaintenance/OilContactTable';
import CreateOilContactModal from '@/components/oltcMaintenance/CreateOilContactModal';
import { Button } from '@/components/ui/button';

const OilContact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Oil Contact</h1>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-transformer-primary hover:bg-transformer-primary/90"
          >
            สร้างรายการ
          </Button>
        </div>

        <OilContactTable />
        <CreateOilContactModal 
          open={isModalOpen} 
          onOpenChange={setIsModalOpen}
        />
      </div>
    </Layout>
  );
};

export default OilContact;
