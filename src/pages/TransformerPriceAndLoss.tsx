
import React, { useState } from 'react';
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

// Form schema
const formSchema = z.object({
  transformer: z.string().min(1, "Please select a transformer"),
  price: z.number().nonnegative("Price must be non-negative"),
  noLoadLoss: z.number().nonnegative("No-Load Loss must be non-negative"),
  loadLoss: z.number().nonnegative("Load Loss must be non-negative"),
});

const transformerData = {
  "AN-KT1A": {
    name: "AN-KT1A",
    mvaRating: "50.0 MVA",
    firstEnergized: "12/02/2007",
    oltcManufacturer: "ABB",
    vectorGroup: "YYd1",
    equipmentNo: "7000016200",
    hvRating: "115.0 kV",
    manufacturer: "ABB",
    oltcType: "UZFRN330/300",
    windingType: "Three Winding"
  },
  "BN-ST2A": {
    name: "BN-ST2A",
    mvaRating: "30.0 MVA",
    firstEnergized: "08/07/2010",
    oltcManufacturer: "Maschinenfabrik Reinhausen",
    vectorGroup: "YNyn0",
    equipmentNo: "7000014522",
    hvRating: "115.0 kV",
    manufacturer: "Siemens",
    oltcType: "VACUTAP®",
    windingType: "Two Winding"
  }
};

