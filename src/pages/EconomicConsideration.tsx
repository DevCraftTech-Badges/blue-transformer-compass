
import Layout from "@/components/layout/Layout";

const EconomicConsiderationPage = () => {
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">ข้อมูลที่จำเป็นในการพิจารณา</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-700 mb-4">
            หน้านี้แสดงข้อมูลที่จำเป็นในการพิจารณาทางเศรษฐศาสตร์สำหรับหม้อแปลง
          </p>
          
          <div className="mt-6 space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-medium text-lg mb-2">ปัจจัยทางเศรษฐศาสตร์</h3>
              <p className="text-gray-600">
                การพิจารณาด้านเศรษฐศาสตร์จะคำนึงถึงปัจจัยดังต่อไปนี้:
              </p>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>ราคาต้นทุนของหม้อแปลง</li>
                <li>ค่าเสื่อมราคา</li>
                <li>ค่าบำรุงรักษา</li>
                <li>ค่า Loss ของหม้อแปลง</li>
                <li>อัตราดอกเบี้ย</li>
              </ul>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="font-medium text-lg mb-2">การประเมินมูลค่า</h3>
              <p className="text-gray-600">
                การประเมินมูลค่าทางเศรษฐศาสตร์จะพิจารณาจาก:
              </p>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>มูลค่าปัจจุบันสุทธิ (Net Present Value)</li>
                <li>อัตราผลตอบแทนภายใน (Internal Rate of Return)</li>
                <li>ระยะเวลาคืนทุน (Payback Period)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">ข้อมูลเพิ่มเติม</h3>
              <p className="text-gray-600">
                สำหรับข้อมูลเพิ่มเติมเกี่ยวกับการวิเคราะห์ทางเศรษฐศาสตร์ กรุณาดูที่เมนู Factor Setting 
                และ ราคาและ Loss ของหม้อแปลง
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EconomicConsiderationPage;
