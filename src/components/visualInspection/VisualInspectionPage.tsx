
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import VisualInspectionSection from './VisualInspectionSection';

const inspectionCategories = [
  {
    id: 'general-condition',
    title: 'General Condition',
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
  const [activeCategory, setActiveCategory] = useState<string | null>('general-condition');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          ข้อมูลบำรุงรักษาหม้อแปลง - ผลการทดสอบ Visual Inspection
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-medium mb-4">ประเภทการตรวจสอบ</h2>
          <Accordion 
            type="single" 
            collapsible 
            defaultValue="general-condition"
            onValueChange={(value) => setActiveCategory(value)}
          >
            {inspectionCategories.map((category) => (
              <AccordionItem key={category.id} value={category.id}>
                <AccordionTrigger className="py-2">
                  {category.title}
                </AccordionTrigger>
                <AccordionContent></AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {activeCategory && (
            <VisualInspectionSection 
              category={inspectionCategories.find(c => c.id === activeCategory)!} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VisualInspectionPage;
