import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

interface ExcitingCurrentMeasurementFormData {
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
  remark?: string;
  // LV WDG measurements
  lvWdg?: {
    terminal: string;
    acVolt?: string;
    acKv?: string;
    acMa?: string;
    n?: string;
  }[];
  // TV WDG measurements  
  tvWdg?: {
    terminal: string;
    acVolt?: string;
    acKv?: string;
    acMa?: string;
    n?: string;
  }[];
  // HV WDG measurements
  hvWdg?: {
    terminal: string;
    acVolt?: string;
    acKv?: string;
    acMa?: string;
    n?: string;
  }[];
  // HV WDG Position measurements (12R to 12L)
  hvWdgPositions?: {
    position: string;
    hh0hh1?: string;
    h1h0?: string;
    h3h0h3h1?: string;
  }[];
}

interface ExcitingCurrentMeasurementFormProps {
  initialData?: ExcitingCurrentMeasurementFormData;
  onSubmit: (data: ExcitingCurrentMeasurementFormData) => void;
  onCancel: () => void;
}

const ExcitingCurrentMeasurementForm: React.FC<ExcitingCurrentMeasurementFormProps> = ({
  initialData,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<ExcitingCurrentMeasurementFormData>(
    initialData || {
      lvWdg: [{ terminal: 'L1-L0', acVolt: '', acKv: '', acMa: '', n: '' }],
      tvWdg: [{ terminal: 'T1-T0', acVolt: '', acKv: '', acMa: '', n: '' }],
      hvWdg: [{ terminal: 'H1-H0', acVolt: '', acKv: '', acMa: '', n: '' }],
      hvWdgPositions: [
        { position: '12R', hh0hh1: '', h1h0: '', h3h0h3h1: '' },
        { position: '11R', hh0hh1: '', h1h0: '', h3h0h3h1: '' },
        { position: '10R', hh0hh1: '', h1h0: '', h3h0h3h1: '' },
        { position: '9R', hh0hh1: '', h1h0: '', h3h0h3h1: '' },
        { position: '8R', hh0hh1: '', h1h0: '', h3h0h3h1: '' },
        { position: '7R', hh0hh1: '', h1h0: '', h3h0h3h1: '' },
        { position: '6R', hh0hh1: '', h1h0: '', h3h0h3h1: '' },
        { position: 'N', hh0hh1: '', h1h0: '', h3h0h3h1: '' },
        { position: '6L', hh0hh1: '', h1h0: '', h3h0h3h1: '' },
        { position: '7L', hh0hh1: '', h1h0: '', h3h0h3h1: '' },
        { position: '8L', hh0hh1: '', h1h0: '', h3h0h3h1: '' },
        { position: '9L', hh0hh1: '', h1h0: '', h3h0h3h1: '' },
        { position: '10L', hh0hh1: '', h1h0: '', h3h0h3h1: '' },
        { position: '11L', hh0hh1: '', h1h0: '', h3h0h3h1: '' },
        { position: '12L', hh0hh1: '', h1h0: '', h3h0h3h1: '' },
      ]
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof ExcitingCurrentMeasurementFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateTableData = (
    tableType: 'lvWdg' | 'tvWdg' | 'hvWdg' | 'hvWdgPositions',
    index: number,
    field: string,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [tableType]: prev[tableType]?.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto">
      {/* General Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="transformer">หม้อแปลงไฟฟ้า</Label>
          <Select value={formData.transformer} onValueChange={(value) => handleInputChange('transformer', value)}>
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
          <Select value={formData.testType} onValueChange={(value) => handleInputChange('testType', value)}>
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
            onChange={(e) => handleInputChange('inspector', e.target.value)}
            placeholder="ระบุผู้ตรวจสอบ"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="workOrderNo">เลขที่คำสั่งปฏิบัติงาน</Label>
          <Input
            id="workOrderNo"
            value={formData.workOrderNo || ''}
            onChange={(e) => handleInputChange('workOrderNo', e.target.value)}
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
                onSelect={(date) => handleInputChange('inspectionDate', date)}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="oilTemp">Oil Temp.</Label>
          <Input
            id="oilTemp"
            value={formData.oilTemp || ''}
            onChange={(e) => handleInputChange('oilTemp', e.target.value)}
            placeholder="Oil Temperature"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ambientTemp">Ambient Temp.</Label>
          <Input
            id="ambientTemp"
            value={formData.ambientTemp || ''}
            onChange={(e) => handleInputChange('ambientTemp', e.target.value)}
            placeholder="Ambient Temperature"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="wdgTemp">Wdg Temp.</Label>
          <Input
            id="wdgTemp"
            value={formData.wdgTemp || ''}
            onChange={(e) => handleInputChange('wdgTemp', e.target.value)}
            placeholder="Winding Temperature"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="humidity">Humidity</Label>
          <Input
            id="humidity"
            value={formData.humidity || ''}
            onChange={(e) => handleInputChange('humidity', e.target.value)}
            placeholder="Humidity"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="weather">Weather</Label>
          <Input
            id="weather"
            value={formData.weather || ''}
            onChange={(e) => handleInputChange('weather', e.target.value)}
            placeholder="Weather Condition"
          />
        </div>
      </div>

      {/* Two Column Layout for Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - LV, TV, HV Tables */}
        <div className="lg:col-span-2 space-y-6">
          {/* LV WDG Table */}
          <div>
            <h3 className="text-lg font-semibold mb-3">LV WDG</h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-sm">Terminal</th>
                    <th className="border border-gray-300 px-3 py-2 text-sm">AC(VOLT)</th>
                    <th className="border border-gray-300 px-3 py-2 text-sm">AC(kV)</th>
                    <th className="border border-gray-300 px-3 py-2 text-sm">AC(mA)</th>
                    <th className="border border-gray-300 px-3 py-2 text-sm">N</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.lvWdg?.map((row, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-2 py-1">
                        <Input
                          value={row.terminal}
                          onChange={(e) => updateTableData('lvWdg', index, 'terminal', e.target.value)}
                          className="text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-1">
                        <Input
                          value={row.acVolt || ''}
                          onChange={(e) => updateTableData('lvWdg', index, 'acVolt', e.target.value)}
                          className="text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-1">
                        <Input
                          value={row.acKv || ''}
                          onChange={(e) => updateTableData('lvWdg', index, 'acKv', e.target.value)}
                          className="text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-1">
                        <Input
                          value={row.acMa || ''}
                          onChange={(e) => updateTableData('lvWdg', index, 'acMa', e.target.value)}
                          className="text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-1">
                        <Input
                          value={row.n || ''}
                          onChange={(e) => updateTableData('lvWdg', index, 'n', e.target.value)}
                          className="text-sm"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* TV WDG Table */}
          <div>
            <h3 className="text-lg font-semibold mb-3">TV WDG</h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-sm">Terminal</th>
                    <th className="border border-gray-300 px-3 py-2 text-sm">AC(VOLT)</th>
                    <th className="border border-gray-300 px-3 py-2 text-sm">AC(kV)</th>
                    <th className="border border-gray-300 px-3 py-2 text-sm">AC(mA)</th>
                    <th className="border border-gray-300 px-3 py-2 text-sm">N</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.tvWdg?.map((row, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-2 py-1">
                        <Input
                          value={row.terminal}
                          onChange={(e) => updateTableData('tvWdg', index, 'terminal', e.target.value)}
                          className="text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-1">
                        <Input
                          value={row.acVolt || ''}
                          onChange={(e) => updateTableData('tvWdg', index, 'acVolt', e.target.value)}
                          className="text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-1">
                        <Input
                          value={row.acKv || ''}
                          onChange={(e) => updateTableData('tvWdg', index, 'acKv', e.target.value)}
                          className="text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-1">
                        <Input
                          value={row.acMa || ''}
                          onChange={(e) => updateTableData('tvWdg', index, 'acMa', e.target.value)}
                          className="text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-1">
                        <Input
                          value={row.n || ''}
                          onChange={(e) => updateTableData('tvWdg', index, 'n', e.target.value)}
                          className="text-sm"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* HV WDG Table */}
          <div>
            <h3 className="text-lg font-semibold mb-3">HV WDG</h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-sm">Terminal</th>
                    <th className="border border-gray-300 px-3 py-2 text-sm">AC(VOLT)</th>
                    <th className="border border-gray-300 px-3 py-2 text-sm">AC(kV)</th>
                    <th className="border border-gray-300 px-3 py-2 text-sm">AC(mA)</th>
                    <th className="border border-gray-300 px-3 py-2 text-sm">N</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.hvWdg?.map((row, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-2 py-1">
                        <Input
                          value={row.terminal}
                          onChange={(e) => updateTableData('hvWdg', index, 'terminal', e.target.value)}
                          className="text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-1">
                        <Input
                          value={row.acVolt || ''}
                          onChange={(e) => updateTableData('hvWdg', index, 'acVolt', e.target.value)}
                          className="text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-1">
                        <Input
                          value={row.acKv || ''}
                          onChange={(e) => updateTableData('hvWdg', index, 'acKv', e.target.value)}
                          className="text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-1">
                        <Input
                          value={row.acMa || ''}
                          onChange={(e) => updateTableData('hvWdg', index, 'acMa', e.target.value)}
                          className="text-sm"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-1">
                        <Input
                          value={row.n || ''}
                          onChange={(e) => updateTableData('hvWdg', index, 'n', e.target.value)}
                          className="text-sm"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - HV WDG Position Table */}
        <div>
          <h3 className="text-lg font-semibold mb-3">HV WDG Position</h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-2 py-2 text-xs">Position</th>
                  <th className="border border-gray-300 px-2 py-2 text-xs">HH0/HH1</th>
                  <th className="border border-gray-300 px-2 py-2 text-xs">H1H0</th>
                  <th className="border border-gray-300 px-2 py-2 text-xs">H3H0/H3H1</th>
                </tr>
              </thead>
              <tbody>
                {formData.hvWdgPositions?.map((row, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-1 py-1 text-center text-sm font-medium">
                      {row.position}
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <Input
                        value={row.hh0hh1 || ''}
                        onChange={(e) => updateTableData('hvWdgPositions', index, 'hh0hh1', e.target.value)}
                        className="text-xs h-8"
                      />
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <Input
                        value={row.h1h0 || ''}
                        onChange={(e) => updateTableData('hvWdgPositions', index, 'h1h0', e.target.value)}
                        className="text-xs h-8"
                      />
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <Input
                        value={row.h3h0h3h1 || ''}
                        onChange={(e) => updateTableData('hvWdgPositions', index, 'h3h0h3h1', e.target.value)}
                        className="text-xs h-8"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Remarks */}
      <div className="space-y-2">
        <Label htmlFor="remark">REMARK</Label>
        <Textarea
          id="remark"
          value={formData.remark || ''}
          onChange={(e) => handleInputChange('remark', e.target.value)}
          placeholder="หมายเหตุ"
          rows={3}
        />
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          ยกเลิก
        </Button>
        <Button type="submit">
          บันทึก
        </Button>
      </div>
    </form>
  );
};

export default ExcitingCurrentMeasurementForm;