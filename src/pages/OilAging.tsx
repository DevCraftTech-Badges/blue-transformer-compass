import React from 'react';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { ChevronRight, FileType } from 'lucide-react';
import { motion } from 'framer-motion';

// Oil Aging Table Component
const OilAgingTable = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  // Mock data for demonstration
  const mockData = [
    {
      id: 1,
      transformer: "TR-001",
      egatSN: "EGAT-2024-001",
      testType: "Standard Test",
      inspectionDate: "2024-01-15",
      workOrderNo: "WO-2024-001",
      inspector: "นาย A สมิท"
    },
    {
      id: 2,
      transformer: "TR-002", 
      egatSN: "EGAT-2024-002",
      testType: "Emergency Test",
      inspectionDate: "2024-01-16",
      workOrderNo: "WO-2024-002",
      inspector: "นาง B จอห์นสัน"
    },
    {
      id: 3,
      transformer: "TR-003",
      egatSN: "EGAT-2024-003", 
      testType: "Routine Test",
      inspectionDate: "2024-01-17",
      workOrderNo: "WO-2024-003",
      inspector: "นาย C วิลเลียมส์"
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <div className="flex-1 max-w-sm">
          <input
            type="text"
            placeholder="ค้นหา..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <span className="text-lg">+</span>
          สร้างรายการใหม่
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">No</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">หม้อแปลงไฟฟ้า</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">EGAT S/N</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">รูปแบบการทดสอบ</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">วันที่ตรวจสอบ</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">เลขที่คำสั่งปฏิบัติงาน</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">ผู้ตรวจสอบ</th>
              <th className="border border-gray-200 px-4 py-3 text-center text-sm font-medium text-gray-700">การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-3 text-sm">{index + 1}</td>
                <td className="border border-gray-200 px-4 py-3 text-sm">{item.transformer}</td>
                <td className="border border-gray-200 px-4 py-3 text-sm">{item.egatSN}</td>
                <td className="border border-gray-200 px-4 py-3 text-sm">{item.testType}</td>
                <td className="border border-gray-200 px-4 py-3 text-sm">{item.inspectionDate}</td>
                <td className="border border-gray-200 px-4 py-3 text-sm">{item.workOrderNo}</td>
                <td className="border border-gray-200 px-4 py-3 text-sm">{item.inspector}</td>
                <td className="border border-gray-200 px-4 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    <button className="text-blue-600 hover:text-blue-800 p-1" title="ดูข้อมูล">
                      👁️
                    </button>
                    <button className="text-green-600 hover:text-green-800 p-1" title="แก้ไข">
                      ✏️
                    </button>
                    <button className="text-red-600 hover:text-red-800 p-1" title="ลบ">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
          Previous
        </button>
        <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded">
          1
        </button>
        <button className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
          Next
        </button>
      </div>
    </div>
  );
};

const OilAging = () => {
  return (
    <Layout>
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Header Section with Animation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col space-y-2"
        >
          {/* Breadcrumb Navigation */}
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Link to="/electrical-test-results" className="hover:text-transformer-primary transition-colors">ผลทดสอบน้ำมัน</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span>Oil Aging</span>
          </div>
          
          {/* Page Title with Icon */}
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <FileType className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-transformer-dark">Oil Aging</h1>
              <p className="text-muted-foreground">ข้อมูลผลการทดสอบอายุน้ำมัน</p>
            </div>
          </div>
        </motion.div>
        
        {/* Main Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <OilAgingTable />
        </motion.div>
      </div>
    </Layout>
  );
};

export default OilAging;