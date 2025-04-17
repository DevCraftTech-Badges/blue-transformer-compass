
import React from 'react';
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
  }
};

const TransformerPriceAndLossPage = () => {
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
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">การวิเคราะห์ทางเศรษฐศาสตร์ - ราคาและ Loss ของหม้อแปลง</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Section 1: Transformer Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-700">หม้อแปลงไฟฟ้า</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="transformer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>เลือกหม้อแปลง</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกหม้อแปลง" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="AN-KT1A">AN-KT1A</SelectItem>
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
              <Card className="bg-gray-50">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-700">ข้อมูลหม้อแปลง</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p><span className="font-medium">Transformer Name:</span> {transformerInfo.name}</p>
                      <p><span className="font-medium">MVA Rating:</span> {transformerInfo.mvaRating}</p>
                      <p><span className="font-medium">First Energized:</span> {transformerInfo.firstEnergized}</p>
                      <p><span className="font-medium">OLTC Manufacturer:</span> {transformerInfo.oltcManufacturer}</p>
                      <p><span className="font-medium">Vector Group:</span> {transformerInfo.vectorGroup}</p>
                    </div>
                    <div className="space-y-2">
                      <p><span className="font-medium">Equipment No:</span> {transformerInfo.equipmentNo}</p>
                      <p><span className="font-medium">HV Rating:</span> {transformerInfo.hvRating}</p>
                      <p><span className="font-medium">Manufacturer:</span> {transformerInfo.manufacturer}</p>
                      <p><span className="font-medium">OLTC Type:</span> {transformerInfo.oltcType}</p>
                      <p><span className="font-medium">Winding Type:</span> {transformerInfo.windingType}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Section 3: Price and Loss Inputs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-700">ค่าใช้จ่ายและ Loss</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ราคาหม้อแปลง (บาท)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="noLoadLoss"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>No-Load Loss (kW)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="loadLoss"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Load Loss (kW)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full md:w-auto">
              บันทึกข้อมูล
            </Button>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default TransformerPriceAndLossPage;
