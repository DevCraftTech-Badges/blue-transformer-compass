
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { BarChart, PieChart, Pie, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';

const DamageReportsPage = () => {
  // States for age range
  const [ageStart, setAgeStart] = useState<string>('');
  const [ageEnd, setAgeEnd] = useState<string>('');
  
  // State to track which filter is active
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  // States for each filter value
  const [areaValue, setAreaValue] = useState<string>('');
  const [stationValue, setStationValue] = useState<string>('');
  const [manufacturerValue, setManufacturerValue] = useState<string>('');
  const [transformerValue, setTransformerValue] = useState<string>('');
  const [environmentValue, setEnvironmentValue] = useState<string>('');
  const [operationConditionValue, setOperationConditionValue] = useState<string>('');
  const [damageDetailsValue, setDamageDetailsValue] = useState<string>('');
  const [equipmentGroupValue, setEquipmentGroupValue] = useState<string>('');
  const [damagedPartValue, setDamagedPartValue] = useState<string>('');
  const [damageLevelValue, setDamageLevelValue] = useState<string>('');
  const [rootCauseValue, setRootCauseValue] = useState<string>('');
  const [managementValue, setManagementValue] = useState<string>('');
  
  // Group by state
  const [groupBy, setGroupBy] = useState<string>('เขต');
  
  // Chart display state
  const [showChart, setShowChart] = useState(false);
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');
  
  // Dummy data for dropdowns
  const areaOptions = ['เขต 1', 'เขต 2', 'เขต 3', 'เขต 4'];
  const stationOptions = ['สถานี A', 'สถานี B', 'สถานี C'];
  const manufacturerOptions = ['บริษัท X', 'บริษัท Y', 'บริษัท Z'];
  const transformerOptions = ['หม้อแปลง 1', 'หม้อแปลง 2', 'หม้อแปลง 3'];
  const environmentOptions = ['แบบติดตั้งในอาคาร', 'แบบติดตั้งภายนอกอาคาร', 'แบบติดตั้งในลานไกล'];
  const operationConditionOptions = ['ขณะทำงานปกติ', 'ขณะเริ่มทำงาน', 'ขณะหยุดทำงาน'];
  const damageDetailsOptions = ['น้ำมันรั่ว', 'หม้อแปลงระเบิด', 'ความเสียหายจากฟ้าผ่า'];
  const equipmentGroupOptions = ['ส่วนประกอบหลัก', 'ส่วนประกอบรอง', 'อุปกรณ์เสริม'];
  const damagedPartOptions = ['ตัวถัง', 'ขดลวด', 'ชุดท่อนำ', 'แกนเหล็ก'];
  const damageLevelOptions = ['เล็กน้อย', 'ปานกลาง', 'รุนแรง'];
  const rootCauseOptions = ['การเสื่อมสภาพตามอายุ', 'การบำรุงรักษาไม่เพียงพอ', 'การออกแบบผิดพลาด'];
  const managementOptions = ['ซ่อมแซม', 'เปลี่ยนอุปกรณ์', 'ปรับปรุงระบบ'];
  
  // Grouping options
  const groupingOptions = [
    'เขต',
    'สถานีไฟฟ้า',
    'ชื่อบริษัทผู้ผลิต',
    'อายุการใช้งาน',
    'สภาพแวดล้อม',
    'ระดับความเสียหาย',
    'สาเหตุที่แท้จริง'
  ];
  
  // Dummy data for chart
  const chartData = [
    { name: 'เขต 1', value: 12 },
    { name: 'เขต 2', value: 19 },
    { name: 'เขต 3', value: 7 },
    { name: 'เขต 4', value: 15 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  // Handle filter change
  const handleFilterChange = (filterName: string) => {
    if (activeFilter === filterName) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filterName);
      
      // Reset all other filter values except the active one
      if (filterName !== 'area') setAreaValue('');
      if (filterName !== 'station') setStationValue('');
      if (filterName !== 'manufacturer') setManufacturerValue('');
      if (filterName !== 'transformer') setTransformerValue('');
      if (filterName !== 'environment') setEnvironmentValue('');
      if (filterName !== 'operationCondition') setOperationConditionValue('');
      if (filterName !== 'damageDetails') setDamageDetailsValue('');
      if (filterName !== 'equipmentGroup') setEquipmentGroupValue('');
      if (filterName !== 'damagedPart') setDamagedPartValue('');
      if (filterName !== 'damageLevel') setDamageLevelValue('');
      if (filterName !== 'rootCause') setRootCauseValue('');
      if (filterName !== 'management') setManagementValue('');
    }
  };
  
  // Handle form submission
  const handleConfirm = () => {
    console.log('Age Range:', { start: ageStart, end: ageEnd });
    console.log('Active Filter:', activeFilter);
    console.log('Group By:', groupBy);
    
    // Log the active filter value
    if (activeFilter === 'area') {
      console.log('Area:', areaValue);
    } else if (activeFilter === 'station') {
      console.log('Station:', stationValue);
    } else if (activeFilter === 'manufacturer') {
      console.log('Manufacturer:', manufacturerValue);
    } else if (activeFilter === 'transformer') {
      console.log('Transformer:', transformerValue);
    } else if (activeFilter === 'environment') {
      console.log('Environment:', environmentValue);
    } else if (activeFilter === 'operationCondition') {
      console.log('Operation Condition:', operationConditionValue);
    } else if (activeFilter === 'damageDetails') {
      console.log('Damage Details:', damageDetailsValue);
    } else if (activeFilter === 'equipmentGroup') {
      console.log('Equipment Group:', equipmentGroupValue);
    } else if (activeFilter === 'damagedPart') {
      console.log('Damaged Part:', damagedPartValue);
    } else if (activeFilter === 'damageLevel') {
      console.log('Damage Level:', damageLevelValue);
    } else if (activeFilter === 'rootCause') {
      console.log('Root Cause:', rootCauseValue);
    } else if (activeFilter === 'management') {
      console.log('Management:', managementValue);
    }
    
    setShowChart(true);
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-800">รายงานตามผู้ใช้งานสำหรับข้อมูลความเสียหาย</h1>
          <p className="text-gray-600">กรุณาเลือกเงื่อนไขในการสร้างรายงาน</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Filter Conditions Card */}
          <Card>
            <CardHeader>
              <CardTitle>เลือกเงื่อนไขในการสร้างกราฟ</CardTitle>
              <CardDescription>
                เลือกได้เพียงหนึ่งเงื่อนไขเท่านั้น
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Age Range Filter - Always enabled */}
              <div className="space-y-2">
                <Label htmlFor="age-start">อายุเริ่มต้น</Label>
                <div className="flex gap-4">
                  <Input 
                    id="age-start" 
                    type="number" 
                    placeholder="อายุเริ่มต้น" 
                    value={ageStart}
                    onChange={(e) => setAgeStart(e.target.value)}
                  />
                  <Input 
                    id="age-end" 
                    type="number" 
                    placeholder="อายุสิ้นสุด" 
                    value={ageEnd}
                    onChange={(e) => setAgeEnd(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Select Dropdowns - Only one can be active at a time */}
              <div className="space-y-4 pt-4 border-t">
                <p className="text-sm font-medium">เลือกหนึ่งเงื่อนไขเท่านั้น</p>
                
                {/* Area Filter */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="area-select">เขต</Label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        checked={activeFilter === 'area'} 
                        onChange={() => handleFilterChange('area')} 
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                  <Select 
                    value={areaValue} 
                    onValueChange={setAreaValue}
                    disabled={activeFilter !== null && activeFilter !== 'area'}
                  >
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
                
                {/* Station Filter */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="station-select">สถานีไฟฟ้า</Label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        checked={activeFilter === 'station'} 
                        onChange={() => handleFilterChange('station')} 
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                  <Select 
                    value={stationValue} 
                    onValueChange={setStationValue}
                    disabled={activeFilter !== null && activeFilter !== 'station'}
                  >
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
                
                {/* Manufacturer Filter */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="manufacturer-select">ชื่อบริษัทผู้ผลิต</Label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        checked={activeFilter === 'manufacturer'} 
                        onChange={() => handleFilterChange('manufacturer')} 
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                  <Select 
                    value={manufacturerValue} 
                    onValueChange={setManufacturerValue}
                    disabled={activeFilter !== null && activeFilter !== 'manufacturer'}
                  >
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
                
                {/* Transformer Filter */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="transformer-select">หม้อแปลงไฟฟ้า</Label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        checked={activeFilter === 'transformer'} 
                        onChange={() => handleFilterChange('transformer')} 
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                  <Select 
                    value={transformerValue} 
                    onValueChange={setTransformerValue}
                    disabled={activeFilter !== null && activeFilter !== 'transformer'}
                  >
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
                
                {/* Environment Filter */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="environment-select">สภาพแวดล้อม</Label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        checked={activeFilter === 'environment'} 
                        onChange={() => handleFilterChange('environment')} 
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                  <Select 
                    value={environmentValue} 
                    onValueChange={setEnvironmentValue}
                    disabled={activeFilter !== null && activeFilter !== 'environment'}
                  >
                    <SelectTrigger id="environment-select">
                      <SelectValue placeholder="เลือกสภาพแวดล้อม" />
                    </SelectTrigger>
                    <SelectContent>
                      {environmentOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Operation Condition Filter */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="operation-condition-select">สภาวะการใช้งานขณะพบความผิดปกติ</Label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        checked={activeFilter === 'operationCondition'} 
                        onChange={() => handleFilterChange('operationCondition')} 
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                  <Select 
                    value={operationConditionValue} 
                    onValueChange={setOperationConditionValue}
                    disabled={activeFilter !== null && activeFilter !== 'operationCondition'}
                  >
                    <SelectTrigger id="operation-condition-select">
                      <SelectValue placeholder="เลือกสภาวะการใช้งาน" />
                    </SelectTrigger>
                    <SelectContent>
                      {operationConditionOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Damage Details Filter */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="damage-details-select">รายละเอียดความผิดปกติหรือเสียหาย</Label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        checked={activeFilter === 'damageDetails'} 
                        onChange={() => handleFilterChange('damageDetails')} 
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                  <Select 
                    value={damageDetailsValue} 
                    onValueChange={setDamageDetailsValue}
                    disabled={activeFilter !== null && activeFilter !== 'damageDetails'}
                  >
                    <SelectTrigger id="damage-details-select">
                      <SelectValue placeholder="เลือกรายละเอียดความเสียหาย" />
                    </SelectTrigger>
                    <SelectContent>
                      {damageDetailsOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Equipment Group Filter */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="equipment-group-select">กลุ่มอุปกรณ์</Label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        checked={activeFilter === 'equipmentGroup'} 
                        onChange={() => handleFilterChange('equipmentGroup')} 
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                  <Select 
                    value={equipmentGroupValue} 
                    onValueChange={setEquipmentGroupValue}
                    disabled={activeFilter !== null && activeFilter !== 'equipmentGroup'}
                  >
                    <SelectTrigger id="equipment-group-select">
                      <SelectValue placeholder="เลือกกลุ่มอุปกรณ์" />
                    </SelectTrigger>
                    <SelectContent>
                      {equipmentGroupOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Damaged Part Filter */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="damaged-part-select">ชิ้นส่วนที่เสียหายหรือผิดปกติ</Label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        checked={activeFilter === 'damagedPart'} 
                        onChange={() => handleFilterChange('damagedPart')} 
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                  <Select 
                    value={damagedPartValue} 
                    onValueChange={setDamagedPartValue}
                    disabled={activeFilter !== null && activeFilter !== 'damagedPart'}
                  >
                    <SelectTrigger id="damaged-part-select">
                      <SelectValue placeholder="เลือกชิ้นส่วนที่เสียหาย" />
                    </SelectTrigger>
                    <SelectContent>
                      {damagedPartOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Damage Level Filter */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="damage-level-select">ระดับความเสียหาย</Label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        checked={activeFilter === 'damageLevel'} 
                        onChange={() => handleFilterChange('damageLevel')} 
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                  <Select 
                    value={damageLevelValue} 
                    onValueChange={setDamageLevelValue}
                    disabled={activeFilter !== null && activeFilter !== 'damageLevel'}
                  >
                    <SelectTrigger id="damage-level-select">
                      <SelectValue placeholder="เลือกระดับความเสียหาย" />
                    </SelectTrigger>
                    <SelectContent>
                      {damageLevelOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Root Cause Filter */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="root-cause-select">สาเหตุที่แท้จริง</Label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        checked={activeFilter === 'rootCause'} 
                        onChange={() => handleFilterChange('rootCause')} 
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                  <Select 
                    value={rootCauseValue} 
                    onValueChange={setRootCauseValue}
                    disabled={activeFilter !== null && activeFilter !== 'rootCause'}
                  >
                    <SelectTrigger id="root-cause-select">
                      <SelectValue placeholder="เลือกสาเหตุที่แท้จริง" />
                    </SelectTrigger>
                    <SelectContent>
                      {rootCauseOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Management Filter */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="management-select">การจัดการ</Label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        checked={activeFilter === 'management'} 
                        onChange={() => handleFilterChange('management')} 
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                  <Select 
                    value={managementValue} 
                    onValueChange={setManagementValue}
                    disabled={activeFilter !== null && activeFilter !== 'management'}
                  >
                    <SelectTrigger id="management-select">
                      <SelectValue placeholder="เลือกการจัดการ" />
                    </SelectTrigger>
                    <SelectContent>
                      {managementOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Grouping Option Card */}
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

export default DamageReportsPage;
