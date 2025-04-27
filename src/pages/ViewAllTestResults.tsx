
import Layout from '@/components/layout/Layout';
import TestResultsOverview from '@/components/testResults/TestResultsOverview';

const ViewAllTestResults = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">
          ข้อมูลบำรุงรักษาหม้อแปลง - ดูข้อมูลผลการทดสอบทั้งหมด
        </h1>
        <TestResultsOverview />
      </div>
    </Layout>
  );
};

export default ViewAllTestResults;
