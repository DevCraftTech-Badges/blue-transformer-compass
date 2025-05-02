
import React from 'react';
import Layout from "@/components/layout/Layout";

const TransformerInspection = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">
          ตรวจสอบสภาพหม้อแปลงไฟฟ้า
        </h1>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-600">
            หน้าสำหรับตรวจสอบสภาพหม้อแปลงไฟฟ้า
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default TransformerInspection;
