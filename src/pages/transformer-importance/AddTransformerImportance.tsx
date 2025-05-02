
import React from 'react';
import Layout from '@/components/layout/Layout';
import TransformerImportanceForm from '@/components/transformerImportance/TransformerImportanceForm';

const AddTransformerImportancePage = () => {
  return (
    <Layout>
      <div className="space-y-6 p-6 max-w-5xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-1.5 bg-blue-800 rounded-full"></div>
          <h1 className="text-2xl font-semibold text-blue-800">
            เพิ่มรายการความสำคัญของหม้อแปลง
          </h1>
        </div>
        <p className="text-gray-600">
          กรอกข้อมูลด้านล่างเพื่อเพิ่มข้อมูลความสำคัญของหม้อแปลง การประเมินความสำคัญช่วยในการจัดลำดับความสำคัญของการซ่อมบำรุง
        </p>
        <TransformerImportanceForm />
      </div>
    </Layout>
  );
};

export default AddTransformerImportancePage;
