
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import { Calculator, Save, BarChart2, AlertTriangle, Package, Clock, DollarSign, ShoppingBag } from 'lucide-react';

const CalculationResultsPage: React.FC = () => {
  const { toast } = useToast();
  const [isChanged, setIsChanged] = useState(false);
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
    setIsChanged(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Calculation results submitted:", calculationData);
    // Here you would typically save the data to your backend
    toast({
      title: "บันทึกข้อมูลสำเร็จ",
      description: "ข้อมูลผลการคำนวณได้รับการบันทึกเรียบร้อยแล้ว",
    });
    setIsChanged(false);
  };

  const formatNumber = (value: string) => {
    return parseFloat(value).toLocaleString('th-TH');
  };

  return (
    <Layout>
      <div className="p-6 animate-fade-in">
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-transformer-primary">ผลการคำนวณ</h1>
            <p className="text-muted-foreground">แสดงผลการคำนวณการสั่งซื้อน้ำมันที่เหมาะสม</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800/30 flex items-center gap-2">
            <Calculator className="text-blue-500 h-5 w-5 flex-shrink-0" />
            <span className="text-sm text-muted-foreground">อัพเดทล่าสุด: 1 พ.ค. 2568</span>
          </div>
        </div>
        
        <Card className="w-full max-w-2xl mx-auto shadow-md border-t-4 border-t-transformer-primary">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-b pb-4">
            <CardTitle className="flex items-center gap-2 text-xl font-semibold text-transformer-primary">
              <BarChart2 className="h-5 w-5" />
              ผลการคำนวณการสั่งซื้อน้ำมันที่เหมาะสม
            </CardTitle>
            <CardDescription>
              ข้อมูลผลการคำนวณสำหรับการจัดการน้ำมันหม้อแปลง
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-start gap-3 mb-6">
              <AlertTriangle className="text-amber-500 h-5 w-5 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-amber-700">
                ค่าที่แสดงได้รับการคำนวณโดยอัตโนมัติ ควรตรวจสอบความถูกต้องก่อนบันทึก หากต้องการคำนวณใหม่ ให้ปรับข้อมูลในหน้ารายการน้ำมัน
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="reorderLevel" className="flex items-center gap-2 text-base">
                    <ShoppingBag className="h-4 w-4 text-transformer-primary" />
                    Re-order Level [ถัง]
                  </Label>
                  <Input 
                    id="reorderLevel" 
                    type="text"
                    value={calculationData.reorderLevel}
                    onChange={handleChange}
                    className="text-lg font-medium"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="orderQuantity" className="flex items-center gap-2 text-base">
                    <Package className="h-4 w-4 text-transformer-primary" />
                    ปริมาณการสั่งน้ำมัน [ถัง/ครั้ง]
                  </Label>
                  <Input 
                    id="orderQuantity" 
                    type="text"
                    value={calculationData.orderQuantity}
                    onChange={handleChange}
                    className="text-lg font-medium"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="safetyStock" className="flex items-center gap-2 text-base">
                    <Package className="h-4 w-4 text-transformer-primary" />
                    Safety Stock [ถัง]
                  </Label>
                  <Input 
                    id="safetyStock" 
                    type="text"
                    value={calculationData.safetyStock}
                    onChange={handleChange}
                    className="text-lg font-medium"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="orderFrequency" className="flex items-center gap-2 text-base">
                    <Clock className="h-4 w-4 text-transformer-primary" />
                    จำนวนครั้งที่สั่งน้ำมัน [ครั้ง/ปี]
                  </Label>
                  <Input 
                    id="orderFrequency" 
                    type="text"
                    value={calculationData.orderFrequency}
                    onChange={handleChange}
                    className="text-lg font-medium"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="orderCost" className="flex items-center gap-2 text-base">
                    <DollarSign className="h-4 w-4 text-transformer-primary" />
                    ค่าใช้จ่ายในการสั่ง [บาท/ปี]
                  </Label>
                  <Input 
                    id="orderCost" 
                    type="text"
                    value={calculationData.orderCost}
                    onChange={handleChange}
                    className="text-lg font-medium"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatNumber(calculationData.orderCost)} บาท
                  </p>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={!isChanged} 
                className="w-full mt-6"
              >
                <Save className="mr-2 h-4 w-4" /> บันทึกผลการคำนวณ
              </Button>
            </form>
          </CardContent>
          <CardFooter className="bg-slate-50 border-t p-4 flex justify-center">
            <p className="text-sm text-muted-foreground">
              ข้อมูลจะถูกนำไปใช้ในการวางแผนการสั่งซื้อน้ำมันในอนาคต
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default CalculationResultsPage;
