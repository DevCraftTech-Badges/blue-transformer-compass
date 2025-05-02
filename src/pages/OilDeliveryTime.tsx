
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const OilDeliveryTimePage: React.FC = () => {
  const [deliveryTime, setDeliveryTime] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Oil delivery time submitted:", deliveryTime);
    // Here you would typically save the data to your backend
  };

  return (
    <Layout>
      <div className="p-6 animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-transformer-dark">ระยะเวลาได้รับน้ำมัน</h1>
          <p className="text-muted-foreground">กำหนดระยะเวลาในการได้รับน้ำมันหม้อแปลง</p>
        </div>
        
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>ระยะเวลาได้รับน้ำมัน</CardTitle>
            <CardDescription>กรุณาระบุระยะเวลาในการได้รับน้ำมัน</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deliveryTime">ระยะเวลาได้รับน้ำมัน</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="deliveryTime" 
                    type="number"
                    min="1"
                    placeholder="ระบุจำนวนวัน" 
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className="flex-1"
                  />
                  <span>วัน</span>
                </div>
              </div>

              <Button type="submit" className="w-full">บันทึก</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default OilDeliveryTimePage;
