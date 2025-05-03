
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FileType, Zap, Gauge, Droplet, Bolt, FileText, Square, 
  Box, Search, ArrowRight, CircleCheck, Activity,
  LayoutGrid, LayoutList
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TestType {
  name: string;
  link: string;
  icon: React.ReactNode;
  description: string;
  category: 'primary' | 'insulation' | 'mechanical' | 'components';
}

const ElectricalTestResultsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<string>('all');
  
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

  // Filter tests based on search term and active tab
  const filteredTests = testTypes.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeTab === 'all' || test.category === activeTab;
    
    return matchesSearch && matchesCategory;
  });

  // Animation variants
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

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Layout>
      <div className="p-6 space-y-6 animate-fade-in">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6"
        >
          <div>
            <h1 className="text-2xl font-bold text-transformer-dark">ผลทดสอบทางไฟฟ้า</h1>
            <p className="text-muted-foreground">ข้อมูลผลการทดสอบทางไฟฟ้าของหม้อแปลง</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="ค้นหาการทดสอบ..." 
                className="pl-9 w-full" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex bg-gray-100 p-1 rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className={viewMode === 'grid' ? 'bg-white shadow-sm' : ''}
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid size={18} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={viewMode === 'list' ? 'bg-white shadow-sm' : ''}
                onClick={() => setViewMode('list')}
              >
                <LayoutList size={18} />
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="bg-blue-50 p-1 mb-6 overflow-x-auto flex-nowrap flex w-full md:w-auto">
              <TabsTrigger value="all" className="text-sm font-medium">
                ทั้งหมด
              </TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-sm font-medium whitespace-nowrap">
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" className="mt-0">
              {viewMode === 'grid' ? (
                <CardGridView 
                  filteredTests={filteredTests} 
                  container={container} 
                  item={item} 
                  categories={categories} 
                />
              ) : (
                <ListGridView 
                  filteredTests={filteredTests} 
                  container={container} 
                  item={item} 
                  categories={categories} 
                />
              )}
            </TabsContent>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                {viewMode === 'grid' ? (
                  <CardGridView 
                    filteredTests={filteredTests.filter(test => test.category === category.id)}
                    container={container}
                    item={item}
                    categories={categories}
                  />
                ) : (
                  <ListGridView 
                    filteredTests={filteredTests.filter(test => test.category === category.id)}
                    container={container}
                    item={item}
                    categories={categories}
                  />
                )}
              </TabsContent>
            ))}
          </Tabs>

          {filteredTests.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <CircleCheck className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium">ไม่พบรายการทดสอบ</h3>
              <p className="text-muted-foreground">ลองค้นหาด้วยคำอื่น หรือตรวจสอบการสะกด</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

// Grid View Component
const CardGridView = ({ filteredTests, container, item, categories }) => {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {filteredTests.map((test, index) => {
        const categoryItem = categories.find(cat => cat.id === test.category);
        const categoryColor = categoryItem ? categoryItem.color : 'bg-gray-50 border-gray-200';
        
        return (
          <motion.div key={index} variants={item}>
            <Link 
              to={test.link}
              className="block p-5 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`h-10 w-10 rounded-full ${categoryColor.replace('bg-', 'bg-').replace('border-', '')} flex items-center justify-center`}>
                  {test.icon}
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColor}`}>
                  {categories.find(cat => cat.id === test.category)?.name}
                </span>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-lg text-transformer-primary group-hover:text-transformer-secondary transition-colors">{test.name}</div>
                <div className="text-sm text-muted-foreground">{test.description}</div>
              </div>
              <div className="flex justify-end mt-4">
                <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-transformer-primary transition-colors" />
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

// List View Component
const ListGridView = ({ filteredTests, container, item, categories }) => {
  return (
    <motion.div 
      className="space-y-3"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {filteredTests.map((test, index) => {
        const categoryItem = categories.find(cat => cat.id === test.category);
        const categoryColor = categoryItem ? categoryItem.color : 'bg-gray-50 border-gray-200';
        
        return (
          <motion.div key={index} variants={item}>
            <Link 
              to={test.link}
              className="flex items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white group"
            >
              <div className={`h-10 w-10 rounded-full ${categoryColor.replace('bg-', 'bg-').replace('border-', '')} flex items-center justify-center mr-4`}>
                {test.icon}
              </div>
              <div className="flex-1">
                <div className="font-medium text-transformer-primary group-hover:text-transformer-secondary transition-colors">{test.name}</div>
                <div className="text-sm text-muted-foreground">{test.description}</div>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColor} mx-3`}>
                {categories.find(cat => cat.id === test.category)?.name}
              </span>
              <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-transformer-primary transition-colors" />
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ElectricalTestResultsPage;
