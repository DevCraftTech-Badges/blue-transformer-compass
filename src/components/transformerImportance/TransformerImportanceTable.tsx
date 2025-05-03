
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

// Mock data for demonstration
const mockData = [
  {
    id: '1',
    name: 'Transformer A',
    recordedDate: '2024-05-01',
  },
  {
    id: '2',
    name: 'Transformer B',
    recordedDate: '2024-04-28',
  },
  {
    id: '3',
    name: 'Transformer C',
    recordedDate: '2024-04-25',
  },
];

interface TransformerImportanceTableProps {
  onEdit?: (id: string) => void;
}

const TransformerImportanceTable: React.FC<TransformerImportanceTableProps> = ({ onEdit }) => {
  const handleEdit = (id: string) => {
    if (onEdit) {
      onEdit(id);
    } else {
      console.log('Edit transformer importance with ID:', id);
    }
  };

  const handleDelete = (id: string) => {
    console.log('Delete transformer importance with ID:', id);
  };

  return (
    <div className="rounded-md border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader className="bg-[#f0f8ff]">
          <TableRow>
            <TableHead className="w-[80px] text-blue-800">ลำดับ</TableHead>
            <TableHead className="text-blue-800">Transformer Name</TableHead>
            <TableHead className="text-blue-800">Recorded Date</TableHead>
            <TableHead className="text-right text-blue-800">จัดการ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.length > 0 ? (
            mockData.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.recordedDate}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 border-blue-200 hover:bg-blue-50"
                      onClick={() => handleEdit(item.id)}
                    >
                      <Edit className="h-4 w-4 text-blue-600" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 border-red-200 hover:bg-red-50"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                ไม่พบข้อมูลรายการความสำคัญของหม้อแปลง
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransformerImportanceTable;
