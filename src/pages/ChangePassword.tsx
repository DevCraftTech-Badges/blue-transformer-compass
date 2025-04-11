
import React from 'react';
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

// Define the form schema with validation
const formSchema = z.object({
  currentPassword: z.string().min(1, { message: "กรุณาระบุรหัสผ่านปัจจุบัน" }),
  newPassword: z.string().min(6, { message: "รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร" }),
  confirmPassword: z.string().min(1, { message: "กรุณายืนยันรหัสผ่านใหม่" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "รหัสผ่านไม่ตรงกัน",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const ChangePasswordPage = () => {
  const { toast } = useToast();
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  // Initialize form with validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Handle form submission
  function onSubmit(values: FormValues) {
    console.log(values);
    
    // Show success toast
    toast({
      title: "เปลี่ยนรหัสผ่านสำเร็จ",
      description: "รหัสผ่านของคุณได้รับการเปลี่ยนแปลงเรียบร้อยแล้ว",
    });
    
    // Reset form
    form.reset();
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">เปลี่ยนรหัสผ่าน</h1>
        
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>กรอกข้อมูลเพื่อเปลี่ยนรหัสผ่าน</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Current Password Field */}
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>รหัสผ่านปัจจุบัน</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showCurrentPassword ? "text" : "password"}
                            placeholder="กรอกรหัสผ่านปัจจุบัน"
                            {...field}
                          />
                        </FormControl>
                        <button 
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* New Password Field */}
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>รหัสผ่านใหม่</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showNewPassword ? "text" : "password"}
                            placeholder="กรอกรหัสผ่านใหม่"
                            {...field}
                          />
                        </FormControl>
                        <button 
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Confirm Password Field */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ยืนยันรหัสผ่านใหม่</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="กรอกรหัสผ่านใหม่อีกครั้ง"
                            {...field}
                          />
                        </FormControl>
                        <button 
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  ยืนยันเปลี่ยนรหัสผ่าน
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ChangePasswordPage;
