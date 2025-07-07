import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface GeneralInformationSectionProps {
  formData: {
    transformer?: string;
    testType?: string;
    inspector?: string;
    workOrderNo?: string;
    inspectionDate?: Date;
    oilTemp?: string;
    ambientTemp?: string;
    wdgTemp?: string;
    humidity?: string;
    weather?: string;
  };
  onInputChange: (field: string, value: any) => void;
}

const GeneralInformationSection: React.FC<GeneralInformationSectionProps> = ({
  formData,
  onInputChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label htmlFor="transformer">หม้อแปลงไฟฟ้า</Label>
        <Select value={formData.transformer} onValueChange={(value) => onInputChange('transformer', value)}>
          <SelectTrigger>
            <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TR-001">TR-001</SelectItem>
            <SelectItem value="TR-002">TR-002</SelectItem>
            <SelectItem value="TR-003">TR-003</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="testType">รูปแบบการทดสอบ</Label>
        <Select value={formData.testType} onValueChange={(value) => onInputChange('testType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="เลือกรูปแบบการทดสอบ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Standard Test">Standard Test</SelectItem>
            <SelectItem value="Emergency Test">Emergency Test</SelectItem>
            <SelectItem value="Routine Test">Routine Test</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="inspector">ผู้ตรวจสอบ</Label>
        <Input
          id="inspector"
          value={formData.inspector || ''}
          onChange={(e) => onInputChange('inspector', e.target.value)}
          placeholder="ระบุผู้ตรวจสอบ"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="workOrderNo">เลขที่คำสั่งปฏิบัติงาน</Label>
        <Input
          id="workOrderNo"
          value={formData.workOrderNo || ''}
          onChange={(e) => onInputChange('workOrderNo', e.target.value)}
          placeholder="เลขที่คำสั่งปฏิบัติงาน"
        />
      </div>

      <div className="space-y-2">
        <Label>วันที่ตรวจสอบ</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !formData.inspectionDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.inspectionDate ? format(formData.inspectionDate, "PPP") : "เลือกวันที่"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={formData.inspectionDate}
              onSelect={(date) => onInputChange('inspectionDate', date)}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="oilTemp">Oil Temp. (°C)</Label>
        <Input
          id="oilTemp"
          type="number"
          value={formData.oilTemp || ''}
          onChange={(e) => onInputChange('oilTemp', e.target.value)}
          placeholder="Oil Temperature"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ambientTemp">Ambient Temp. (°C)</Label>
        <Input
          id="ambientTemp"
          type="number"
          value={formData.ambientTemp || ''}
          onChange={(e) => onInputChange('ambientTemp', e.target.value)}
          placeholder="Ambient Temperature"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="wdgTemp">Wdg Temp. (°C)</Label>
        <Input
          id="wdgTemp"
          type="number"
          value={formData.wdgTemp || ''}
          onChange={(e) => onInputChange('wdgTemp', e.target.value)}
          placeholder="Winding Temperature"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="humidity">Humidity (%)</Label>
        <Input
          id="humidity"
          type="number"
          value={formData.humidity || ''}
          onChange={(e) => onInputChange('humidity', e.target.value)}
          placeholder="Humidity"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="weather">Weather</Label>
        <Input
          id="weather"
          value={formData.weather || ''}
          onChange={(e) => onInputChange('weather', e.target.value)}
          placeholder="Weather Condition"
        />
      </div>
    </div>
  );
};

export default GeneralInformationSection;