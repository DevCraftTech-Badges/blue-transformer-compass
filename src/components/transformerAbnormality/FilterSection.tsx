
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FilterSectionProps {
  onFilterChange: (zone: string, transformer: string) => void;
}

export const FilterSection = ({ onFilterChange }: FilterSectionProps) => {
  const [zone, setZone] = React.useState('');
  const [transformer, setTransformer] = React.useState('');

  const handleZoneChange = (value: string) => {
    setZone(value);
    onFilterChange(value, transformer);
  };

  const handleTransformerChange = (value: string) => {
    setTransformer(value);
    onFilterChange(zone, value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">เขต (Zone)</label>
        <Select value={zone} onValueChange={handleZoneChange}>
          <SelectTrigger>
            <SelectValue placeholder="เลือกเขต" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="north">เขตภาคเหนือ</SelectItem>
            <SelectItem value="northeast">เขตภาคตะวันออกเฉียงเหนือ</SelectItem>
            <SelectItem value="central">เขตภาคกลาง</SelectItem>
            <SelectItem value="south">เขตภาคใต้</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">หม้อแปลงไฟฟ้า (Transformer)</label>
        <Select value={transformer} onValueChange={handleTransformerChange}>
          <SelectTrigger>
            <SelectValue placeholder="เลือกหม้อแปลง" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tr1">TR1</SelectItem>
            <SelectItem value="tr2">TR2</SelectItem>
            <SelectItem value="tr3">TR3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
