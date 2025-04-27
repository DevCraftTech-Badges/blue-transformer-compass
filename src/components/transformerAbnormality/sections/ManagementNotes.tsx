
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ManagementNotesProps {
  form: any;
  management: string;
  setManagement: (value: string) => void;
}

export const ManagementNotes = ({
  form,
  management,
  setManagement,
}: ManagementNotesProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="management"
        render={({ field }) => (
          <FormItem>
            <FormLabel>การจัดการ</FormLabel>
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                setManagement(value);
              }}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกการจัดการ" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="repair">ซ่อมแซม</SelectItem>
                <SelectItem value="replace">เปลี่ยนใหม่</SelectItem>
                <SelectItem value="monitor">เฝ้าติดตาม</SelectItem>
                <SelectItem value="other">อื่นๆ</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      {management === 'other' && (
        <FormField
          control={form.control}
          name="managementOther"
          render={({ field }) => (
            <FormItem>
              <FormLabel>อื่นๆ ระบุ (การจัดการ)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="ระบุการจัดการ" />
              </FormControl>
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="remark"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>หมายเหตุ (Remark)</FormLabel>
            <FormControl>
              <Textarea {...field} placeholder="ระบุหมายเหตุ" />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
