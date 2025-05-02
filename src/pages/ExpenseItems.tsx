
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Calculator, RefreshCcw, Save, DollarSign, Package, Warehouse, TrendingUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type OrderingFormValues = {
  domesticProcurement: string; // 10% of oil value (not exceeding 60,000)
  transportationManagement: string; // 2,700 baht/day
  inventoryManagement: string; // 2% of oil value
  transportInsurance: string; // 3% of oil value
  exchangeManagement: string; // 1,900 baht/case
  insuranceProcessing: string; // 160 baht/case
  claimProcessing: string; // 1,600 baht/stand
  softwareFee: string; // 2,000 baht/year/day
  documentFee: string; // 1 baht/sheet
  catalogFee: string; // 100 baht/item
  orderingCostTotal: string; // Sum of all costs
};

type CarryingFormValues = {
  oilBarrels: string; // Number of oil barrels
  rentalRate: string; // Rental rate (baht/square meter/month)
  rentalCostPerBarrel: string; // Calculated rental cost per barrel per year
  inventoryAdministration: string; // 15% of average oil price per barrel
  inventoryAdministrationCost: string; // Calculated inventory administration cost
  carryingCostTotal: string; // Total carrying cost
};

const ExpenseItemsPage: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("ordering");
  
  // Initialize ordering cost form
  const orderingForm = useForm<OrderingFormValues>({
    defaultValues: {
      domesticProcurement: "10",
      transportationManagement: "2700",
      inventoryManagement: "2",
      transportInsurance: "3",
      exchangeManagement: "1900",
      insuranceProcessing: "160",
      claimProcessing: "1600",
      softwareFee: "2000",
      documentFee: "1",
      catalogFee: "100",
      orderingCostTotal: "60000"
    }
  });

  // Initialize carrying cost form
  const carryingForm = useForm<CarryingFormValues>({
    defaultValues: {
      oilBarrels: "4.0",
      rentalRate: "35.0",
      rentalCostPerBarrel: "105.0",
      inventoryAdministration: "15.0",
      inventoryAdministrationCost: "1962.75",
      carryingCostTotal: "2067.76"
    }
  });
  
  const calculateOrderingCost = (data: OrderingFormValues) => {
    console.log("Calculating ordering cost with data:", data);
    // In a real application, this would contain the actual calculation logic
    const total = 60000; // Simplified calculation for demonstration
    
    orderingForm.setValue("orderingCostTotal", total.toString());
    
    toast({
      title: "คำนวณค่าใช้จ่ายสำเร็จ",
      description: "ค่าใช้จ่ายในการสั่งได้รับการคำนวณแล้ว",
    });
  };
  
  const calculateCarryingCost = (data: CarryingFormValues) => {
    console.log("Calculating carrying cost with data:", data);
    // In a real application, this would contain the actual calculation logic
    
    // Calculate rental cost per barrel per year
    const oilBarrels = parseFloat(data.oilBarrels);
    const rentalRate = parseFloat(data.rentalRate);
    const rentalCostPerBarrel = (rentalRate * 12 * 0.25).toFixed(2); // Simplified calculation
    
    // Calculate inventory administration cost
    const avgBarrelPrice = 13085.06; // This would come from actual data in a real app
    const inventoryAdministration = parseFloat(data.inventoryAdministration);
    const inventoryAdministrationCost = (avgBarrelPrice * (inventoryAdministration / 100)).toFixed(2);
    
    // Calculate total carrying cost
    const total = (parseFloat(rentalCostPerBarrel) + parseFloat(inventoryAdministrationCost)).toFixed(2);
    
    carryingForm.setValue("rentalCostPerBarrel", rentalCostPerBarrel);
    carryingForm.setValue("inventoryAdministrationCost", inventoryAdministrationCost);
    carryingForm.setValue("carryingCostTotal", total);
    
    toast({
      title: "คำนวณค่าใช้จ่ายสำเร็จ",
      description: "ค่าใช้จ่ายในการเก็บได้รับการคำนวณแล้ว",
    });
  };
  
  const clearOrderingData = () => {
    orderingForm.reset({
      domesticProcurement: "",
      transportationManagement: "",
      inventoryManagement: "",
      transportInsurance: "",
      exchangeManagement: "",
      insuranceProcessing: "",
      claimProcessing: "",
      softwareFee: "",
      documentFee: "",
      catalogFee: "",
      orderingCostTotal: ""
    });
    
    toast({
      title: "ล้างข้อมูลสำเร็จ",
      description: "ข้อมูลค่าใช้จ่ายในการสั่งได้ถูกล้างแล้ว",
    });
  };
  
  const clearCarryingData = () => {
    carryingForm.reset({
      oilBarrels: "",
      rentalRate: "",
      rentalCostPerBarrel: "",
      inventoryAdministration: "",
      inventoryAdministrationCost: "",
      carryingCostTotal: ""
    });
    
    toast({
      title: "ล้างข้อมูลสำเร็จ",
      description: "ข้อมูลค่าใช้จ่ายในการเก็บได้ถูกล้างแล้ว",
    });
  };

  return (
    <Layout>
      <div className="p-6 animate-fade-in">
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-transformer-primary">รายการค่าใช้จ่าย</h1>
            <p className="text-muted-foreground">จัดการข้อมูลค่าใช้จ่ายที่เกี่ยวข้องกับการจัดการน้ำมันหม้อแปลง</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="ordering" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span>ค่าใช้จ่ายในการสั่ง (Ordering Cost)</span>
            </TabsTrigger>
            <TabsTrigger value="carrying" className="flex items-center gap-2">
              <Warehouse className="h-4 w-4" />
              <span>ค่าใช้จ่ายในการเก็บ (Carrying Cost)</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Ordering Cost Tab */}
          <TabsContent value="ordering">
            <Card className="border-t-4 border-t-blue-500 shadow-md">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-b pb-4">
                <CardTitle className="flex items-center gap-2 text-transformer-primary">
                  <DollarSign className="h-5 w-5" />
                  ค่าใช้จ่ายในการสั่ง (Ordering Cost)
                </CardTitle>
                <CardDescription>
                  กรอกข้อมูลค่าใช้จ่ายที่เกี่ยวข้องกับการสั่งซื้อน้ำมันหม้อแปลง
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Form {...orderingForm}>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={orderingForm.control}
                        name="domesticProcurement"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">
                              ค่าบริหารงานจัดหาในประเทศ (% ของมูลค่าน้ำมัน)
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input {...field} type="number" step="0.01" className="pr-8" />
                                <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">
                                  %
                                </span>
                              </div>
                            </FormControl>
                            <FormDescription className="text-xs">
                              10% ของมูลค่าน้ำมัน (ไม่เกิน 60,000 บาท)
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={orderingForm.control}
                        name="transportationManagement"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">
                              ค่าบริหารงานขนส่งและสำรวจความเสียหาย
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input {...field} type="number" step="0.01" className="pr-12" />
                                <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">
                                  บาท/วัน
                                </span>
                              </div>
                            </FormControl>
                            <FormDescription className="text-xs">
                              เฉลี่ยครั้งละ 2,700 บาท/วัน
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={orderingForm.control}
                        name="inventoryManagement"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">
                              ค่าบริหารงานคลัง (% ของมูลค่าน้ำมัน)
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input {...field} type="number" step="0.01" className="pr-8" />
                                <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">
                                  %
                                </span>
                              </div>
                            </FormControl>
                            <FormDescription className="text-xs">
                              2% ของมูลค่าน้ำมัน
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={orderingForm.control}
                        name="transportInsurance"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">
                              ค่าบริหารงานประกันภัยขนส่ง (% ของมูลค่าน้ำมัน)
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input {...field} type="number" step="0.01" className="pr-8" />
                                <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">
                                  %
                                </span>
                              </div>
                            </FormControl>
                            <FormDescription className="text-xs">
                              เฉลี่ยครั้งละ 3% ของมูลค่าน้ำมัน
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={orderingForm.control}
                        name="exchangeManagement"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">
                              ค่าบริหารรับฝากขายหรือแลกเปลี่ยน
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input {...field} type="number" step="0.01" className="pr-12" />
                                <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">
                                  บาท/เรื่อง
                                </span>
                              </div>
                            </FormControl>
                            <FormDescription className="text-xs">
                              1,900 บาท/เรื่อง
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={orderingForm.control}
                        name="insuranceProcessing"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">
                              ค่าบริหารงานเดินจ่ายประกัน
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input {...field} type="number" step="0.01" className="pr-12" />
                                <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">
                                  บาท/เรื่อง
                                </span>
                              </div>
                            </FormControl>
                            <FormDescription className="text-xs">
                              160 บาท/เรื่อง
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={orderingForm.control}
                        name="claimProcessing"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">
                              ค่าบริหารงานเรียกค่าใช้จ่าย
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input {...field} type="number" step="0.01" className="pr-16" />
                                <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">
                                  บาท/ยืนงาน
                                </span>
                              </div>
                            </FormControl>
                            <FormDescription className="text-xs">
                              1,600 บาท/ยืนงาน (จากคู่สัญญา)
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={orderingForm.control}
                        name="softwareFee"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">
                              ค่าบริหารการใช้ซอฟต์แวร์จัดซื้อ
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input {...field} type="number" step="0.01" className="pr-14" />
                                <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">
                                  บาท/ปี/วัน
                                </span>
                              </div>
                            </FormControl>
                            <FormDescription className="text-xs">
                              2,000 บาท/ปี/วัน
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={orderingForm.control}
                        name="documentFee"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">
                              ค่าบริหารค่าเอกสาร
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input {...field} type="number" step="0.01" className="pr-12" />
                                <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">
                                  บาท/แผ่น
                                </span>
                              </div>
                            </FormControl>
                            <FormDescription className="text-xs">
                              1 บาท/แผ่น
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={orderingForm.control}
                        name="catalogFee"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">
                              ค่าจัดทำ catalogue และกำหนดรหัสโลหิตภัณฑ
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input {...field} type="number" step="0.01" className="pr-16" />
                                <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">
                                  บาท/รายการ
                                </span>
                              </div>
                            </FormControl>
                            <FormDescription className="text-xs">
                              100 บาท/รายการ
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator className="my-4" />

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="text-transformer-primary h-5 w-5" />
                          <FormLabel className="text-lg font-medium">ค่าใช้จ่ายในการสั่ง รวมเป็น</FormLabel>
                        </div>
                        <div className="flex items-center">
                          <FormField
                            control={orderingForm.control}
                            name="orderingCostTotal"
                            render={({ field }) => (
                              <FormItem className="mb-0">
                                <FormControl>
                                  <div className="relative">
                                    <Input {...field} type="text" readOnly className="text-lg font-bold text-right w-40 border-blue-200 pr-10" />
                                    <span className="absolute inset-y-0 right-3 flex items-center font-bold">
                                      บาท
                                    </span>
                                  </div>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="bg-slate-50 dark:bg-slate-900/20 border-t p-4 flex flex-wrap justify-center md:justify-end gap-3">
                <Button 
                  onClick={() => clearOrderingData()}
                  variant="outline"
                  className="w-full md:w-auto"
                >
                  <RefreshCcw className="mr-2 h-4 w-4" /> ล้างข้อมูล
                </Button>
                <Button 
                  onClick={() => calculateOrderingCost(orderingForm.getValues())}
                  className="w-full md:w-auto"
                >
                  <Calculator className="mr-2 h-4 w-4" /> คำนวณ
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Carrying Cost Tab */}
          <TabsContent value="carrying">
            <Card className="border-t-4 border-t-green-500 shadow-md">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-b pb-4">
                <CardTitle className="flex items-center gap-2 text-transformer-primary">
                  <Warehouse className="h-5 w-5" />
                  ค่าใช้จ่ายในการเก็บ (Carrying Cost)
                </CardTitle>
                <CardDescription>
                  กรอกข้อมูลค่าใช้จ่ายที่เกี่ยวข้องกับการเก็บรักษาน้ำมันหม้อแปลง
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Form {...carryingForm}>
                  <form className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                        <Package className="h-4 w-4 text-transformer-primary" />
                        โกดังวางน้ำมันเชื้อเพลิง
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <FormField
                          control={carryingForm.control}
                          name="oilBarrels"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">
                                จำนวนน้ำมัน
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input {...field} type="number" step="0.1" className="pr-8" />
                                  <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">
                                    ถัง
                                  </span>
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={carryingForm.control}
                          name="rentalRate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">
                                ค่าเช่าพื้นที่
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input {...field} type="number" step="0.1" className="pr-28" />
                                  <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">
                                    บาท/ตารางเมตร/เดือน
                                  </span>
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={carryingForm.control}
                          name="rentalCostPerBarrel"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground flex items-center">
                                คิดเป็นค่าเช่าต่อน้ำมัน 1 ถัง
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input {...field} type="text" readOnly className="text-right font-medium bg-slate-50 pr-16" />
                                  <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">
                                    บาท/ถัง/ปี
                                  </span>
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-transformer-primary" />
                        ค่าบริหารงานพัสดุคงคลัง
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={carryingForm.control}
                          name="inventoryAdministration"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">
                                ค่าบริหารงานพัสดุคงคลัง
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input {...field} type="number" step="0.1" className="pr-28" />
                                  <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">
                                    % ของราคาเฉลี่ยน้ำมัน 1 ถัง
                                  </span>
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={carryingForm.control}
                          name="inventoryAdministrationCost"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground flex items-center">
                                คิดเป็น
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input {...field} type="text" readOnly className="text-right font-medium bg-slate-50 pr-16" />
                                  <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">
                                    บาท/ถัง/ปี
                                  </span>
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
                      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="text-transformer-primary h-5 w-5" />
                          <FormLabel className="text-lg font-medium">ค่าใช้จ่ายในการเก็บ รวมเป็น</FormLabel>
                        </div>
                        <div className="flex items-center">
                          <FormField
                            control={carryingForm.control}
                            name="carryingCostTotal"
                            render={({ field }) => (
                              <FormItem className="mb-0">
                                <FormControl>
                                  <div className="relative">
                                    <Input {...field} type="text" readOnly className="text-lg font-bold text-right w-40 border-green-200 pr-16" />
                                    <span className="absolute inset-y-0 right-3 flex items-center font-bold">
                                      บาท/ถัง/ปี
                                    </span>
                                  </div>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="bg-slate-50 dark:bg-slate-900/20 border-t p-4 flex flex-wrap justify-center md:justify-end gap-3">
                <Button 
                  onClick={() => clearCarryingData()}
                  variant="outline"
                  className="w-full md:w-auto"
                >
                  <RefreshCcw className="mr-2 h-4 w-4" /> ล้างข้อมูล
                </Button>
                <Button 
                  onClick={() => calculateCarryingCost(carryingForm.getValues())}
                  className="w-full md:w-auto"
                >
                  <Calculator className="mr-2 h-4 w-4" /> คำนวณ
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ExpenseItemsPage;
