
import React from 'react';
import Layout from '@/components/layout/Layout';
import TransformerImportanceForm from '@/components/transformerImportance/TransformerImportanceForm';

const AddTransformerImportancePage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">เพิ่มรายการความสำคัญของหม้อแปลง</h1>
        <TransformerImportanceForm />
      </div>
    </Layout>
  );
};

export default AddTransformerImportancePage;
