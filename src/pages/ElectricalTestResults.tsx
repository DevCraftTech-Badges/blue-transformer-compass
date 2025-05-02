
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileType, Zap, Gauge, Droplet, LightningBolt, FileText, SquareRoot, Transformer } from 'lucide-react';
import { Link } from 'react-router-dom';

const ElectricalTestResultsPage: React.FC = () => {
  const testTypes = [
    { 
      name: 'Core Insulation Resistance', 
      link: '/electrical-test-results/core-insulation-resistance',
      icon: <FileType className="h-5 w-5 text-transformer-primary" />
    },
    { 
      name: 'Exciting Current Measurement', 
      link: '/electrical-test-results/exciting-current-measurement',
      icon: <Zap className="h-5 w-5 text-transformer-primary" />
    },
    { 
      name: 'DC Resistance Measurement', 
      link: '/electrical-test-results/dc-resistance-measurement',
      icon: <FileType className="h-5 w-5 text-transformer-primary" />
    },
    { 
      name: 'Single Phase Impedance Measurement', 
      link: '/electrical-test-results/single-phase-impedance-measurement',
      icon: <SquareRoot className="h-5 w-5 text-transformer-primary" />
    },
    { 
      name: 'Three Phase Impedance Measurement', 
      link: '/electrical-test-results/three-phase-impedance-measurement',
      icon: <SquareRoot className="h-5 w-5 text-transformer-primary" />
    },
    { 
      name: 'Auto Transformer Insulation Measurement', 
      link: '/electrical-test-results/auto-transformer-insulation-measurement',
      icon: <Transformer className="h-5 w-5 text-transformer-primary" />
    },
    { 
      name: 'Two Winding Insulation Measurement', 
      link: '/electrical-test-results/two-winding-insulation-measurement',
      icon: <Transformer className="h-5 w-5 text-transformer-primary" />
    },
    { 
      name: 'Ratio Measurement', 
      link: '/electrical-test-results/ratio-measurement',
      icon: <Gauge className="h-5 w-5 text-transformer-primary" />
    },
    { 
      name: 'Insulating Oil', 
      link: '/electrical-test-results/insulating-oil',
      icon: <Droplet className="h-5 w-5 text-transformer-primary" />
    },
    { 
      name: 'Arrester', 
      link: '/electrical-test-results/arrester',
      icon: <LightningBolt className="h-5 w-5 text-transformer-primary" />
    },
    { 
      name: 'Bushing', 
      link: '/electrical-test-results/bushing',
      icon: <FileType className="h-5 w-5 text-transformer-primary" />
    },
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
                  {test.icon}
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
