
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { BarChart, PieChart, Pie, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';

const TransformerReportsPage = () => {
  // States for filter options
  const [area, setArea] = useState<string>('');
  const [station, setStation] = useState<string>('');
  const [manufacturer, setManufacturer] = useState<string>('');
  const [transformer, setTransformer] = useState<string>('');
  const [groupBy, setGroupBy] = useState<string>('เขต');
  const [showChart, setShowChart] = useState(false);
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');
  
  // Dummy data for dropdowns
  const areaOptions = ['เขต 1', 'เขต 2', 'เขต 3', 'เขต 4'];
  const stationOptions = ['สถานี A', 'สถานี B', 'สถานี C'];
  const manufacturerOptions = ['บริษัท X', 'บริษัท Y', 'บริษัท Z'];
  const transformerOptions = ['หม้อแปลง 1', 'หม้อแปลง 2', 'หม้อแปลง 3'];
  
  // Grouping options
  const groupingOptions = [
    'เขต',
    'สถานีไฟฟ้า',
    'ชื่อบริษัทผู้ผลิต',
    'อายุการใช้งาน'
  ];
  
  // Dummy data for chart
  const chartData = [
    { name: 'เขต 1', value: 30 },
    { name: 'เขต 2', value: 45 },
    { name: 'เขต 3', value: 15 },
    { name: 'เขต 4', value: 25 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  // Handle form submission
  const handleConfirm = () => {
    console.log('Filters:', { area, station, manufacturer, transformer });
    console.log('Group By:', groupBy);
    setShowChart(true);
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-800">รายงานตามผู้ใช้งานสำหรับหม้อแปลงไฟฟ้า</h1>
          <p className="text-gray-600">กรุณาเลือกเงื่อนไขในการสร้างรายงาน</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Filter Conditions */}
          <Card>
            <CardHeader>
              <CardTitle>เลือกเงื่อนไขในการสร้างกราฟ</CardTitle>
              <CardDescription>
                เลือกเงื่อนไขที่ต้องการสำหรับการสร้างกราฟ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="area-select">เขต</Label>
                  <Select value={area} onValueChange={setArea}>
                    <SelectTrigger id="area-select">
                      <SelectValue placeholder="เลือกเขต" />
                    </SelectTrigger>
                    <SelectContent>
                      {areaOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="station-select">สถานีไฟฟ้า</Label>
                  <Select value={station} onValueChange={setStation}>
                    <SelectTrigger id="station-select">
                      <SelectValue placeholder="เลือกสถานีไฟฟ้า" />
                    </SelectTrigger>
                    <SelectContent>
                      {stationOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="manufacturer-select">ชื่อบริษัทผู้ผลิต</Label>
                  <Select value={manufacturer} onValueChange={setManufacturer}>
                    <SelectTrigger id="manufacturer-select">
                      <SelectValue placeholder="เลือกบริษัทผู้ผลิต" />
                    </SelectTrigger>
                    <SelectContent>
                      {manufacturerOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="transformer-select">หม้อแปลงไฟฟ้า</Label>
                  <Select value={transformer} onValueChange={setTransformer}>
                    <SelectTrigger id="transformer-select">
                      <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                    </SelectTrigger>
                    <SelectContent>
                      {transformerOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Grouping Option */}
          <Card>
            <CardHeader>
              <CardTitle>เลือกการแบ่งกลุ่ม</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="group-by-select">แบ่งตาม</Label>
                <Select value={groupBy} onValueChange={setGroupBy}>
                  <SelectTrigger id="group-by-select">
                    <SelectValue placeholder="เลือกการแบ่งกลุ่ม" />
                  </SelectTrigger>
                  <SelectContent>
                    {groupingOptions.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="pt-4">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
                  onClick={handleConfirm}
                >
                  ยืนยัน
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Chart Display */}
        {showChart && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>ผลลัพธ์การแสดงข้อมูล</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="w-full max-w-3xl">
                <div className="flex justify-center space-x-4 mb-4">
                  <Button 
                    variant={chartType === 'bar' ? 'default' : 'outline'} 
                    className={chartType === 'bar' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100'}
                    onClick={() => setChartType('bar')}
                  >
                    กราฟแท่ง
                  </Button>
                  <Button 
                    variant={chartType === 'pie' ? 'default' : 'outline'} 
                    className={chartType === 'pie' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100'}
                    onClick={() => setChartType('pie')}
                  >
                    กราฟวงกลม
                  </Button>
                </div>
                
                <div className="h-[400px] w-full">
                  {chartType === 'bar' ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#3B82F6">
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={150}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default TransformerReportsPage;
