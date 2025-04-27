
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

interface Transformer {
  id: number;
  name: string;
  equipmentNo: string;
  manufacturer: string;
  capacity: string;
}

interface TransformerTableProps {
  transformers: Transformer[];
  onEdit: (transformer: Transformer) => void;
  onDelete: (id: number) => void;
}

const TransformerTable: React.FC<TransformerTableProps> = ({
  transformers,
  onEdit,
  onDelete,
}) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="font-semibold">หม้อแปลงไฟฟ้า</TableHead>
            <TableHead className="font-semibold">Equipment No.</TableHead>
            <TableHead className="font-semibold">บริษัทผู้ผลิต</TableHead>
            <TableHead className="font-semibold">พิกัดกำลังไฟฟ้า (MVA)</TableHead>
            <TableHead className="font-semibold text-center">จัดการ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transformers.map((transformer) => (
            <TableRow 
              key={transformer.id}
              className="hover:bg-gray-50 even:bg-gray-50/50"
            >
              <TableCell>{transformer.name}</TableCell>
              <TableCell>{transformer.equipmentNo}</TableCell>
              <TableCell>{transformer.manufacturer}</TableCell>
              <TableCell>{transformer.capacity}</TableCell>
              <TableCell className="flex justify-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onEdit(transformer)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => {
                    if (window.confirm("คุณต้องการลบข้อมูลนี้ใช่หรือไม่?")) {
                      onDelete(transformer.id)
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {transformers.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                ไม่พบข้อมูล
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      {/* Simple Pagination */}
      <div className="flex justify-center mt-6 space-x-2 py-4">
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
        <Button variant="outline" size="sm" className="bg-blue-50">
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          3
        </Button>
        <Button variant="outline" size="sm">
          Next
        </Button>
      </div>
    </div>
  );
};

export default TransformerTable;
