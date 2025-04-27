
import { Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface CreateOilContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateOilContactModal = ({
  open,
  onOpenChange
}: CreateOilContactModalProps) => {
  const [date, setDate] = useState<Date>();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>สร้างรายการใหม่</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="transformer">หม้อแปลงไฟฟ้า</Label>
              <Select>
                <SelectTrigger id="transformer">
                  <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tr1">TR-001</SelectItem>
                  <SelectItem value="tr2">TR-002</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="testType">รูปแบบการทดสอบ</Label>
              <Select>
                <SelectTrigger id="testType">
                  <SelectValue placeholder="เลือกรูปแบบการทดสอบ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="routine">Routine Test</SelectItem>
                  <SelectItem value="special">Special Test</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="inspector">ผู้ทดสอบ</Label>
              <Input id="inspector" placeholder="ระบุผู้ทดสอบ" />
            </div>

            <div className="space-y-2">
              <Label>วันที่ตรวจสอบ</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>เลือกวันที่</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="workOrder">เลขที่คำสั่งปฏิบัติงาน</Label>
              <Input id="workOrder" placeholder="ระบุเลขที่คำสั่ง" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="oltcType">ชนิด OLTC</Label>
              <Select>
                <SelectTrigger id="oltcType">
                  <SelectValue placeholder="เลือกชนิด OLTC" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="type1">Type 1</SelectItem>
                  <SelectItem value="type2">Type 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Transition Resistance</h3>
              <div className="grid grid-cols-2 gap-4">
                {['A', 'B', 'C'].map(phase => (
                  <div key={`tr-${phase}`} className="space-y-2">
                    <Label>Phase {phase}</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <Label htmlFor={`r1-${phase}`} className="text-sm">R1</Label>
                        <Input id={`r1-${phase}`} placeholder="R1" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor={`r2-${phase}`} className="text-sm">R2</Label>
                        <Input id={`r2-${phase}`} placeholder="R2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact Wear</h3>
              <div className="grid grid-cols-2 gap-4">
                {['A', 'B', 'C'].map(phase => (
                  <div key={`cw-${phase}`} className="space-y-2">
                    <Label>Phase {phase}</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <Label htmlFor={`stationary-${phase}`} className="text-sm">Stationary</Label>
                        <Input id={`stationary-${phase}`} placeholder="Stationary" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor={`moving-${phase}`} className="text-sm">Moving</Label>
                        <Input id={`moving-${phase}`} placeholder="Moving" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button 
            onClick={() => onOpenChange(false)}
            variant="outline"
          >
            ยกเลิก
          </Button>
          <Button>บันทึกข้อมูล</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOilContactModal;
