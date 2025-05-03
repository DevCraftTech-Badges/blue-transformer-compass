import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { FileText, Info, Calculator, ChevronRight, ChevronsRight, TrendingUp, Save, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { toast } from "sonner";

interface TransformerData {
  name: string;
  equipmentNo: string;
  mvaRating: string;
  endOfLife: string;
  remainingLife: string;
  hvRating: string;
  firstEnergized: string;
  expectedLifetime: string;
  overallCondition: string;
}

interface RepairData {
  transformerAge: number;
  opportunityCost: number;
  yearlyMaintenanceCost: number;
  demolitionCost: number;
  // Existing repair fields
  windingRepairCost: number;
  windingRepairType: string;
  bushingRepairCost: number;
  bushingType: string;
  arresterRepairCost: number;
  arresterType: string;
  // New repair fields
  oltcRepairCost: number;
  oltcType: string;
  hotLineOilFilterCost: number;
  hotLineOilFilterType: string;
  coolingCost: number;
  overhaulCost: number;
  overhaulRefurbishCost: number;
  replacingRubberBagCost: number;
  replacingBctsOthersCost: number;
  othersCost: number;
  notes?: string;
}

interface Option1Data {
  repairPrice: number;
  noLoadLoss: number;
  loadLoss: number;
  opportunityCost: number;
  yearlyMaintenanceCost: number;
  demolitionCost: number;
  // Repair items
  windingRepairCost: number;
  windingRepairType: string;
  bushingRepairCost: number;
  bushingType: string;
  arresterRepairCost: number;
  arresterType: string;
  oltcRepairCost: number;
  oltcType: string;
  hotLineOilFilterCost: number;
  hotLineOilFilterType: string;
  coolingCost: number;
  overhaulCost: number;
  overhaulRefurbishCost: number;
  replacingRubberBagCost: number;
  replacingBctsOthersCost: number;
  othersCost: number;
}

interface Option2Data {
  newTransformerPrice: number;
  ratedPower: number;
  noLoadLoss: number;
  loadLoss: number;
  opportunityCost: number;
  yearlyMaintenanceCost: number;
  demolitionCost: number;
}

const transformers: TransformerData[] = [
  {
    name: 'AN-KT1A',
    equipmentNo: '7000016200',
    mvaRating: '50.0 MVA',
    endOfLife: '49.67',
    remainingLife: '30.32',
    hvRating: '115.0 kV',
    firstEnergized: '12/02/2007',
    expectedLifetime: '19.36',
    overallCondition: '74.35'
  },
  {
    name: 'BN-KT2A',
    equipmentNo: '7000016201',
    mvaRating: '75.0 MVA',
    endOfLife: '45.32',
    remainingLife: '28.63',
    hvRating: '115.0 kV',
    firstEnergized: '05/11/2010',
    expectedLifetime: '16.69',
    overallCondition: '82.15'
  }
];

const EconomicConsiderationPage: React.FC = () => {
  const [selectedTransformer, setSelectedTransformer] = useState<TransformerData>(transformers[0]);
  const [activeTab, setActiveTab] = useState('repair-info');
  const [totalRepairCost, setTotalRepairCost] = useState(4508740);
  const [totalOption1Cost, setTotalOption1Cost] = useState(12000000);

  const form = useForm<RepairData>({
    defaultValues: {
      transformerAge: 25,
      opportunityCost: 0,
      yearlyMaintenanceCost: 150000,
      demolitionCost: 0,
      // Existing repair fields
      windingRepairCost: 0,
      windingRepairType: 'new',
      bushingRepairCost: 0,
      bushingType: 'oip',
      arresterRepairCost: 0,
      arresterType: 'gap',
      // New repair fields
      oltcRepairCost: 0,
      oltcType: 'oil-1-chamber',
      hotLineOilFilterCost: 0,
      hotLineOilFilterType: '1-2-chamber',
      coolingCost: 0,
      overhaulCost: 0,
      overhaulRefurbishCost: 0,
      replacingRubberBagCost: 0,
      replacingBctsOthersCost: 2508740,
      othersCost: 2000000,
      notes: ''
    }
  });

  const option1Form = useForm<Option1Data>({
    defaultValues: {
      repairPrice: 700000,
      noLoadLoss: 85,
      loadLoss: 360,
      opportunityCost: 0,
      yearlyMaintenanceCost: 130000,
      demolitionCost: 0,
      // Repair items
      windingRepairCost: 0,
      windingRepairType: 'new',
      bushingRepairCost: 0,
      bushingType: 'oip',
      arresterRepairCost: 0,
      arresterType: 'gap',
      oltcRepairCost: 0,
      oltcType: 'oil-1-chamber',
      hotLineOilFilterCost: 0,
      hotLineOilFilterType: '1-2-chamber',
      coolingCost: 0,
      overhaulCost: 0,
      overhaulRefurbishCost: 0,
      replacingRubberBagCost: 1000000,
      replacingBctsOthersCost: 1000000,
      othersCost: 1000000
    }
  });

  const option2Form = useForm<Option2Data>({
    defaultValues: {
      newTransformerPrice: 20000000,
      ratedPower: 50,
      noLoadLoss: 80,
      loadLoss: 320,
      opportunityCost: 0,
      yearlyMaintenanceCost: 110000,
      demolitionCost: 0
    }
  });

  const handleTransformerChange = (value: string) => {
    const transformer = transformers.find(t => t.name === value);
    if (transformer) {
      setSelectedTransformer(transformer);
    }
  };

  // Calculate total repair cost when form values change
  useEffect(() => {
    const values = form.watch();
    const total = 
      (values.windingRepairCost || 0) +
      (values.bushingRepairCost || 0) +
      (values.arresterRepairCost || 0) +
      (values.oltcRepairCost || 0) +
      (values.hotLineOilFilterCost || 0) +
      (values.coolingCost || 0) +
      (values.overhaulCost || 0) +
      (values.overhaulRefurbishCost || 0) +
      (values.replacingRubberBagCost || 0) +
      (values.replacingBctsOthersCost || 0) +
      (values.othersCost || 0);
    
    setTotalRepairCost(total);
  }, [form.watch()]);

  // Calculate Option 1 total cost
  useEffect(() => {
    const values = option1Form.watch();
    const total = 
      (values.windingRepairCost || 0) +
      (values.bushingRepairCost || 0) +
      (values.arresterRepairCost || 0) +
      (values.oltcRepairCost || 0) +
      (values.hotLineOilFilterCost || 0) +
      (values.coolingCost || 0) +
      (values.overhaulCost || 0) +
      (values.overhaulRefurbishCost || 0) +
      (values.replacingRubberBagCost || 0) +
      (values.replacingBctsOthersCost || 0) +
      (values.othersCost || 0);
    
    setTotalOption1Cost(total);
  }, [option1Form.watch()]);

  const onSubmit = (data: RepairData) => {
    console.log("Form data submitted:", data);
    toast.success("บันทึกข้อมูลสำเร็จ");
  };

  const onSubmitOption1 = (data: Option1Data) => {
    console.log("Option 1 data submitted:", data);
    toast.success("บันทึกข้อมูล Option 1 สำเร็จ");
  };

  const onSubmitOption2 = (data: Option2Data) => {
    console.log("Option 2 data submitted:", data);
    toast.success("บันทึกข้อมูล Option 2 สำเร็จ");
  };

  const handleClearData = () => {
    form.reset({
      transformerAge: 25,
      opportunityCost: 0,
      yearlyMaintenanceCost: 150000,
      demolitionCost: 0,
      windingRepairCost: 0,
      windingRepairType: 'new',
      bushingRepairCost: 0,
      bushingType: 'oip',
      arresterRepairCost: 0,
      arresterType: 'gap',
      oltcRepairCost: 0,
      oltcType: 'oil-1-chamber',
      hotLineOilFilterCost: 0,
      hotLineOilFilterType: '1-2-chamber',
      coolingCost: 0,
      overhaulCost: 0,
      overhaulRefurbishCost: 0,
      replacingRubberBagCost: 0,
      replacingBctsOthersCost: 0,
      othersCost: 0,
      notes: ''
    });
    toast.info("รีเซ็ตข้อมูลเรียบร้อย");
  };

  const handleClearOption1Data = () => {
    option1Form.reset({
      repairPrice: 0,
      noLoadLoss: 0,
      loadLoss: 0,
      opportunityCost: 0,
      yearlyMaintenanceCost: 0,
      demolitionCost: 0,
      windingRepairCost: 0,
      windingRepairType: 'new',
      bushingRepairCost: 0,
      bushingType: 'oip',
      arresterRepairCost: 0,
      arresterType: 'gap',
      oltcRepairCost: 0,
      oltcType: 'oil-1-chamber',
      hotLineOilFilterCost: 0,
      hotLineOilFilterType: '1-2-chamber',
      coolingCost: 0,
      overhaulCost: 0,
      overhaulRefurbishCost: 0,
      replacingRubberBagCost: 0,
      replacingBctsOthersCost: 0,
      othersCost: 0
    });
    toast.info("รีเซ็ตข้อมูล Option 1 เรียบร้อย");
  };

  const handleClearOption2Data = () => {
    option2Form.reset({
      newTransformerPrice: 0,
      ratedPower: 0,
      noLoadLoss: 0,
      loadLoss: 0,
      opportunityCost: 0,
      yearlyMaintenanceCost: 0,
      demolitionCost: 0
    });
    toast.info("รีเซ็ตข้อมูล Option 2 เรียบร้อย");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <Layout>
      <motion.div 
        className="animate-fade-in"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex items-center gap-x-2 text-sm text-muted-foreground mb-6">
          <a href="/" className="hover:text-primary transition-colors">หน้าหลัก</a>
          <ChevronRight className="h-4 w-4" />
          <a href="#" className="hover:text-primary transition-colors">การวิเคราะห์ทางเศรษฐศาสตร์</a>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-foreground">ข้อมูลที่จำเป็นในการพิจารณา</span>
        </div>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-transformer-dark">ข้อมูลที่จำเป็นในการพิจารณา</h1>
              <p className="text-muted-foreground">รายละเอียดข้อมูลที่จำเป็นในการพิจารณาทางเศรษฐศาสตร์</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 gap-6">
          <Card className="border-t-4 border-t-blue-500 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
                ข้อมูลหม้อแปลงและการซ่อมบำรุง
              </CardTitle>
              <CardDescription>กรุณาเลือกหม้อแปลงและกรอกข้อมูลที่จำเป็นในการพิจารณา</CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
              {/* Transformer Information Section */}
              <div className="bg-blue-50 rounded-lg p-5 mb-6">
                <h3 className="text-lg font-medium text-blue-700 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  ข้อมูลหม้อแปลง
                </h3>
                <div className="mb-5">
                  <label htmlFor="transformer" className="block text-sm font-medium text-gray-700 mb-1">
                    ชื่อหม้อแปลง
                  </label>
                  <Select onValueChange={handleTransformerChange} defaultValue={selectedTransformer.name}>
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="เลือกชื่อหม้อแปลง" />
                    </SelectTrigger>
                    <SelectContent>
                      {transformers.map((transformer) => (
                        <SelectItem key={transformer.name} value={transformer.name}>
                          {transformer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div className="bg-white p-3 rounded-md shadow-sm border border-gray-100">
                    <label className="block text-xs font-medium text-gray-500">Equipment No.</label>
                    <p className="text-sm font-semibold mt-1">{selectedTransformer.equipmentNo}</p>
                  </div>
                  <div className="bg-white p-3 rounded-md shadow-sm border border-gray-100">
                    <label className="block text-xs font-medium text-gray-500">MVA Rating</label>
                    <p className="text-sm font-semibold mt-1">{selectedTransformer.mvaRating}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div className="bg-white p-3 rounded-md shadow-sm border border-gray-100">
                    <label className="block text-xs font-medium text-gray-500">End of Life</label>
                    <p className="text-sm font-semibold mt-1">{selectedTransformer.endOfLife}</p>
                  </div>
                  <div className="bg-white p-3 rounded-md shadow-sm border border-gray-100">
                    <label className="block text-xs font-medium text-gray-500">Remaining Life</label>
                    <p className="text-sm font-semibold mt-1">{selectedTransformer.remainingLife}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div className="bg-white p-3 rounded-md shadow-sm border border-gray-100">
                    <label className="block text-xs font-medium text-gray-500">HV Rating</label>
                    <p className="text-sm font-semibold mt-1">{selectedTransformer.hvRating}</p>
                  </div>
                  <div className="bg-white p-3 rounded-md shadow-sm border border-gray-100">
                    <label className="block text-xs font-medium text-gray-500">First Energized</label>
                    <p className="text-sm font-semibold mt-1">{selectedTransformer.firstEnergized}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-md shadow-sm border border-gray-100">
                    <label className="block text-xs font-medium text-gray-500">Expected Lifetime</label>
                    <p className="text-sm font-semibold mt-1">{selectedTransformer.expectedLifetime}</p>
                  </div>
                  <div className="bg-white p-3 rounded-md shadow-sm border border-gray-100">
                    <label className="block text-xs font-medium text-gray-500">Overall Condition (%)</label>
                    <p className="text-sm font-semibold mt-1">{selectedTransformer.overallCondition}</p>
                  </div>
                </div>
              </div>
              
              {/* Tabs Section - Moved below transformer information */}
              <div className="mb-6">
                <Tabs 
                  value={activeTab} 
                  onValueChange={setActiveTab} 
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-5 mb-4 w-full">
                    <TabsTrigger value="repair-info" className="text-xs md:text-sm">
                      ข้อมูลการซ่อม
                    </TabsTrigger>
                    <TabsTrigger value="option-1" className="text-xs md:text-sm">
                      Option 1
                    </TabsTrigger>
                    <TabsTrigger value="option-2" className="text-xs md:text-sm">
                      Option 2
                    </TabsTrigger>
                    <TabsTrigger value="option-3" className="text-xs md:text-sm">
                      Option 3
                    </TabsTrigger>
                    <TabsTrigger value="summary" className="text-xs md:text-sm">
                      สรุป
                    </TabsTrigger>
                  </TabsList>
                    
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <TabsContent value="repair-info" className="mt-0 p-4 border rounded-md">
                        <div className="space-y-4">
                          <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mb-4">
                            <h3 className="font-medium text-blue-800 mb-2">ข้อมูลพื้นฐานของหม้อแปลง</h3>
                            <p className="text-sm text-blue-700">กรุณากรอกข้อมูลพื้นฐานของหม้อแปลงที่ต้องการซ่อม</p>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                              control={form.control}
                              name="transformerAge"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>อายุหม้อแปลง [ปี]</FormLabel>
                                  <FormControl>
                                    <Input type="number" {...field} className="bg-white" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="opportunityCost"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>ค่าเสียโอกาสในการจ่ายไฟเนื่องจาก PM [Baht/year]</FormLabel>
                                  <FormControl>
                                    <Input type="number" {...field} className="bg-white" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yearlyMaintenanceCost"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>ค่าซ่อมบำรุงเฉลี่ยรายปี [Baht/year]</FormLabel>
                                  <FormControl>
                                    <Input type="number" {...field} className="bg-white" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                              control={form.control}
                              name="demolitionCost"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>ค่าทำลายหรือรื้อถอน [Baht]</FormLabel>
                                  <FormControl>
                                    <Input type="number" {...field} className="bg-white" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="mt-6">
                            <h3 className="text-base font-medium mb-3 border-b pb-2">รายการที่ต้องซ่อม (รวมค่าแรงและค่าของ)</h3>
                            <div className="space-y-6 bg-gray-50 p-4 rounded-md">
                              {/* First row: Winding and Bushing */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Winding */}
                                <div>
                                  <FormField
                                    control={form.control}
                                    name="windingRepairCost"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>
                                          <span className="flex items-center">
                                            <span className="h-2 w-2 bg-blue-500 inline-block mr-2 rounded-full"></span>
                                            Winding [Baht]
                                          </span>
                                        </FormLabel>
                                        <FormControl>
                                          <Input type="number" {...field} className="bg-white" />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                  <div className="mt-2">
                                    <FormField
                                      control={form.control}
                                      name="windingRepairType"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormControl>
                                            <RadioGroup
                                              onValueChange={field.onChange}
                                              value={field.value}
                                              className="flex items-center space-x-2"
                                            >
                                              <div className="flex items-center space-x-1">
                                                <RadioGroupItem value="new" id="new" />
                                                <label htmlFor="new" className="text-sm cursor-pointer">New Repair</label>
                                              </div>
                                            </RadioGroup>
                                          </FormControl>
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                </div>

                                {/* Bushing */}
                                <div>
                                  <FormField
                                    control={form.control}
                                    name="bushingRepairCost"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>
                                          <span className="flex items-center">
                                            <span className="h-2 w-2 bg-green-500 inline-block mr-2 rounded-full"></span>
                                            Bushing [Baht]
                                          </span>
                                        </FormLabel>
                                        <FormControl>
                                          <Input type="number" {...field} className="bg-white" />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                  <div className="mt-2">
                                    <FormField
                                      control={form.control}
                                      name="bushingType"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormControl>
                                            <RadioGroup
                                              onValueChange={field.onChange}
                                              value={field.value}
                                              className="flex items-center space-x-2"
                                            >
                                              <div className="flex items-center space-x-1">
                                                <RadioGroupItem value="oip" id="oip" />
                                                <label htmlFor="oip" className="text-sm cursor-pointer">OIP</label>
                                              </div>
                                              <div className="flex items-center space-x-1">
                                                <RadioGroupItem value="oir-rip" id="oir-rip" />
                                                <label htmlFor="oir-rip" className="text-sm cursor-pointer">OIR RIP</label>
                                              </div>
                                            </RadioGroup>
                                          </FormControl>
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Arrester */}
                              <div>
                                <FormField
                                  control={form.control}
                                  name="arresterRepairCost"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        <span className="flex items-center">
                                          <span className="h-2 w-2 bg-purple-500 inline-block mr-2 rounded-full"></span>
                                          Arrester [Baht]
                                        </span>
                                      </FormLabel>
                                      <FormControl>
                                        <Input type="number" {...field} className="bg-white" />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <div className="mt-2">
                                  <FormField
                                    control={form.control}
                                    name="arresterType"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <RadioGroup
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            className="flex flex-wrap items-center gap-4"
                                          >
                                            <div className="flex items-center space-x-1">
                                              <RadioGroupItem value="gap" id="gap" />
                                              <label htmlFor="gap" className="text-sm cursor-pointer">Gap</label>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                              <RadioGroupItem value="gapless-silicon" id="gapless-silicon" />
                                              <label htmlFor="gapless-silicon" className="text-sm cursor-pointer">Gapless with silicon housing</label>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                              <RadioGroupItem value="gapless-porcelain" id="gapless-porcelain" />
                                              <label htmlFor="gapless-porcelain" className="text-sm cursor-pointer">Gapless with porcelain housing</label>
                                            </div>
                                          </RadioGroup>
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>
                              
                              {/* OLTC */}
                              <div>
                                <FormField
                                  control={form.control}
                                  name="oltcRepairCost"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        <span className="flex items-center">
                                          <span className="h-2 w-2 bg-orange-500 inline-block mr-2 rounded-full"></span>
                                          OLTC [Baht]
                                        </span>
                                      </FormLabel>
                                      <FormControl>
                                        <Input type="number" {...field} className="bg-white" />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <div className="mt-2">
                                  <FormField
                                    control={form.control}
                                    name="oltcType"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <RadioGroup
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            className="flex flex-wrap items-center gap-4"
                                          >
                                            <div className="flex items-center space-x-1">
                                              <RadioGroupItem value="oil-1-chamber" id="oil-1-chamber" />
                                              <label htmlFor="oil-1-chamber" className="text-sm cursor-pointer">Oil 1 Chamber</label>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                              <RadioGroupItem value="oil-2-chambers" id="oil-2-chambers" />
                                              <label htmlFor="oil-2-chambers" className="text-sm cursor-pointer">Oil 2 Chambers</label>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                              <RadioGroupItem value="oil-3-chambers" id="oil-3-chambers" />
                                              <label htmlFor="oil-3-chambers" className="text-sm cursor-pointer">Oil 3 Chambers</label>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                              <RadioGroupItem value="vacuum" id="vacuum" />
                                              <label htmlFor="vacuum" className="text-sm cursor-pointer">Vacuum</label>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                              <RadioGroupItem value="others" id="others-oltc" />
                                              <label htmlFor="others-oltc" className="text-sm cursor-pointer">Others</label>
                                            </div>
                                          </RadioGroup>
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>
                              
                              {/* Hot Line Oil Filter */}
                              <div>
                                <FormField
                                  control={form.control}
                                  name="hotLineOilFilterCost"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        <span className="flex items-center">
                                          <span className="h-2 w-2 bg-red-500 inline-block mr-2 rounded-full"></span>
                                          Hot Line Oil Filter [Baht]
                                        </span>
                                      </FormLabel>
                                      <FormControl>
                                        <Input type="number" {...field} className="bg-white" />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <div className="mt-2">
                                  <FormField
                                    control={form.control}
                                    name="hotLineOilFilterType"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <RadioGroup
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            className="flex flex-wrap items-center gap-4"
                                          >
                                            <div className="flex items-center space-x-1">
                                              <RadioGroupItem value="1-2-chamber" id="1-2-chamber" />
                                              <label htmlFor="1-2-chamber" className="text-sm cursor-pointer">1-2 Chamber</label>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                              <RadioGroupItem value="3-chambers" id="3-chambers" />
                                              <label htmlFor="3-chambers" className="text-sm cursor-pointer">3 Chambers</label>
                                            </div>
                                          </RadioGroup>
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>
                              
                              {/* Additional costs row 1 */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                  control={form.control}
                                  name="coolingCost"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        <span className="flex items-center">
                                          <span className="h-2 w-2 bg-cyan-500 inline-block mr-2 rounded-full"></span>
                                          Cooling [Baht]
                                        </span>
                                      </FormLabel>
                                      <FormControl>
                                        <Input type="number" {...field} className="bg-white" />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="overhaulCost"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        <span className="flex items-center">
                                          <span className="h-2 w-2 bg-teal-500 inline-block mr-2 rounded-full"></span>
                                          Overhaul [Baht]
                                        </span>
                                      </FormLabel>
                                      <FormControl>
                                        <Input type="number" {...field} className="bg-white" />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                              
                              {/* Additional costs row 2 */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                  control={form.control}
                                  name="overhaulRefurbishCost"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        <span className="flex items-center">
                                          <span className="h-2 w-2 bg-indigo-500 inline-block mr-2 rounded-full"></span>
                                          Overhaul and Refurbish [Baht]
                                        </span>
                                      </FormLabel>
                                      <FormControl>
                                        <Input type="number" {...field} className="bg-white" />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="replacingRubberBagCost"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        <span className="flex items-center">
                                          <span className="h-2 w-2 bg-pink-500 inline-block mr-2 rounded-full"></span>
                                          Replacing Rubber Bag [Baht]
                                        </span>
                                      </FormLabel>
                                      <FormControl>
                                        <Input type="number" {...field} className="bg-white" />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                              
                              {/* Additional costs row 3 */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                  control={form.control}
                                  name="replacingBctsOthersCost"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        <span className="flex items-center">
                                          <span className="h-2 w-2 bg-amber-500 inline-block mr-2 rounded-full"></span>
                                          Replacing BCT, others [Baht]
                                        </span>
                                      </FormLabel>
                                      <FormControl>
                                        <Input type="number" {...field} className="bg-white" />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="othersCost"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        <span className="flex items-center">
                                          <span className="h-2 w-2 bg-gray-500 inline-block mr-2 rounded-full"></span>
                                          Others [Baht]
                                        </span>
                                      </FormLabel>
                                      <FormControl>
                                        <Input type="number" {...field} className="bg-white" />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                              
                              {/* Notes */}
                              <div>
                                <FormField
                                  control={form.control}
                                  name="notes"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>หมายเหตุ</FormLabel>
                                      <FormControl>
                                        <Textarea 
                                          placeholder="รายละเอียดเพิ่มเติม (ถ้ามี)" 
                                          className="resize-none bg-white" 
                                          {...field} 
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                              
                              {/* Total cost */}
                              <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mt-4">
                                <div className="flex justify-between items-center">
                                  <p className="font-medium text-blue-700">ค่าใช้จ่ายในการซ่อมทั้งหมด (ค่าแรงและค่าของ):</p>
                                  <p className="font-bold text-xl text-blue-800">{totalRepairCost.toLocaleString()} บาท</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Action buttons */}
                          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={handleClearData}
                              className="bg-white"
                            >
                              <Trash2 className="mr-1 h-4 w-4" /> Clear Data
                            </Button>
                            <Button type="submit">
                              <Save className="mr-1 h-4 w-4" /> Save
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                    </form>
                  </Form>
                  
                  <Form {...option1Form}>
                    <form onSubmit={option1Form.handleSubmit(onSubmitOption1)}>
                      <TabsContent value="option-1" className="mt-0 p-4 border rounded-md">
                        <div className="space-y-4">
                          <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 mb-4">
                            <h3 className="font-medium text-yellow-800 mb-2">เลือกนำหม้อแปลงอื่นมาซ่อมเพื่อใช้ทดแทน</h3>
                          </div>
                          
                          {/* First row of Option 1 */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                              control={option1Form.control}
                              name="repairPrice"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>ราคามื้อซ่อมหม้อแปลงตัวที่ 2 [บาท]</FormLabel>
                                  <FormControl>
                                    <Input type="number" {...field} className="bg-white" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={option1Form.control}
                              name="noLoadLoss"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>No-Load Loss [kW]</FormLabel>
                                  <FormControl>
                                    <Input type="number" {...field} className="bg-white" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={option1Form.control}
                              name="loadLoss"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Load Loss [kW]</FormLabel>
                                  <FormControl>
                                    <Input type="number" {...field} className="bg-white" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          {/* Cost data for Option 1 */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                              control={option1Form.control}
                              name="opportunityCost"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>ค่าเสียโอกาสในการจ่ายไฟเนื่องจาก PM [Baht/year]</FormLabel>
                                  <FormControl>
                                    <Input type="number" {...field} className="bg-white" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={option1Form.control}
                              name="yearlyMaintenanceCost"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>ค่าซ่อมบำรุงเฉลี่ยรายปี [Baht/year]</FormLabel>
                                  <FormControl>
                                    <Input type="number" {...field} className="bg-white" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={option1Form.control}
                              name="demolitionCost"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>ค่าทำลายหรือรื้อถอน [Baht]</FormLabel>
                                  <FormControl>
                                    <Input type="number" {...field} className="bg-white" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          {/* Repair items for the second transformer */}
                          <div className="mt-6">
                            <h3 className="text-base font-medium mb-3 border-b pb-2">รายการที่ต้องซ่อมหม้อแปลงตัวที่ 2 (รวมค่าแรงและค่าของ)</h3>
                            <div className="space-y-6 bg-gray-50 p-4 rounded-md">
                              {/* First row: Winding and Bushing */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Winding */}
                                <div>
                                  <FormField
                                    control={option1Form.control}
                                    name="windingRepairCost"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>
                                          <span className="flex items-center">
                                            <span className="h-2 w-2 bg-blue-500 inline-block mr-2 rounded-full"></span>
                                            Winding [Baht]
                                          </span>
                                        </FormLabel>
                                        <FormControl>
                                          <Input type="number" {...field} className="bg-white" />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                  <div className="mt-2">
                                    <FormField
                                      control={option1Form.control}
                                      name="windingRepairType"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormControl>
                                            <RadioGroup
                                              onValueChange={field.onChange}
                                              value={field.value}
                                              className="flex items-center space-x-2"
                                            >
                                              <div className="flex items-center space-x-1">
                                                <RadioGroupItem value="new" id="new-option1" />
                                                <label htmlFor="new-option1" className="text-sm cursor-pointer">New Repair</label>
                                              </div>
                                            </RadioGroup>
                                          </FormControl>
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                </div>

                                {/* Bushing */}
                                <div>
                                  <FormField
                                    control={option1Form.control}
                                    name="bushingRepairCost"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>
                                          <span className="flex items-center">
                                            <span className="h-2 w-2 bg-green-500 inline-block mr-2 rounded-full"></span>
                                            Bushing [Baht]
                                          </span>
                                        </FormLabel>
                                        <FormControl>
                                          <Input type="number" {...field} className="bg-white" />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                  <div className="mt-2">
                                    <FormField
                                      control={option1Form.control}
                                      name="bushingType"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormControl>
                                            <RadioGroup
                                              onValueChange={field.onChange}
                                              value={field.value}
                                              className="flex items-center space-x-2"
                                            >
                                              <div className="flex items-center space-x-1">
                                                <RadioGroupItem value="oip" id="oip-option1" />
                                                <label htmlFor="oip-option1" className="text-sm cursor-pointer">OIP</label>
                                              </div>
                                              <div className="flex items-center space-x-1">
                                                <RadioGroupItem value="oir-rip" id="oir-rip-option1" />
                                                <label htmlFor="oir-rip-option1" className="text-sm cursor-pointer">OIR RIP</label>
                                              </div>
                                            </RadioGroup>
                                          </FormControl>
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Arrester */}
                              <div>
                                <FormField
                                  control={option1Form.control}
                                  name="arresterRepairCost"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        <span className="flex items-center">
                                          <span className="h-2 w-2 bg-purple-500 inline-block mr-2 rounded-full"></span>
                                          Arrester [Baht]
                                        </span>
                                      </FormLabel>
                                      <FormControl>
                                        <Input type="number" {...field} className="bg-white" />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <div className="mt-2">
                                  <FormField
                                    control={option1Form.control}
                                    name="arresterType"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <RadioGroup
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            className="flex flex-wrap items-center gap-4"
                                          >
                                            <div className="flex items-center space-x-1">
                                              <RadioGroupItem value="gap" id="gap-option1" />
                                              <label htmlFor="gap-option1" className="text-sm cursor-pointer">Gap</label>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                              <RadioGroupItem value="gapless-silicon" id="gapless-silicon-option1" />
                                              <label htmlFor="gapless-silicon-option1" className="text-sm cursor-pointer">Gapless with silicon housing</label>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                              <RadioGroupItem value="gapless-porcelain" id="gapless-porcelain-option1" />
                                              <label htmlFor="gapless-porcelain-option1" className="text-sm cursor-pointer">Gapless with porcelain housing</label>
                                            </div>
                                          </RadioGroup>
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>
                              
                              {/* OLTC */}
                              <div>
                                <FormField
                                  control={option1Form.control}
                                  name="oltcRepairCost"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        <span className="flex items-center">
                                          <span className="h-2 w-2 bg-orange-500 inline-block mr-2 rounded-full"></span>
                                          OLTC [Baht]
                                        </span>
                                      </FormLabel>
                                      <FormControl>
                                        <Input type="number" {...field} className="bg-white" />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <div className="mt-2">
                                  <FormField
                                    control={option1Form.control}
                                    name="oltcType"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <RadioGroup
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            className="flex flex-wrap items-center gap-4"
                                          >
                                            <div className="flex items-center space-x-1">
                                              <RadioGroupItem value="oil-1-chamber" id="oil-1-chamber-option1" />
                                              <label htmlFor="oil-1-chamber-option1" className="text-sm cursor-pointer">Oil 1 Chamber</label>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                              <RadioGroupItem value="oil-2-chambers" id="oil-2-chambers-option1" />
                                              <label htmlFor="oil-2-chambers-option1" className="text-sm cursor-pointer">Oil 2 Chambers</label>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                              <RadioGroupItem value="oil-3-chambers" id="oil-3-chambers-option1" />
                                              <label htmlFor="oil-3-chambers-option1" className="text-sm cursor-pointer">Oil 3 Chambers</label>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                              <RadioGroupItem value="vacuum" id="vacuum-option1" />
                                              <label htmlFor="vacuum-option1" className="text-sm cursor-pointer">Vacuum</label>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                              <RadioGroupItem value="others" id="others-oltc-option1" />
                                              <label htmlFor="others-oltc-option1" className="text-sm cursor-pointer">Others</label>
                                            </div>
                                          </RadioGroup>
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>
                              
                              {/* Hot Line Oil Filter */}
                              <div>
                                <FormField
                                  control={option1Form.control}
                                  name="hotLineOilFilterCost"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        <span className="flex items-center">
                                          <span className="h-2 w-2 bg-red-500 inline-block mr-2 rounded-full"></span>
                                          Hot Line Oil Filter [Baht]
                                        </span>
                                      </FormLabel>
                                      <FormControl>
                                        <Input type="number" {...field} className="bg-white" />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <div className="mt-2">
                                  <FormField
                                    control={option1Form.control}
                                    name="hotLineOilFilterType"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <RadioGroup
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            className="flex flex-wrap items-center gap-4"
                                          >
                                            <div className="flex items-center space-x-1">
                                              <RadioGroupItem value="1-2-chamber" id="1-2-chamber-option1" />
                                              <label htmlFor="1-2-chamber-option1" className="text-sm cursor-pointer">1-2 Chamber</label>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                              <RadioGroupItem value="3-chambers" id="3-chambers-option1" />
                                              <label htmlFor="3-chambers-option1" className="text-sm cursor-pointer">3 Chambers</label>
                                            </div>
                                          </RadioGroup>
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>
                              
                              {/* Additional costs row 1 */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                  control={option1Form.control}
                                  name="coolingCost"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        <span className="flex items-center">
                                          <span className="h-2 w-2 bg-cyan-500 inline-block mr-2 rounded-full"></span>
                                          Cooling [Baht]
                                        </span>
                                      </FormLabel>
                                      <FormControl>
                                        <Input type="number" {...field} className="bg-white" />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={option1Form.control}
                                  name="overhaulCost"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        <span className="flex items-center">
                                          <span className="h-2 w-2 bg-teal-500 inline-block mr-2 rounded-full"></span>
                                          Overhaul [Baht]
                                        </span>
                                      </FormLabel>
                                      <FormControl>
                                        <Input type="number" {...field} className="bg-white" />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                              
                              {/* Additional costs row 2 */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                  control={option1Form.control}
                                  name="overhaulRefurbishCost"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        <span className="flex items-center">
                                          <span className="h-2 w-2 bg-indigo-500 inline-block mr-2 rounded-full"></span>
                                          Overhaul and Refurbish [Baht]
                                        </span>
                                      </FormLabel>
                                      <FormControl>
                                        <Input type="number" {...field} className="bg-white" />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={option1Form.control}
                                  name="replacingRubberBagCost"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        <span className="flex items-center">
                                          <span className="h-2 w-2 bg-pink-500 inline-block mr-2 rounded-full"></span>
                                          Replacing Rubber Bag [Baht]
                                        </span>
                                      </FormLabel>
                                      <FormControl>
                                        <Input type="number" {...field} className="bg-white" />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                              
                              {/* Additional costs row 3 */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                  control={option1Form.control}
                                  name="replacingBctsOthersCost"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        <span className="flex items-center">
                                          <span className="h-2 w-2 bg-amber-500 inline-block mr-2 rounded-full"></span>
                                          Replacing BCT, others [Baht]
                                        </span>
                                      </FormLabel>
                                      <FormControl>
                                        <Input type="number" {...field} className="bg-white" />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={option1Form.control}
                                  name="othersCost"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        <span className="flex items-center">
                                          <span className="h-2 w-2 bg-gray-500 inline-block mr-2 rounded-full"></span>
                                          Others [Baht]
                                        </span>
                                      </FormLabel>
                                      <FormControl>
                                        <Input type="number" {...field} className="bg-white" />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                              
                              {/* Total cost */}
                              <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mt-4">
                                <div className="flex justify-between items-center">
                                  <p className="font-medium text-blue-700">ค่าใช้จ่ายในการซ่อมหม้อแปลงตัวที่ 2 (ค่าแรงและค่าของ):</p>
                                  <p className="font-bold text-xl text-blue-800">{totalOption1Cost.toLocaleString()} บาท</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Action buttons */}
                          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={handleClearOption1Data}
                              className="bg-white"
                            >
                              <Trash2 className="mr-1 h-4 w-4" /> Clear Data
                            </Button>
                            <Button type="submit">
                              <Save className="mr-1 h-4 w-4" /> Save
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                    </form>
                  </Form>
                  
                  <Form {...option2Form}>
                    <form onSubmit={option2Form.handleSubmit(onSubmitOption2)}>
                      <TabsContent value="option-2" className="mt-0 p-4 border rounded-md">
                        <div className="space-y-4">
                          <div className="bg-green-50 p-4 rounded-md border border-green-200 mb-4">
                            <h3 className="font-medium text-green-800 mb-2">เลือกซื้อหม้อแปลงใหม่เมื่อสิ้นสุดใช้งานหม้อแปลงตัวเดิม</h3>
                          </div>
                          
                          {/* First row of Option 2 */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <FormField
                              control={option2Form.control}
                              name="newTransformerPrice"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>ราคาหม้อแปลงใหม่ [Baht]</FormLabel>
                                  <FormControl>
                                    <Input type="number" {...field} className="bg-white" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={option2Form.control}
                              name="ratedPower"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Rated Power [MVA]</FormLabel>
                                  <FormControl>
                                    <Input type="number" {...field} className="bg-white" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          {/* Second row of Option 2 */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <FormField
                              control={option2Form.control}
                              name="noLoadLoss"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>No-Load Loss [kW]</FormLabel>
                                  <FormControl>
                                    <Input type="number" {...field} className="bg-white" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={option2Form.control}
                              name="loadLoss"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Load Loss [kW]</FormLabel>
                                  <FormControl>
                                    <Input type="number" {...field} className="bg-white" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          {/* Third row of Option 2 */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <FormField
                              control={option2Form.control}
                              name="opportunityCost"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>ค่าเสียโอกาสในการจ่ายไฟเนื่องจาก PM [Baht/year]</FormLabel>
                                  <FormControl>
                                    <Input type="number" {...field} className="bg-white" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={option2Form.control}
                              name="yearlyMaintenanceCost"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>ค่าซ่อมบำรุงเฉลี่ยรายปี [Baht/year]</FormLabel>
                                  <FormControl>
                                    <Input type="number" {...field} className="bg-white" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={option2Form.control}
                              name="demolitionCost"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>ค่าทำลายหรือรื้อถอน [Baht]</FormLabel>
                                  <FormControl>
                                    <Input type="number" {...field} className="bg-white" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          {/* Action buttons */}
                          <div className="flex justify-end space-x-3 mt-8 pt-4 border-t">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={handleClearOption2Data}
                              className="bg-white"
                            >
                              <Trash2 className="mr-1 h-4 w-4" /> Clear Data
                            </Button>
                            <Button type="submit">
                              <Save className="mr-1 h-4 w-4" /> Save
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                    </form>
                  </Form>
                  
                  <TabsContent value="option-3" className="m-0 p-4 border rounded-md">
                    <div className="bg-blue-50 rounded-md p-6 flex items-start">
                      <Info className="h-10 w-10 text-blue-500 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-medium text-blue-700">Option 3</h3>
                        <p className="text-blue-700 mt-1">ยังไม่มีข้อมูลในส่วนนี้</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="summary" className="m-0 p-4 border rounded-md">
                    <div className="bg-blue-50 rounded-md p-6 flex items-start">
                      <Info className="h-10 w-10 text-blue-500 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-medium text-blue-700">สรุป</h3>
                        <p className="text-blue-700 mt-1">ข้อมูลสรุปการเปรียบเทียบตัวเลือกทั้งหมด</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default EconomicConsiderationPage;
