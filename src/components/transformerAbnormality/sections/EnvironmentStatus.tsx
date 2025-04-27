
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

interface EnvironmentStatusProps {
  form: any;
  environment: string;
  setEnvironment: (value: string) => void;
  operationStatus: string;
  setOperationStatus: (value: string) => void;
  testDetails: string;
  setTestDetails: (value: string) => void;
}

export const EnvironmentStatus = ({
  form,
  environment,
  setEnvironment,
  operationStatus,
  setOperationStatus,
  testDetails,
  setTestDetails,
}: EnvironmentStatusProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="environment"
        render={({ field }) => (
          <FormItem>
            <FormLabel>สภาพแวดล้อม</FormLabel>
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                setEnvironment(value);
              }}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกสภาพแวดล้อม" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="normal">ปกติ</SelectItem>
                <SelectItem value="humid">ชื้น</SelectItem>
                <SelectItem value="dusty">มีฝุ่นมาก</SelectItem>
                <SelectItem value="other">อื่นๆ</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      {environment === 'other' && (
        <FormField
          control={form.control}
          name="environmentOther"
          render={({ field }) => (
            <FormItem>
              <FormLabel>อื่นๆ ระบุ (สภาพแวดล้อม)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="ระบุสภาพแวดล้อม" />
              </FormControl>
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="operationStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>สถานะการใช้งานขณะทดสอบคาปกติ</FormLabel>
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                setOperationStatus(value);
              }}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกสถานะการใช้งาน" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="other">อื่นๆ</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      {operationStatus === 'other' && (
        <FormField
          control={form.control}
          name="operationStatusOther"
          render={({ field }) => (
            <FormItem>
              <FormLabel>อื่นๆ ระบุ (สถานะการใช้งาน)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="ระบุสถานะการใช้งาน" />
              </FormControl>
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="testDetails"
        render={({ field }) => (
          <FormItem>
            <FormLabel>รายละเอียดขณะทดสอบคาปกติ</FormLabel>
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                setTestDetails(value);
              }}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกรายละเอียด" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="normal">ปกติ</SelectItem>
                <SelectItem value="abnormal">ผิดปกติ</SelectItem>
                <SelectItem value="other">อื่นๆ</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      {testDetails === 'other' && (
        <FormField
          control={form.control}
          name="testDetailsOther"
          render={({ field }) => (
            <FormItem>
              <FormLabel>อื่นๆ ระบุ (รายละเอียดทดสอบ)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="ระบุรายละเอียด" />
              </FormControl>
            </FormItem>
          )}
        />
      )}
    </div>
  );
};
