
import React, { useState } from 'react';
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
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Download, ArrowUpDown } from 'lucide-react';

// Mock data for the table
const mockData = [
  { id: 1, date: "2023-05-01", disbursed: 5, purchased: 10, total: 105 },
  { id: 2, date: "2023-05-15", disbursed: 3, purchased: 0, total: 102 },
  { id: 3, date: "2023-06-01", disbursed: 2, purchased: 15, total: 115 },
  { id: 4, date: "2023-06-15", disbursed: 7, purchased: 0, total: 108 },
  { id: 5, date: "2023-07-01", disbursed: 4, purchased: 20, total: 124 },
];

const OilInventoryTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleSort = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  const sortedData = [...mockData].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const filteredData = sortedData.filter(item => 
    formatDate(item.date).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="ค้นหาตามวันที่..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          className="w-full sm:w-auto flex gap-2 items-center border-transformer-primary text-transformer-primary hover:bg-transformer-primary hover:text-white"
        >
          <Download className="h-4 w-4" />
          ส่งออกข้อมูล
        </Button>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50 dark:bg-blue-900/20">
              <TableHead className="font-semibold text-center w-16">ลำดับ</TableHead>
              <TableHead className="font-semibold">
                <button 
                  className="flex items-center gap-1 hover:text-transformer-primary transition-colors"
                  onClick={handleSort}
                >
                  วันที่
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </TableHead>
              <TableHead className="font-semibold text-center">เบิกจ่าย [ถัง]</TableHead>
              <TableHead className="font-semibold text-center">ซื้อเพิ่ม [ถัง]</TableHead>
              <TableHead className="font-semibold text-center">ปริมาณน้ำมันในคลัง [ถัง]</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id} className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 even:bg-gray-50/50 transition-colors">
                <TableCell className="text-center font-medium">{item.id}</TableCell>
                <TableCell className="font-medium">{formatDate(item.date)}</TableCell>
                <TableCell className="text-center">
                  {item.disbursed > 0 ? (
                    <span className="inline-flex items-center text-red-500">
                      {item.disbursed}
                    </span>
                  ) : "0"}
                </TableCell>
                <TableCell className="text-center">
                  {item.purchased > 0 ? (
                    <span className="inline-flex items-center text-green-500">
                      {item.purchased}
                    </span>
                  ) : "0"}
                </TableCell>
                <TableCell className="text-center font-medium">{item.total}</TableCell>
              </TableRow>
            ))}
            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  ไม่พบข้อมูล
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" className="hover:bg-blue-50 transition-colors" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" className="hover:bg-blue-50 transition-colors">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" className="hover:bg-blue-50 transition-colors">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" className="hover:bg-blue-50 transition-colors" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default OilInventoryTable;
