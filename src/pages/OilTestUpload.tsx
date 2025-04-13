
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from "sonner";
import { Upload, FileText } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

type FormValues = {
  testType: string;
  file: FileList;
};

const OilTestUploadPage = () => {
  const [isUploading, setIsUploading] = useState(false);
  
  const form = useForm<FormValues>({
    defaultValues: {
      testType: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!data.file || data.file.length === 0) {
      toast.error("กรุณาเลือกไฟล์ที่ต้องการอัพโหลด");
      return;
    }

    setIsUploading(true);
    
    // Simulate upload process
    try {
      // In a real implementation, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("อัพโหลดข้อมูลสำเร็จ", {
        description: `ไฟล์ ${data.file[0].name} ถูกอัพโหลดเรียบร้อยแล้ว`,
      });
      
      // Reset form
      form.reset();
      const fileInput = document.getElementById('file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการอัพโหลด", {
        description: "กรุณาลองใหม่อีกครั้ง",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">อัพโหลดข้อมูลการทดสอบทางน้ำมัน</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>แบบฟอร์มอัพโหลดข้อมูล</CardTitle>
            <CardDescription>
              กรุณาเลือกชนิดการทดสอบและไฟล์ข้อมูลที่ต้องการอัพโหลด
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="testType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ชนิดการทดสอบ</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกชนิดการทดสอบ" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="oil-aging">Oil Aging</SelectItem>
                          <SelectItem value="oil-dga">Oil DGA</SelectItem>
                          <SelectItem value="oil-furan">Oil Furan</SelectItem>
                          <SelectItem value="oil-contamination">Oil Contamination</SelectItem>
                          <SelectItem value="oltc-dga">OLTC DGA</SelectItem>
                          <SelectItem value="oltc-contamination">OLTC Oil Contamination</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormItem>
                  <FormLabel>ไฟล์ข้อมูล</FormLabel>
                  <div className="flex items-center gap-4">
                    <FormControl>
                      <Input
                        id="file"
                        type="file"
                        accept=".xlsx,.xls,.csv"
                        className="flex h-10 w-full"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            form.setValue('file', e.target.files);
                          }
                        }}
                      />
                    </FormControl>
                    <FileText className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <FormDescription>
                    รองรับไฟล์ Excel หรือ CSV เท่านั้น
                  </FormDescription>
                  <FormMessage />
                </FormItem>
                
                <CardFooter className="px-0 pt-4 flex justify-end">
                  <Button 
                    type="submit" 
                    className="bg-transformer-primary hover:bg-transformer-primary/90"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>กำลังอัพโหลด...</>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        อัพโหลดข้อมูล
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default OilTestUploadPage;
