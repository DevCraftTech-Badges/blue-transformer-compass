
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileType } from 'lucide-react';
import { Link } from 'react-router-dom';

const ElectricalTestResultsPage: React.FC = () => {
  const testTypes = [
    { name: 'Core Insulation Resistance', link: '/electrical-test-results/core-insulation-resistance' },
    { name: 'Exciting Current Measurement', link: '/exciting-current-measurement' },
    { name: 'DC Resistance Measurement', link: '/dc-resistance-measurement' },
    { name: 'Single Phase Impedance Measurement', link: '/single-phase-impedance-measurement' },
    { name: 'Three Phase Impedance Measurement', link: '/three-phase-impedance-measurement' },
    { name: 'Auto Transformer Insulation Measurement', link: '/auto-transformer-insulation-measurement' },
    { name: 'Two Winding Insulation Measurement', link: '/two-winding-insulation-measurement' },
    { name: 'Ratio Measurement', link: '/ratio-measurement' },
    { name: 'Insulating Oil', link: '/insulating-oil' },
    { name: 'Arrester', link: '/arrester' },
    { name: 'Bushing', link: '/bushing' },
  ];

  return (
    <Layout>
      <div className="p-6 space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-transformer-dark">ผลทดสอบทางไฟฟ้า</h1>
          <p className="text-muted-foreground">ข้อมูลผลการทดสอบทางไฟฟ้าของหม้อแปลง</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testTypes.map((test, index) => (
            <Link 
              to={test.link} 
              key={index} 
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white group"
            >
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-transformer-primary/10 flex items-center justify-center group-hover:bg-transformer-primary/20 transition-colors">
                  <FileType className="h-5 w-5 text-transformer-primary" />
                </div>
                <div className="font-medium">{test.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ElectricalTestResultsPage;
