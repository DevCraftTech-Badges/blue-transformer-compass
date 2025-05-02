
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const ArresterPage: React.FC = () => {
  return (
    <Layout>
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Link to="/electrical-test-results" className="hover:text-transformer-primary transition-colors">ผลทดสอบทางไฟฟ้า</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span>Arrester</span>
        </div>
        
        <div>
          <h1 className="text-2xl font-bold text-transformer-dark">Arrester</h1>
          <p className="text-muted-foreground">ข้อมูลผลทดสอบอุปกรณ์ป้องกันฟ้าผ่า</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-center text-muted-foreground py-10">
            ข้อมูลผลทดสอบอุปกรณ์ป้องกันฟ้าผ่าจะแสดงที่นี่
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ArresterPage;
