
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const WeibullCalculationPage: React.FC = () => {
  const [equipment, setEquipment] = useState<string>("");
  const [voltageRating, setVoltageRating] = useState<string>("");
  const [manufacturer, setManufacturer] = useState<string>("all");
  const [type, setType] = useState<string>("all");
  const [abnormalityDetails, setAbnormalityDetails] = useState<string>("all");
  const [timeInterval, setTimeInterval] = useState<string>("");
  const [leadTime, setLeadTime] = useState<string>("");

  const handleCalculate = () => {
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
  };

  return (
    <Layout>
      <div className="p-6 animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-transformer-dark">Inventory Control / Weibull Calculation</h1>
          <p className="text-muted-foreground">คำนวณค่าพารามิเตอร์ Weibull สำหรับอุปกรณ์</p>
        </div>
        
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>รายละเอียดการคำนวณ</CardTitle>
            <CardDescription>กรุณาระบุข้อมูลสำหรับการคำนวณพารามิเตอร์ Weibull</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="equipment">อุปกรณ์</Label>
              <Select value={equipment} onValueChange={setEquipment}>
                <SelectTrigger id="equipment">
                  <SelectValue placeholder="เลือกอุปกรณ์" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bushing">Bushing</SelectItem>
                  <SelectItem value="arrester">Arrester</SelectItem>
                  <SelectItem value="olct">OLCT</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="voltageRating">Voltage Rating</Label>
              <Select value={voltageRating} onValueChange={setVoltageRating}>
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

            <div className="space-y-2">
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

            <div className="space-y-2">
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

            <div className="space-y-2">
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

            <div className="space-y-2">
              <Label htmlFor="timeInterval">Time Interval for Failure Observation(years)</Label>
              <Input 
                id="timeInterval" 
                type="number" 
                step="0.01"
                placeholder="ระบุช่วงเวลาการสังเกตความเสียหาย (ปี)"
                value={timeInterval}
                onChange={(e) => setTimeInterval(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="leadTime">Lead Time(years)</Label>
              <Input 
                id="leadTime" 
                type="number"
                step="0.01"
                placeholder="ระบุเวลานำ (ปี)"
                value={leadTime}
                onChange={(e) => setLeadTime(e.target.value)}
              />
            </div>

            <div className="pt-4">
              <Button onClick={handleCalculate} className="w-full">คำนวณ</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default WeibullCalculationPage;
