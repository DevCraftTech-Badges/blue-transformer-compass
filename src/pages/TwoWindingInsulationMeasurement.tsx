
import React from 'react';
import Layout from '@/components/layout/Layout';
import TwoWindingInsulationMeasurementTable from '@/components/twoWindingInsulationMeasurement/TwoWindingInsulationMeasurementTable';
import { Link } from 'react-router-dom';
import { ChevronRight, FileType } from 'lucide-react';
import { motion } from 'framer-motion';

const TwoWindingInsulationMeasurementPage: React.FC = () => {
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
            <Link to="/electrical-test-results" className="hover:text-transformer-primary transition-colors">ผลทดสอบทางไฟฟ้า</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span>Two Winding Insulation Measurement</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
              <FileType className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-transformer-dark">Two Winding Insulation Measurement</h1>
              <p className="text-muted-foreground">ข้อมูลผลทดสอบฉนวนหม้อแปลงสองขดลวด</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TwoWindingInsulationMeasurementTable />
        </motion.div>
      </div>
    </Layout>
  );
};

export default TwoWindingInsulationMeasurementPage;
