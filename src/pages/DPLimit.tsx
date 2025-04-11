
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

// Define the form schema with validation
const formSchema = z.object({
  dpLimit: z
    .string()
    .min(1, { message: "กรุณาระบุค่า DP-Limit" })
    .refine((value) => !isNaN(Number(value)) && Number(value) > 0, {
      message: "กรุณาระบุตัวเลขที่มากกว่า 0",
    }),
});

type FormValues = z.infer<typeof formSchema>;

const DPLimitPage = () => {
  const { toast } = useToast();

  // Initialize form with validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dpLimit: "",
    },
  });

  // Handle form submission
  function onSubmit(values: FormValues) {
    console.log(values);
    
    // Show success toast
    toast({
      title: "บันทึกข้อมูลสำเร็จ",
      description: `บันทึกค่า DP-Limit: ${values.dpLimit} เรียบร้อยแล้ว`,
    });
    
    // Reset form
    form.reset();
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">ค่าการประเมินอายุ – DP-Limit</h1>
        
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>กรอกข้อมูล DP-Limit</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="dpLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ค่าประเมิน DP-Limit</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          step="any"
                          placeholder="กรอกค่า DP-Limit"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit"
                  className="w-full bg-transformer-primary hover:bg-transformer-primary/90"
                >
                  บันทึกข้อมูล
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DPLimitPage;
