import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import VisualInspectionSection from '@/components/visualInspection/VisualInspectionSection';
import { Category } from '@/components/visualInspection/types';

const transformerControlCabinetCategory: Category = {
  id: 'transformer-control-cabinet',
  title: 'Transformer Control Cabinet',
  fields: [
    { name: 'หม้อแปลงไฟฟ้า', type: 'select' },
    { name: 'รูปแบบการทดสอบ', type: 'select' },
    { name: 'วันที่ตรวจสอบ', type: 'date' },
    { name: 'ผู้ตรวจสอบ', type: 'text' },
    { name: 'เลขที่คำสั่งปฏิบัติงาน', type: 'text' }
  ]
};

const TransformerControlCabinetPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-1.5 bg-slate-600 rounded-full"></div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Visual Inspection - Transformer Control Cabinet
            </h1>
            <p className="text-muted-foreground">การตรวจสอบตู้ควบคุมหม้อแปลง</p>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => navigate('/visual-inspection')}
          className="flex items-center gap-2 hover:bg-slate-50 border-slate-200"
        >
          <ArrowLeft className="h-4 w-4" /> 
          ย้อนกลับ
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-100">
        <VisualInspectionSection 
          title="Transformer Control Cabinet"
          category={transformerControlCabinetCategory}
        />
      </div>
    </div>
  );
};

export default TransformerControlCabinetPage;