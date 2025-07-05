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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header Section with Gradient Background */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <div className="h-6 w-6 bg-white rounded-md opacity-90"></div>
                </div>
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-cyan-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-1">
                  Visual Inspection - Radiator and Cooling System
                </h1>
                <p className="text-blue-100 text-lg">การตรวจสอบระบบหม้อน้ำและระบายความร้อน</p>
                <div className="flex items-center mt-2 text-sm text-blue-200">
                  <div className="h-1 w-1 bg-blue-300 rounded-full mr-2"></div>
                  ระบบตรวจสอบสภาพหม้อแปลงไฟฟ้า
                </div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => navigate('/visual-inspection')}
              className="flex items-center gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="h-4 w-4" /> 
              ย้อนกลับ
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">รายการทั้งหมด</p>
                  <p className="text-2xl font-bold text-blue-600">0</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <div className="h-6 w-6 bg-blue-500 rounded-md"></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">ตรวจสอบแล้ว</p>
                  <p className="text-2xl font-bold text-green-600">0</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <div className="h-6 w-6 bg-green-500 rounded-md"></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-amber-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">รอดำเนินการ</p>
                  <p className="text-2xl font-bold text-amber-600">0</p>
                </div>
                <div className="h-12 w-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <div className="h-6 w-6 bg-amber-500 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Data Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <div className="h-4 w-4 bg-white rounded-sm"></div>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">รายการตรวจสอบระบบหม้อน้ำและระบายความร้อน</h2>
              </div>
            </div>
            
            <div className="p-8">
              <VisualInspectionSection 
                title="Radiator and Cooling System"
                category={radiatorCoolingSystemCategory}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadiatorCoolingSystemPage;