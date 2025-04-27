
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface RelocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  transformer: any;
}

export const RelocationModal = ({
  isOpen,
  onClose,
  onSubmit,
  transformer,
}: RelocationModalProps) => {
  const [formData, setFormData] = React.useState({
    equipmentNo: '',
    oldStation: '',
    newStation: '',
    newName: '',
    relocationDate: '',
    recordedBy: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>ย้ายหม้อแปลง</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Equipment No.</label>
              <Input
                value={formData.equipmentNo}
                onChange={(e) =>
                  setFormData({ ...formData, equipmentNo: e.target.value })
                }
                readOnly
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">สถานีเก่า</label>
              <Input
                value={formData.oldStation}
                onChange={(e) =>
                  setFormData({ ...formData, oldStation: e.target.value })
                }
                readOnly
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">ย้ายไปสถานีใหม่</label>
              <Select
                value={formData.newStation}
                onValueChange={(value) =>
                  setFormData({ ...formData, newStation: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="เลือกสถานีใหม่" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="station1">Station 1</SelectItem>
                  <SelectItem value="station2">Station 2</SelectItem>
                  <SelectItem value="station3">Station 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">ชื่อหม้อแปลงใหม่</label>
              <Input
                placeholder="เช่น KT1A"
                value={formData.newName}
                onChange={(e) =>
                  setFormData({ ...formData, newName: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">วันที่ย้าย</label>
              <Input
                type="date"
                value={formData.relocationDate}
                onChange={(e) =>
                  setFormData({ ...formData, relocationDate: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">ผู้บันทึก</label>
              <Input
                value={formData.recordedBy}
                onChange={(e) =>
                  setFormData({ ...formData, recordedBy: e.target.value })
                }
              />
            </div>
          </div>
          <Button type="submit" className="w-full">บันทึกข้อมูล</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
