
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import VisualInspectionSection from '@/components/visualInspection/VisualInspectionSection';
import { Category } from '@/components/visualInspection/types';

const thermoScanCategory: Category = {
  id: 'thermo-scan',
  title: 'Thermo Scan',
  fields: [
    { name: 'หม้อแปลงไฟฟ้า', type: 'select' },
    { name: 'รูปแบบการทดสอบ', type: 'select' },
    { name: 'วันที่ตรวจสอบ', type: 'date' },
    { name: 'ผู้ตรวจสอบ', type: 'text' },
    { name: 'เลขที่คำสั่งปฏิบัติงาน', type: 'text' }
  ]
};

const NotFoundThermoScan: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 p-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        {/* Left Side - Title Section */}
        <div className="flex items-center space-x-2">
          <div className="h-10 w-1.5 bg-blue-600 rounded-full"></div>
          <div>
            <h1 className="text-2xl font-bold text-blue-800">
              Visual Inspection - Thermo Scan
            </h1>
            <p className="text-muted-foreground">การตรวจสอบผลทดสอบการแสกนความร้อน</p>
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
   
      {/* Main Content Container */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-blue-100">
        {/* Form Section with 6-Row Layout */}
        <VisualInspectionSection 
          title="Thermo Scan"
          category={thermoScanCategory}
        />
      </div>
    </div>
  );
};

export default NotFoundThermoScan;
