
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import OilTransformerChart from './OilTransformerChart';

const OilTransformerContent = () => {
  // Mock data for demonstration
  const oilAmount = 44;
  const status = "เบิกใช้งานได้ปกติ";

  return (
    <Card className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">ปริมาณน้ำมันคงเหลือ:</span>
            <span className="font-medium text-lg">{oilAmount} ลิตร</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Action:</span>
            <span className="font-medium text-green-500">{status}</span>
          </div>
          <div className="mt-4 p-4 bg-muted/20 rounded-md border">
            <p className="text-muted-foreground mb-3">
              กรุณากรอกราคาน้ำมันของปีเบิกจ่ายที่ผ่านมา (เพื่อคำนวณพารามิเตอร์ต่างๆ)
            </p>
            <Button>คลิกเพื่อกรอกข้อมูล</Button>
          </div>
        </div>
        <div className="flex items-center">
          <img
            src="/placeholder.svg"
            alt="Oil Transformer"
            className="max-w-full h-auto rounded-md"
            width={300}
            height={200}
          />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-medium mb-4">แนวโน้มปริมาณน้ำมัน</h2>
        <div className="h-[300px] w-full">
          <OilTransformerChart />
        </div>
      </div>
    </Card>
  );
};

export default OilTransformerContent;
