
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface StatusChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (status: string) => void;
  transformer: any;
}

export const StatusChangeModal = ({
  isOpen,
  onClose,
  onSubmit,
  transformer,
}: StatusChangeModalProps) => {
  const [status, setStatus] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(status);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>ปรับสถานะหม้อแปลง</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">สถานะ</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="เลือกสถานะ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spara">เปิดตัว Spara</SelectItem>
                <SelectItem value="removed">ถูกปลดออกจากระบบ</SelectItem>
                <SelectItem value="repair">อยู่ในระหว่างซ่อม</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">บันทึกข้อมูล</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
