
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import { FileText } from "lucide-react";

const ExpenseItemsPage: React.FC = () => {
  const { toast } = useToast();
  
  const [orderingCost, setOrderingCost] = useState({
    domesticManagementFee: '60000',
    transportManagementFee: '2700',
    inventoryManagementFee: '2',
    insuranceManagementFee: '3',
    exchangeManagementFee: '1900',
    insurancePaymentFee: '160',
    claimManagementFee: '1600',
    softwareFee: '2000',
    documentFee: '1',
    catalogFee: '100',
    totalOrderingCost: '60000'
  });

  const [carryingCost, setCarryingCost] = useState({
    oilWarehouse: '4.0',
    rentalSpace: '35.0',
    rentalSpaceTotal: '105.0',
    inventoryManagement: '15.0',
    inventoryManagementTotal: '1962.75842285156',
    totalCarryingCost: '2067.75854492187'
  });

  const handleOrderingCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setOrderingCost(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleCarryingCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCarryingCost(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleCalculate = () => {
    // Here you would implement calculation logic
    console.log("Calculating expense items...");
    toast({
      title: "คำนวณสำเร็จ",
      description: "ข้อมูลค่าใช้จ่ายได้รับการคำนวณเรียบร้อยแล้ว",
    });
  };

  const handleClearData = () => {
    setOrderingCost({
      domesticManagementFee: '',
      transportManagementFee: '',
      inventoryManagementFee: '',
      insuranceManagementFee: '',
      exchangeManagementFee: '',
      insurancePaymentFee: '',
      claimManagementFee: '',
      softwareFee: '',
      documentFee: '',
      catalogFee: '',
      totalOrderingCost: ''
    });

    setCarryingCost({
      oilWarehouse: '',
      rentalSpace: '',
      rentalSpaceTotal: '',
      inventoryManagement: '',
      inventoryManagementTotal: '',
      totalCarryingCost: ''
    });

    toast({
      title: "ล้างข้อมูล",
      description: "ข้อมูลได้ถูกล้างเรียบร้อยแล้ว",
    });
  };

  return (
    <Layout>
      <div className="p-6 animate-fade-in">
        <div className="mb-6 flex items-center gap-2">
          <FileText className="h-6 w-6 text-transformer-primary" />
          <h1 className="text-2xl font-bold text-transformer-dark">รายการค่าใช้จ่าย</h1>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ordering Cost</CardTitle>
              <CardDescription>รายการค่าใช้จ่ายในการสั่งซื้อ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="domesticManagementFee">ค่าบริหารงานจัดหาในประเทศ 10% ของมูลค่าน้ำมัน (ไม่เกิน 60,000)</Label>
                <Input 
                  id="domesticManagementFee" 
                  value={orderingCost.domesticManagementFee}
                  onChange={handleOrderingCostChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="transportManagementFee">ค่าบริหารงานขนส่งและสำรวจความเสียหายเนื่องจากการขนส่งเฉลี่ยครั้งละ 2700 บาท/วัน</Label>
                <Input 
                  id="transportManagementFee" 
                  value={orderingCost.transportManagementFee}
                  onChange={handleOrderingCostChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="inventoryManagementFee">ค่าบริหารงานคลัง 2% ของมูลค่าน้ำมัน</Label>
                <Input 
                  id="inventoryManagementFee" 
                  value={orderingCost.inventoryManagementFee}
                  onChange={handleOrderingCostChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="insuranceManagementFee">ค่าบริหารงานประกันภัยขนส่งเฉลี่ยครั้งละ 3% ของมูลค่าน้ำมัน</Label>
                <Input 
                  id="insuranceManagementFee" 
                  value={orderingCost.insuranceManagementFee}
                  onChange={handleOrderingCostChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="exchangeManagementFee">ค่าบริหารรับฝากขายหรือแลกเปลี่ยนระหว่างราคาและสอบทานราคาจัดหาในประเทศ 1,900 บาท/เรื่อง</Label>
                <Input 
                  id="exchangeManagementFee" 
                  value={orderingCost.exchangeManagementFee}
                  onChange={handleOrderingCostChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="insurancePaymentFee">ค่าบริหารงานเดินจ่ายประกัน 160 บาท/เรื่อง</Label>
                <Input 
                  id="insurancePaymentFee" 
                  value={orderingCost.insurancePaymentFee}
                  onChange={handleOrderingCostChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="claimManagementFee">ค่าบริหารงานเรียกค่าใช้จ่ายในการออกของและอุปกรณ์ที่ขาดส่งจากคู่สัญญา 1,600 บาท/ยืนงาน</Label>
                <Input 
                  id="claimManagementFee" 
                  value={orderingCost.claimManagementFee}
                  onChange={handleOrderingCostChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="softwareFee">ค่าบริหารการใช้ซอฟต์แวร์จัดซื้อ 2,000 บาท/ปี/วัน</Label>
                <Input 
                  id="softwareFee" 
                  value={orderingCost.softwareFee}
                  onChange={handleOrderingCostChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="documentFee">ค่าบริหารค่าเอกสาร 1 บาท/แผ่น</Label>
                <Input 
                  id="documentFee" 
                  value={orderingCost.documentFee}
                  onChange={handleOrderingCostChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="catalogFee">ค่าจัดทำ catalogue และกำหนดรหัสโลหิตภัณฑ 100 บาท/รายการ</Label>
                <Input 
                  id="catalogFee" 
                  value={orderingCost.catalogFee}
                  onChange={handleOrderingCostChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="totalOrderingCost">ค่าใช้จ่ายในการสั่ง รวมเป็น</Label>
                <Input 
                  id="totalOrderingCost" 
                  value={orderingCost.totalOrderingCost}
                  onChange={handleOrderingCostChange}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Carrying Cost</CardTitle>
              <CardDescription>รายการค่าใช้จ่ายในการเก็บรักษา</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="oilWarehouse">โกดังวางน้ำมันเชื้อเพลิง [ถัง]</Label>
                <Input 
                  id="oilWarehouse" 
                  value={carryingCost.oilWarehouse}
                  onChange={handleCarryingCostChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rentalSpace">ค่าเช่าพื้นที่ [บาท/ตารางเมตร/เดือน]</Label>
                <Input 
                  id="rentalSpace" 
                  value={carryingCost.rentalSpace}
                  onChange={handleCarryingCostChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label>คิดเป็น [บาท/ถัง/ปี]</Label>
                <Input 
                  value={carryingCost.rentalSpaceTotal}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="inventoryManagement">ค่าบริหารงานพัสดุคงคลัง [% ของราคาเฉลี่ยน้ำมัน 1 ถัง]</Label>
                <Input 
                  id="inventoryManagement" 
                  value={carryingCost.inventoryManagement}
                  onChange={handleCarryingCostChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label>คิดเป็น [บาท/ถัง/ปี]</Label>
                <Input 
                  value={carryingCost.inventoryManagementTotal}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              
              <div className="space-y-2">
                <Label>ค่าใช้จ่ายในการเก็บ รวมเป็น [บาท/ถัง/ปี]</Label>
                <Input 
                  value={carryingCost.totalCarryingCost}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-4 justify-end">
            <Button variant="outline" onClick={handleClearData}>ล้างข้อมูล</Button>
            <Button onClick={handleCalculate}>คำนวณ</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ExpenseItemsPage;
