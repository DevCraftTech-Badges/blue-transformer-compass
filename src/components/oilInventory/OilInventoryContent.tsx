
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import OilInventoryTable from './OilInventoryTable';
import InitialOilQuantityTable from './InitialOilQuantityTable';
import { Package, Database } from 'lucide-react';

const OilInventoryContent = () => {
  const [activeTab, setActiveTab] = useState("inventory");

  return (
    <Card className="shadow-md border-t-4 border-t-transformer-primary">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-b pb-4">
        <CardTitle className="flex items-center text-xl font-semibold text-transformer-primary gap-2">
          <Package className="h-5 w-5" />
          รายการน้ำมันในคลัง
        </CardTitle>
        <CardDescription>
          จัดการข้อมูลปริมาณน้ำมันหม้อแปลงและติดตามการเคลื่อนไหว
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <Tabs defaultValue="inventory" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-blue-50 dark:bg-blue-900/20 p-1">
            <TabsTrigger 
              value="inventory" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-transformer-primary data-[state=active]:shadow-md transition-all duration-200"
            >
              <Package className="h-4 w-4" />
              <span>คลังน้ำมัน</span>
            </TabsTrigger>
            <TabsTrigger 
              value="initial" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-transformer-primary data-[state=active]:shadow-md transition-all duration-200"
            >
              <Database className="h-4 w-4" />
              <span>ปริมาณน้ำมันเริ่มต้น</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="inventory" className="bg-white rounded-md animate-fade-in">
            <OilInventoryTable />
          </TabsContent>
          <TabsContent value="initial" className="bg-white rounded-md animate-fade-in">
            <InitialOilQuantityTable />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OilInventoryContent;
