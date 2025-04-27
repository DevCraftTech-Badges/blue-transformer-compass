
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const OltcMaintenance = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">
          ข้อมูลบำรุงรักษาหม้อแปลง - บำรุงรักษา OLTC
        </h1>
        
        <div className="grid grid-cols-1 gap-6">
          <Link to="/oil-contact">
            <Card className="p-6 text-center hover:ring-2 hover:ring-transformer-primary hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer">
              <FileText className="w-8 h-8 text-transformer-primary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold">Oil Contact</h3>
            </Card>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default OltcMaintenance;
