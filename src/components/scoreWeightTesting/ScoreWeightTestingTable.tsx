
import React, { useState } from "react";
import { ScoreWeightTestingItem } from "./ScoreWeightTestingPage";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ScoreWeightTestingTableProps {
  items: ScoreWeightTestingItem[];
  onEdit: (item: ScoreWeightTestingItem) => void;
  onDelete: (id: number) => void;
}

const ScoreWeightTestingTable: React.FC<ScoreWeightTestingTableProps> = ({
  items,
  onEdit,
  onDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>ID</TableHead>
              <TableHead>Perform Group</TableHead>
              <TableHead>Sub Group</TableHead>
              <TableHead>More Perform</TableHead>
              <TableHead>Evaluation</TableHead>
              <TableHead>Variable</TableHead>
              <TableHead>Variable Min</TableHead>
              <TableHead>Variable Max</TableHead>
              <TableHead>จัดการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <TableRow key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.performGroup}</TableCell>
                  <TableCell>{item.subGroup}</TableCell>
                  <TableCell>{item.morePerform}</TableCell>
                  <TableCell>{item.evaluation}</TableCell>
                  <TableCell>{item.variable}</TableCell>
                  <TableCell>{item.variableMin}</TableCell>
                  <TableCell>{item.variableMax}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(item)}
                        title="แก้ไขรายการ"
                      >
                        <Pencil className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(item.id)}
                        title="ลบรายการ"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4">
                  ไม่พบข้อมูล
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {pageNumbers.map(number => (
              <PaginationItem key={number}>
                <PaginationLink
                  isActive={currentPage === number}
                  onClick={() => setCurrentPage(number)}
                >
                  {number}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default ScoreWeightTestingTable;
