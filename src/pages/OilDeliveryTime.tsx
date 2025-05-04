
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import { Clock, Save, AlertTriangle, Calendar } from 'lucide-react';

const OilDeliveryTimePage: React.FC = () => {
  const { toast } = useToast();
  const [isChanged, setIsChanged] = useState(false);
  const [deliveryData, setDeliveryData] = useState({
    standardDeliveryDays: "14",
    urgentDeliveryDays: "7",
    minQuantity: "100",
    maxQuantity: "500"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setDeliveryData(prev => ({
      ...prev,
      [id]: value
    }));
    setIsChanged(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Delivery time settings submitted:", deliveryData);
    // Here you would typically save the data to your backend
    toast({
      title: "บันทึกข้อมูลสำเร็จ",
      description: "ข้อมูลระยะเวลาได้รับน้ำมันได้รับการบันทึกเรียบร้อยแล้ว",
    });
    setIsChanged(false);
  };

  return (
    <Layout>
      <div className="p-6 animate-fade-in">
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-transformer-primary">ระยะเวลาได้รับน้ำมัน</h1>
            <p className="text-muted-foreground">กำหนดระยะเวลาในการได้รับน้ำมันหม้อแปลง</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800/30 flex items-center gap-2">
            <Calendar className="text-blue-500 h-5 w-5 flex-shrink-0" />
            <span className="text-sm text-muted-foreground">อัพเดทล่าสุด: 1 พ.ค. 2568</span>
          </div>
        </div>
        
        <Card className="w-full max-w-2xl mx-auto shadow-md border-t-4 border-t-transformer-primary">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-b pb-4">
            <CardTitle className="flex items-center gap-2 text-xl font-semibold text-transformer-primary">
              <Clock className="h-5 w-5" />
              กำหนดระยะเวลาในการได้รับน้ำมันหม้อแปลง
            </CardTitle>
            <CardDescription>
              ตั้งค่าระยะเวลามาตรฐานและกรณีเร่งด่วนในการได้รับน้ำมันหม้อแปลง
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-start gap-3 mb-6">
              <AlertTriangle className="text-amber-500 h-5 w-5 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-amber-700">
                ค่าที่กำหนดนี้จะถูกนำไปใช้ในการคำนวณระยะเวลาในการสั่งซื้อและวางแผนการจัดการน้ำมัน
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="standardDeliveryDays" className="flex items-center gap-2 text-base">
                    <Clock className="h-4 w-4 text-transformer-primary" />
                    ระยะเวลามาตรฐาน (วัน)
                  </Label>
                  <Input 
                    id="standardDeliveryDays" 
                    type="number"
                    value={deliveryData.standardDeliveryDays}
                    onChange={handleChange}
                    className="text-lg font-medium"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="urgentDeliveryDays" className="flex items-center gap-2 text-base">
                    <Clock className="h-4 w-4 text-transformer-primary" />
                    ระยะเวลากรณีเร่งด่วน (วัน)
                  </Label>
                  <Input 
                    id="urgentDeliveryDays" 
                    type="number"
                    value={deliveryData.urgentDeliveryDays}
                    onChange={handleChange}
                    className="text-lg font-medium"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="minQuantity" className="flex items-center gap-2 text-base">
                    <Clock className="h-4 w-4 text-transformer-primary" />
                    ปริมาณการสั่งซื้อขั้นต่ำ (ถัง)
                  </Label>
                  <Input 
                    id="minQuantity" 
                    type="number"
                    value={deliveryData.minQuantity}
                    onChange={handleChange}
                    className="text-lg font-medium"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maxQuantity" className="flex items-center gap-2 text-base">
                    <Clock className="h-4 w-4 text-transformer-primary" />
                    ปริมาณการสั่งซื้อสูงสุด (ถัง)
                  </Label>
                  <Input 
                    id="maxQuantity" 
                    type="number"
                    value={deliveryData.maxQuantity}
                    onChange={handleChange}
                    className="text-lg font-medium"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={!isChanged} 
                className="w-full mt-6"
              >
                <Save className="mr-2 h-4 w-4" /> บันทึกข้อมูลระยะเวลา
              </Button>
            </form>
          </CardContent>
          <CardFooter className="bg-slate-50 border-t p-4 flex justify-center">
            <p className="text-sm text-muted-foreground">
              ข้อมูลจะถูกนำไปใช้ในการคำนวณและวางแผนการจัดการน้ำมันหม้อแปลง
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default OilDeliveryTimePage;
