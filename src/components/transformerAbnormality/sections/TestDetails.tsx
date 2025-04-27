
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TestDetailsProps {
  form: any;
  subGroup: string;
  setSubGroup: (value: string) => void;
  testPart: string;
  setTestPart: (value: string) => void;
}

export const TestDetails = ({
  form,
  subGroup,
  setSubGroup,
  testPart,
  setTestPart,
}: TestDetailsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="subGroup"
        render={({ field }) => (
          <FormItem>
            <FormLabel>กลุ่มส่วนหนึ่งที่เลือกขณะทดสอบคาปกติ</FormLabel>
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                setSubGroup(value);
              }}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกกลุ่มส่วน" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="group1">กลุ่ม 1</SelectItem>
                <SelectItem value="group2">กลุ่ม 2</SelectItem>
                <SelectItem value="group3">กลุ่ม 3</SelectItem>
                <SelectItem value="other">อื่นๆ</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      {subGroup === 'other' && (
        <FormField
          control={form.control}
          name="subGroupOther"
          render={({ field }) => (
            <FormItem>
              <FormLabel>อื่นๆ ระบุ (กลุ่มส่วนหนึ่ง)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="ระบุกลุ่มส่วน" />
              </FormControl>
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="testPart"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ชิ้นส่วนที่ทดสอบคาปกติ</FormLabel>
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                setTestPart(value);
              }}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกชิ้นส่วน" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="part1">ชิ้นส่วน 1</SelectItem>
                <SelectItem value="part2">ชิ้นส่วน 2</SelectItem>
                <SelectItem value="part3">ชิ้นส่วน 3</SelectItem>
                <SelectItem value="other">อื่นๆ</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      {testPart === 'other' && (
        <FormField
          control={form.control}
          name="testPartOther"
          render={({ field }) => (
            <FormItem>
              <FormLabel>อื่นๆ ระบุ (ชิ้นส่วนที่ทดสอบ)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="ระบุชิ้นส่วน" />
              </FormControl>
            </FormItem>
          )}
        />
      )}
    </div>
  );
};
