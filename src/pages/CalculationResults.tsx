
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";

const CalculationResultsPage: React.FC = () => {
  const { toast } = useToast();
  const [calculationData, setCalculationData] = useState({
    reorderLevel: "290.0",
    orderQuantity: "165.0",
    safetyStock: "176.0",
    orderFrequency: "2.0",
    orderCost: "6362056.0"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCalculationData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Calculation results submitted:", calculationData);
    // Here you would typically save the data to your backend
    toast({
      title: "บันทึกข้อมูลสำเร็จ",
      description: "ข้อมูลผลการคำนวณได้รับการบันทึกเรียบร้อยแล้ว",
    });
  };

  return (
    <Layout>
      <div className="p-6 animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-transformer-dark">ผลการคำนวณ</h1>
          <p className="text-muted-foreground">แสดงผลการคำนวณการสั่งซื้อน้ำมันที่เหมาะสม</p>
        </div>
        
        <Card className="w-full max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>ผลการคำนวณ</CardTitle>
            <CardDescription>ข้อมูลผลการคำนวณสำหรับการจัดการน้ำมัน</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reorderLevel">Re-order Level [ถัง]</Label>
                <Input 
                  id="reorderLevel" 
                  type="text"
                  value={calculationData.reorderLevel}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="orderQuantity">ปริมาณการสั่งน้ำมัน [ถัง/ครั้ง]</Label>
                <Input 
                  id="orderQuantity" 
                  type="text"
                  value={calculationData.orderQuantity}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="safetyStock">Safety Stock [ถัง]</Label>
                <Input 
                  id="safetyStock" 
                  type="text"
                  value={calculationData.safetyStock}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="orderFrequency">จำนวนครั้งที่สั่งน้ำมัน [ครั้ง/ปี]</Label>
                <Input 
                  id="orderFrequency" 
                  type="text"
                  value={calculationData.orderFrequency}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="orderCost">ค่าใช้จ่ายในการสั่ง [บาท/ปี]</Label>
                <Input 
                  id="orderCost" 
                  type="text"
                  value={calculationData.orderCost}
                  onChange={handleChange}
                />
              </div>

              <Button type="submit" className="w-full">บันทึก</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CalculationResultsPage;
