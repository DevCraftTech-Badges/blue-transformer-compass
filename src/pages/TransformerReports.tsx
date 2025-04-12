
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { BarChart, PieChart, Pie, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';

const TransformerReportsPage = () => {
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [selectedStation, setSelectedStation] = useState<string>('');
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>('');
  const [selectedTransformer, setSelectedTransformer] = useState<string>('');
  const [groupBy, setGroupBy] = useState<string>('area');
  const [showChart, setShowChart] = useState(false);
  
  // Dummy data for selects
  const areas = ['เขต 1', 'เขต 2', 'เขต 3', 'เขต 4'];
  const stations = ['สถานี A', 'สถานี B', 'สถานี C', 'สถานี D'];
  const manufacturers = ['บริษัท X', 'บริษัท Y', 'บริษัท Z'];
  const transformers = ['หม้อแปลง 1', 'หม้อแปลง 2', 'หม้อแปลง 3'];
  
  // Dummy data for chart
  const chartData = [
    { name: 'เขต 1', value: 30 },
    { name: 'เขต 2', value: 45 },
    { name: 'เขต 3', value: 15 },
    { name: 'เขต 4', value: 25 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  const handleConfirm = () => {
    console.log('Filters:', { selectedArea, selectedStation, selectedManufacturer, selectedTransformer, groupBy });
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
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="area-select">เขต</label>
                <Select value={selectedArea} onValueChange={setSelectedArea}>
                  <SelectTrigger id="area-select">
                    <SelectValue placeholder="เลือกเขต" />
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map((area) => (
                      <SelectItem key={area} value={area}>{area}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="station-select">สถานีไฟฟ้า</label>
                <Select value={selectedStation} onValueChange={setSelectedStation}>
                  <SelectTrigger id="station-select">
                    <SelectValue placeholder="เลือกสถานีไฟฟ้า" />
                  </SelectTrigger>
                  <SelectContent>
                    {stations.map((station) => (
                      <SelectItem key={station} value={station}>{station}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="manufacturer-select">ชื่อบริษัทผู้ผลิต</label>
                <Select value={selectedManufacturer} onValueChange={setSelectedManufacturer}>
                  <SelectTrigger id="manufacturer-select">
                    <SelectValue placeholder="เลือกบริษัทผู้ผลิต" />
                  </SelectTrigger>
                  <SelectContent>
                    {manufacturers.map((manufacturer) => (
                      <SelectItem key={manufacturer} value={manufacturer}>{manufacturer}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="transformer-select">หม้อแปลงไฟฟ้า</label>
                <Select value={selectedTransformer} onValueChange={setSelectedTransformer}>
                  <SelectTrigger id="transformer-select">
                    <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                  </SelectTrigger>
                  <SelectContent>
                    {transformers.map((transformer) => (
                      <SelectItem key={transformer} value={transformer}>{transformer}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <label className="text-sm font-medium" htmlFor="group-by-select">แบ่งตาม</label>
                <Select value={groupBy} onValueChange={setGroupBy}>
                  <SelectTrigger id="group-by-select">
                    <SelectValue placeholder="เลือกการแบ่งกลุ่ม" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="area">เขต</SelectItem>
                    <SelectItem value="station">สถานีไฟฟ้า</SelectItem>
                    <SelectItem value="manufacturer">บริษัทผู้ผลิต</SelectItem>
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
                  <Button variant="outline" className="bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100">
                    กราฟแท่ง
                  </Button>
                  <Button variant="outline" className="bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100">
                    กราฟวงกลม
                  </Button>
                </div>
                
                <div className="h-[400px] w-full">
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
                </div>
                
                {/* Alternative Pie Chart for visualization (hidden by default) */}
                <div className="hidden h-[400px] w-full">
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
