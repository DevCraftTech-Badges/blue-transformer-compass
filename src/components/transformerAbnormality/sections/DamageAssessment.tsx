
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

interface DamageAssessmentProps {
  form: any;
  damageLevel: string;
  setDamageLevel: (value: string) => void;
  damageCause: string;
  setDamageCause: (value: string) => void;
}

export const DamageAssessment = ({
  form,
  damageLevel,
  setDamageLevel,
  damageCause,
  setDamageCause,
}: DamageAssessmentProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </div>
  );
};
