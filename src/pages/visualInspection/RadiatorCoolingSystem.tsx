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
    { name: 'หม้อแปลงไฟฟ้า', type: 'select' },
    { name: 'รูปแบบการทดสอบ', type: 'select' },
    { name: 'วันที่ตรวจสอบ', type: 'date' },
    { name: 'ผู้ตรวจสอบ', type: 'text' },
    { name: 'เลขที่คำสั่งปฏิบัติงาน', type: 'text' }
  ]
};

const RadiatorCoolingSystemPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-1.5 bg-cyan-600 rounded-full"></div>
          <div>
            <h1 className="text-2xl font-bold text-cyan-800">
              Visual Inspection - Radiator and Cooling System
            </h1>
            <p className="text-muted-foreground">การตรวจสอบระบบหม้อน้ำและระบบระบายความร้อน</p>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => navigate('/visual-inspection')}
          className="flex items-center gap-2 hover:bg-cyan-50 border-cyan-200"
        >
          <ArrowLeft className="h-4 w-4" /> 
          ย้อนกลับ
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-cyan-100">
        <VisualInspectionSection 
          title="Radiator and Cooling System"
          category={radiatorCoolingSystemCategory}
        />
      </div>
    </div>
  );
};

export default RadiatorCoolingSystemPage;