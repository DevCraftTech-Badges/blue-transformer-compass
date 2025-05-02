
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Calculator, ChevronDown, Info, Scale, ZoomIn, Zap } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const WeibullCalculationPage: React.FC = () => {
  const { toast } = useToast();
  const [equipment, setEquipment] = useState<string>("");
  const [voltageRating, setVoltageRating] = useState<string>("");
  const [manufacturer, setManufacturer] = useState<string>("all");
  const [type, setType] = useState<string>("all");
  const [abnormalityDetails, setAbnormalityDetails] = useState<string>("all");
  const [timeInterval, setTimeInterval] = useState<string>("");
  const [leadTime, setLeadTime] = useState<string>("");
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation
    if (!equipment || !voltageRating || !timeInterval || !leadTime) {
      toast({
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        description: "โปรดกรอกข้อมูลที่จำเป็นทั้งหมด",
        variant: "destructive"
      });
      return;
    }

    // Placeholder for calculation logic
    console.log("Calculation requested with values:", {
      equipment,
      voltageRating,
      manufacturer,
      type,
      abnormalityDetails,
      timeInterval,
      leadTime
    });

    toast({
      title: "คำนวณสำเร็จ",
      description: "ระบบได้ทำการคำนวณพารามิเตอร์ Weibull เรียบร้อยแล้ว",
    });
    
    setShowResults(true);
  };

  const mockResults = {
    shape: 2.34,
    scale: 5.87,
    meanLifetime: 12.5,
    failureProbability: 0.23,
    reorderPoint: 8,
    recommendedStock: 3
  };

  return (
    <Layout>
      <div className="p-6 animate-fade-in">
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-transformer-primary">Inventory Control / Weibull Calculation</h1>
            <p className="text-muted-foreground">คำนวณค่าพารามิเตอร์ Weibull สำหรับอุปกรณ์</p>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-md border-t-4 border-t-transformer-primary h-fit">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-b">
              <CardTitle className="flex items-center gap-2 text-xl font-semibold text-transformer-primary">
                <ZoomIn className="h-5 w-5" />
                รายละเอียดการคำนวณ
              </CardTitle>
              <CardDescription>
                กรุณาระบุข้อมูลสำหรับการคำนวณพารามิเตอร์ Weibull
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800/30 mb-6 flex items-start gap-3">
                <Info className="text-blue-500 h-5 w-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  การคำนวณ Weibull จะช่วยในการวิเคราะห์อายุการใช้งานของอุปกรณ์ และช่วยในการวางแผนการสำรองอุปกรณ์ที่เหมาะสม
                </span>
              </div>

              <form onSubmit={handleCalculate} className="space-y-4">
                <div className="space-y-3">
                  <Label htmlFor="equipment" className="text-base">อุปกรณ์ <span className="text-red-500">*</span></Label>
                  <Select value={equipment} onValueChange={setEquipment} required>
                    <SelectTrigger id="equipment" className="w-full">
                      <SelectValue placeholder="เลือกอุปกรณ์" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bushing">Bushing</SelectItem>
                      <SelectItem value="arrester">Arrester</SelectItem>
                      <SelectItem value="olct">OLCT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="voltageRating" className="text-base">Voltage Rating <span className="text-red-500">*</span></Label>
                  <Select value={voltageRating} onValueChange={setVoltageRating} required>
                    <SelectTrigger id="voltageRating">
                      <SelectValue placeholder="เลือกระดับแรงดัน" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="11">11</SelectItem>
                      <SelectItem value="22">22</SelectItem>
                      <SelectItem value="33">33</SelectItem>
                      <SelectItem value="115">115</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="manufacturer">Manufacturer</Label>
                  <Select value={manufacturer} onValueChange={setManufacturer}>
                    <SelectTrigger id="manufacturer">
                      <SelectValue placeholder="- All -" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">- All -</SelectItem>
                      <SelectItem value="manufacturer1">Manufacturer 1</SelectItem>
                      <SelectItem value="manufacturer2">Manufacturer 2</SelectItem>
                      <SelectItem value="manufacturer3">Manufacturer 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="type">Type</Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="- All -" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">- All -</SelectItem>
                      <SelectItem value="type1">Type 1</SelectItem>
                      <SelectItem value="type2">Type 2</SelectItem>
                      <SelectItem value="type3">Type 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="abnormalityDetails">รายละเอียดความผิดปกติที่เคยเจอ</Label>
                  <Select value={abnormalityDetails} onValueChange={setAbnormalityDetails}>
                    <SelectTrigger id="abnormalityDetails">
                      <SelectValue placeholder="- All -" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">- All -</SelectItem>
                      <SelectItem value="abnormality1">ความผิดปกติ 1</SelectItem>
                      <SelectItem value="abnormality2">ความผิดปกติ 2</SelectItem>
                      <SelectItem value="abnormality3">ความผิดปกติ 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="timeInterval" className="text-base">Time Interval for Failure Observation (years) <span className="text-red-500">*</span></Label>
                  <Input 
                    id="timeInterval" 
                    type="number" 
                    step="0.01"
                    placeholder="ระบุช่วงเวลาการสังเกตความเสียหาย (ปี)"
                    value={timeInterval}
                    onChange={(e) => setTimeInterval(e.target.value)}
                    className="text-base"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="leadTime" className="text-base">Lead Time (years) <span className="text-red-500">*</span></Label>
                  <Input 
                    id="leadTime" 
                    type="number"
                    step="0.01"
                    placeholder="ระบุเวลานำ (ปี)"
                    value={leadTime}
                    onChange={(e) => setLeadTime(e.target.value)}
                    className="text-base"
                    required
                  />
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full">
                    <Calculator className="mr-2 h-4 w-4" />
                    คำนวณ
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          {showResults && (
            <Card className="shadow-md border-t-4 border-t-green-500 h-fit">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-b">
                <CardTitle className="flex items-center gap-2 text-xl font-semibold text-green-700">
                  <Zap className="h-5 w-5" />
                  ผลการคำนวณ
                </CardTitle>
                <CardDescription>
                  ผลการคำนวณพารามิเตอร์ Weibull และคำแนะนำ
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Scale className="h-4 w-4 text-transformer-primary" />
                      พารามิเตอร์ Weibull
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="bg-slate-50 p-3 rounded border flex justify-between items-center">
                        <span className="text-sm font-medium">Shape Parameter (β)</span>
                        <span className="text-lg font-bold text-transformer-primary">{mockResults.shape}</span>
                      </div>
                      
                      <div className="bg-slate-50 p-3 rounded border flex justify-between items-center">
                        <span className="text-sm font-medium">Scale Parameter (η)</span>
                        <span className="text-lg font-bold text-transformer-primary">{mockResults.scale}</span>
                      </div>
                      
                      <div className="bg-slate-50 p-3 rounded border flex justify-between items-center">
                        <span className="text-sm font-medium">Mean Lifetime (years)</span>
                        <span className="text-lg font-bold text-transformer-primary">{mockResults.meanLifetime}</span>
                      </div>
                      
                      <div className="bg-slate-50 p-3 rounded border flex justify-between items-center">
                        <span className="text-sm font-medium">Failure Probability</span>
                        <span className="text-lg font-bold text-transformer-primary">{(mockResults.failureProbability * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Calculator className="h-4 w-4 text-transformer-primary" />
                      คำแนะนำการสำรองอุปกรณ์
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="bg-amber-50 p-3 rounded border border-amber-200 flex justify-between items-center">
                        <span className="text-sm font-medium">Re-order Point</span>
                        <span className="text-lg font-bold text-amber-700">{mockResults.reorderPoint} ชิ้น</span>
                      </div>
                      
                      <div className="bg-green-50 p-3 rounded border border-green-200 flex justify-between items-center">
                        <span className="text-sm font-medium">จำนวนอุปกรณ์ที่ควรสำรอง</span>
                        <span className="text-lg font-bold text-green-700">{mockResults.recommendedStock} ชิ้น</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <h4 className="font-medium text-transformer-primary mb-2">ข้อสรุป</h4>
                      <p className="text-sm text-muted-foreground">
                        จากการวิเคราะห์ด้วย Weibull Distribution พบว่าอุปกรณ์มีอายุการใช้งานเฉลี่ย {mockResults.meanLifetime} ปี 
                        และมีโอกาสเสียหาย {(mockResults.failureProbability * 100).toFixed(1)}% ในช่วงระยะเวลาที่กำหนด 
                        ควรสำรองอุปกรณ์ไว้อย่างน้อย {mockResults.recommendedStock} ชิ้น 
                        และควรสั่งซื้อเพิ่มเมื่อจำนวนคงเหลือลดลงถึง {mockResults.reorderPoint} ชิ้น
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-slate-50 border-t p-4 flex justify-center">
                <Button variant="outline" onClick={() => setShowResults(false)}>
                  <ChevronDown className="mr-2 h-4 w-4" />
                  ซ่อนผลลัพธ์
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default WeibullCalculationPage;
