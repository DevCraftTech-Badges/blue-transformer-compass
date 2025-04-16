
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Info, HelpCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Define the criteria structure
const criteriaData = [
  {
    id: 1,
    name: 'System Importance',
    description: 'ความสำคัญของระบบไฟฟ้า',
    options: ['Loading 115', 'Tie 230/115', 'Generating Step-up', 'Station Service', 'Stand By'],
    weights: 7,
    busVoltageDependent: true
  },
  {
    id: 2,
    name: 'Availability',
    description: 'ความพร้อมใช้งานของหม้อแปลง',
    options: ['In-Service', 'Cold Standby', 'Mobile'],
    weights: 6,
    busVoltageDependent: false
  },
  {
    id: 3,
    name: 'System Fault Level',
    description: 'ระดับความผิดพลาดของระบบ',
    options: {
      '115': ['≤5000 MVA', '5001-15000 MVA', '>15000 MVA'],
      '230': ['≤10000 MVA', '10001-30000 MVA', '>30000 MVA'],
    },
    weights: 5,
    busVoltageDependent: true
  },
  {
    id: 4,
    name: 'Connected Load',
    description: 'โหลดที่เชื่อมต่อ',
    options: ['≤20 MVA', '21-40 MVA', '41-60 MVA', '61-80 MVA', '>80 MVA'],
    weights: 7,
    busVoltageDependent: false
  },
  {
    id: 5,
    name: 'Proximity to Industrial Areas',
    description: 'ความใกล้ชิดกับพื้นที่อุตสาหกรรม',
    options: ['Yes', 'No'],
    weights: 4,
    busVoltageDependent: false
  },
  {
    id: 6,
    name: 'Social Aspects',
    description: 'ปัจจัยทางสังคม',
    options: ['Low', 'Medium', 'High'],
    weights: 4,
    busVoltageDependent: false
  },
  {
    id: 7,
    name: 'Environmental Impact',
    description: 'ผลกระทบต่อสิ่งแวดล้อม',
    options: ['Low', 'Medium', 'High'],
    weights: 3,
    busVoltageDependent: false
  },
  {
    id: 8,
    name: 'Pollution',
    description: 'มลพิษ',
    options: ['Low', 'Medium', 'High'],
    weights: 2,
    busVoltageDependent: false
  },
  {
    id: 9,
    name: 'Switchgear Connection Dependency',
    description: 'การพึ่งพาการเชื่อมต่อ Switchgear',
    options: ['Low', 'Medium', 'High'],
    weights: 2,
    busVoltageDependent: false
  },
  {
    id: 10,
    name: 'Redundancy',
    description: 'ความซ้ำซ้อน',
    options: ['Yes', 'No'],
    weights: 6,
    busVoltageDependent: false
  },
  {
    id: 11,
    name: 'Spare Parts Availability',
    description: 'ความพร้อมของอะไหล่',
    options: ['Available', 'Limited', 'Not Available'],
    weights: 5,
    busVoltageDependent: false
  },
  {
    id: 12,
    name: 'Manufacturer Reliability',
    description: 'ความน่าเชื่อถือของผู้ผลิต',
    options: ['High', 'Medium', 'Low'],
    weights: 3,
    busVoltageDependent: false
  }
];

// Score mapping to risk level colors
const getScoreColor = (score: number) => {
  if (score <= 2) return 'bg-green-500'; // Low risk
  if (score <= 4) return 'bg-yellow-500'; // Medium risk
  return 'bg-red-500'; // High risk
};

// Score mapping to risk level text
const getScoreText = (score: number) => {
  if (score === 1) return 'Very Low';
  if (score === 2) return 'Low';
  if (score === 3) return 'Moderate';
  if (score === 4) return 'High';
  if (score === 5) return 'Very High';
  if (score === 6) return 'Extremely High';
  return '';
};

