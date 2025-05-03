
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import TableRowActions from './TableRowActions';
import { motion } from 'framer-motion';

interface InspectionItem {
  id: number;
  transformerName: string;
  egatSN: string;
  testType: string;
  testDate: string;
  testTime: string;
  inspector: string;
  [key: string]: any;
}

interface InspectionTableProps {
  items: InspectionItem[];
  onView: (item: InspectionItem) => void;
  onEdit: (item: InspectionItem) => void;
  onDelete: (id: number) => void;
  onViewDetails?: (item: InspectionItem) => void;
}

const InspectionTable: React.FC<InspectionTableProps> = ({
  items,
  onView,
  onEdit,
  onDelete,
  onViewDetails,
}) => {
  // Handle the view details action, defaulting to onView if onViewDetails is not provided
  const handleViewDetails = (item: InspectionItem) => {
    if (onViewDetails) {
      onViewDetails(item);
    } else {
      onView(item);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden border-blue-100">
      <Table>
        <TableHeader>
          <TableRow className="bg-blue-50">
            <TableHead className="w-[60px] text-center font-semibold text-blue-800">No</TableHead>
            <TableHead className="font-semibold text-blue-800">หม้อแปลงไฟฟ้า</TableHead>
            <TableHead className="font-semibold text-blue-800">EGAT S/N</TableHead>
            <TableHead className="font-semibold text-blue-800">รูปแบบการทดสอบ</TableHead>
            <TableHead className="font-semibold text-blue-800">วันที่เริ่มทดสอบ</TableHead>
            <TableHead className="font-semibold text-blue-800">เวลาที่เริ่มปฏิบัติงาน</TableHead>
            <TableHead className="font-semibold text-blue-800">ผู้ตรวจสอบ</TableHead>
            <TableHead className="font-semibold text-blue-800 text-center">จัดการ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                ไม่พบข้อมูล กรุณาเพิ่มรายการใหม่
              </TableCell>
            </TableRow>
          ) : (
            items.map((item, index) => (
              <motion.tr 
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50/30'} border-b border-blue-100`}
              >
                <TableCell className="text-center font-medium">{index + 1}</TableCell>
                <TableCell>{item.transformerName}</TableCell>
                <TableCell>{item.egatSN}</TableCell>
                <TableCell>{item.testType}</TableCell>
                <TableCell>{item.testDate}</TableCell>
                <TableCell>{item.testTime}</TableCell>
                <TableCell>{item.inspector}</TableCell>
                <TableCell>
                  <TableRowActions 
                    item={item}
                    onView={() => handleViewDetails(item)}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </TableCell>
              </motion.tr>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default InspectionTable;
