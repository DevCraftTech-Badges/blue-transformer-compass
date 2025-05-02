
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUp, Info, ThermometerSun } from 'lucide-react';
import OilTransformerChart from './OilTransformerChart';

const OilTransformerContent = () => {
  // Mock data for demonstration
  const oilAmount = 44;
  const status = "เบิกใช้งานได้ปกติ";
  const maxCapacity = 100; // Maximum capacity in liters
  const percentage = (oilAmount / maxCapacity) * 100;

  const getStatusColor = () => {
    if (percentage > 70) return "text-green-500";
    if (percentage > 30) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-b">
        <CardTitle className="flex items-center text-xl font-semibold text-transformer-primary">
          <ThermometerSun className="mr-2 h-5 w-5" />
          สถานะน้ำมันหม้อแปลง
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left column - Status information */}
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl border border-blue-100 dark:border-blue-800/30">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">ปริมาณน้ำมันคงเหลือ:</span>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold">{oilAmount}</span>
                    <span className="ml-2 text-muted-foreground">ลิตร</span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
                  <div 
                    className={`h-2.5 rounded-full ${
                      percentage > 70 ? 'bg-green-500' : 
                      percentage > 30 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Action:</span>
                  <span className={`font-semibold ${getStatusColor()}`}>{status}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/10 dark:to-blue-800/10 p-5 rounded-xl border border-blue-100 dark:border-blue-800/30">
              <div className="flex items-start mb-4">
                <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">
                  กรุณากรอกราคาน้ำมันของปีเบิกจ่ายที่ผ่านมา (เพื่อคำนวณพารามิเตอร์ต่างๆ)
                </p>
              </div>
              <Button className="w-full bg-transformer-primary hover:bg-transformer-primary/90 transition-all duration-200 flex gap-2">
                <ArrowUp className="h-4 w-4" />
                คลิกเพื่อกรอกข้อมูล
              </Button>
            </div>
          </div>
          
          {/* Right column - Image */}
          <div className="flex items-center justify-center bg-white dark:bg-gray-800/20 rounded-xl p-4 border">
            <img
              src="/placeholder.svg"
              alt="Oil Transformer"
              className="max-w-full h-auto rounded-md object-contain"
              width={280}
              height={180}
            />
          </div>
        </div>

        {/* Chart section */}
        <div className="mt-8 bg-white dark:bg-gray-800/20 p-5 rounded-xl border">
          <h2 className="text-xl font-medium mb-6 text-transformer-primary flex items-center">
            <ArrowUp className="mr-2 h-5 w-5 rotate-45" />
            แนวโน้มปริมาณน้ำมัน
          </h2>
          <div className="h-[350px] w-full">
            <OilTransformerChart />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OilTransformerContent;
