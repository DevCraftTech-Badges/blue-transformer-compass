
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import OilInventoryTable from './OilInventoryTable';
import InitialOilQuantityTable from './InitialOilQuantityTable';

const OilInventoryContent = () => {
  const [activeTab, setActiveTab] = useState("inventory");

  return (
    <Card className="p-6">
      <Tabs defaultValue="inventory" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="inventory">คลังน้ำมัน</TabsTrigger>
          <TabsTrigger value="initial">ปริมาณน้ำมันเริ่มต้น</TabsTrigger>
        </TabsList>
        <TabsContent value="inventory">
          <OilInventoryTable />
        </TabsContent>
        <TabsContent value="initial">
          <InitialOilQuantityTable />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default OilInventoryContent;
