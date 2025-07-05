
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, Disc, Zap, Box, Filter, Fan, 
  Server, CircuitBoard, Sliders, ThermometerSun,
  ArrowLeft, Search
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Category } from './types';
import VisualInspectionSection from './VisualInspectionSection';
import { motion } from 'framer-motion';

const inspectionCategories: Category[] = [
  {
    id: 'general-condition',
    title: 'General Condition',
    icon: <Settings className="h-8 w-8 text-blue-600" />,
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
    icon: <Disc className="h-8 w-8 text-purple-600" />,
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
    icon: <Zap className="h-8 w-8 text-yellow-600" />,
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
    icon: <Box className="h-8 w-8 text-green-600" />,
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
    icon: <Box className="h-8 w-8 text-indigo-600" />,
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
      // ฟิลด์พื้นฐาน
      { name: 'หม้อแปลงไฟฟ้า', type: 'select' },
      { name: 'รูปแบบการทดสอบ', type: 'select' },
      { name: 'วันที่ตรวจสอบ', type: 'date' },
      { name: 'ผู้ตรวจสอบ', type: 'text' },
      { name: 'เลขที่คำสั่งปฏิบัติงาน', type: 'text' },
      // ฟิลด์การตรวจสอบเฉพาะ
      { name: 'Max. Load ของหม้อแปลง', type: 'select' },
      { name: 'เสียงของหม้อแปลง', type: 'select' },
      { name: 'การสั่นสะเทือน', type: 'select' },
      { name: 'Grounding Connector', type: 'select' },
      { name: 'Foundation', type: 'select' },
      { name: 'Animal Protection', type: 'select' }
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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const VisualInspectionPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    // Navigate to specific sub-route
    navigate(`/visual-inspection/${categoryId}`);
  };

  const filteredCategories = inspectionCategories.filter(category => 
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6 animate-fade-in">
      <div className="flex items-center space-x-2 mb-6">
        <div className="h-10 w-1.5 bg-blue-600 rounded-full"></div>
        <div>
          <h1 className="text-2xl font-bold text-blue-800">
            ข้อมูลบำรุงรักษาหม้อแปลง - Visual Inspection
          </h1>
          <p className="text-muted-foreground">ข้อมูลผลการตรวจสอบด้วยสายตาของหม้อแปลง</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="ค้นหาหมวดหมู่การตรวจสอบ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-blue-200 focus:border-blue-400 pr-4 py-2"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500" />
        </div>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {filteredCategories.map((category) => (
          <motion.div key={category.id} variants={item}>
            <Card 
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white group cursor-pointer hover:border-blue-300"
              onClick={() => handleCategoryClick(category.id)}
            >
              <CardContent className="p-0 flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  {category.icon}
                </div>
                <div className="font-medium group-hover:text-blue-700 transition-colors">{category.title}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
        <h2 className="text-lg font-medium text-blue-800 mb-4">เกี่ยวกับ Visual Inspection</h2>
        <p className="text-gray-600">
          การตรวจสอบด้วยสายตา (Visual Inspection) เป็นส่วนสำคัญในการบำรุงรักษาหม้อแปลง 
          ช่วยให้ทราบถึงสภาพทั่วไปและความผิดปกติที่อาจเกิดขึ้น ทำให้สามารถวางแผนการซ่อมบำรุงได้อย่างมีประสิทธิภาพ
          และป้องกันความเสียหายที่อาจเกิดขึ้นในอนาคต
        </p>
      </div>
    </div>
  );
};

export default VisualInspectionPage;