const TransformerPriceAndLossPage = () => {
  const { toast } = useToast();
  const [calculationResult, setCalculationResult] = useState<null | { totalPrice: number; annualLoss: number }>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transformer: "",
      price: 0,
      noLoadLoss: 0,
      loadLoss: 0,
    }
  });

  const selectedTransformer = form.watch("transformer");
  const transformerInfo = transformerData[selectedTransformer as keyof typeof transformerData];

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", data);
    
    // Mock calculation - replace with actual calculation
    const mockTotalPrice = data.price + (data.noLoadLoss * 10000) + (data.loadLoss * 5000);
    const mockAnnualLoss = (data.noLoadLoss * 8760) + (data.loadLoss * 8760 * 0.5);
    
    setCalculationResult({
      totalPrice: mockTotalPrice,
      annualLoss: mockAnnualLoss
    });
    
    toast({
      title: "การคำนวณเสร็จสิ้น",
      description: "ผลการคำนวณราคาและ Loss ของหม้อแปลงพร้อมแล้ว",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-transformer-primary">การวิเคราะห์ทางเศรษฐศาสตร์ - ราคาและ Loss ของหม้อแปลง</h1>
          <p className="text-gray-600 mt-2">กรุณากรอกข้อมูลราคาและค่า Loss ของหม้อแปลงเพื่อใช้ในการวิเคราะห์</p>
        </div>

        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <Info className="h-5 w-5 text-blue-500" />
          <AlertTitle className="text-blue-700">คำแนะนำการกรอกข้อมูล</AlertTitle>
          <AlertDescription className="text-blue-600">
            ข้อมูลราคาและค่า Loss ของหม้อแปลงจะถูกใช้ในการประเมินความคุ้มค่าทางเศรษฐศาสตร์ตลอดอายุการใช้งาน
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Section 1: Transformer Selection */}
                <Card className="shadow-md border-t-4 border-t-transformer-primary">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
                    <CardTitle className="text-lg font-semibold text-transformer-primary">เลือกหม้อแปลงไฟฟ้า</CardTitle>
                    <CardDescription>เลือกหม้อแปลงที่ต้องการวิเคราะห์ข้อมูล</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <FormField
                      control={form.control}
                      name="transformer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium text-transformer-primary">เลือกหม้อแปลง</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-blue-200 focus:border-blue-400">
                                <SelectValue placeholder="เลือกหม้อแปลง" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="AN-KT1A">AN-KT1A</SelectItem>
                              <SelectItem value="BN-ST2A">BN-ST2A</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Section 2: Transformer Info */}
                {selectedTransformer && transformerInfo && (
                  <Card className="shadow-md">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
                      <CardTitle className="text-lg font-semibold text-transformer-primary">ข้อมูลหม้อแปลง</CardTitle>
                      <CardDescription>รายละเอียดของหม้อแปลงที่เลือก</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-700">Transformer Name:</span>
                            <span className="text-gray-800">{transformerInfo.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-700">MVA Rating:</span>
                            <span className="text-gray-800">{transformerInfo.mvaRating}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-700">First Energized:</span>
                            <span className="text-gray-800">{transformerInfo.firstEnergized}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-700">OLTC Manufacturer:</span>
                            <span className="text-gray-800">{transformerInfo.oltcManufacturer}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-700">Vector Group:</span>
                            <span className="text-gray-800">{transformerInfo.vectorGroup}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-700">Equipment No:</span>
                            <span className="text-gray-800">{transformerInfo.equipmentNo}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-700">HV Rating:</span>
                            <span className="text-gray-800">{transformerInfo.hvRating}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-700">Manufacturer:</span>
                            <span className="text-gray-800">{transformerInfo.manufacturer}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-700">OLTC Type:</span>
                            <span className="text-gray-800">{transformerInfo.oltcType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-700">Winding Type:</span>
                            <span className="text-gray-800">{transformerInfo.windingType}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Section 3: Price and Loss Inputs */}
                <Card className="shadow-md">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
                    <CardTitle className="text-lg font-semibold text-transformer-primary">ค่าใช้จ่ายและ Loss</CardTitle>
                    <CardDescription>ข้อมูลราคาและค่า Loss สำหรับการวิเคราะห์</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem className="transition-all duration-200 hover:bg-gray-50 p-3 rounded-lg">
                            <FormLabel className="font-medium text-transformer-primary">ราคาหม้อแปลง</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input 
                                  type="number" 
                                  step="0.01" 
                                  className="pr-16 border-blue-200 focus:border-blue-400"
                                  {...field} 
                                  onChange={e => field.onChange(Number(e.target.value))} 
                                />
                              </FormControl>
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                                บาท
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="noLoadLoss"
                        render={({ field }) => (
                          <FormItem className="transition-all duration-200 hover:bg-gray-50 p-3 rounded-lg">
                            <FormLabel className="font-medium text-transformer-primary">No-Load Loss</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input 
                                  type="number" 
                                  step="0.01" 
                                  className="pr-16 border-blue-200 focus:border-blue-400"
                                  {...field} 
                                  onChange={e => field.onChange(Number(e.target.value))} 
                                />
                              </FormControl>
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                                kW
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="loadLoss"
                        render={({ field }) => (
                          <FormItem className="transition-all duration-200 hover:bg-gray-50 p-3 rounded-lg">
                            <FormLabel className="font-medium text-transformer-primary">Load Loss</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input 
                                  type="number" 
                                  step="0.01" 
                                  className="pr-16 border-blue-200 focus:border-blue-400"
                                  {...field} 
                                  onChange={e => field.onChange(Number(e.target.value))} 
                                />
                              </FormControl>
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                                kW
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-center">
                  <Button 
                    type="submit" 
                    className="bg-transformer-primary hover:bg-blue-700 text-white transition-colors duration-200 px-8 py-2"
                    disabled={!selectedTransformer}
                  >
                    วิเคราะห์ข้อมูล
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            <Card className="shadow-md h-full">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
                <CardTitle className="text-lg font-semibold text-transformer-primary">ผลการวิเคราะห์</CardTitle>
                <CardDescription>สรุปผลการวิเคราะห์ทางเศรษฐศาสตร์</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {calculationResult ? (
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h3 className="font-medium text-blue-700 mb-2">ต้นทุนรวม</h3>
                      <p className="text-2xl font-semibold text-blue-800">
                        {calculationResult.totalPrice.toLocaleString()} บาท
                      </p>
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <h3 className="font-medium text-yellow-700 mb-2">Loss ต่อปี</h3>
                      <p className="text-2xl font-semibold text-yellow-800">
                        {calculationResult.annualLoss.toLocaleString()} kWh
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg border border-gray-200">
                      <h3 className="font-medium text-gray-700 mb-2">สรุปผล</h3>
                      <p className="text-gray-600">
                        จากการวิเคราะห์ พบว่าหม้อแปลง {selectedTransformer} มีต้นทุนรวมตลอดอายุการใช้งานที่ {calculationResult.totalPrice.toLocaleString()} บาท และมี Loss ประมาณ {calculationResult.annualLoss.toLocaleString()} kWh ต่อปี
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <Info className="h-16 w-16 text-blue-300 mb-4" />
                    <p className="text-gray-500">กรุณากรอกข้อมูลและกดปุ่มวิเคราะห์ข้อมูลเพื่อดูผลการวิเคราะห์</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TransformerPriceAndLossPage;
