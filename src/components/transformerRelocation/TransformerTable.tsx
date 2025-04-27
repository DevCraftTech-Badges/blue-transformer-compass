
import React from 'react';
import { Truck, Edit } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface TransformerTableProps {
  onStatusChange: (transformer: any) => void;
  onRelocate: (transformer: any) => void;
}

export const TransformerTable = ({
  onStatusChange,
  onRelocate,
}: TransformerTableProps) => {
  // Mock data - replace with actual data
  const transformers = [
    {
      id: 1,
      equipmentNo: 'EQ001',
      manufacturer: 'ABB',
      status: 'ใช้งาน',
    },
    // Add more mock data as needed
  ];

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Equipment No.</TableHead>
            <TableHead>บริษัทผู้ผลิต</TableHead>
            <TableHead>สถานะ</TableHead>
            <TableHead className="text-right">จัดการ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transformers.map((transformer) => (
            <TableRow key={transformer.id}>
              <TableCell>{transformer.equipmentNo}</TableCell>
              <TableCell>{transformer.manufacturer}</TableCell>
              <TableCell>{transformer.status}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onStatusChange(transformer)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRelocate(transformer)}
                  >
                    <Truck className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
