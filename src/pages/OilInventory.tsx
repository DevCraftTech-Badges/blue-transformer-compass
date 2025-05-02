
import React from 'react';
import Layout from '@/components/layout/Layout';
import OilInventoryContent from '@/components/oilInventory/OilInventoryContent';
import { Info } from 'lucide-react';

const OilInventoryPage = () => {
  return (
    <Layout>
      <div className="container mx-auto animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-transformer-primary">คลังรายการน้ำมัน</h1>
            <p className="text-muted-foreground">จัดการและติดตามการเคลื่อนไหวของน้ำมันหม้อแปลงในคลัง</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800/30 flex items-center gap-2">
            <Info className="text-blue-500 h-5 w-5 flex-shrink-0" />
            <span className="text-sm text-muted-foreground">อัพเดทล่าสุด: 1 พ.ค. 2568</span>
          </div>
        </div>
        <OilInventoryContent />
      </div>
    </Layout>
  );
};

export default OilInventoryPage;
