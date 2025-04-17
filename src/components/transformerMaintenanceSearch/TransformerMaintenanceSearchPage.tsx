
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TransformerInfoSearch from "./TransformerInfoSearch";
import TransformerTestSearch from "./TransformerTestSearch";
import VisualInspectionForm from "./VisualInspectionForm";

const TransformerMaintenanceSearchPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">ข้อมูลบำรุงรักษาหม้อแปลง - ค้นหาข้อมูลบำรุงรักษาหม้อแปลง</h1>
      
      <Card>
        <CardHeader className="bg-slate-50 rounded-t-lg border-b">
          <CardTitle className="text-lg">ค้นหาข้อมูลหม้อแปลงไฟฟ้า</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <TransformerInfoSearch />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-slate-50 rounded-t-lg border-b">
          <CardTitle className="text-lg">ค้นหาข้อมูลการทดสอบหม้อแปลงไฟฟ้า</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <TransformerTestSearch />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-slate-50 rounded-t-lg border-b">
          <CardTitle className="text-lg">เลือกหม้อแปลงไฟฟ้าเพื่อกรอกข้อมูลการทดสอบ Visual Inspection</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <VisualInspectionForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default TransformerMaintenanceSearchPage;