const TransformerImportanceConfigPage = () => {
  // State for form data
  const [criteriaValues, setCriteriaValues] = useState<{[key: number]: {busVoltage: string, score: number}}>(
    criteriaData.reduce((acc, criteria) => ({
      ...acc,
      [criteria.id]: { busVoltage: '115', score: 1 }
    }), {})
  );

  // Handle changes to form values
  const handleVoltageChange = (criteriaId: number, value: string) => {
    setCriteriaValues(prev => ({
      ...prev,
      [criteriaId]: { ...prev[criteriaId], busVoltage: value }
    }));
  };

  const handleScoreChange = (criteriaId: number, value: number) => {
    setCriteriaValues(prev => ({
      ...prev,
      [criteriaId]: { ...prev[criteriaId], score: value }
    }));
  };

  // Save form data
  const handleSave = () => {
    console.log("Saving criteria values:", criteriaValues);
    // Here you would typically send data to an API
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">กำหนดข้อมูลความสำคัญหม้อแปลง</h1>
        
        <Tabs defaultValue="criteria" className="w-full">
          <TabsList className="grid grid-cols-4 w-full mb-8">
            <TabsTrigger value="criteria">Criteria</TabsTrigger>
            <TabsTrigger value="risk">Risk</TabsTrigger>
            <TabsTrigger value="xscale">X-Scale</TabsTrigger>
            <TabsTrigger value="yscale">Y-Scale</TabsTrigger>
          </TabsList>
          
          {/* Criteria Tab */}
          <TabsContent value="criteria">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Score Color</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/70">
                        <TableHead className="w-[60px] text-center">No.</TableHead>
                        <TableHead>Criteria</TableHead>
                        <TableHead className="w-[180px]">BUS Voltage [kV]</TableHead>
                        <TableHead className="w-[140px]">Score</TableHead>
                        <TableHead className="w-[100px] text-center">Weight</TableHead>
                        <TableHead className="w-[120px] text-center">Result</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {criteriaData.map((criteria) => (
                        <TableRow key={criteria.id} className="hover:bg-muted/30">
                          <TableCell className="text-center font-medium">{criteria.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span>{criteria.name}</span>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{criteria.description}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </TableCell>
                          <TableCell>
                            {criteria.busVoltageDependent ? (
                              <Select 
                                value={criteriaValues[criteria.id]?.busVoltage || '115'}
                                onValueChange={(value) => handleVoltageChange(criteria.id, value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select voltage" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="115">115 kV</SelectItem>
                                  <SelectItem value="230">230 kV</SelectItem>
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input value="N/A" disabled className="bg-muted/30" />
                            )}
                          </TableCell>
                          <TableCell>
                            <Select 
                              value={criteriaValues[criteria.id]?.score.toString() || '1'}
                              onValueChange={(value) => handleScoreChange(criteria.id, parseInt(value))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select score" />
                              </SelectTrigger>
                              <SelectContent>
                                {typeof criteria.options === 'object' && !Array.isArray(criteria.options) ? (
                                  // For options dependent on bus voltage
                                  criteria.options[criteriaValues[criteria.id]?.busVoltage || '115']?.map((option, index) => (
                                    <SelectItem 
                                      key={index} 
                                      value={(index + 1).toString()}
                                      className="flex items-center justify-between"
                                    >
                                      <div className="flex items-center gap-2">
                                        <span>{option}</span>
                                        <Badge 
                                          variant="outline" 
                                          className={`ml-2 ${getScoreColor(index + 1)} text-white`}
                                        >
                                          {getScoreText(index + 1)}
                                        </Badge>
                                      </div>
                                    </SelectItem>
                                  ))
                                ) : (
                                  // For standard options
                                  Array.isArray(criteria.options) && criteria.options.map((option, index) => (
                                    <SelectItem 
                                      key={index} 
                                      value={(index + 1).toString()}
                                      className="flex items-center justify-between"
                                    >
                                      <div className="flex items-center gap-2">
                                        <span>{option}</span>
                                        <Badge 
                                          variant="outline" 
                                          className={`ml-2 ${getScoreColor(index + 1)} text-white`}
                                        >
                                          {getScoreText(index + 1)}
                                        </Badge>
                                      </div>
                                    </SelectItem>
                                  ))
                                )}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="text-center">
                            <Input 
                              value={criteria.weights.toString()} 
                              readOnly 
                              className="text-center bg-muted/30 font-medium" 
                            />
                          </TableCell>
                          <TableCell>
                            <div className={`w-full h-8 rounded-md ${
                              getScoreColor(criteriaValues[criteria.id]?.score || 1)
                            } flex items-center justify-center text-white font-medium`}>
                              {(criteriaValues[criteria.id]?.score || 1) * criteria.weights}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-8">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-sm bg-green-500"></div>
                        <span className="text-sm">Low Risk (1-2)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-sm bg-yellow-500"></div>
                        <span className="text-sm">Medium Risk (3-4)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-sm bg-red-500"></div>
                        <span className="text-sm">High Risk (5-6)</span>
                      </div>
                    </div>
                    <Button onClick={handleSave} className="min-w-[150px]">บันทึกข้อมูล</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Risk Tab */}
          <TabsContent value="risk">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">การคำนวนระยะ d</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>d</TableHead>
                        <TableHead>Risk</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Input 
                              type="text" 
                              placeholder={`d value ${index + 1}`}
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              type="text" 
                              placeholder={`Risk ${index + 1}`}
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              type="text" 
                              placeholder={`Action ${index + 1}`}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button>บันทึกข้อมูล</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* X-Scale Tab */}
          <TabsContent value="xscale">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">ปรับค่าสีในแนวแกน X</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>%II</TableHead>
                        <TableHead>Importance</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Color</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.from({ length: 3 }).map((_, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Input 
                              type="number" 
                              placeholder="% value"
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              type="text" 
                              placeholder="Importance"
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              type="text" 
                              placeholder="Action"
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              type="color" 
                              className="w-full h-10 rounded-md border border-input bg-background" 
                              defaultValue={index === 0 ? "#ff0000" : index === 1 ? "#ffff00" : "#00ff00"}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button>บันทึกข้อมูล</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Y-Scale Tab */}
          <TabsContent value="yscale">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">ปรับค่าสีในแนวแกน Y</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>%II</TableHead>
                        <TableHead>Importance</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.from({ length: 3 }).map((_, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Input 
                              type="number" 
                              placeholder="% value"
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              type="text" 
                              placeholder="Importance"
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              type="text" 
                              placeholder="Action"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button>บันทึกข้อมูล</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TransformerImportanceConfigPage;
