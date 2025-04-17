
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThermometerSun } from "lucide-react";

const NotFoundThermoScan: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
            <ThermometerSun className="h-10 w-10 text-blue-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2">ไม่พบข้อมูล</h1>
        <p className="text-gray-600 mb-6">
          ขออภัย ระบบยังไม่มีข้อมูล Thermo Scan ในขณะนี้
        </p>
        <Button
          onClick={() => navigate("/visual-inspection")}
          className="bg-transformer-primary hover:bg-transformer-primary/90"
        >
          กลับไปหน้าตรวจสอบหม้อแปลง
        </Button>
      </div>
    </div>
  );
};

export default NotFoundThermoScan;
