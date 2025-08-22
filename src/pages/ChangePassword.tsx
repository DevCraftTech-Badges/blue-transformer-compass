
import React, { useEffect, useRef } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

// ใช้ Employee No. เป็น credential เดียว สามารถเปลี่ยนได้ที่นี่
const formSchema = z.object({
  currentCode: z.string().min(1, { message: 'กรุณาระบุรหัสพนักงานปัจจุบัน' }),
  newCode: z.string()
    .min(6, { message: 'อย่างน้อย 6 หลัก' })
    .max(20, { message: 'ห้ามเกิน 20 หลัก' })
    .regex(/^\d+$/, { message: 'ใส่เฉพาะตัวเลข' }),
  confirmCode: z.string().min(1, { message: 'กรุณายืนยันรหัสใหม่' })
}).refine(d => d.newCode === d.confirmCode, {
  message: 'รหัสใหม่ไม่ตรงกัน',
  path: ['confirmCode']
}).refine(d => d.newCode !== d.currentCode, {
  message: 'รหัสใหม่ต้องไม่ซ้ำรหัสเดิม',
  path: ['newCode']
});

type FormValues = z.infer<typeof formSchema>;

const ChangePasswordPage = () => {
  const { toast } = useToast();
  const INITIAL_DEFAULT = '12345678'; // default initial employee code
  const storedCodeRef = useRef<string>('');
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  // Initialize form with validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
  currentCode: '',
  newCode: '',
  confirmCode: '',
    },
  });

  // Ensure a password exists in localStorage (simulate persisted user auth)
  useEffect(() => {
    const existing = localStorage.getItem('employeeNoCredential');
    if (!existing) {
      localStorage.setItem('employeeNoCredential', INITIAL_DEFAULT);
      storedCodeRef.current = INITIAL_DEFAULT;
      toast({
        title: 'ตั้งรหัสพนักงานเริ่มต้น',
        description: `กำหนดรหัสเริ่มต้นเป็น ${INITIAL_DEFAULT}`,
      });
    } else {
      storedCodeRef.current = existing;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle form submission
  function onSubmit(values: FormValues) {
    const stored = storedCodeRef.current || localStorage.getItem('employeeNoCredential') || '';
    if (values.currentCode !== stored) {
      toast({
        variant: 'destructive',
        title: 'รหัสพนักงานปัจจุบันไม่ถูกต้อง',
        description: 'โปรดลองอีกครั้ง'
      });
      return;
    }
    localStorage.setItem('employeeNoCredential', values.newCode);
    storedCodeRef.current = values.newCode;
    // หากล็อกอินอยู่และรหัสเดิมตรง session อัพเดต session ด้วย
    const sessionEmp = localStorage.getItem('employeeNo');
    if(sessionEmp === values.currentCode) {
      localStorage.setItem('employeeNo', values.newCode);
    }
    toast({
      title: 'อัพเดตรหัสพนักงานสำเร็จ',
      description: 'ใช้รหัสใหม่ในการเข้าสู่ระบบครั้งถัดไป'
    });
    form.reset();
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
  <h1 className="text-2xl font-bold mb-6">เปลี่ยนรหัสพนักงาน (ใช้เป็นรหัสผ่าน)</h1>
        
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>กรอกข้อมูลเพื่อเปลี่ยนรหัส</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Current Code */}
                <FormField
                  control={form.control}
                  name="currentCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>รหัสพนักงานปัจจุบัน</FormLabel>
                      <FormControl>
                        <Input placeholder="กรอกรหัสปัจจุบัน" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* New Code */}
                <FormField
                  control={form.control}
                  name="newCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>รหัสพนักงานใหม่</FormLabel>
                      <FormControl>
                        <Input placeholder="กรอกรหัสใหม่" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Confirm Code */}
                <FormField
                  control={form.control}
                  name="confirmCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ยืนยันรหัสพนักงานใหม่</FormLabel>
                      <FormControl>
                        <Input placeholder="กรอกรหัสใหม่อีกครั้ง" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">ยืนยันเปลี่ยนรหัส</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ChangePasswordPage;
