
import React from 'react';
import Layout from '@/components/layout/Layout';
import CoreInsulationResistanceTable from '@/components/coreInsulationResistance/CoreInsulationResistanceTable';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const CoreInsulationResistancePage: React.FC = () => {
  return (
    <Layout>
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Link to="/electrical-test-results" className="hover:text-transformer-primary transition-colors">ผลทดสอบทางไฟฟ้า</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span>Core Insulation Resistance</span>
        </div>
        
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
