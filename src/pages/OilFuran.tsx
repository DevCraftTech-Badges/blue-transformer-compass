import React from 'react';
import OilFuranTable from '@/components/oilFuran/OilFuranTable';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { ChevronRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const OilFuran: React.FC = () => {
  return (
    <Layout>
      <div className="p-6 space-y-6 animate-fade-in">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Link to="/oil-test" className="hover:text-transformer-primary transition-colors">ผลทดสอบทางน้ำมัน</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span>Oil Furan</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Activity className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-transformer-dark">Oil Furan</h1>
              <p className="text-muted-foreground">ข้อมูลผลตรวจสอบสารประกอบฟูราน</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <OilFuranTable />
        </motion.div>
      </div>
    </Layout>
  );
};

export default OilFuran;
