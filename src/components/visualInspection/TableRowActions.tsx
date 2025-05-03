
import React from 'react';
import { Eye, Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <div className="flex justify-center space-x-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onView(item)}
              className="h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>แสดงข้อมูล</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onEdit(item)}
              className="h-8 w-8 text-amber-600 hover:text-amber-800 hover:bg-amber-50"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>แก้ไขข้อมูล</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onDelete(item.id)}
              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>ลบข้อมูล</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default TableRowActions;
