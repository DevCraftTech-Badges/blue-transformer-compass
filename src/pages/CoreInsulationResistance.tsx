
import React from 'react';
import Layout from '@/components/layout/Layout';
import CoreInsulationResistanceTable from '@/components/coreInsulationResistance/CoreInsulationResistanceTable';

const CoreInsulationResistancePage: React.FC = () => {
  return (
    <Layout>
      <div className="p-6 space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-transformer-dark">Core Insulation Resistance</h1>
          <p className="text-muted-foreground">ข้อมูลผลทดสอบค่าฉนวนแกนเหล็ก</p>
        </div>
        <CoreInsulationResistanceTable />
      </div>
    </Layout>
  );
};

export default CoreInsulationResistancePage;
