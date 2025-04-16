
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Edit, Trash2, Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Types for each form
interface StationData {
  id: number;
  shortName: string;
  fullName: string;
  district: string;
  kv: number;
}

interface UsageData {
  id: number;
  usageType: string;
}

interface ManufacturerData {
  id: number;
  name: string;
  score?: number;
}

// Mock data for tables
const mockStations: StationData[] = [
  { id: 1, shortName: 'BPK', fullName: 'บางปะกง', district: 'ชลบุรี', kv: 230 },
  { id: 2, shortName: 'KNB', fullName: 'กาญจนบุรี', district: 'กาญจนบุรี', kv: 500 },
  { id: 3, shortName: 'NKN', fullName: 'นครราชสีมา', district: 'นครราชสีมา', kv: 230 },
];

const mockUsages: UsageData[] = [
  { id: 1, usageType: 'Generator Step Up' },
  { id: 2, usageType: 'System Interconnection' },
  { id: 3, usageType: 'Distribution' },
];

const mockTransformerManufacturers: ManufacturerData[] = [
  { id: 1, name: 'ABB', score: 95 },
  { id: 2, name: 'Siemens', score: 90 },
  { id: 3, name: 'General Electric', score: 88 },
];

const mockBushingManufacturers: ManufacturerData[] = [
  { id: 1, name: 'ABB' },
  { id: 2, name: 'Trench' },
  { id: 3, name: 'HSP' },
];

const mockArresterManufacturers: ManufacturerData[] = [
  { id: 1, name: 'ABB' },
  { id: 2, name: 'Toshiba' },
  { id: 3, name: 'Siemens' },
];

const mockOLTCManufacturers: ManufacturerData[] = [
  { id: 1, name: 'MR' },
  { id: 2, name: 'ABB' },
  { id: 3, name: 'Huaming' },
];

