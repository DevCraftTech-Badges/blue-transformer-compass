
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { FileText, Droplets, Activity, TestTube, Gauge, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const oilTestTypes = [
  {
    title: 'Oil Aging',
    path: '/oil-aging',
    icon: <Droplets className="w-10 h-10 text-blue-500 mb-4" />,
    description: 'ตรวจสอบการเสื่อมสภาพของน้ำมัน'
  },
  {
    title: 'Oil DGA',
    path: '/oil-dga',
    icon: <TestTube className="w-10 h-10 text-indigo-500 mb-4" />,
    description: 'วิเคราะห์ก๊าซละลายในน้ำมัน'
  },
  {
    title: 'Oil Furan',
    path: '/oil-furan',
    icon: <Activity className="w-10 h-10 text-purple-500 mb-4" />,
    description: 'ตรวจสอบสารประกอบฟูราน'
  },
  {
    title: 'Oil Contamination',
    path: '/oil-contamination',
    icon: <FileText className="w-10 h-10 text-orange-500 mb-4" />,
    description: 'วิเคราะห์การปนเปื้อนในน้ำมัน'
  },
  {
    title: 'OLTC DGA',
    path: '/oltc-dga',
    icon: <Gauge className="w-10 h-10 text-green-500 mb-4" />,
    description: 'วิเคราะห์ก๊าซละลายใน OLTC'
  },
  {
    title: 'OLTC Oil Contamination',
    path: '/oltc-oil-contamination',
    icon: <Settings className="w-10 h-10 text-red-500 mb-4" />,
    description: 'ตรวจสอบการปนเปื้อนใน OLTC'
  }
];

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
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const OilTest = () => {
  return (
    <Layout>
      <div className="mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <div className="h-8 w-1.5 bg-blue-600 rounded-full"></div>
            <h1 className="text-2xl font-bold text-transformer-dark">
              ผลทดสอบทางน้ำมัน
            </h1>
          </div>
          <p className="text-muted-foreground ml-10">
            ข้อมูลบำรุงรักษาหม้อแปลง - เลือกประเภทการทดสอบน้ำมันที่ต้องการตรวจสอบ
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {oilTestTypes.map((test) => (
            <motion.div key={test.path} variants={item}>
              <Link to={test.path}>
                <Card className="p-6 text-center hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 cursor-pointer border-2 hover:border-blue-200 bg-gradient-to-br from-white to-blue-50 h-full flex flex-col items-center">
                  {test.icon}
                  <h3 className="text-lg font-semibold text-transformer-primary mb-2">{test.title}</h3>
                  <p className="text-sm text-gray-600">{test.description}</p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-10 bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-lg font-medium text-transformer-primary mb-4">เกี่ยวกับผลทดสอบทางน้ำมัน</h3>
          <p className="text-sm text-gray-600">
            การทดสอบทางน้ำมันเป็นส่วนสำคัญในการบำรุงรักษาหม้อแปลง ช่วยให้ทราบถึงสภาพและอายุการใช้งานของหม้อแปลง 
            นอกจากนี้ยังช่วยในการวินิจฉัยปัญหาต่างๆ ที่อาจเกิดขึ้น ทำให้สามารถวางแผนการซ่อมบำรุงได้อย่างมีประสิทธิภาพ
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default OilTest;
