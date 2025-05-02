
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

const factorFormSchema = z.object({
  interestRate: z.coerce.number().min(0, { message: "อัตราดอกเบี้ยต้องไม่ติดลบ" }),
  inflationRate: z.coerce.number().min(0, { message: "อัตราเงินเฟ้อต้องไม่ติดลบ" }),
  averageLoadPercentage: z.coerce.number().min(0, { message: "% การจ่ายโหลดโดยเฉลี่ยต้องไม่ติดลบ" }).max(100, { message: "% การจ่ายโหลดโดยเฉลี่ยต้องไม่เกิน 100%" }),
  transformerLossCost: z.coerce.number().min(0, { message: "ค่า Loss ของหม้อแปลงต้องไม่ติดลบ" }),
  newTransformerLifespan: z.coerce.number().min(0, { message: "อายุใช้งานของหม้อแปลงใหม่ต้องไม่ติดลบ" }),
  zeroValueTransformerAge: z.coerce.number().min(0, { message: "อายุหม้อแปลงปีที่ซากเป็นศูนย์ต้องไม่ติดลบ" }),
  unservedEnergyCost: z.coerce.number().min(0, { message: "ค่าพลังงานที่ไม่ได้จ่ายไฟต้องไม่ติดลบ" }),
  unavailabilityPercentage: z.coerce.number().min(0, { message: "Unavailability ต้องไม่ติดลบ" }).max(100, { message: "Unavailability ต้องไม่เกิน 100%" }),
  powerFactor: z.coerce.number().min(0, { message: "Power Factor ต้องไม่ติดลบ" }).max(100, { message: "Power Factor ต้องไม่เกิน 100%" }),
});

type FactorFormValues = z.infer<typeof factorFormSchema>;

const defaultValues: FactorFormValues = {
  interestRate: 0,
  inflationRate: 0,
  averageLoadPercentage: 0,
  transformerLossCost: 0,
  newTransformerLifespan: 0,
  zeroValueTransformerAge: 0,
  unservedEnergyCost: 0,
  unavailabilityPercentage: 0,
  powerFactor: 0,
};

