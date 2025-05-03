
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import TransformerImportanceForm from './TransformerImportanceForm';

interface TransformerImportanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingId?: string;
}

const TransformerImportanceModal = ({ 
  isOpen, 
  onClose,
  editingId 
}: TransformerImportanceModalProps) => {
  const handleFormSubmit = (data: any) => {
    console.log('Form submitted with data:', data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between w-full">
            <DialogTitle className="text-xl font-semibold text-blue-800">
              {editingId ? 'แก้ไขข้อมูลความสำคัญของหม้อแปลง' : 'เพิ่มรายการความสำคัญของหม้อแปลง'}
            </DialogTitle>
            <Button 
              variant="ghost" 
              className="h-8 w-8 p-0 rounded-full" 
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="py-4">
          <TransformerImportanceForm onSubmit={handleFormSubmit} editingId={editingId} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransformerImportanceModal;
