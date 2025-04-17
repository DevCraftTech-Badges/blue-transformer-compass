
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const VisualInspectionForm = () => {
  const [formData, setFormData] = useState({
    transformer: "",
    testType: "Weekly Test",
    testDate: "",
    inspector: "",
    workOrderNo: "",
  });

  // Mock data for transformer dropdown
  const transformers = [
    { value: "tr1", label: "TR-001 สถานีบางกะปิ" },
    { value: "tr2", label: "TR-002 สถานีพระโขนง" },
    { value: "tr3", label: "TR-003 สถานีลาดกระบัง" },
    { value: "tr4", label: "TR-004 สถานีบางพลี" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Visual inspection form data:", formData);
    // Here you would process the form data, perhaps sending it to an API
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="transformer-select" className="text-sm font-medium">
              ชื่อหม้อแปลงไฟฟ้า
            </Label>
            <Select 
              value={formData.transformer} 
              onValueChange={(value) => handleSelectChange("transformer", value)}
            >
              <SelectTrigger id="transformer-select" className="mt-1">
                <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
              </SelectTrigger>
              <SelectContent>
                {transformers.map((tr) => (
                  <SelectItem key={tr.value} value={tr.value}>
                    {tr.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="test-type" className="text-sm font-medium">
              รูปแบบการทดสอบ
            </Label>
            <Input
              id="test-type"
              name="testType"
              value={formData.testType}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="test-date" className="text-sm font-medium">
              วันที่ตรวจสอบ
            </Label>
            <Input
              id="test-date"
              name="testDate"
              type="date"
              value={formData.testDate}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="inspector" className="text-sm font-medium">
              ผู้ตรวจสอบ
            </Label>
            <Input
              id="inspector"
              name="inspector"
              value={formData.inspector}
              onChange={handleChange}
              className="mt-1"
              placeholder="ระบุชื่อผู้ตรวจสอบ"
            />
          </div>
          
          <div>
            <Label htmlFor="work-order" className="text-sm font-medium">
              เลขที่คำสั่งปฏิบัติงาน
            </Label>
            <Input
              id="work-order"
              name="workOrderNo"
              value={formData.workOrderNo}
              onChange={handleChange}
              className="mt-1"
              placeholder="ระบุเลขที่คำสั่ง"
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Check className="mr-2 h-4 w-4" />
            ยืนยัน
          </Button>
        </div>
      </div>
    </form>
  );
};

export default VisualInspectionForm;
