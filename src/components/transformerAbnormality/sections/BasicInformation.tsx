
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface BasicInformationProps {
  form: any;
  selectedZone: string;
  selectedTransformer: string;
}

export const BasicInformation = ({ form, selectedZone, selectedTransformer }: BasicInformationProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="zone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>เขต</FormLabel>
            <FormControl>
              <Input {...field} value={selectedZone} readOnly className="bg-gray-100" />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="transformer"
        render={({ field }) => (
          <FormItem>
            <FormLabel>หม้อแปลงไฟฟ้า</FormLabel>
            <FormControl>
              <Input {...field} value={selectedTransformer} readOnly className="bg-gray-100" />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="equipmentNo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Equipment No.</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter equipment number" />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="productionDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>วันที่ผลิตทุกชุด</FormLabel>
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
        name="oltcOperationCount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>จำนวนครั้งในการทำงานของ OLTC</FormLabel>
            <FormControl>
              <Input {...field} type="number" placeholder="0" />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
