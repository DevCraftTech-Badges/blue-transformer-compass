
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TransformerTestSearch = () => {
  const [testType, setTestType] = useState("");
  const [transformer, setTransformer] = useState("");

  // Mock data for dropdowns
  const testTypes = [
    { value: "oil", label: "Oil Test" },
    { value: "electrical", label: "Electrical Test" },
    { value: "visual", label: "Visual Inspection" },
    { value: "insulation", label: "Insulation Test" },
  ];

  const transformers = [
    { value: "tr1", label: "TR-001 สถานีบางกะปิ" },
    { value: "tr2", label: "TR-002 สถานีพระโขนง" },
    { value: "tr3", label: "TR-003 สถานีลาดกระบัง" },
    { value: "tr4", label: "TR-004 สถานีบางพลี" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for test records:", { testType, transformer });
    // Here you would integrate with your search API
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="test-type" className="text-sm font-medium">
              ชนิดการทดสอบ
            </Label>
            <Select value={testType} onValueChange={setTestType}>
              <SelectTrigger id="test-type" className="mt-1">
                <SelectValue placeholder="เลือกชนิดการทดสอบ" />
              </SelectTrigger>
              <SelectContent>
                {testTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="transformer" className="text-sm font-medium">
              ชื่อหม้อแปลงไฟฟ้า
            </Label>
            <Select value={transformer} onValueChange={setTransformer}>
              <SelectTrigger id="transformer" className="mt-1">
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
        </div>
        
        <div className="flex justify-end">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Search className="mr-2 h-4 w-4" />
            ค้นหา
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TransformerTestSearch;
