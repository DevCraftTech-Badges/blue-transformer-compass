
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
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

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

  // Animation variants
  const tableContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.05
      } 
    }
  };

  const tableRowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="rounded-lg overflow-hidden shadow-sm border border-blue-100"
      variants={tableContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-blue-50 to-blue-100">
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
                <TableCell colSpan={8} className="text-center py-12 text-gray-500">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <svg 
                      className="w-12 h-12 text-gray-300" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p>ไม่พบข้อมูล กรุณาเพิ่มรายการใหม่</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              items.map((item, index) => (
                <motion.tr 
                  key={item.id}
                  variants={tableRowVariants}
                  className={`border-b border-blue-100 hover:bg-blue-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-blue-50/30'}`}
                  onClick={() => handleViewDetails(item)}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell className="text-center font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium text-blue-800">{item.transformerName}</TableCell>
                  <TableCell>{item.egatSN}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {item.testType}
                    </span>
                  </TableCell>
                  <TableCell>{item.testDate}</TableCell>
                  <TableCell>{item.testTime}</TableCell>
                  <TableCell>{item.inspector}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
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
      
      {items.length > 0 && (
        <div className="py-4 bg-gray-50 border-t border-blue-100">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </motion.div>
  );
};

export default InspectionTable;
