
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { FileText, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
      arresterType: 'gap'
    }
  });

  const handleTransformerChange = (value: string) => {
    const transformer = transformers.find(t => t.name === value);
    if (transformer) {
      setSelectedTransformer(transformer);
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6 animate-fade-in">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-transformer-dark">ข้อมูลที่จำเป็นในการพิจารณา</h1>
              <p className="text-muted-foreground">รายละเอียดข้อมูลที่จำเป็นในการพิจารณาทางเศรษฐศาสตร์</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>ข้อมูลหม้อแปลง</CardTitle>
              <CardDescription>กรุณาเลือกหม้อแปลงและกรอกข้อมูลที่จำเป็นในการพิจารณา</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <label htmlFor="transformer" className="block text-sm font-medium text-gray-700 mb-1">
                      ชื่อหม้อแปลง
                    </label>
                    <Select onValueChange={handleTransformerChange} defaultValue={selectedTransformer.name}>
                      <SelectTrigger className="w-full">
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

                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Equipment No.</label>
                        <p className="text-sm font-semibold mt-1">{selectedTransformer.equipmentNo}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">MVA Rating</label>
                        <p className="text-sm font-semibold mt-1">{selectedTransformer.mvaRating}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">End of Life</label>
                        <p className="text-sm font-semibold mt-1">{selectedTransformer.endOfLife}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Remaining Life</label>
                        <p className="text-sm font-semibold mt-1">{selectedTransformer.remainingLife}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">HV Rating</label>
                        <p className="text-sm font-semibold mt-1">{selectedTransformer.hvRating}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">First Energized</label>
                        <p className="text-sm font-semibold mt-1">{selectedTransformer.firstEnergized}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Expected Lifetime</label>
                        <p className="text-sm font-semibold mt-1">{selectedTransformer.expectedLifetime}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Overall Condition (%)</label>
                        <p className="text-sm font-semibold mt-1">{selectedTransformer.overallCondition}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-5 mb-4">
                      <TabsTrigger value="repair-info">ข้อมูลการซ่อม</TabsTrigger>
                      <TabsTrigger value="option-1">Option 1</TabsTrigger>
                      <TabsTrigger value="option-2">Option 2</TabsTrigger>
                      <TabsTrigger value="option-3">Option 3</TabsTrigger>
                      <TabsTrigger value="summary">สรุปทางเลือกที่เหมาะสม</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="repair-info">
                      <Form {...form}>
                        <form className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="transformerAge"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>อายุใช้งานหม้อแปลงที่ซ่อม [ปี]</FormLabel>
                                  <FormControl>
                                    <Input type="number" {...field} />
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
                                    <Input type="number" {...field} />
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
                                    <Input type="number" {...field} />
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
                                    <Input type="number" {...field} />
                                  </FormControl>
                                  <FormDescription className="text-xs italic">
                                    การพิจารณาค่าทำลายได้ ให้ใส่เครื่องหมายลบหน้าตัวเลขที่กรอก
                                  </FormDescription>
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="mt-6">
                            <h3 className="text-base font-medium mb-3">รายการที่ต้องซ่อมหม้อแปลง (รวมค่าแรงและค่าของ)</h3>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <FormField
                                    control={form.control}
                                    name="windingRepairCost"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Winding [Baht]</FormLabel>
                                        <FormControl>
                                          <Input type="number" {...field} />
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
                                        <FormLabel>Bushing [Baht]</FormLabel>
                                        <FormControl>
                                          <Input type="number" {...field} />
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
                                      <FormLabel>Arrester [Baht]</FormLabel>
                                      <FormControl>
                                        <Input type="number" {...field} />
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
                        </form>
                      </Form>
                    </TabsContent>
                    
                    <TabsContent value="option-1">
                      <div className="bg-blue-50 rounded-md p-6 flex items-center">
                        <Info className="h-10 w-10 text-blue-500 mr-4" />
                        <div>
                          <h3 className="text-lg font-medium text-blue-700">Option 1</h3>
                          <p className="text-blue-700 mt-1">ข้อมูลรายละเอียดสำหรับ Option 1 จะแสดงในส่วนนี้</p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="option-2">
                      <div className="bg-green-50 rounded-md p-6 flex items-center">
                        <Info className="h-10 w-10 text-green-500 mr-4" />
                        <div>
                          <h3 className="text-lg font-medium text-green-700">Option 2</h3>
                          <p className="text-green-700 mt-1">ข้อมูลรายละเอียดสำหรับ Option 2 จะแสดงในส่วนนี้</p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="option-3">
                      <div className="bg-purple-50 rounded-md p-6 flex items-center">
                        <Info className="h-10 w-10 text-purple-500 mr-4" />
                        <div>
                          <h3 className="text-lg font-medium text-purple-700">Option 3</h3>
                          <p className="text-purple-700 mt-1">ข้อมูลรายละเอียดสำหรับ Option 3 จะแสดงในส่วนนี้</p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="summary">
                      <div className="bg-yellow-50 rounded-md p-6 flex items-center">
                        <Info className="h-10 w-10 text-yellow-500 mr-4" />
                        <div>
                          <h3 className="text-lg font-medium text-yellow-700">สรุปทางเลือกที่เหมาะสม</h3>
                          <p className="text-yellow-700 mt-1">ข้อมูลสรุปทางเลือกที่เหมาะสมจะแสดงในส่วนนี้</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default EconomicConsiderationPage;
