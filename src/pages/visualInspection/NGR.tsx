import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import VisualInspectionSection from '@/components/visualInspection/VisualInspectionSection';
import { Category } from '@/components/visualInspection/types';

const ngrCategory: Category = {
  id: 'ngr',
  title: 'NGR',
  fields: [
    { name: 'หม้อแปลงไฟฟ้า', type: 'select' },
    { name: 'รูปแบบการทดสอบ', type: 'select' },
    { name: 'วันที่ตรวจสอบ', type: 'date' },
    { name: 'ผู้ตรวจสอบ', type: 'text' },
    { name: 'เลขที่คำสั่งปฏิบัติงาน', type: 'text' }
  ]
};

const NGRPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-1.5 bg-orange-600 rounded-full"></div>
          <div>
            <h1 className="text-2xl font-bold text-orange-800">
              Visual Inspection - NGR
            </h1>
            <p className="text-muted-foreground">การตรวจสอบ NGR (Neutral Grounding Resistor)</p>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => navigate('/visual-inspection')}
          className="flex items-center gap-2 hover:bg-orange-50 border-orange-200"
        >
          <ArrowLeft className="h-4 w-4" /> 
          ย้อนกลับ
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-orange-100">
        <VisualInspectionSection 
          title="NGR"
          category={ngrCategory}
        />
      </div>
    </div>
  );
};

export default NGRPage;