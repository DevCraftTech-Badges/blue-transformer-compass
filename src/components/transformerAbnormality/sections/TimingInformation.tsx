
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
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

interface TimingInformationProps {
  form: any;
  hours: string[];
  minutes: string[];
}

export const TimingInformation = ({ form, hours, minutes }: TimingInformationProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="removalDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>วันที่ปลดออกจากระบบ</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>เลือกวันที่</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="removalHour"
        render={({ field }) => (
          <FormItem>
            <FormLabel>เวลาที่ปลดออกจากระบบ (ชั่วโมง)</FormLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="ชั่วโมง" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {hours.map((hour) => (
                  <SelectItem key={hour} value={hour}>
                    {hour}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="removalMinute"
        render={({ field }) => (
          <FormItem>
            <FormLabel>เวลาที่ปลดออกจากระบบ (นาที)</FormLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="นาที" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {minutes.map((minute) => (
                  <SelectItem key={minute} value={minute}>
                    {minute}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="returnDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>วันที่กลับเข้าระบบ</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>เลือกวันที่</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="returnHour"
        render={({ field }) => (
          <FormItem>
            <FormLabel>เวลากลับเข้าระบบ (ชั่วโมง)</FormLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="ชั่วโมง" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {hours.map((hour) => (
                  <SelectItem key={hour} value={hour}>
                    {hour}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="returnMinute"
        render={({ field }) => (
          <FormItem>
            <FormLabel>เวลากลับเข้าระบบ (นาที)</FormLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="นาที" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {minutes.map((minute) => (
                  <SelectItem key={minute} value={minute}>
                    {minute}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="approvalDocNo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>เลขที่หนังสืออนุมัติ</FormLabel>
            <FormControl>
              <Input {...field} placeholder="ระบุเลขที่หนังสืออนุมัติ" />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
