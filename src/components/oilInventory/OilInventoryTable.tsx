
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

// Mock data for the table
const mockData = [
  { id: 1, date: "2023-05-01", disbursed: 5, purchased: 10, total: 105 },
  { id: 2, date: "2023-05-15", disbursed: 3, purchased: 0, total: 102 },
  { id: 3, date: "2023-06-01", disbursed: 2, purchased: 15, total: 115 },
  { id: 4, date: "2023-06-15", disbursed: 7, purchased: 0, total: 108 },
  { id: 5, date: "2023-07-01", disbursed: 4, purchased: 20, total: 124 },
];

const OilInventoryTable = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="font-semibold text-center">ลำดับ</TableHead>
            <TableHead className="font-semibold">วันที่</TableHead>
            <TableHead className="font-semibold text-center">เบิกจ่าย [ถัง]</TableHead>
            <TableHead className="font-semibold text-center">ซื้อเพิ่ม [ถัง]</TableHead>
            <TableHead className="font-semibold text-center">ปริมาณน้ำมันในคลัง [ถัง]</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.map((item) => (
            <TableRow key={item.id} className="hover:bg-gray-50 even:bg-gray-50/50">
              <TableCell className="text-center">{item.id}</TableCell>
              <TableCell>{formatDate(item.date)}</TableCell>
              <TableCell className="text-center">{item.disbursed}</TableCell>
              <TableCell className="text-center">{item.purchased}</TableCell>
              <TableCell className="text-center">{item.total}</TableCell>
            </TableRow>
          ))}
          {mockData.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                ไม่พบข้อมูล
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="mt-6">
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
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default OilInventoryTable;
