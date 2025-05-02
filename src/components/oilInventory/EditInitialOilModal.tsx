
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EditInitialOilModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: number;
    date: string;
    quantity: number;
  };
  onSave: (updatedItem: {
    id: number;
    date: string;
    quantity: number;
  }) => void;
}

const EditInitialOilModal: React.FC<EditInitialOilModalProps> = ({
  isOpen,
  onClose,
  item,
  onSave,
}) => {
  const [quantity, setQuantity] = useState(item.quantity.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...item,
      quantity: Number(quantity),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>แก้ไขปริมาณน้ำมันเริ่มต้น</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                วันที่
              </Label>
              <Input
                id="date"
                value={new Date(item.date).toLocaleDateString('th-TH')}
                className="col-span-3"
                disabled
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                ปริมาณน้ำมันในคลัง [ถัง]
              </Label>
              <Input
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="col-span-3"
                required
                type="number"
                min="0"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              ยกเลิก
            </Button>
            <Button type="submit">บันทึกข้อมูล</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditInitialOilModal;
