
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface SearchFormProps {
  onSearch: (equipmentNo: string, status: string) => void;
}

export const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [equipmentNo, setEquipmentNo] = React.useState('');
  const [status, setStatus] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(equipmentNo, status);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label htmlFor="equipmentNo" className="text-sm font-medium">
            Equipment No.
          </label>
          <Input
            id="equipmentNo"
            value={equipmentNo}
            onChange={(e) => setEquipmentNo(e.target.value)}
            placeholder="Enter equipment number"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="status" className="text-sm font-medium">
            สถานะ
          </label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger id="status">
              <SelectValue placeholder="เลือกสถานะ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">ใช้งาน</SelectItem>
              <SelectItem value="inactive">เสีย</SelectItem>
              <SelectItem value="repair">ซ่อม</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button type="submit" className="w-full md:w-auto">
            ค้นหา
          </Button>
        </div>
      </div>
    </form>
  );
};
