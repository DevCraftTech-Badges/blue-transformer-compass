import React from 'react';
import Layout from '@/components/layout/Layout';
import OilContaminationTable from '@/components/oilContamination/OilContaminationTable';
import { Link } from 'react-router-dom';
import { ChevronRight, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const OilTestContaminationPage: React.FC = () => {
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
            <span>Oil Contamination</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
              <FileText className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-transformer-dark">Oil Contamination</h1>
              <p className="text-muted-foreground">ข้อมูลผลการทดสอบการปนเปื้อนน้ำมัน</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <OilContaminationTable />
        </motion.div>
      </div>
    </Layout>
  );
};

export default OilTestContaminationPage;
