
import React from 'react';
import Layout from '@/components/layout/Layout';
import OilInventoryContent from '@/components/oilInventory/OilInventoryContent';

const OilInventoryPage = () => {
  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">คลังรายการน้ำมัน</h1>
        <OilInventoryContent />
      </div>
    </Layout>
  );
};

export default OilInventoryPage;
