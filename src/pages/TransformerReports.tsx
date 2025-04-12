
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { BarChart, PieChart, Pie, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import { Info } from 'lucide-react';

const TransformerReportsPage = () => {
  // States for filter options
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [ageStart, setAgeStart] = useState<string>('');
  const [ageEnd, setAgeEnd] = useState<string>('');
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<string>('');
  const [groupBy, setGroupBy] = useState<string>('area');
  const [showChart, setShowChart] = useState(false);
  
  // Dropdown options data
  const filterOptions = [
    'อายุ',
    'เขต',
    'สถานีไฟฟ้า',
    'ชื่อบริษัทผู้ผลิต',
    'หม้อแปลงไฟฟ้า',
    'สภาพแวดล้อม',
    'สภาวะการใช้งานขณะพบความผิดปกติ',
    'รายละเอียดความผิดปกติหรือเสียหาย',
    'กลุ่มอุปกรณ์',
    'ชิ้นส่วนที่เสียหายหรือผิดปกติ',
    'ระดับความเสียหาย',
    'สาเหตุที่แท้จริง',
    'การจัดการ'
  ];
  
  // Dummy data for dropdowns
  const dropdownOptions = {
    'เขต': ['เขต 1', 'เขต 2', 'เขต 3', 'เขต 4'],
    'สถานีไฟฟ้า': ['สถานี A', 'สถานี B', 'สถานี C'],
    'ชื่อบริษัทผู้ผลิต': ['บริษัท X', 'บริษัท Y', 'บริษัท Z'],
    'หม้อแปลงไฟฟ้า': ['หม้อแปลง 1', 'หม้อแปลง 2', 'หม้อแปลง 3'],
    'สภาพแวดล้อม': ['ในร่ม', 'กลางแจ้ง', 'ชายทะเล'],
    'สภาวะการใช้งานขณะพบความผิดปกติ': ['กำลังใช้งาน', 'ไม่ได้ใช้งาน', 'อยู่ระหว่างการซ่อมบำรุง'],
    'รายละเอียดความผิดปกติหรือเสียหาย': ['น้ำมันรั่ว', 'ความร้อนสูง', 'เสียงผิดปกติ'],
    'กลุ่มอุปกรณ์': ['แกนเหล็ก', 'ขดลวด', 'หม้อแปลงกระแส'],
    'ชิ้นส่วนที่เสียหายหรือผิดปกติ': ['ฉนวน', 'ขั้วต่อ', 'วาล์ว'],
    'ระดับความเสียหาย': ['ต่ำ', 'ปานกลาง', 'สูง'],
    'สาเหตุที่แท้จริง': ['เสื่อมสภาพ', 'การติดตั้งไม่ถูกต้อง', 'การใช้งานผิดประเภท'],
    'การจัดการ': ['ซ่อมแซม', 'เปลี่ยนใหม่', 'ปรับปรุง']
  };
  
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
  
  // Handle filter selection
  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setSelectedDropdownValue('');
    if (filter !== 'อายุ') {
      setAgeStart('');
      setAgeEnd('');
    }
  };
  
  // Handle dropdown value selection
  const handleDropdownValueSelect = (value: string) => {
    setSelectedDropdownValue(value);
  };
  
  // Handle form submission
  const handleConfirm = () => {
    console.log('Filter:', selectedFilter);
    
    if (selectedFilter === 'อายุ') {
      console.log('Age Range:', { start: ageStart, end: ageEnd });
    } else {
      console.log('Selected Value:', selectedDropdownValue);
    }
    
    console.log('Group By:', groupBy);
    setShowChart(true);
  };
  
  // Chart type state
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');
  
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
              <CardDescription className="flex items-center gap-1 text-amber-600">
                <Info size={16} />
                เลือกเงื่อนไขเพียงหนึ่งเงื่อนไขเท่านั้นสำหรับการสร้างกราฟ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <FormLabel>เลือกประเภทเงื่อนไข</FormLabel>
                <Select value={selectedFilter || ''} onValueChange={handleFilterSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกประเภทเงื่อนไข" />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOptions.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedFilter === 'อายุ' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <FormLabel htmlFor="age-start">อายุ (เริ่มต้น)</FormLabel>
                    <Input
                      id="age-start"
                      type="number"
                      value={ageStart}
                      onChange={(e) => setAgeStart(e.target.value)}
                      placeholder="ระบุอายุเริ่มต้น"
                    />
                  </div>
                  <div className="space-y-2">
                    <FormLabel htmlFor="age-end">อายุ (สิ้นสุด)</FormLabel>
                    <Input
                      id="age-end"
                      type="number"
                      value={ageEnd}
                      onChange={(e) => setAgeEnd(e.target.value)}
                      placeholder="ระบุอายุสิ้นสุด"
                    />
                  </div>
                </div>
              )}
              
              {selectedFilter && selectedFilter !== 'อายุ' && dropdownOptions[selectedFilter as keyof typeof dropdownOptions] && (
                <div className="space-y-2">
                  <FormLabel htmlFor="dropdown-value">{selectedFilter}</FormLabel>
                  <Select 
                    value={selectedDropdownValue} 
                    onValueChange={handleDropdownValueSelect}
                  >
                    <SelectTrigger id="dropdown-value">
                      <SelectValue placeholder={`เลือก${selectedFilter}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {dropdownOptions[selectedFilter as keyof typeof dropdownOptions].map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Grouping Option */}
          <Card>
            <CardHeader>
              <CardTitle>เลือกการแบ่งกลุ่ม</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <FormLabel htmlFor="group-by-select">แบ่งตาม</FormLabel>
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
                  disabled={!selectedFilter || (selectedFilter === 'อายุ' && (!ageStart || !ageEnd)) || (selectedFilter !== 'อายุ' && !selectedDropdownValue)}
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
