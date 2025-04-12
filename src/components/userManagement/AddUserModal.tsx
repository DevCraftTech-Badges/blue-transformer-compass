
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Define privilege titles
const privileges = [
  { id: 1, title: 'Visual Inspection' },
  { id: 2, title: 'ผลทดสอบทางน้ำมัน' },
  { id: 3, title: 'ผลทดสอบทางไฟฟ้า' },
  { id: 4, title: 'บำรุงรักษา OLTC' },
  { id: 5, title: 'ข้อมูลพื้นฐานของหม้อแปลง' },
  { id: 6, title: 'การย้ายหม้อแปลง' },
  { id: 7, title: 'รายงานความเสียหายของหม้อแปลง' },
  { id: 8, title: 'จัดการบัญชีผู้ใช้งานระบบ' },
  { id: 9, title: 'Center Administrator' },
];

// Define form schema
const formSchema = z.object({
  login: z.string().min(1, { message: 'กรุณาระบุ Login' }),
  password: z.string().min(6, { message: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' }),
  firstname: z.string().min(1, { message: 'กรุณาระบุชื่อจริง' }),
  lastname: z.string().min(1, { message: 'กรุณาระบุนามสกุล' }),
  privileges: z.array(z.boolean()).length(9),
});

type FormValues = z.infer<typeof formSchema>;

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  
  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: '',
      password: '',
      firstname: '',
      lastname: '',
      privileges: Array(9).fill(false),
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
    toast({
      title: "ผู้ใช้งานถูกเพิ่มเรียบร้อยแล้ว",
      description: `เพิ่มผู้ใช้งาน ${values.login} เรียบร้อยแล้ว`,
    });
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">เพิ่มผู้ใช้งานในระบบ</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Login field */}
              <FormField
                control={form.control}
                name="login"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Login</FormLabel>
                    <FormControl>
                      <Input placeholder="ระบุ Login" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="ระบุรหัสผ่าน" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Firstname field */}
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ชื่อจริง</FormLabel>
                    <FormControl>
                      <Input placeholder="ระบุชื่อจริง" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Lastname field */}
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>นามสกุล</FormLabel>
                    <FormControl>
                      <Input placeholder="ระบุนามสกุล" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Privileges section */}
            <div className="space-y-4">
              <h3 className="font-medium">สิทธิ์การใช้งาน</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {privileges.map((privilege, index) => (
                  <div key={privilege.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`privilege-${privilege.id}`}
                      checked={form.watch(`privileges.${index}`)}
                      onCheckedChange={(checked) => {
                        const newPrivileges = [...form.getValues('privileges')];
                        newPrivileges[index] = checked === true;
                        form.setValue('privileges', newPrivileges);
                      }}
                    />
                    <Label
                      htmlFor={`privilege-${privilege.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {`${privilege.id}. ${privilege.title}`}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="mr-2"
              >
                ยกเลิก
              </Button>
              <Button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                บันทึกผู้ใช้งาน
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
