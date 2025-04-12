
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { BarChart3, PieChart, FileDown } from 'lucide-react';
import { ChartContainer } from '@/components/ui/chart';
import { PieChart as RechartsPC, Pie, BarChart as RechartsBC, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StandardReportsList } from '@/components/standardReports/StandardReportsList';
import { toast } from 'sonner';

const StandardReportsPage = () => {
  const [startAge, setStartAge] = useState<string>('');
  const [endAge, setEndAge] = useState<string>('');
  const [isDisplayOptionsOpen, setIsDisplayOptionsOpen] = useState(false);
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [chartType, setChartType] = useState<'pie' | 'bar'>('pie');
  const [displayUnit, setDisplayUnit] = useState<'count' | 'percentage'>('count');

  // Sample data for demonstration
  const sampleData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#1E40AF'];

  const handleShowReport = (reportTitle: string) => {
    setSelectedReport(reportTitle);
    setIsDisplayOptionsOpen(true);
  };

  const handleConfirmOptions = () => {
    setIsDisplayOptionsOpen(false);
    setIsChartModalOpen(true);
  };

  const handleExport = () => {
    toast.success('กำลังส่งออกรายงาน...');
    // Export logic would be implemented here
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">รายงานมาตรฐาน</CardTitle>
            <CardDescription>
              หน้านี้แสดงความสัมพันธ์ทางสถิติเกี่ยวกับหม้อแปลงและข้อมูลความเสียหาย
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="startAge">ช่วงอายุเริ่มต้น</Label>
                <Input
                  id="startAge"
                  type="number"
                  value={startAge}
                  onChange={(e) => setStartAge(e.target.value)}
                  min="0"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="endAge">ช่วงอายุสิ้นสุด</Label>
                <Input
                  id="endAge"
                  type="number"
                  value={endAge}
                  onChange={(e) => setEndAge(e.target.value)}
                  min="0"
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <StandardReportsList onShowReport={handleShowReport} />

        {/* Display Options Modal */}
        <Dialog open={isDisplayOptionsOpen} onOpenChange={setIsDisplayOptionsOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>เลือกรูปแบบการแสดงผล</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>รูปแบบการแสดงผล</Label>
                <RadioGroup value={chartType} onValueChange={(value) => setChartType(value as 'pie' | 'bar')} className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pie" id="pie" />
                    <Label htmlFor="pie" className="flex items-center gap-2">
                      <PieChart size={18} />
                      กราฟวงกลม
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bar" id="bar" />
                    <Label htmlFor="bar" className="flex items-center gap-2">
                      <BarChart3 size={18} />
                      กราฟแท่ง
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>หน่วยการแสดงผล</Label>
                <RadioGroup value={displayUnit} onValueChange={(value) => setDisplayUnit(value as 'count' | 'percentage')} className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="count" id="count" />
                    <Label htmlFor="count">จำนวน</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="percentage" id="percentage" />
                    <Label htmlFor="percentage">เปอร์เซนต์</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleConfirmOptions} className="bg-blue-600 hover:bg-blue-700 text-white">
                ยืนยัน
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Chart Display Modal */}
        <Dialog open={isChartModalOpen} onOpenChange={setIsChartModalOpen}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedReport}</DialogTitle>
            </DialogHeader>
            <div className="pt-4 pb-6">
              <div className="h-[400px] w-full">
                {chartType === 'pie' ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPC>
                      <Pie
                        data={sampleData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={(entry) => `${entry.name}: ${displayUnit === 'percentage' ? `${((entry.value / sampleData.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%` : entry.value}`}
                      >
                        {sampleData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [displayUnit === 'percentage' ? `${((value as number / sampleData.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%` : value, 'จำนวน']} />
                      <Legend />
                    </RechartsPC>
                  </ResponsiveContainer>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBC
                      data={sampleData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [displayUnit === 'percentage' ? `${((value as number / sampleData.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%` : value, 'จำนวน']} />
                      <Legend />
                      <Bar
                        dataKey="value"
                        name="จำนวน"
                        fill="#1E40AF"
                      >
                        {sampleData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </RechartsBC>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleExport} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                <FileDown size={18} />
                Export
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default StandardReportsPage;
