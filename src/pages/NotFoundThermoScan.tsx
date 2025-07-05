
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFoundThermoScan: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 p-6 animate-fade-in">
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
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> 
          ย้อนกลับ
        </Button>
      </div>
    </div>
  );
};

export default NotFoundThermoScan;
