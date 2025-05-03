import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { FileText, Info, Calculator, ChevronRight, ChevronsRight, TrendingUp, Save, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the schema for the form values
const formSchema = z.object({
  repairCost: z.coerce.number().min(0, "Repair cost must be a positive number"),
  downTimeCost: z.coerce.number().min(0, "Downtime cost must be a positive number"),
  failureRate: z.coerce.number().min(0, "Failure rate must be a positive number"),
  laborCost: z.coerce.number().min(0, "Labor cost must be a positive number"),
});

const formSchema2 = z.object({
  newTransformerPrice: z.coerce.number().min(0, "Price must be a positive number"),
  installationCost: z.coerce.number().min(0, "Installation cost must be a positive number"),
  downtimeCost: z.coerce.number().min(0, "Downtime cost must be a positive number"),
  oldTransformerScrapValue: z.coerce.number().min(0, "Scrap value must be a positive number"),
  energyEfficiencySavings: z.coerce.number().min(0, "Savings must be a positive number"),
});

// Schema for Option 3
const option3Schema = z.object({
  newTransformerPrice: z.coerce.number().min(0, "Price must be a positive number"),
  ratedPower: z.coerce.number().min(0, "Rated power must be a positive number"),
  noLoadLoss: z.coerce.number().min(0, "No-load loss must be a positive number"),
  loadLoss: z.coerce.number().min(0, "Load loss must be a positive number"),
  opportunityCost: z.coerce.number().min(0, "Opportunity cost must be a positive number"),
  annualMaintenanceCost: z.coerce.number().min(0, "Annual maintenance cost must be a positive number"),
  demolitionCost: z.coerce.number().min(0, "Demolition cost must be a non-negative number"),
});

type FormValues = z.infer<typeof formSchema>;
type FormValues2 = z.infer<typeof formSchema2>;
type Option3FormValues = z.infer<typeof option3Schema>;

const EconomicConsideration = () => {
  const [option1Data, setOption1Data] = useState<FormValues>({
    repairCost: 750000,
    downTimeCost: 300000,
    failureRate: 0.15,
    laborCost: 50000,
  });

  const [option2Data, setOption2Data] = useState<FormValues2>({
    newTransformerPrice: 1500000,
    installationCost: 200000,
    downtimeCost: 100000,
    oldTransformerScrapValue: 50000,
    energyEfficiencySavings: 75000,
  });
  
  // Option 3 form
  const [option3Data, setOption3Data] = useState<Option3FormValues>({
    newTransformerPrice: 20000000,
    ratedPower: 50,
    noLoadLoss: 80,
    loadLoss: 320,
    opportunityCost: 0,
    annualMaintenanceCost: 110000,
    demolitionCost: 0,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: option1Data,
  });

  const form2 = useForm<FormValues2>({
    resolver: zodResolver(formSchema2),
    defaultValues: option2Data,
  });

  const option3Form = useForm<Option3FormValues>({
    resolver: zodResolver(option3Schema),
    defaultValues: option3Data,
  });

  const { toast } = useToast();

  const handleOption1Submit = (data: FormValues) => {
    setOption1Data(data);
    toast({
      title: "Data saved",
      description: "Option 1 data has been saved successfully.",
    });
  };

  const handleOption2Submit = (data: FormValues2) => {
    setOption2Data(data);
    toast({
      title: "Data saved",
      description: "Option 2 data has been saved successfully.",
    });
  };

  const handleOption3Submit = (data: Option3FormValues) => {
    setOption3Data(data);
    toast({
      title: "Data saved",
      description: "Option 3 data has been saved successfully.",
    });
  };

  const clearOption1Data = () => {
    form.reset({
      repairCost: 750000,
      downTimeCost: 300000,
      failureRate: 0.15,
      laborCost: 50000,
    });
    toast({
      title: "Form cleared",
      description: "Option 1 form has been reset to default values.",
    });
  };

  const clearOption2Data = () => {
    form2.reset({
      newTransformerPrice: 1500000,
      installationCost: 200000,
      downtimeCost: 100000,
      oldTransformerScrapValue: 50000,
      energyEfficiencySavings: 75000,
    });
    toast({
      title: "Form cleared",
      description: "Option 2 form has been reset to default values.",
    });
  };

  const clearOption3Data = () => {
    option3Form.reset({
      newTransformerPrice: 20000000,
      ratedPower: 50,
      noLoadLoss: 80,
      loadLoss: 320,
      opportunityCost: 0,
      annualMaintenanceCost: 110000,
      demolitionCost: 0,
    });
    toast({
      title: "Form cleared",
      description: "Option 3 form has been reset to default values.",
    });
  };

  useEffect(() => {
    // You can add any side effects here, like fetching initial data
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Economic Consideration</h1>
          <p className="text-gray-500">Evaluate economic factors for transformer decisions</p>
        </div>

        <Tabs defaultValue="option1" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="option1">Option 1: Repair Alternative</TabsTrigger>
            <TabsTrigger value="option2">Option 2: New Purchase (End of Life)</TabsTrigger>
            <TabsTrigger value="option3">Option 3: New Purchase</TabsTrigger>
          </TabsList>

          {/* Option 1 content */}
          <TabsContent value="option1">
            <Card>
              <CardHeader>
                <CardTitle>Repair Alternative</CardTitle>
                <CardDescription>Enter details for the repair alternative</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleOption1Submit)} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="repairCost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Repair Cost</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter repair cost" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="downTimeCost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Downtime Cost</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter downtime cost" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="failureRate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Failure Rate</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter failure rate" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="laborCost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Labor Cost</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter labor cost" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-between">
                      <Button type="submit">
                        <Save className="mr-2 h-4 w-4" /> Save
                      </Button>
                      <Button type="button" variant="outline" onClick={clearOption1Data}>
                        <Trash2 className="mr-2 h-4 w-4" /> Clear Data
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Option 2 content */}
          <TabsContent value="option2">
            <Card>
              <CardHeader>
                <CardTitle>New Purchase (End of Life)</CardTitle>
                <CardDescription>Enter details for purchasing a new transformer at the end of life</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form2}>
                  <form onSubmit={form2.handleSubmit(handleOption2Submit)} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form2.control}
                        name="newTransformerPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Transformer Price</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter price" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form2.control}
                        name="installationCost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Installation Cost</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter installation cost" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form2.control}
                        name="downtimeCost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Downtime Cost</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter downtime cost" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form2.control}
                        name="oldTransformerScrapValue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Old Transformer Scrap Value</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter scrap value" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form2.control}
                        name="energyEfficiencySavings"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Energy Efficiency Savings</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter savings" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-between">
                      <Button type="submit">
                        <Save className="mr-2 h-4 w-4" /> Save
                      </Button>
                      <Button type="button" variant="outline" onClick={clearOption2Data}>
                        <Trash2 className="mr-2 h-4 w-4" /> Clear Data
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Option 3 content */}
          <TabsContent value="option3">
            <Card>
              <CardHeader>
                <CardTitle>ข้อมูลการซื้อหม้อแปลงใหม่</CardTitle>
                <CardDescription>Enter details for purchasing a new transformer</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...option3Form}>
                  <form onSubmit={option3Form.handleSubmit(handleOption3Submit)} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={option3Form.control}
                        name="newTransformerPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ราคาหม้อแปลงใหม่ [Baht]</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter price" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={option3Form.control}
                        name="ratedPower"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rated Power [MVA]</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter rated power" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={option3Form.control}
                        name="noLoadLoss"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>No-Load Loss [kW]</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter no-load loss" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={option3Form.control}
                        name="loadLoss"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Load Loss [kW]</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter load loss" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={option3Form.control}
                        name="opportunityCost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ค่าเสียโอกาสในการจ่ายไฟเนื่องจาก PM [Baht/year]</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter opportunity cost" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={option3Form.control}
                        name="annualMaintenanceCost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ค่าซ่อมบำรุงเฉลี่ยรายปี [Baht/year]</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter annual maintenance cost" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={option3Form.control}
                        name="demolitionCost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ค่าทำลายหรือรื้อถอน [Baht]</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter demolition cost" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-between">
                      <Button type="submit">
                        <Save className="mr-2 h-4 w-4" /> Save
                      </Button>
                      <Button type="button" variant="outline" onClick={clearOption3Data}>
                        <Trash2 className="mr-2 h-4 w-4" /> Clear Data
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default EconomicConsideration;
