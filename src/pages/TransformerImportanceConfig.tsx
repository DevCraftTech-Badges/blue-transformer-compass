
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const TransformerImportanceConfigPage = () => {
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
                      <TableRow>
                        <TableHead className="w-[80px]">No.</TableHead>
                        <TableHead>Criteria</TableHead>
                        <TableHead>BUS Voltage [kV]</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Weight</TableHead>
                        <TableHead>Result</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.from({ length: 12 }).map((_, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell className="flex items-center gap-2">
                            Criteria {index + 1}
                            <Info size={16} className="text-gray-500 cursor-help" />
                          </TableCell>
                          <TableCell>
                            <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                              <option value="115">115 kV</option>
                              <option value="230">230 kV</option>
                            </select>
                          </TableCell>
                          <TableCell>
                            <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                          </TableCell>
                          <TableCell>
                            <input 
                              type="number" 
                              className="w-full rounded-md border border-input bg-gray-100 px-3 py-2 text-sm" 
                              value={(index % 7) + 1} 
                              readOnly 
                            />
                          </TableCell>
                          <TableCell>
                            <div className={`w-full h-6 rounded-md ${
                              index % 3 === 0 ? 'bg-red-500' : 
                              index % 3 === 1 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}></div>
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
                            <input 
                              type="text" 
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                              placeholder={`d value ${index + 1}`}
                            />
                          </TableCell>
                          <TableCell>
                            <input 
                              type="text" 
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                              placeholder={`Risk ${index + 1}`}
                            />
                          </TableCell>
                          <TableCell>
                            <input 
                              type="text" 
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
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
                            <input 
                              type="number" 
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                              placeholder="% value"
                            />
                          </TableCell>
                          <TableCell>
                            <input 
                              type="text" 
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                              placeholder="Importance"
                            />
                          </TableCell>
                          <TableCell>
                            <input 
                              type="text" 
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                              placeholder="Action"
                            />
                          </TableCell>
                          <TableCell>
                            <input 
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
                            <input 
                              type="number" 
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                              placeholder="% value"
                            />
                          </TableCell>
                          <TableCell>
                            <input 
                              type="text" 
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                              placeholder="Importance"
                            />
                          </TableCell>
                          <TableCell>
                            <input 
                              type="text" 
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
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
