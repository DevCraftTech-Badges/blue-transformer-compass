
import React, { useState } from 'react';
import { 
  Settings, Disc, Zap, Box, Filter, Fan, 
  Server, CircuitBoard, Sliders, ThermometerSun,
  ArrowLeft
} from 'lucide-react';
import VisualInspectionSection from './VisualInspectionSection';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Field {
  name: string;
  type: 'text' | 'select' | 'date';
}

interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
  fields: Field[];
}

const inspectionCategories: Category[] = [
  {
    id: 'general-condition',
    title: 'General Condition',
    icon: <Settings className="h-8 w-8 text-transformer-primary" />,
    fields: [
      { name: 'หม้อแปลงไฟฟ้า', type: 'select' },
      { name: 'รูปแบบการทดสอบ', type: 'select' },
      { name: 'วันที่ตรวจสอบ', type: 'date' },
      { name: 'ผู้ตรวจสอบ', type: 'text' },
      { name: 'เลขที่คำสั่งปฏิบัติงาน', type: 'text' },
      { name: 'Max. Load ของหม้อแปลง', type: 'select' },
      { name: 'เสียงของหม้อแปลง', type: 'select' },
      { name: 'การสั่นสะเทือน', type: 'select' },
      { name: 'Grounding Connector', type: 'select' },
      { name: 'Foundation', type: 'select' },
      { name: 'Animal Protection', type: 'select' },
    ]
  },
  {
    id: 'bushing',
    title: 'Bushing',
    icon: <Disc className="h-8 w-8 text-blue-600" />,
    fields: [
      { name: 'หม้อแปลงไฟฟ้า', type: 'select' },
      { name: 'รูปแบบการทดสอบ', type: 'select' },
      { name: 'วันที่ตรวจสอบ', type: 'date' },
      { name: 'ผู้ตรวจสอบ', type: 'text' },
      { name: 'เลขที่คำสั่งปฏิบัติงาน', type: 'text' }
    ]
  },
  {
    id: 'lightning-arrester',
    title: 'Lightning Arrester',
    icon: <Zap className="h-8 w-8 text-blue-600" />,
    fields: [
      { name: 'หม้อแปลงไฟฟ้า', type: 'select' },
      { name: 'รูปแบบการทดสอบ', type: 'select' },
      { name: 'วันที่ตรวจสอบ', type: 'date' },
      { name: 'ผู้ตรวจสอบ', type: 'text' },
      { name: 'เลขที่คำสั่งปฏิบัติงาน', type: 'text' }
    ]
  },
  {
    id: 'conservator-tank',
    title: 'Conservator Tank',
    icon: <Box className="h-8 w-8 text-blue-600" />,
    fields: [
      { name: 'หม้อแปลงไฟฟ้า', type: 'select' },
      { name: 'รูปแบบการทดสอบ', type: 'select' },
      { name: 'วันที่ตรวจสอบ', type: 'date' },
      { name: 'ผู้ตรวจสอบ', type: 'text' },
      { name: 'เลขที่คำสั่งปฏิบัติงาน', type: 'text' }
    ]
  },
  {
    id: 'main-tank',
    title: 'Main Tank',
    icon: <Box className="h-8 w-8 text-blue-600" />,
    fields: [
      { name: 'หม้อแปลงไฟฟ้า', type: 'select' },
      { name: 'รูปแบบการทดสอบ', type: 'select' },
      { name: 'วันที่ตรวจสอบ', type: 'date' },
      { name: 'ผู้ตรวจสอบ', type: 'text' },
      { name: 'เลขที่คำสั่งปฏิบัติงาน', type: 'text' }
    ]
  },
  {
    id: 'hot-line-oil-filter',
    title: 'Hot Line Oil Filter',
    icon: <Filter className="h-8 w-8 text-blue-600" />,
    fields: [
      { name: 'หม้อแปลงไฟฟ้า', type: 'select' },
      { name: 'รูปแบบการทดสอบ', type: 'select' },
      { name: 'วันที่ตรวจสอบ', type: 'date' },
      { name: 'ผู้ตรวจสอบ', type: 'text' },
      { name: 'เลขที่คำสั่งปฏิบัติงาน', type: 'text' }
    ]
  },
  {
    id: 'radiator-cooling-system',
    title: 'Radiator and Cooling System',
    icon: <Fan className="h-8 w-8 text-blue-600" />,
    fields: [
      { name: 'หม้อแปลงไฟฟ้า', type: 'select' },
      { name: 'รูปแบบการทดสอบ', type: 'select' },
      { name: 'วันที่ตรวจสอบ', type: 'date' },
      { name: 'ผู้ตรวจสอบ', type: 'text' },
      { name: 'เลขที่คำสั่งปฏิบัติงาน', type: 'text' }
    ]
  },
  {
    id: 'transformer-control-cabinet',
    title: 'Transformer Control Cabinet',
    icon: <Server className="h-8 w-8 text-blue-600" />,
    fields: [
      { name: 'หม้อแปลงไฟฟ้า', type: 'select' },
      { name: 'รูปแบบการทดสอบ', type: 'select' },
      { name: 'วันที่ตรวจสอบ', type: 'date' },
      { name: 'ผู้ตรวจสอบ', type: 'text' },
      { name: 'เลขที่คำสั่งปฏิบัติงาน', type: 'text' }
    ]
  },
  {
    id: 'ngr',
    title: 'NGR',
    icon: <CircuitBoard className="h-8 w-8 text-blue-600" />,
    fields: [
      { name: 'หม้อแปลงไฟฟ้า', type: 'select' },
      { name: 'รูปแบบการทดสอบ', type: 'select' },
      { name: 'วันที่ตรวจสอบ', type: 'date' },
      { name: 'ผู้ตรวจสอบ', type: 'text' },
      { name: 'เลขที่คำสั่งปฏิบัติงาน', type: 'text' }
    ]
  },
  {
    id: 'regulating-pt',
    title: 'Regulating PT',
    icon: <Sliders className="h-8 w-8 text-blue-600" />,
    fields: [
      { name: 'หม้อแปลงไฟฟ้า', type: 'select' },
      { name: 'รูปแบบการทดสอบ', type: 'select' },
      { name: 'วันที่ตรวจสอบ', type: 'date' },
      { name: 'ผู้ตรวจสอบ', type: 'text' },
      { name: 'เลขที่คำสั่งปฏิบัติงาน', type: 'text' }
    ]
  },
  {
    id: 'oltc-compartment',
    title: 'OLTC Compartment',
    icon: <Box className="h-8 w-8 text-blue-600" />,
    fields: [
      { name: 'หม้อแปลงไฟฟ้า', type: 'select' },
      { name: 'รูปแบบการทดสอบ', type: 'select' },
      { name: 'วันที่ตรวจสอบ', type: 'date' },
      { name: 'ผู้ตรวจสอบ', type: 'text' },
      { name: 'เลขที่คำสั่งปฏิบัติงาน', type: 'text' }
    ]
  },
  {
    id: 'oltc-control-cabinet',
    title: 'OLTC Control Cabinet',
    icon: <Server className="h-8 w-8 text-blue-600" />,
    fields: [
      { name: 'หม้อแปลงไฟฟ้า', type: 'select' },
      { name: 'รูปแบบการทดสอบ', type: 'select' },
      { name: 'วันที่ตรวจสอบ', type: 'date' },
      { name: 'ผู้ตรวจสอบ', type: 'text' },
      { name: 'เลขที่คำสั่งปฏิบัติงาน', type: 'text' }
    ]
  },
  {
    id: 'thermo-scan',
    title: 'Thermo Scan',
    icon: <ThermometerSun className="h-8 w-8 text-blue-600" />,
    fields: [
      { name: 'หม้อแปลงไฟฟ้า', type: 'select' },
      { name: 'รูปแบบการทดสอบ', type: 'select' },
      { name: 'วันที่ตรวจสอบ', type: 'date' },
      { name: 'ผู้ตรวจสอบ', type: 'text' },
      { name: 'เลขที่คำสั่งปฏิบัติงาน', type: 'text' }
    ]
  }
];

const VisualInspectionPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="space-y-6 p-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-transformer-dark">
          ข้อมูลบำรุงรักษาหม้อแปลง - ผลการทดสอบ Visual Inspection
        </h1>
        <p className="text-muted-foreground">ข้อมูลผลการตรวจสอบด้วยสายตาของหม้อแปลง</p>
      </div>

      {activeCategory ? (
        <div className="space-y-6">
          <div className="mb-4">
            <Button 
              variant="outline" 
              onClick={() => setActiveCategory(null)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> 
              ย้อนกลับ
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            {activeCategory && (
              <VisualInspectionSection 
                category={inspectionCategories.find(c => c.id === activeCategory)!} 
              />
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {inspectionCategories.map((category) => (
            <Card 
              key={category.id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white group cursor-pointer"
              onClick={() => setActiveCategory(category.id)}
            >
              <CardContent className="p-0 flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-transformer-primary/10 flex items-center justify-center group-hover:bg-transformer-primary/20 transition-colors">
                  {category.icon}
                </div>
                <div className="font-medium">{category.title}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default VisualInspectionPage;
