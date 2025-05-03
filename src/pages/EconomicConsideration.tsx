
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Layout from '@/components/layout/Layout';
import { Save, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EconomicConsideration = () => {
  const { toast } = useToast();
  const [option3Data, setOption3Data] = useState({
    transformerPrice: '20000000',
    ratedPower: '50',
    noLoadLoss: '80',
    loadLoss: '320',
    opportunityCost: '0',
    annualMaintenanceCost: '110000',
    demolitionCost: '0',
  });

  const handleOption3Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOption3Data({
      ...option3Data,
      [name]: value,
    });
  };

  const handleOption3Save = () => {
    // Save logic would go here
    toast({
      title: "บันทึกสำเร็จ",
      description: "ข้อมูลถูกบันทึกเรียบร้อยแล้ว",
    });
  };

  const handleOption3Clear = () => {
    setOption3Data({
      transformerPrice: '',
      ratedPower: '',
      noLoadLoss: '',
      loadLoss: '',
      opportunityCost: '',
      annualMaintenanceCost: '',
      demolitionCost: '',
    });
    toast({
      title: "ล้างข้อมูลสำเร็จ",
      description: "ล้างข้อมูลเรียบร้อยแล้ว",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">การพิจารณาทางเศรษฐศาสตร์</h1>
        
        <Tabs defaultValue="option1" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="option1">Option 1</TabsTrigger>
            <TabsTrigger value="option2">Option 2</TabsTrigger>
            <TabsTrigger value="option3">Option 3</TabsTrigger>
          </TabsList>
          
          <TabsContent value="option1">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Option 1 Content</h2>
                <p>Content for Option 1 goes here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="option2">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Option 2 Content</h2>
                <p>Content for Option 2 goes here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="option3">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">ข้อมูลการซื้อหม้อแปลงใหม่</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="transformerPrice">ราคาหม้อแปลงใหม่ [Baht]:</Label>
                      <Input
                        id="transformerPrice"
                        name="transformerPrice"
                        type="number"
                        value={option3Data.transformerPrice}
                        onChange={handleOption3Change}
                        placeholder="0"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="ratedPower">Rated Power [MVA]:</Label>
                      <Input
                        id="ratedPower"
                        name="ratedPower"
                        type="number"
                        value={option3Data.ratedPower}
                        onChange={handleOption3Change}
                        placeholder="0"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="noLoadLoss">No-Load Loss [kW]:</Label>
                      <Input
                        id="noLoadLoss"
                        name="noLoadLoss"
                        type="number"
                        value={option3Data.noLoadLoss}
                        onChange={handleOption3Change}
                        placeholder="0"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="loadLoss">Load Loss [kW]:</Label>
                      <Input
                        id="loadLoss"
                        name="loadLoss"
                        type="number"
                        value={option3Data.loadLoss}
                        onChange={handleOption3Change}
                        placeholder="0"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="opportunityCost">ค่าเสียโอกาสในการจ่ายไฟเนื่องจาก PM [Baht/year]:</Label>
                      <Input
                        id="opportunityCost"
                        name="opportunityCost"
                        type="number"
                        value={option3Data.opportunityCost}
                        onChange={handleOption3Change}
                        placeholder="0"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="annualMaintenanceCost">ค่าซ่อมบำรุงเฉลี่ยรายปี [Baht/year]:</Label>
                      <Input
                        id="annualMaintenanceCost"
                        name="annualMaintenanceCost"
                        type="number"
                        value={option3Data.annualMaintenanceCost}
                        onChange={handleOption3Change}
                        placeholder="0"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="demolitionCost">ค่าทำลายหรือรื้อถอน [Baht]:</Label>
                      <Input
                        id="demolitionCost"
                        name="demolitionCost"
                        type="number"
                        value={option3Data.demolitionCost}
                        onChange={handleOption3Change}
                        placeholder="0"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <Button 
                      onClick={handleOption3Save} 
                      className="bg-primary hover:bg-primary-dark text-white"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button 
                      onClick={handleOption3Clear} 
                      variant="outline"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default EconomicConsideration;
