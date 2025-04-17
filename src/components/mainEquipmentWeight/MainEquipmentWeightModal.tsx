
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { MainEquipmentWeightItem } from './MainEquipmentWeightPage';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MainEquipmentWeightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<MainEquipmentWeightItem, 'id'>) => void;
  item: MainEquipmentWeightItem | null;
}

// Form validation schema
const formSchema = z.object({
  activePart: z.coerce
    .number()
    .nonnegative({ message: "ต้องเป็นค่าบวกหรือศูนย์" })
    .max(100, { message: "ค่าสูงสุดคือ 100" }),
  bushing: z.coerce
    .number()
    .nonnegative({ message: "ต้องเป็นค่าบวกหรือศูนย์" })
    .max(100, { message: "ค่าสูงสุดคือ 100" }),
  arrester: z.coerce
    .number()
    .nonnegative({ message: "ต้องเป็นค่าบวกหรือศูนย์" })
    .max(100, { message: "ค่าสูงสุดคือ 100" }),
  oil: z.coerce
    .number()
    .nonnegative({ message: "ต้องเป็นค่าบวกหรือศูนย์" })
    .max(100, { message: "ค่าสูงสุดคือ 100" }),
  oltc: z.coerce
    .number()
    .nonnegative({ message: "ต้องเป็นค่าบวกหรือศูนย์" })
    .max(100, { message: "ค่าสูงสุดคือ 100" }),
});

// Type for form values
type FormValues = z.infer<typeof formSchema>;

const MainEquipmentWeightModal: React.FC<MainEquipmentWeightModalProps> = ({
  isOpen,
  onClose,
  onSave,
  item,
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activePart: item?.activePart || 0,
      bushing: item?.bushing || 0,
      arrester: item?.arrester || 0,
      oil: item?.oil || 0,
      oltc: item?.oltc || 0,
    },
  });

  React.useEffect(() => {
    if (isOpen) {
      form.reset({
        activePart: item?.activePart || 0,
        bushing: item?.bushing || 0,
        arrester: item?.arrester || 0,
        oil: item?.oil || 0,
        oltc: item?.oltc || 0,
      });
    }
  }, [isOpen, item, form]);

  const onSubmit = (values: FormValues) => {
    onSave(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {item ? 'แก้ไขรายการ' : 'สร้างรายการใหม่'}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="activePart"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Active Part</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="กรอกค่า Active Part" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="bushing"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bushing</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="กรอกค่า Bushing" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="arrester"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Arrester</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="กรอกค่า Arrester" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="oil"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Oil</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="กรอกค่า Oil" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="oltc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OLTC</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="กรอกค่า OLTC" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="mt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
              >
                ยกเลิก
              </Button>
              <Button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700"
              >
                บันทึกข้อมูล
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MainEquipmentWeightModal;
