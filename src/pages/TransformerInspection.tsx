
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';

const TransformerInspection = () => (
  <Layout>
    <div className="px-6 py-6 min-h-[calc(100vh-64px)] bg-[#f8f9fb]">
    <h1 className="text-xl md:text-3xl font-extrabold mb-5 tracking-tight text-gray-800">ตรวจสอบสภาพหม้อแปลงไฟฟ้า</h1>
      <div className="max-w-full">
        <Input
          readOnly
          value="หน้าสำหรับตรวจสอบสภาพหม้อแปลงไฟฟ้า"
      className="w-full h-16 bg-white shadow-sm border rounded-md text-base md:text-lg font-medium text-gray-600 cursor-default px-5"
        />
      </div>
    </div>
  </Layout>
);

export default TransformerInspection;
