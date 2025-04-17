
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
}

const InspectionTable: React.FC<InspectionTableProps> = ({
  items,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/70">
            <TableHead className="w-[60px] text-center">No</TableHead>
            <TableHead>หม้อแปลงไฟฟ้า</TableHead>
            <TableHead>EGAT S/N</TableHead>
            <TableHead>รูปแบบการทดสอบ</TableHead>
            <TableHead>วันที่เริ่มทดสอบ</TableHead>
            <TableHead>เวลาที่เริ่มปฏิบัติงาน</TableHead>
            <TableHead>ผู้ตรวจสอบ</TableHead>
            <TableHead>จัดการ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-4">
                ไม่พบข้อมูล
              </TableCell>
            </TableRow>
          ) : (
            items.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell>{item.transformerName}</TableCell>
                <TableCell>{item.egatSN}</TableCell>
                <TableCell>{item.testType}</TableCell>
                <TableCell>{item.testDate}</TableCell>
                <TableCell>{item.testTime}</TableCell>
                <TableCell>{item.inspector}</TableCell>
                <TableCell>
                  <TableRowActions 
                    item={item}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default InspectionTable;
