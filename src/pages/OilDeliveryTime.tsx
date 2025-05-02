
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import { Timer, Save, Info } from 'lucide-react';

const OilDeliveryTimePage: React.FC = () => {
  const { toast } = useToast();
  const [deliveryTime, setDeliveryTime] = useState<string>("15");
  const [isChanged, setIsChanged] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Oil delivery time submitted:", deliveryTime);
    // Here you would typically save the data to your backend
    toast({
      title: "บันทึกข้อมูลสำเร็จ",
      description: "ระยะเวลาในการได้รับน้ำมันได้รับการบันทึกเรียบร้อยแล้ว",
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
        </div>
        
        <Card className="w-full max-w-md mx-auto shadow-md border-t-4 border-t-transformer-primary">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-b pb-4">
            <CardTitle className="flex items-center gap-2 text-xl font-semibold text-transformer-primary">
              <Timer className="h-5 w-5" />
              ระยะเวลาได้รับน้ำมัน
            </CardTitle>
            <CardDescription>
              กรุณาระบุระยะเวลาในการได้รับน้ำมัน เพื่อใช้ในการคำนวณการสั่งซื้อ
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800/30 flex items-start gap-3 mb-6">
              <Info className="text-blue-500 h-5 w-5 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">
                ระยะเวลาในการได้รับน้ำมันคือระยะเวลาที่ใช้ตั้งแต่ทำการสั่งซื้อจนกระทั่งได้รับน้ำมัน 
                โดยจะถูกนำไปใช้ในการคำนวณจุดสั่งซื้อ (Re-order Point) ของระบบ
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="deliveryTime" className="text-base">ระยะเวลาได้รับน้ำมัน</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="deliveryTime" 
                    type="number"
                    min="1"
                    placeholder="ระบุจำนวนวัน" 
                    value={deliveryTime}
                    onChange={(e) => {
                      setDeliveryTime(e.target.value);
                      setIsChanged(true);
                    }}
                    className="flex-1 text-lg"
                  />
                  <span className="text-lg font-medium">วัน</span>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={!isChanged}
                className="w-full"
              >
                <Save className="mr-2 h-4 w-4" /> บันทึก
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default OilDeliveryTimePage;
