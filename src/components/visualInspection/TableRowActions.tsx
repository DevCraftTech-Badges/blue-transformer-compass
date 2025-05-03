
import React from 'react';
import { Eye, Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from 'framer-motion';

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
    <motion.div 
      className="flex justify-center space-x-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onView(item)}
              className="h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-all duration-200"
            >
              <Eye className="h-4 w-4" />
              <span className="sr-only">แสดงข้อมูล</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-700 shadow-lg">
            <p>แสดงข้อมูล</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onEdit(item)}
              className="h-8 w-8 text-amber-600 hover:text-amber-800 hover:bg-amber-50 transition-all duration-200"
            >
              <Pencil className="h-4 w-4" />
              <span className="sr-only">แก้ไขข้อมูล</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-gradient-to-r from-amber-600 to-amber-700 text-white border-amber-700 shadow-lg">
            <p>แก้ไขข้อมูล</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onDelete(item.id)}
              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
            >
              <Trash className="h-4 w-4" />
              <span className="sr-only">ลบข้อมูล</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-gradient-to-r from-red-600 to-red-700 text-white border-red-700 shadow-lg">
            <p>ลบข้อมูล</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
};

export default TableRowActions;