const FactorSettingPage = () => {
  const { toast } = useToast();
  
  const form = useForm<FactorFormValues>({
    resolver: zodResolver(factorFormSchema),
    defaultValues,
  });

  function onSubmit(data: FactorFormValues) {
    console.log(data);
    toast({
      title: "บันทึกข้อมูลสำเร็จ",
      description: "ข้อมูล Factor Setting ได้รับการบันทึกเรียบร้อยแล้ว",
    });
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-transformer-primary">การวิเคราะห์ทางเศรษฐศาสตร์ - Factor Setting</h1>
          <p className="text-gray-600 mt-2">
            กรุณากรอกข้อมูลปัจจัยทางเศรษฐกิจและวิศวกรรมที่เกี่ยวข้องกับการวิเคราะห์หม้อแปลง
          </p>
        </div>
        
        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <Info className="h-5 w-5 text-blue-500" />
          <AlertTitle className="text-blue-700">คำแนะนำการกรอกข้อมูล</AlertTitle>
          <AlertDescription className="text-blue-600">
            ค่า Factor ที่กำหนดจะถูกใช้ในการวิเคราะห์ทางเศรษฐศาสตร์ของหม้อแปลงไฟฟ้า ซึ่งมีผลต่อการคำนวณต้นทุนและผลตอบแทนในระยะยาว
          </AlertDescription>
        </Alert>
        
        <Card className="bg-white shadow-md border-t-4 border-t-transformer-primary">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
            <CardTitle className="text-xl text-transformer-primary">ตั้งค่าปัจจัยการวิเคราะห์</CardTitle>
            <CardDescription>กรอกข้อมูลตัวแปรที่ใช้ในการวิเคราะห์เศรษฐศาสตร์สำหรับหม้อแปลง</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {/* อัตราดอกเบี้ย */}
                  <FormField
                    control={form.control}
                    name="interestRate"
                    render={({ field }) => (
                      <FormItem className="transition-all duration-200 hover:bg-gray-50 p-3 rounded-lg">
                        <FormLabel className="text-transformer-primary font-medium">อัตราดอกเบี้ย</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type="number"
                              step="0.0001"
                              min="0"
                              placeholder="0.00"
                              className="pr-10 border-blue-200 focus:border-blue-400"
                              {...field}
                            />
                          </FormControl>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                            %
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* อัตราเงินเฟ้อ */}
                  <FormField
                    control={form.control}
                    name="inflationRate"
                    render={({ field }) => (
                      <FormItem className="transition-all duration-200 hover:bg-gray-50 p-3 rounded-lg">
                        <FormLabel className="text-transformer-primary font-medium">อัตราเงินเฟ้อ</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type="number"
                              step="0.0001"
                              min="0"
                              placeholder="0.00"
                              className="pr-10 border-blue-200 focus:border-blue-400"
                              {...field}
                            />
                          </FormControl>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                            %
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* % การจ่ายโหลดโดยเฉลี่ย */}
                  <FormField
                    control={form.control}
                    name="averageLoadPercentage"
                    render={({ field }) => (
                      <FormItem className="transition-all duration-200 hover:bg-gray-50 p-3 rounded-lg">
                        <FormLabel className="text-transformer-primary font-medium">% การจ่ายโหลดโดยเฉลี่ย</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type="number"
                              step="0.0001"
                              min="0"
                              max="100"
                              placeholder="0.00"
                              className="pr-10 border-blue-200 focus:border-blue-400"
                              {...field}
                            />
                          </FormControl>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                            %
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* ค่า Loss ของหม้อแปลง */}
                  <FormField
                    control={form.control}
                    name="transformerLossCost"
                    render={({ field }) => (
                      <FormItem className="transition-all duration-200 hover:bg-gray-50 p-3 rounded-lg">
                        <FormLabel className="text-transformer-primary font-medium">ค่า Loss ของหม้อแปลง (no-load and load loss)</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type="number"
                              step="0.0001"
                              min="0"
                              placeholder="0.00"
                              className="pr-20 border-blue-200 focus:border-blue-400"
                              {...field}
                            />
                          </FormControl>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                            Baht/kWh
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* อายุใช้งานของหม้อแปลงใหม่ */}
                  <FormField
                    control={form.control}
                    name="newTransformerLifespan"
                    render={({ field }) => (
                      <FormItem className="transition-all duration-200 hover:bg-gray-50 p-3 rounded-lg">
                        <FormLabel className="text-transformer-primary font-medium">อายุใช้งานของหม้อแปลงใหม่ (project life)</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type="number"
                              step="0.0001"
                              min="0"
                              placeholder="0.00"
                              className="pr-10 border-blue-200 focus:border-blue-400"
                              {...field}
                            />
                          </FormControl>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                            ปี
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* อายุหม้อแปลงปีที่ซากเป็นศูนย์ */}
                  <FormField
                    control={form.control}
                    name="zeroValueTransformerAge"
                    render={({ field }) => (
                      <FormItem className="transition-all duration-200 hover:bg-gray-50 p-3 rounded-lg">
                        <FormLabel className="text-transformer-primary font-medium">อายุหม้อแปลงปีที่ซากเป็นศูนย์</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type="number"
                              step="0.0001"
                              min="0"
                              placeholder="0.00"
                              className="pr-10 border-blue-200 focus:border-blue-400"
                              {...field}
                            />
                          </FormControl>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                            ปี
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* ค่าพลังงานที่ไม่ได้จ่ายไฟ */}
                  <FormField
                    control={form.control}
                    name="unservedEnergyCost"
                    render={({ field }) => (
                      <FormItem className="transition-all duration-200 hover:bg-gray-50 p-3 rounded-lg">
                        <FormLabel className="text-transformer-primary font-medium">ค่าพลังงานที่ไม่ได้จ่ายไฟ</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type="number"
                              step="0.0001"
                              min="0"
                              placeholder="0.00"
                              className="pr-20 border-blue-200 focus:border-blue-400"
                              {...field}
                            />
                          </FormControl>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                            Baht/kWh
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Unavailability (%) */}
                  <FormField
                    control={form.control}
                    name="unavailabilityPercentage"
                    render={({ field }) => (
                      <FormItem className="transition-all duration-200 hover:bg-gray-50 p-3 rounded-lg">
                        <FormLabel className="text-transformer-primary font-medium">Unavailability (%)</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type="number"
                              step="0.0001"
                              min="0"
                              max="100"
                              placeholder="0.00"
                              className="pr-10 border-blue-200 focus:border-blue-400"
                              {...field}
                            />
                          </FormControl>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                            %
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Power Factor */}
                  <FormField
                    control={form.control}
                    name="powerFactor"
                    render={({ field }) => (
                      <FormItem className="transition-all duration-200 hover:bg-gray-50 p-3 rounded-lg">
                        <FormLabel className="text-transformer-primary font-medium">Power Factor</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type="number"
                              step="0.0001"
                              min="0"
                              max="100"
                              placeholder="0.00"
                              className="pr-10 border-blue-200 focus:border-blue-400"
                              {...field}
                            />
                          </FormControl>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                            %
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-center pt-4">
                  <Button 
                    type="submit" 
                    className="w-full sm:w-auto bg-transformer-primary hover:bg-blue-700 text-white transition-colors duration-200 px-8 py-2"
                  >
                    บันทึกข้อมูล
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default FactorSettingPage;
