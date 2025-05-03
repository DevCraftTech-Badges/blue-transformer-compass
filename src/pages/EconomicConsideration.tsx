
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { FileText, Info, Calculator, ChevronRight, ChevronsRight, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';

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
  windingRepairCost: number;
  windingRepairType: string;
  bushingRepairCost: number;
  bushingType: string;
  arresterRepairCost: number;
  arresterType: string;
  notes?: string;
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

  const form = useForm<RepairData>({
    defaultValues: {
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
      notes: ''
    }
  });

  const handleTransformerChange = (value: string) => {
    const transformer = transformers.find(t => t.name === value);
    if (transformer) {
      setSelectedTransformer(transformer);
    }
  };

  const onSubmit = (data: RepairData) => {
    console.log("Form data submitted:", data);
    // Here you would handle form submission
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
                            <div className="space-y-4 bg-gray-50 p-4 rounded-md">
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
                        </div>
                      </TabsContent>
                    </form>
                  </Form>
                  
                  <TabsContent value="option-1" className="m-0 p-4 border rounded-md">
                    <div className="bg-blue-50 rounded-md p-6 flex items-start">
                      <Info className="h-10 w-10 text-blue-500 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-medium text-blue-700">Option 1 - การซ่อมบำรุง</h3>
                        <p className="text-blue-700 mt-1 mb-4">ข้อมูลประกอบการพิจารณาทางเลือก Option 1</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="bg-white rounded-md p-3 shadow-sm">
                            <p className="text-sm font-semibold">ค่าใช้จ่ายรวม</p>
                            <p className="text-lg text-blue-600 font-bold">3,500,000 บาท</p>
                          </div>
                          <div className="bg-white rounded-md p-3 shadow-sm">
                            <p className="text-sm font-semibold">อายุการใช้งานเพิ่ม</p>
                            <p className="text-lg text-blue-600 font-bold">15 ปี</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="option-2" className="m-0 p-4 border rounded-md">
                    <div className="bg-green-50 rounded-md p-6 flex items-start">
                      <Info className="h-10 w-10 text-green-500 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-medium text-green-700">Option 2 - การซ่อมแซมบางส่วน</h3>
                        <p className="text-green-700 mt-1 mb-4">ข้อมูลประกอบการพิจารณาทางเลือก Option 2</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="bg-white rounded-md p-3 shadow-sm">
                            <p className="text-sm font-semibold">ค่าใช้จ่ายรวม</p>
                            <p className="text-lg text-green-600 font-bold">2,250,000 บาท</p>
                          </div>
                          <div className="bg-white rounded-md p-3 shadow-sm">
                            <p className="text-sm font-semibold">อายุการใช้งานเพิ่ม</p>
                            <p className="text-lg text-green-600 font-bold">8 ปี</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="option-3" className="m-0 p-4 border rounded-md">
                    <div className="bg-purple-50 rounded-md p-6 flex items-start">
                      <Info className="h-10 w-10 text-purple-500 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-medium text-purple-700">Option 3 - เปลี่ยนหม้อแปลงใหม่</h3>
                        <p className="text-purple-700 mt-1 mb-4">ข้อมูลประกอบการพิจารณาทางเลือก Option 3</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="bg-white rounded-md p-3 shadow-sm">
                            <p className="text-sm font-semibold">ค่าใช้จ่ายรวม</p>
                            <p className="text-lg text-purple-600 font-bold">6,750,000 บาท</p>
                          </div>
                          <div className="bg-white rounded-md p-3 shadow-sm">
                            <p className="text-sm font-semibold">อายุการใช้งาน</p>
                            <p className="text-lg text-purple-600 font-bold">30 ปี</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="summary" className="m-0 p-4 border rounded-md">
                    <div className="bg-yellow-50 rounded-md p-6 flex items-start">
                      <Info className="h-10 w-10 text-yellow-500 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-medium text-yellow-700">สรุปทางเลือกที่เหมาะสม</h3>
                        <p className="text-yellow-700 mt-1 mb-4">ผลการวิเคราะห์และสรุปทางเลือกที่เหมาะสมที่สุด</p>
                        
                        <div className="bg-white rounded-md p-4 shadow-sm mb-4">
                          <div className="flex items-center mb-3">
                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                              <ChevronsRight className="h-5 w-5 text-green-600" />
                            </div>
                            <h4 className="text-base font-medium">ทางเลือกที่เหมาะสมที่สุด: Option 2</h4>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            จากข้อมูลการประเมินด้านต่างๆ พบว่าทางเลือกที่ 2 มีความเหมาะสมที่สุด เนื่องจาก:
                          </p>
                          <ul className="list-disc pl-5 text-sm text-gray-600">
                            <li>มีความคุ้มค่าทางเศรษฐศาสตร์สูงสุด (NPV = 1.45 ล้านบาท)</li>
                            <li>ระยะเวลาคืนทุนเร็วกว่าทางเลือกอื่น</li>
                            <li>มีความเสี่ยงต่ำในการดำเนินการ</li>
                          </ul>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-white rounded-md p-3 shadow-sm">
                            <p className="text-xs font-medium text-gray-500">Option 1</p>
                            <p className="text-sm font-medium">NPV: <span className="text-blue-600">0.98 ล้านบาท</span></p>
                          </div>
                          <div className="bg-white rounded-md p-3 shadow-sm border-2 border-green-300">
                            <p className="text-xs font-medium text-gray-500">Option 2</p>
                            <p className="text-sm font-medium">NPV: <span className="text-green-600">1.45 ล้านบาท</span></p>
                          </div>
                          <div className="bg-white rounded-md p-3 shadow-sm">
                            <p className="text-xs font-medium text-gray-500">Option 3</p>
                            <p className="text-sm font-medium">NPV: <span className="text-purple-600">1.12 ล้านบาท</span></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Calculator icon */}
              <div className="flex items-center justify-center mb-6">
                <div className="h-28 w-28 bg-gray-200 rounded-md flex items-center justify-center">
                  <Calculator className="h-12 w-12 text-gray-400" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end pt-4 pb-4 px-6 border-t mt-6">
              <div className="flex gap-3">
                <Button variant="outline">ยกเลิก</Button>
                <Button>บันทึกข้อมูล</Button>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default EconomicConsiderationPage;
