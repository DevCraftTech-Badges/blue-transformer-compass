
import React from 'react';
import { Activity, Transformer, AlertCircle, Zap, Wrench, BarChart2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Custom Transformer icon since it doesn't exist in lucide
const Transformer = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="4" width="12" height="16" rx="2" />
    <line x1="12" y1="4" x2="12" y2="20" />
    <line x1="6" y1="12" x2="4" y2="12" />
    <line x1="18" y1="12" x2="20" y2="12" />
    <line x1="4" y1="9" x2="2" y2="9" />
    <line x1="4" y1="15" x2="2" y2="15" />
    <line x1="20" y1="9" x2="22" y2="9" />
    <line x1="20" y1="15" x2="22" y2="15" />
  </svg>
);

const HomePage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-transformer-dark mb-2">ระบบประเมินหม้อแปลงไฟฟ้า</h1>
        <p className="text-muted-foreground">Power Transformer Assessment System</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-transformer-primary shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Transformer className="mr-2 text-transformer-primary" />
              หม้อแปลงทั้งหมด
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3,241</div>
            <p className="text-muted-foreground text-sm">จำนวนหม้อแปลงในระบบ</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-transformer-secondary shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Activity className="mr-2 text-transformer-secondary" />
              กำลังดำเนินการ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">128</div>
            <p className="text-muted-foreground text-sm">หม้อแปลงที่กำลังบำรุงรักษา</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-red-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <AlertCircle className="mr-2 text-red-500" />
              แจ้งเตือน
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">18</div>
            <p className="text-muted-foreground text-sm">หม้อแปลงที่ต้องตรวจสอบโดยด่วน</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="mr-2 text-transformer-secondary" />
              สถานะหม้อแปลง
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/50 rounded-md">
              <p className="text-muted-foreground">แผนภูมิสถานะการใช้งานหม้อแปลง</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart2 className="mr-2 text-transformer-primary" />
              ประสิทธิภาพการทำงาน
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/50 rounded-md">
              <p className="text-muted-foreground">แผนภูมิประสิทธิภาพการทำงานของหม้อแปลง</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wrench className="mr-2 text-transformer-primary" />
            การบำรุงรักษาล่าสุด
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-5 bg-muted/50 p-3 text-sm font-medium">
              <div>รหัสหม้อแปลง</div>
              <div>ประเภท</div>
              <div>วันที่</div>
              <div>สถานะ</div>
              <div>ผู้ดำเนินการ</div>
            </div>
            <div className="divide-y">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="grid grid-cols-5 p-3 text-sm">
                  <div>TF-{2023000 + i}</div>
                  <div>การตรวจสอบน้ำมัน</div>
                  <div>{`2023-${(i+1).toString().padStart(2, '0')}-${(i+10).toString().padStart(2, '0')}`}</div>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      i % 3 === 0 ? 'bg-green-100 text-green-800' : 
                      i % 3 === 1 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {i % 3 === 0 ? 'เสร็จสิ้น' : i % 3 === 1 ? 'รอดำเนินการ' : 'กำลังดำเนินการ'}
                    </span>
                  </div>
                  <div>ผู้ปฏิบัติงาน {i+1}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
