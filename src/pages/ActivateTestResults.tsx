
import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

type FormValues = {
  transformer: string;
};

type HealthStatus = 'good' | 'normal' | 'warning' | 'danger';

interface HealthIndexItem {
  name: string;
  value: number;
  status: HealthStatus;
}

interface ComponentGroup {
  name: string;
  healthIndex: number;
  status: HealthStatus;
  components: HealthIndexItem[];
}

const ActivateTestResultsPage = () => {
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<FormValues>({
    defaultValues: {
      transformer: "",
    },
  });

  const getStatusColor = (status: HealthStatus) => {
    switch (status) {
      case 'good':
        return 'bg-green-500';
      case 'normal':
        return 'bg-blue-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'danger':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: HealthStatus) => {
    switch (status) {
      case 'good':
        return '🟢';
      case 'normal':
        return '🔵';
      case 'warning':
        return '🟡';
      case 'danger':
        return '🔴';
      default:
        return '⚪';
    }
  };

  const mockHealthIndices = {
    general: { value: 99.896, status: 'good' as HealthStatus },
    component: { value: 82.306, status: 'normal' as HealthStatus },
    overall: { value: 91.526, status: 'good' as HealthStatus },
  };

  const mockComponentGroups: ComponentGroup[] = [
    {
      name: 'กลุ่ม Active Part',
      healthIndex: 78.18,
      status: 'normal',
      components: [
        { name: 'Core Insulation', value: 20.0, status: 'good' },
        { name: 'HV Winding', value: 34.22, status: 'normal' },
        { name: 'LV Winding', value: 31.58, status: 'normal' },
        { name: 'TV Winding', value: 24.0, status: 'normal' },
      ]
    }
  ];

  // Chart data for pie charts
  const generalHealthData = [
    { name: 'Good', value: 99.896 },
    { name: 'Issues', value: 0.104 },
  ];

  const componentHealthData = [
    { name: 'Good', value: 82.306 },
    { name: 'Issues', value: 17.694 },
  ];

  const COLORS = ['#4ade80', '#60a5fa', '#facc15', '#f87171'];

  const onSubmit = async (data: FormValues) => {
    if (!data.transformer) {
      toast.error("กรุณาเลือกหม้อแปลงไฟฟ้า");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setShowResults(true);
      setIsLoading(false);
      toast.success("Generate ผลทดสอบสำเร็จ");
    }, 1000);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Activate ผลทดสอบ</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">เลือกหม้อแปลงไฟฟ้าเพื่อ Activate ผลทดสอบ</CardTitle>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="transformer"
                  render={({ field }) => (
                    <FormItem className="max-w-md">
                      <FormLabel>หม้อแปลงไฟฟ้า</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="AT1-KT1A">AT1-KT1A</SelectItem>
                          <SelectItem value="AT2-KT1A">AT2-KT1A</SelectItem>
                          <SelectItem value="AT3-KT1A">AT3-KT1A</SelectItem>
                          <SelectItem value="GT1-KT1A">GT1-KT1A</SelectItem>
                          <SelectItem value="GT2-KT1A">GT2-KT1A</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <div>
                  <Button 
                    type="submit" 
                    className="bg-transformer-primary hover:bg-transformer-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? 'กำลังประมวลผล...' : 'Generate'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {showResults && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>ผลลัพธ์ Health Index</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8 mb-6">
                  {/* Pie Charts */}
                  <div className="h-[300px]">
                    <h3 className="text-lg font-medium mb-2 text-center">General Health Index</h3>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={generalHealthData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                        >
                          {generalHealthData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="h-[300px]">
                    <h3 className="text-lg font-medium mb-2 text-center">Component Health Index</h3>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={componentHealthData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                        >
                          {componentHealthData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Summary */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="p-4 border rounded-md">
                    <p className="text-gray-500 mb-1">หม้อแปลงไฟฟ้า</p>
                    <p className="text-lg font-medium">AT2-KT1A</p>
                  </div>
                  <div className="p-4 border rounded-md">
                    <p className="text-gray-500 mb-1">ปีที่บันทึก</p>
                    <p className="text-lg font-medium">2024</p>
                  </div>
                  <div className="p-4 border rounded-md">
                    <p className="text-gray-500 mb-1">โค้ดหมายเลข</p>
                    <p className="text-lg font-medium">3</p>
                  </div>
                </div>
                
                {/* Health Index Display */}
                <div className="space-y-4 mb-8">
                  <h3 className="text-lg font-semibold">Health Index</h3>
                  
                  <div className="grid gap-4">
                    <div className="p-4 border rounded-md flex justify-between items-center">
                      <div>
                        <p className="font-medium">General Health Index (%GHI)</p>
                        <p className="text-2xl font-bold">{mockHealthIndices.general.value.toFixed(3)}</p>
                      </div>
                      <Badge className={getStatusColor(mockHealthIndices.general.status)}>
                        {getStatusBadge(mockHealthIndices.general.status)}
                      </Badge>
                    </div>
                    
                    <div className="p-4 border rounded-md flex justify-between items-center">
                      <div>
                        <p className="font-medium">Component Health Index (%CHI)</p>
                        <p className="text-2xl font-bold">{mockHealthIndices.component.value.toFixed(3)}</p>
                      </div>
                      <Badge className={getStatusColor(mockHealthIndices.component.status)}>
                        {getStatusBadge(mockHealthIndices.component.status)}
                      </Badge>
                    </div>
                    
                    <div className="p-4 border rounded-md flex justify-between items-center">
                      <div>
                        <p className="font-medium">Overall Health Index (%OHI)</p>
                        <p className="text-2xl font-bold">{mockHealthIndices.overall.value.toFixed(3)}</p>
                      </div>
                      <Badge className={getStatusColor(mockHealthIndices.overall.status)}>
                        {getStatusBadge(mockHealthIndices.overall.status)}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {/* Component Groups */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Active Part Group Breakdown</h3>
                  
                  {mockComponentGroups.map((group, index) => (
                    <div key={index} className="space-y-4">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{group.name}</h4>
                        <span className="text-gray-500">→</span>
                        <span className="font-medium">%Health Index: {group.healthIndex.toFixed(2)}</span>
                        <Badge className={getStatusColor(group.status)}>
                          {getStatusBadge(group.status)}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 pl-4">
                        {group.components.map((component, cIndex) => (
                          <div key={cIndex} className="p-3 border rounded-md flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <FileText className="h-5 w-5 text-gray-500" />
                              <span>{component.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{component.value.toFixed(2)}</span>
                              <Badge className={getStatusColor(component.status)}>
                                {getStatusBadge(component.status)}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ActivateTestResultsPage;
