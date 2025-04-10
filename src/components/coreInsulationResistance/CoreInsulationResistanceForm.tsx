
import React from 'react';
import { useForm } from 'react-hook-form';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { DialogFooter } from '@/components/ui/dialog';

// Sample transformer options
const transformerOptions = [
  { value: 'TF-1000', label: 'TF-1000 - สถานีย่อยบางพลี' },
  { value: 'TF-1001', label: 'TF-1001 - สถานีย่อยลาดกระบัง' },
  { value: 'TF-1002', label: 'TF-1002 - สถานีย่อยบางกรวย' },
  { value: 'TF-1003', label: 'TF-1003 - สถานีย่อยนนทบุรี' },
  { value: 'TF-1004', label: 'TF-1004 - สถานีย่อยรังสิต' },
];

// Test type options
const testTypeOptions = [
  { value: 'แกนเหล็ก-ถัง', label: 'แกนเหล็ก-ถัง (Core-Tank)' },
  { value: 'ระหว่างชั้น', label: 'ระหว่างชั้น (Between Layers)' },
];

interface CoreInsulationResistanceFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const CoreInsulationResistanceForm: React.FC<CoreInsulationResistanceFormProps> = ({
  initialData,
  onSubmit,
  onCancel
}) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: initialData || {
      transformer: '',
      egat_sn: '',
      test_type: '',
      test_date: new Date().toISOString().split('T')[0],
      work_order: '',
      inspector: '',
      resistance: '',
    }
  });

  const viewOnly = initialData?.viewOnly;
  const selectedDate = watch('test_date');

  // Set form values for select components
  const handleTransformerChange = (value: string) => {
    setValue('transformer', value);
    
    // Find the matching EGAT S/N based on transformer (in a real app, this would be fetched from an API)
    const egat_sn = 
      value === 'TF-1000' ? 'EG-001-2023' :
      value === 'TF-1001' ? 'EG-002-2023' :
      value === 'TF-1002' ? 'EG-003-2023' :
      value === 'TF-1003' ? 'EG-004-2023' :
      value === 'TF-1004' ? 'EG-005-2023' : '';
    
    setValue('egat_sn', egat_sn);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
        {/* หม้อแปลงไฟฟ้า */}
        <div className="space-y-2">
          <Label htmlFor="transformer">หม้อแปลงไฟฟ้า</Label>
          <Select 
            defaultValue={initialData?.transformer || ''} 
            onValueChange={handleTransformerChange}
            disabled={viewOnly}
          >
            <SelectTrigger id="transformer">
              <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
            </SelectTrigger>
            <SelectContent>
              {transformerOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* EGAT S/N (this will be auto-filled based on transformer) */}
        <div className="space-y-2">
          <Label htmlFor="egat_sn">EGAT S/N</Label>
          <Input 
            id="egat_sn" 
            {...register('egat_sn')} 
            readOnly 
            className="bg-muted/50"
          />
        </div>

        {/* รูปแบบการทดสอบ */}
        <div className="space-y-2">
          <Label htmlFor="test_type">รูปแบบการทดสอบ</Label>
          <Select 
            defaultValue={initialData?.test_type || ''} 
            onValueChange={(value) => setValue('test_type', value)}
            disabled={viewOnly}
          >
            <SelectTrigger id="test_type">
              <SelectValue placeholder="เลือกรูปแบบการทดสอบ" />
            </SelectTrigger>
            <SelectContent>
              {testTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* วันที่ตรวจสอบ */}
        <div className="space-y-2">
          <Label htmlFor="test_date">วันที่ตรวจสอบ</Label>
          {viewOnly ? (
            <Input 
              id="test_date" 
              value={initialData?.test_date || ''} 
              readOnly 
              className="bg-muted/50"
            />
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(new Date(selectedDate), 'yyyy-MM-dd') : <span>เลือกวันที่</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate ? new Date(selectedDate) : undefined}
                  onSelect={(date) => setValue('test_date', date ? format(date, 'yyyy-MM-dd') : '')}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* เลขที่คำสั่งปฏิบัติงาน */}
        <div className="space-y-2">
          <Label htmlFor="work_order">เลขที่คำสั่งปฏิบัติงาน</Label>
          <Input 
            id="work_order" 
            {...register('work_order')} 
            readOnly={viewOnly}
            className={cn(viewOnly && "bg-muted/50")}
          />
        </div>

        {/* ผู้ตรวจสอบ */}
        <div className="space-y-2">
          <Label htmlFor="inspector">ผู้ตรวจสอบ</Label>
          <Input 
            id="inspector" 
            {...register('inspector')} 
            readOnly={viewOnly}
            className={cn(viewOnly && "bg-muted/50")}
          />
        </div>

        {/* Resistance (MΩ) */}
        <div className="space-y-2">
          <Label htmlFor="resistance">Resistance (MΩ)</Label>
          <Input 
            id="resistance" 
            type="number" 
            placeholder="0.00" 
            {...register('resistance')} 
            readOnly={viewOnly}
            className={cn(viewOnly && "bg-muted/50")}
          />
        </div>
      </div>

      <DialogFooter className="gap-2 pt-2">
        {viewOnly ? (
          <Button type="button" onClick={onCancel}>
            ปิด
          </Button>
        ) : (
          <>
            <Button type="button" variant="outline" onClick={onCancel}>
              ยกเลิก
            </Button>
            <Button type="submit">
              บันทึก
            </Button>
          </>
        )}
      </DialogFooter>
    </form>
  );
};

export default CoreInsulationResistanceForm;
