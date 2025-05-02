
import React from 'react';
import Layout from '@/components/layout/Layout';
import OilTransformerContent from '@/components/oilTransformer/OilTransformerContent';

const OilTransformerPage = () => {
  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-transformer-primary">
          น้ำมันหม้อแปลง
        </h1>
        <OilTransformerContent />
      </div>
    </Layout>
  );
};

export default OilTransformerPage;
