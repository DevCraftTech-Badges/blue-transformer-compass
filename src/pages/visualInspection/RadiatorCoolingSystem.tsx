import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import VisualInspectionSection from '@/components/visualInspection/VisualInspectionSection';
import { Category } from '@/components/visualInspection/types';

const radiatorCoolingSystemCategory: Category = {
  id: 'radiator-cooling-system',
  title: 'Radiator and Cooling System',
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
};

const RadiatorCoolingSystemPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        {/* Left Side - Title Section */}
        <div className="flex items-center space-x-2">
          <div className="h-10 w-1.5 bg-blue-600 rounded-full"></div>
          <div>
            <h1 className="text-2xl font-bold text-blue-800">
              Visual Inspection - Radiator and Cooling System
            </h1>
            <p className="text-muted-foreground">การตรวจสอบระบบหม้อน้ำและระบายความร้อน</p>
          </div>
        </div>
        
        {/* Right Side - Back Button */}
        <Button 
          variant="outline" 
          onClick={() => navigate('/visual-inspection')}
          className="flex items-center gap-2 hover:bg-blue-50 border-blue-200"
        >
          <ArrowLeft className="h-4 w-4" /> 
          ย้อนกลับ
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-blue-100">
        <VisualInspectionSection 
          title="Radiator and Cooling System"
          category={radiatorCoolingSystemCategory}
        />
      </div>
    </div>
  );
};

export default RadiatorCoolingSystemPage;