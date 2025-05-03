import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
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

interface AlternativeRepairData {
  repairCost: number;
  noLoadLoss: number;
  loadLoss: number;
  opportunityCost: number;
  yearlyMaintenanceCost: number;
  demolitionCost: number;
  // Repair fields
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
  const [totalAlternativeRepairCost, setTotalAlternativeRepairCost] = useState(3000000);

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

  const alternativeForm = useForm<AlternativeRepairData>({
    defaultValues: {
      repairCost: 700000,
      noLoadLoss: 85,
      loadLoss: 360,
      opportunityCost: 0,
      yearlyMaintenanceCost: 130000,
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
      replacingRubberBagCost: 1000000,
      replacingBctsOthersCost: 1000000,
      othersCost: 1000000,
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

  // Calculate total alternative repair cost when alternative form values change
  useEffect(() => {
    const values = alternativeForm.watch();
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
    
    setTotalAlternativeRepairCost(total);
  }, [alternativeForm.watch()]);

  const onSubmit = (data: RepairData) => {
    console.log("Form data submitted:", data);
    toast.success("บันทึกข้อมูลสำเร็จ");
  };

  const onAlternativeSubmit = (data: AlternativeRepairData) => {
    console.log("Alternative form data submitted:", data);
    toast.success("บันทึกข้อมูลสำเร็จ");
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

  const handleClearAlternativeData = () => {
    alternativeForm.reset({
      repairCost: 700000,
      noLoadLoss: 85,
      loadLoss: 360,
      opportunityCost: 0,
      yearlyMaintenanceCost: 130000,
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
    });
    toast.info("รีเซ็ตข้อมูลเรียบร้อย");
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
                    
                  {/* First Tab: Repair Info */}
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <TabsContent value="repair-info" className="mt-0 p-4 border rounded-md">
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="transformerAge"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>อายุใช้งานหม้อแปลงที่ซ่อม [ปี]</FormLabel>
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
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <FormField
                              control={form.control}
                              name="demolitionCost"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>ค่าทำลายหรือรื้อถอน [Baht]</FormLabel>
                                  <FormControl>
                                    <Input type="number" {...field} className="bg-white" />
                                  </FormControl>
                                  <FormDescription className="text-xs italic">
                                    การพิจารณาค่าทำลายได้ ให้ใส่เครื่องหมายลบหน้าตัวเลขที่กรอก
                                  </FormDescription>
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="mt-6">
                            <h3 className="text-base font-medium mb-3 border-b pb-2">รายการที่ต้องซ่อมหม้อแปลง (รวมค่าแรงและค่าของ)</h3>
                            <div className="space-y-6 bg-gray-50 p-4 rounded-md">
                              {/* First Row: Winding and Bushing */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                              {/* Arrester Section */}
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
                              
                              {/* OLTC Section - New */}
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
                              
                              {/* Hot Line Oil Filter Section - New */}
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
                              
                              {/* Additional Costs - New */}
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
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                  control={form.control}
                                  name="replacingBctsOthersCost"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        <span className="flex items-center">
                                          <span className="h-2 w-2 bg-amber-500 inline-block mr-2 rounded-full"></span>
                                          Replacing BCTs, Others [Baht]
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
                              
                              {/* Total Cost - New */}
                              <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mt-4">
                                <div className="flex justify-between items-center">
                                  <p className="font-medium text-blue-700">ค่าใช้จ่ายในการซ่อมหม้อแปลงที่เสียหาย (ค่าแรงและค่าของ):</p>
                                  <p className="font-bold text-xl text-blue-800">{totalRepairCost.toLocaleString()} บาท</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>หมายเหตุเพิ่มเติม</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="กรอกข้อมูลเพิ่มเติม (ถ้ามี)" 
                                    className="resize-none" 
                                    {...field} 
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          {/* Action Buttons - New */}
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
                  
                  {/* Option 1 Tab: Alternative Transformer Repair */}
                  <Form {...alternativeForm}>
                    <form onSubmit={alternativeForm.handleSubmit(onAlternativeSubmit)}>
                      <TabsContent value="option-1" className="mt-0 p-4 border rounded-md">
                        <div className="space-y-6">
                          <div className="bg-blue-50 rounded-md p-4 mb-6">
                            <h3 className="text-lg font-medium text-blue-700 mb-2">เลือกนำหม้อแปลงอื่นมาซ่อมเพื่อใช้ทดแทน</h3>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={alternativeForm.control}
                              name="repairCost"
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
                              control={alternativeForm.control}
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
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={alternativeForm.control}
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

                            <FormField
                              control={alternativeForm.control}
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
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={alternativeForm.control}
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
                              control={alternativeForm.control}
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

                          <div className="mt-8">
                            <h3 className="text-base font-medium mb-3 border-b pb-2">รายการที่ต้องซ่อมหม้อแปลงตัวที่ 2 (รวมค่าแรงและค่าของ)</h3>
                            <div className="space-y-6 bg-gray-50 p-4 rounded-md">
                              {/* Winding and Bushing */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <FormField
                                    control={alternativeForm.control}
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
                                      control={alternativeForm.control}
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
                                                <RadioGroupItem value="new" id="new-alt" />
                                                <label htmlFor="new-alt" className="text-sm cursor-pointer">New Repair</label>
                                              </div>
                                            </RadioGroup>
                                          </FormControl>
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                </div>

                                <div>
                                  <FormField
                                    control={alternativeForm.control}
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
                                      control={alternativeForm.control}
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
                                                <RadioGroupItem value="oip" id="oip-alt" />
                                                <label htmlFor="oip-alt" className="text-sm cursor-pointer">OIP</label>
                                              </div>
                                              <div className="flex items-center space-x-1">
                                                <RadioGroupItem value="oir-rip" id="oir-rip-alt" />
                                                <label htmlFor="oir-rip-alt" className="text-sm cursor-pointer">OIR RIP</label>
                                              </div>
                                            </RadioGroup>
                                          </FormControl>
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Arrester Section */}
                              <div>
                                <FormField
                                  control={alternativeForm.control}
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
                                    control={alternativeForm.control}
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
                                              <RadioGroupItem value="gap" id="gap-alt" />
                                              <label htmlFor="gap-alt" className="text-sm cursor-pointer">Gap</label>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                              <RadioGroupItem value="gapless-silicon" id="gapless-silicon-alt" />
                                              <label htmlFor="gapless-silicon-alt" className="text-sm cursor-pointer">Gapless with silicon housing</label>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                              <RadioGroupItem value="gapless-porcelain" id="gapless-porcelain-alt" />
                                              <label htmlFor="gapless-porcelain-alt" className="text-sm cursor-pointer">Gapless with porcelain housing</label>
                                            </div>
                                          </RadioGroup>
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>
                              
                              {/* OLTC Section */}
                              <div>
                                <FormField
                                  control={alternativeForm.control}
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
                                    control={alternativeForm.control}
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
                                              <RadioGroupItem value="oil-1-chamber" id="oil-1-chamber-alt" />
                                              <label htmlFor="oil-1-chamber-alt" className="text-sm cursor-pointer">Oil 1 Chamber</label>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                              <RadioGroupItem value="oil-2-chambers" id="oil-2-chambers-alt" />
                                              <label htmlFor="oil-2-chambers-alt" className="text-sm cursor-pointer">Oil 2 Chambers</label>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                              <RadioGroupItem value="oil-3-chambers" id="oil-3-chambers-alt" />
                                              <label htmlFor="oil-3-chambers-alt" className="text-sm cursor-pointer">Oil 3 Chambers</label>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                              <RadioGroupItem value="vacuum" id="vacuum-alt" />
                                              <label htmlFor="vacuum-alt" className="text-sm cursor-pointer">Vacuum</label>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                              <RadioGroupItem value="others" id="others-oltc-alt" />
                                              <label htmlFor="others-oltc-alt" className="text-sm cursor-pointer">Others</label>
                                            </div>
                                          </RadioGroup>
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>
                              
                              {/* Hot Line Oil Filter Section */}
                              <div>
                                <FormField
                                  control={alternativeForm.control}
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
                                    control={alternativeForm.control}
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
                                              <RadioGroupItem value="1-2-chamber" id="1-2-chamber-alt" />
                                              <label htmlFor="1-2-chamber-alt" className="text-sm cursor-pointer">1-2 Chamber</label>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                              <RadioGroupItem value="3-chambers" id="3-chambers-alt" />
                                              <label htmlFor="3-chambers-alt" className="text-sm cursor-pointer">3 Chambers</label>
                                            </div>
                                          </RadioGroup>
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>
                              
                              {/* Additional Costs */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                  control={alternativeForm.control}
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
                                  control={alternativeForm.control}
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
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                  control={alternativeForm.control}
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
                                  control={alternativeForm.control}
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
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                  control={alternativeForm.control}
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
                                  control={alternativeForm.control}
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
                              
                              {/* Total Cost */}
                              <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mt-4">
                                <div className="flex justify-between items-center">
                                  <p className="font-medium text-blue-700">ค่าใช้จ่ายในการซ่อมหม้อแปลงตัวที่ 2 (ค่าแรงและค่าของ):</p>
                                  <p className="font-bold text-xl text-blue-800">{totalAlternativeRepairCost.toLocaleString()} บาท</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={handleClearAlternativeData}
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
                  
                  <TabsContent value="option-2" className="m-0 p-4 border rounded-md">
                    <div className="bg-green-50 rounded-md p-6 flex items-start">
                      <Info className="h-10 w-10 text-green-500 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-medium text-green-700">Option 2 - ทางเลือกที่ 2</h3>
                        <p className="text-green-700 mt-1 mb-4">รายละเอียดทางเลือกที่ 2</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="option-3" className="m-0 p-4 border rounded-md">
                    <div className="bg-purple-50 rounded-md p-6 flex items-start">
                      <Info className="h-10 w-10 text-purple-500 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-medium text-purple-700">Option 3 - ทางเลือกที่ 3</h3>
                        <p className="text-purple-700 mt-1 mb-4">รายละเอียดทางเลือกที่ 3</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="summary" className="m-0 p-4 border rounded-md">
                    <div className="bg-orange-50 rounded-md p-6 flex items-start">
                      <Calculator className="h-10 w-10 text-orange-500 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-medium text-orange-700">สรุปผลการประเมิน</h3>
                        <p className="text-orange-700 mt-1 mb-4">สรุปผลการประเมินและการวิเคราะห์ทางเศรษฐศาสตร์</p>
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
