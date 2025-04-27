import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

interface AbnormalityFormProps {
  selectedZone: string;
  selectedTransformer: string;
}

export const AbnormalityForm = ({
  selectedZone,
  selectedTransformer,
}: AbnormalityFormProps) => {
  const form = useForm();
  const [environment, setEnvironment] = React.useState('');
  const [operationStatus, setOperationStatus] = React.useState('');
  const [testDetails, setTestDetails] = React.useState('');
  const [subGroup, setSubGroup] = React.useState('');
  const [testPart, setTestPart] = React.useState('');
  const [damageLevel, setDamageLevel] = React.useState('');
  const [damageCause, setDamageCause] = React.useState('');
  const [management, setManagement] = React.useState('');

  const generateTimeOptions = (max: number) => {
    return Array.from({ length: max }, (_, i) => 
      i.toString().padStart(2, '0')
    );
  };

  const hours = generateTimeOptions(24);
  const minutes = generateTimeOptions(60);

  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data);
    // Handle form submission
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Readonly Fields */}
          <FormField
            control={form.control}
            name="zone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>เขต</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={selectedZone}
                    readOnly
                    className="bg-gray-100"
                  />
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
                  <Input
                    {...field}
                    value={selectedTransformer}
                    readOnly
                    className="bg-gray-100"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Equipment Number */}
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

          {/* Production Date */}
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

          {/* OLTC Operation Count */}
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

          {/* Environment */}
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

          {/* Environment Other */}
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

          {/* Operation Status */}
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

          {/* Operation Status Other */}
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

          {/* Test Details */}
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

          {/* Test Details Other */}
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

          {/* System Removal Date */}
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

          {/* Removal Time - Hour */}
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

          {/* Removal Time - Minute */}
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

          {/* Return to System Date */}
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

          {/* Return Time - Hour */}
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

          {/* Return Time - Minute */}
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

          {/* Approval Document Number */}
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

          {/* Sub Group */}
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

          {/* Sub Group Other */}
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

          {/* Test Part */}
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

          {/* Test Part Other */}
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

          {/* Damage Level */}
          <FormField
            control={form.control}
            name="damageLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ระดับความเสียหาย</FormLabel>
                <Select 
                  value={field.value} 
                  onValueChange={(value) => {
                    field.onChange(value);
                    setDamageLevel(value);
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกระดับความเสียหาย" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">ต่ำ</SelectItem>
                    <SelectItem value="medium">ปานกลาง</SelectItem>
                    <SelectItem value="high">สูง</SelectItem>
                    <SelectItem value="other">อื่นๆ</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* Damage Level Other */}
          {damageLevel === 'other' && (
            <FormField
              control={form.control}
              name="damageLevelOther"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>อื่นๆ ระบุ (ระดับความเสียหาย)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="ระบุระดับความเสียหาย" />
                  </FormControl>
                </FormItem>
              )}
            />
          )}

          {/* Damage Cause */}
          <FormField
            control={form.control}
            name="damageCause"
            render={({ field }) => (
              <FormItem>
                <FormLabel>สาเหตุความเสียหาย</FormLabel>
                <Select 
                  value={field.value} 
                  onValueChange={(value) => {
                    field.onChange(value);
                    setDamageCause(value);
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกสาเหตุความเสียหาย" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="aging">อายุการใช้งาน</SelectItem>
                    <SelectItem value="overload">โหลดเกิน</SelectItem>
                    <SelectItem value="shortcircuit">ไฟฟ้าลัดวงจร</SelectItem>
                    <SelectItem value="other">อื่นๆ</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* Damage Cause Other */}
          {damageCause === 'other' && (
            <FormField
              control={form.control}
              name="damageCauseOther"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>อื่นๆ ระบุ (สาเหตุความเสียหาย)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="ระบุสาเหตุความเสียหาย" />
                  </FormControl>
                </FormItem>
              )}
            />
          )}

          {/* Management */}
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

          {/* Management Other */}
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

          {/* Remark */}
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

        <div className="sticky bottom-0 bg-white p-4 border-t mt-6">
          <Button type="submit" className="w-full md:w-auto">
            บันทึกข้อมูล
          </Button>
        </div>
      </form>
    </Form>
  );
};
