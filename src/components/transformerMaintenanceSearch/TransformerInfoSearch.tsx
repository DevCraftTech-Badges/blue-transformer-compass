
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search } from "lucide-react";

const TransformerInfoSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [searchBy, setSearchBy] = useState("equipment");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", { keyword, searchBy });
    // Here you would integrate with your search API
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
          <div className="md:col-span-2">
            <Label htmlFor="keyword" className="text-sm font-medium">
              คำสำคัญ
            </Label>
            <Input
              id="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="mt-1"
              placeholder="ระบุคำค้นหา..."
            />
          </div>
          
          <div className="md:col-span-2 space-y-2">
            <Label className="text-sm font-medium">
              ค้นหาโดย
            </Label>
            <RadioGroup value={searchBy} onValueChange={setSearchBy} className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="equipment" id="equipment" />
                <Label htmlFor="equipment" className="cursor-pointer">Equipment No.</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="name" id="name" />
                <Label htmlFor="name" className="cursor-pointer">ชื่อหม้อแปลง</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="station" id="station" />
                <Label htmlFor="station" className="cursor-pointer">สถานีไฟฟ้า</Label>
              </div>
            </RadioGroup>
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

export default TransformerInfoSearch;