const TransformerConfigManagementPage = () => {
  const { toast } = useToast();
  // State variables for each tab's dialog
  const [stationDialogOpen, setStationDialogOpen] = useState(false);
  const [usageDialogOpen, setUsageDialogOpen] = useState(false);
  const [transformerManufacturerDialogOpen, setTransformerManufacturerDialogOpen] = useState(false);
  const [bushingManufacturerDialogOpen, setBushingManufacturerDialogOpen] = useState(false);
  const [arresterManufacturerDialogOpen, setArresterManufacturerDialogOpen] = useState(false);
  const [oltcManufacturerDialogOpen, setOltcManufacturerDialogOpen] = useState(false);
  
  // State for form inputs
  const [stationForm, setStationForm] = useState<Partial<StationData>>({});
  const [usageForm, setUsageForm] = useState<Partial<UsageData>>({});
  const [transformerManufacturerForm, setTransformerManufacturerForm] = useState<Partial<ManufacturerData>>({});
  const [bushingManufacturerForm, setBushingManufacturerForm] = useState<Partial<ManufacturerData>>({});
  const [arresterManufacturerForm, setArresterManufacturerForm] = useState<Partial<ManufacturerData>>({});
  const [oltcManufacturerForm, setOltcManufacturerForm] = useState<Partial<ManufacturerData>>({});

  // Function to handle form submissions
  const handleStationSubmit = () => {
    toast({
      title: "Data saved",
      description: "Station data has been saved successfully",
    });
    setStationDialogOpen(false);
    setStationForm({});
  };

  const handleUsageSubmit = () => {
    toast({
      title: "Data saved",
      description: "Transformer usage data has been saved successfully",
    });
    setUsageDialogOpen(false);
    setUsageForm({});
  };

  const handleTransformerManufacturerSubmit = () => {
    toast({
      title: "Data saved",
      description: "Transformer manufacturer data has been saved successfully",
    });
    setTransformerManufacturerDialogOpen(false);
    setTransformerManufacturerForm({});
  };

  const handleBushingManufacturerSubmit = () => {
    toast({
      title: "Data saved",
      description: "Bushing manufacturer data has been saved successfully",
    });
    setBushingManufacturerDialogOpen(false);
    setBushingManufacturerForm({});
  };

  const handleArresterManufacturerSubmit = () => {
    toast({
      title: "Data saved",
      description: "Arrester manufacturer data has been saved successfully",
    });
    setArresterManufacturerDialogOpen(false);
    setArresterManufacturerForm({});
  };

  const handleOltcManufacturerSubmit = () => {
    toast({
      title: "Data saved",
      description: "OLTC manufacturer data has been saved successfully",
    });
    setOltcManufacturerDialogOpen(false);
    setOltcManufacturerForm({});
  };

  // Functions for edit and delete
  const handleEdit = (type: string, id: number) => {
    toast({
      title: "Edit initiated",
      description: `Editing ${type} with ID ${id}`,
    });
  };

  const handleDelete = (type: string, id: number) => {
    toast({
      title: "Delete initiated",
      description: `Deleting ${type} with ID ${id}`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">กำหนดข้อมูลพื้นฐานหม้อแปลง</h1>
        
        <Tabs defaultValue="station" className="w-full">
          <TabsList className="mb-4 flex overflow-x-auto">
            <TabsTrigger value="station">สถานีไฟฟ้า</TabsTrigger>
            <TabsTrigger value="usage">ลักษณะการใช้งานหม้อแปลง</TabsTrigger>
            <TabsTrigger value="transformer">บริษัทผู้ผลิตหม้อแปลง</TabsTrigger>
            <TabsTrigger value="bushing">บริษัทผู้ผลิต Bushing</TabsTrigger>
            <TabsTrigger value="arrester">บริษัทผู้ผลิต Arrester</TabsTrigger>
            <TabsTrigger value="oltc">บริษัทผู้ผลิต OLTC</TabsTrigger>
          </TabsList>

          {/* Station Tab */}
          <TabsContent value="station">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>สถานีไฟฟ้า</CardTitle>
                <Button 
                  onClick={() => setStationDialogOpen(true)}
                  className="bg-transformer-primary hover:bg-transformer-primary/90"
                >
                  <Plus className="mr-2 h-4 w-4" /> สร้างรายการใหม่
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ชื่อย่อสถานี</TableHead>
                      <TableHead>ชื่อเต็มสถานี</TableHead>
                      <TableHead>เขต</TableHead>
                      <TableHead>kv</TableHead>
                      <TableHead>จัดการ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockStations.map((station) => (
                      <TableRow key={station.id}>
                        <TableCell>{station.shortName}</TableCell>
                        <TableCell>{station.fullName}</TableCell>
                        <TableCell>{station.district}</TableCell>
                        <TableCell>{station.kv}</TableCell>
                        <TableCell className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEdit('station', station.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDelete('station', station.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Pagination className="mt-4">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Usage Tab */}
          <TabsContent value="usage">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>ลักษณะการใช้งานหม้อแปลง</CardTitle>
                <Button 
                  onClick={() => setUsageDialogOpen(true)}
                  className="bg-transformer-primary hover:bg-transformer-primary/90"
                >
                  <Plus className="mr-2 h-4 w-4" /> สร้างรายการใหม่
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No.</TableHead>
                      <TableHead>ลักษณะการใช้งานของหม้อแปลงไฟฟ้า</TableHead>
                      <TableHead>จัดการ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsages.map((usage) => (
                      <TableRow key={usage.id}>
                        <TableCell>{usage.id}</TableCell>
                        <TableCell>{usage.usageType}</TableCell>
                        <TableCell className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEdit('usage', usage.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDelete('usage', usage.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Pagination className="mt-4">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transformer Manufacturer Tab */}
          <TabsContent value="transformer">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>บริษัทผู้ผลิตหม้อแปลง</CardTitle>
                <Button 
                  onClick={() => setTransformerManufacturerDialogOpen(true)}
                  className="bg-transformer-primary hover:bg-transformer-primary/90"
                >
                  <Plus className="mr-2 h-4 w-4" /> สร้างรายการใหม่
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No.</TableHead>
                      <TableHead>Manufacturer</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>จัดการ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTransformerManufacturers.map((manufacturer) => (
                      <TableRow key={manufacturer.id}>
                        <TableCell>{manufacturer.id}</TableCell>
                        <TableCell>{manufacturer.name}</TableCell>
                        <TableCell>{manufacturer.score}</TableCell>
                        <TableCell className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEdit('transformer-manufacturer', manufacturer.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDelete('transformer-manufacturer', manufacturer.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Pagination className="mt-4">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bushing Manufacturer Tab */}
          <TabsContent value="bushing">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>บริษัทผู้ผลิต Bushing</CardTitle>
                <Button 
                  onClick={() => setBushingManufacturerDialogOpen(true)}
                  className="bg-transformer-primary hover:bg-transformer-primary/90"
                >
                  <Plus className="mr-2 h-4 w-4" /> สร้างรายการใหม่
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No.</TableHead>
                      <TableHead>Manufacturer</TableHead>
                      <TableHead>จัดการ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockBushingManufacturers.map((manufacturer) => (
                      <TableRow key={manufacturer.id}>
                        <TableCell>{manufacturer.id}</TableCell>
                        <TableCell>{manufacturer.name}</TableCell>
                        <TableCell className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEdit('bushing-manufacturer', manufacturer.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDelete('bushing-manufacturer', manufacturer.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Pagination className="mt-4">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Arrester Manufacturer Tab */}
          <TabsContent value="arrester">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>บริษัทผู้ผลิต Arrester</CardTitle>
                <Button 
                  onClick={() => setArresterManufacturerDialogOpen(true)}
                  className="bg-transformer-primary hover:bg-transformer-primary/90"
                >
                  <Plus className="mr-2 h-4 w-4" /> สร้างรายการใหม่
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No.</TableHead>
                      <TableHead>Manufacturer</TableHead>
                      <TableHead>จัดการ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockArresterManufacturers.map((manufacturer) => (
                      <TableRow key={manufacturer.id}>
                        <TableCell>{manufacturer.id}</TableCell>
                        <TableCell>{manufacturer.name}</TableCell>
                        <TableCell className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEdit('arrester-manufacturer', manufacturer.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDelete('arrester-manufacturer', manufacturer.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Pagination className="mt-4">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardContent>
            </Card>
          </TabsContent>

          {/* OLTC Manufacturer Tab */}
          <TabsContent value="oltc">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>บริษัทผู้ผลิต OLTC</CardTitle>
                <Button 
                  onClick={() => setOltcManufacturerDialogOpen(true)}
                  className="bg-transformer-primary hover:bg-transformer-primary/90"
                >
                  <Plus className="mr-2 h-4 w-4" /> สร้างรายการใหม่
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No.</TableHead>
                      <TableHead>Manufacturer</TableHead>
                      <TableHead>จัดการ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockOLTCManufacturers.map((manufacturer) => (
                      <TableRow key={manufacturer.id}>
                        <TableCell>{manufacturer.id}</TableCell>
                        <TableCell>{manufacturer.name}</TableCell>
                        <TableCell className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEdit('oltc-manufacturer', manufacturer.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDelete('oltc-manufacturer', manufacturer.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Pagination className="mt-4">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Station Dialog */}
      <Dialog open={stationDialogOpen} onOpenChange={setStationDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>สร้างรายการสถานีไฟฟ้าใหม่</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shortName" className="text-right">
                ชื่อย่อสถานี
              </Label>
              <Input
                id="shortName"
                placeholder="ชื่อย่อสถานี"
                className="col-span-3"
                value={stationForm.shortName || ''}
                onChange={(e) => setStationForm({...stationForm, shortName: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullName" className="text-right">
                ชื่อเต็มสถานี
              </Label>
              <Input
                id="fullName"
                placeholder="ชื่อเต็มสถานี"
                className="col-span-3"
                value={stationForm.fullName || ''}
                onChange={(e) => setStationForm({...stationForm, fullName: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="district" className="text-right">
                เขต
              </Label>
              <Input
                id="district"
                placeholder="เขต"
                className="col-span-3"
                value={stationForm.district || ''}
                onChange={(e) => setStationForm({...stationForm, district: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="kv" className="text-right">
                kv
              </Label>
              <Input
                id="kv"
                type="number"
                placeholder="kv"
                className="col-span-3"
                value={stationForm.kv || ''}
                onChange={(e) => setStationForm({...stationForm, kv: Number(e.target.value)})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleStationSubmit}>บันทึกข้อมูล</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Usage Dialog */}
      <Dialog open={usageDialogOpen} onOpenChange={setUsageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>สร้างรายการลักษณะการใช้งานหม้อแปลงใหม่</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="usageType" className="text-right">
                ลักษณะการใช้งานของหม้อแปลงไฟฟ้า
              </Label>
              <Input
                id="usageType"
                placeholder="ลักษณะการใช้งานของหม้อแปลงไฟฟ้า"
                className="col-span-3"
                value={usageForm.usageType || ''}
                onChange={(e) => setUsageForm({...usageForm, usageType: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleUsageSubmit}>บันทึกข้อมูล</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transformer Manufacturer Dialog */}
      <Dialog open={transformerManufacturerDialogOpen} onOpenChange={setTransformerManufacturerDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>สร้างรายการบริษัทผู้ผลิตหม้อแปลงใหม่</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="manufacturerName" className="text-right">
                Manufacturer
              </Label>
              <Input
                id="manufacturerName"
                placeholder="Manufacturer"
                className="col-span-3"
                value={transformerManufacturerForm.name || ''}
                onChange={(e) => setTransformerManufacturerForm({...transformerManufacturerForm, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="manufacturerScore" className="text-right">
                Score
              </Label>
              <Input
                id="manufacturerScore"
                type="number"
                placeholder="Score"
                className="col-span-3"
                value={transformerManufacturerForm.score || ''}
                onChange={(e) => setTransformerManufacturerForm({...transformerManufacturerForm, score: Number(e.target.value)})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleTransformerManufacturerSubmit}>บันทึกข้อมูล</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bushing Manufacturer Dialog */}
      <Dialog open={bushingManufacturerDialogOpen} onOpenChange={setBushingManufacturerDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>สร้างรายการบริษัทผู้ผลิต Bushing ใหม่</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bushingManufacturerName" className="text-right">
                Manufacturer
              </Label>
              <Input
                id="bushingManufacturerName"
                placeholder="Manufacturer"
                className="col-span-3"
                value={bushingManufacturerForm.name || ''}
                onChange={(e) => setBushingManufacturerForm({...bushingManufacturerForm, name: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleBushingManufacturerSubmit}>บันทึกข้อมูล</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Arrester Manufacturer Dialog */}
      <Dialog open={arresterManufacturerDialogOpen} onOpenChange={setArresterManufacturerDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>สร้างรายการบริษัทผู้ผลิต Arrester ใหม่</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="arresterManufacturerName" className="text-right">
                Manufacturer
              </Label>
              <Input
                id="arresterManufacturerName"
                placeholder="Manufacturer"
                className="col-span-3"
                value={arresterManufacturerForm.name || ''}
                onChange={(e) => setArresterManufacturerForm({...arresterManufacturerForm, name: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleArresterManufacturerSubmit}>บันทึกข้อมูล</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* OLTC Manufacturer Dialog */}
      <Dialog open={oltcManufacturerDialogOpen} onOpenChange={setOltcManufacturerDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>สร้างรายการบริษัทผู้ผลิต OLTC ใหม่</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="oltcManufacturerName" className="text-right">
                Manufacturer
              </Label>
              <Input
                id="oltcManufacturerName"
                placeholder="Manufacturer"
                className="col-span-3"
                value={oltcManufacturerForm.name || ''}
                onChange={(e) => setOltcManufacturerForm({...oltcManufacturerForm, name: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleOltcManufacturerSubmit}>บันทึกข้อมูล</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default TransformerConfigManagementPage;
