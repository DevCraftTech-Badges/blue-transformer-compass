
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const oilTestTypes = [
  {
    title: 'Oil Aging',
    path: '/oil-aging',
    icon: <FileText className="w-8 h-8 text-transformer-primary mb-4" />
  },
  {
    title: 'Oil DGA',
    path: '/oil-dga',
    icon: <FileText className="w-8 h-8 text-transformer-primary mb-4" />
  },
  {
    title: 'Oil Furan',
    path: '/oil-furan',
    icon: <FileText className="w-8 h-8 text-transformer-primary mb-4" />
  },
  {
    title: 'Oil Contamination',
    path: '/oil-contamination',
    icon: <FileText className="w-8 h-8 text-transformer-primary mb-4" />
  },
  {
    title: 'OLTC DGA',
    path: '/oltc-dga',
    icon: <FileText className="w-8 h-8 text-transformer-primary mb-4" />
  },
  {
    title: 'OLTC Oil Contamination',
    path: '/oltc-oil-contamination',
    icon: <FileText className="w-8 h-8 text-transformer-primary mb-4" />
  }
];

const OilTest = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">
          ข้อมูลบำรุงรักษาหม้อแปลง - ผลทดสอบทางน้ำมัน
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {oilTestTypes.map((test) => (
            <Link to={test.path} key={test.path}>
              <Card className="p-6 text-center hover:ring-2 hover:ring-transformer-primary hover:shadow-lg transition-all duration-200 cursor-pointer">
                {test.icon}
                <h3 className="text-lg font-semibold">{test.title}</h3>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default OilTest;
