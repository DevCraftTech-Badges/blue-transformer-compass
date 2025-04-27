
import Layout from '@/components/layout/Layout';
import TransformerImportanceForm from '@/components/transformerImportance/TransformerImportanceForm';

const TransformerImportancePage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">
          เพิ่มรายการความสำคัญของหม้อแปลง
        </h1>
        <TransformerImportanceForm />
      </div>
    </Layout>
  );
};

export default TransformerImportancePage;
