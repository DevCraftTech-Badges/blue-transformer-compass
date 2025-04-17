
import React from 'react';
import { Eye, Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

interface TableRowActionsProps {
  item: InspectionItem;
  onView: (item: InspectionItem) => void;
  onEdit: (item: InspectionItem) => void;
  onDelete: (id: number) => void;
}

const TableRowActions: React.FC<TableRowActionsProps> = ({
  item,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex space-x-2">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => onView(item)}
        title="แสดงข้อมูล"
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => onEdit(item)}
        title="แก้ไขข้อมูล"
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => onDelete(item.id)}
        title="ลบข้อมูล"
        className="text-red-500 hover:text-red-700"
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TableRowActions;
