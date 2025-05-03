
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FileType, Zap, Gauge, Droplet, Bolt, FileText, Square, 
  Box, Search, ArrowRight, CircleCheck, Activity
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface TestType {
  name: string;
  link: string;
  icon: React.ReactNode;
  description: string;
  category: 'primary' | 'insulation' | 'mechanical' | 'components';
}

const ElectricalTestResultsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = [
    { id: 'primary', name: 'การทดสอบหลัก', color: 'bg-blue-50 border-blue-200' },
    { id: 'insulation', name: 'การทดสอบฉนวน', color: 'bg-amber-50 border-amber-200' },
    { id: 'mechanical', name: 'การทดสอบเชิงกล', color: 'bg-green-50 border-green-200' },
    { id: 'components', name: 'การทดสอบอุปกรณ์', color: 'bg-purple-50 border-purple-200' },
  ];

  const testTypes: TestType[] = [
    { 
      name: 'Core Insulation Resistance', 
      link: '/electrical-test-results/core-insulation-resistance',
      icon: <FileType className="h-5 w-5 text-blue-600" />,
      description: 'ทดสอบความต้านทานของฉนวนแกนเหล็ก',
      category: 'insulation'
    },
    { 
      name: 'Exciting Current Measurement', 
      link: '/electrical-test-results/exciting-current-measurement',
      icon: <Zap className="h-5 w-5 text-yellow-600" />,
      description: 'วัดกระแสไฟฟ้าที่กระตุ้นหม้อแปลง',
      category: 'primary'
    },
    { 
      name: 'DC Resistance Measurement', 
      link: '/electrical-test-results/dc-resistance-measurement',
      icon: <Activity className="h-5 w-5 text-red-600" />,
      description: 'วัดความต้านทานกระแสตรงของขดลวด',
      category: 'primary'
    },
    { 
      name: 'Single Phase Impedance Measurement', 
      link: '/electrical-test-results/single-phase-impedance-measurement',
      icon: <Square className="h-5 w-5 text-green-600" />,
      description: 'วัดความต้านทานเฟสเดียว',
      category: 'mechanical'
    },
    { 
      name: 'Three Phase Impedance Measurement', 
      link: '/electrical-test-results/three-phase-impedance-measurement',
      icon: <Square className="h-5 w-5 text-green-700" />,
      description: 'วัดความต้านทานสามเฟส',
      category: 'mechanical'
    },
    { 
      name: 'Auto Transformer Insulation Measurement', 
      link: '/electrical-test-results/auto-transformer-insulation-measurement',
      icon: <Box className="h-5 w-5 text-indigo-600" />,
      description: 'วัดฉนวนออโต้ทรานส์ฟอร์เมอร์',
      category: 'insulation'
    },
    { 
      name: 'Two Winding Insulation Measurement', 
      link: '/electrical-test-results/two-winding-insulation-measurement',
      icon: <Box className="h-5 w-5 text-indigo-700" />,
      description: 'วัดฉนวนหม้อแปลงสองขดลวด',
      category: 'insulation'
    },
    { 
      name: 'Ratio Measurement', 
      link: '/electrical-test-results/ratio-measurement',
      icon: <Gauge className="h-5 w-5 text-orange-600" />,
      description: 'วัดอัตราส่วนของหม้อแปลง',
      category: 'primary'
    },
    { 
      name: 'Insulating Oil', 
      link: '/electrical-test-results/insulating-oil',
      icon: <Droplet className="h-5 w-5 text-blue-500" />,
      description: 'ทดสอบคุณภาพน้ำมันฉนวน',
      category: 'components'
    },
    { 
      name: 'Arrester', 
      link: '/electrical-test-results/arrester',
      icon: <Bolt className="h-5 w-5 text-yellow-500" />,
      description: 'ทดสอบอุปกรณ์ป้องกันฟ้าผ่า',
      category: 'components'
    },
    { 
      name: 'Bushing', 
      link: '/electrical-test-results/bushing',
      icon: <FileText className="h-5 w-5 text-purple-600" />,
      description: 'ทดสอบบุชชิ่ง',
      category: 'components'
    },
  ];

  const filteredTests = testTypes.filter(test => 
    test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-2">
          <div>
            <h1 className="text-2xl font-bold text-transformer-dark">ผลทดสอบทางไฟฟ้า</h1>
            <p className="text-muted-foreground">ข้อมูลผลการทดสอบทางไฟฟ้าของหม้อแปลง</p>
          </div>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="ค้นหาการทดสอบ..." 
              className="pl-9 w-full" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Card className="border-0 shadow-none bg-transparent">
          <CardContent className="p-0">
            {categories.map(category => {
              const testsInCategory = filteredTests.filter(test => test.category === category.id);
              
              if (testsInCategory.length === 0) return null;
              
              return (
                <div key={category.id} className="mb-6">
                  <h2 className={`text-lg font-medium mb-3 px-3 py-2 rounded-md inline-block ${category.color}`}>
                    {category.name}
                  </h2>
                  
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    variants={container}
                    initial="hidden"
                    animate="show"
                  >
                    {testsInCategory.map((test, index) => (
                      <motion.div key={index} variants={item}>
                        <Link 
                          to={test.link}
                          className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white hover:bg-blue-50 group"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 rounded-full bg-transformer-primary/10 flex items-center justify-center group-hover:bg-transformer-primary/20 transition-colors">
                                {test.icon}
                              </div>
                              <div className="flex flex-col">
                                <div className="font-medium">{test.name}</div>
                                <div className="text-sm text-muted-foreground">{test.description}</div>
                              </div>
                            </div>
                            <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-transformer-primary transition-colors" />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              );
            })}
            
            {filteredTests.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CircleCheck className="h-12 w-12 text-gray-300 mb-2" />
                <h3 className="text-lg font-medium">ไม่พบรายการทดสอบ</h3>
                <p className="text-muted-foreground">ลองค้นหาด้วยคำอื่น หรือตรวจสอบการสะกด</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ElectricalTestResultsPage;
