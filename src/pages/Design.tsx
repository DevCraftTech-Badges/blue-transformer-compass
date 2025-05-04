
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Paintbrush, 
  LayoutGrid, 
  Type, 
  Palette, 
  Component, 
  Layers, 
  Box, 
  RefreshCw 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const DesignPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('colors');

  const colorPalette = [
    { name: 'Primary', color: '#3B82F6', textColor: 'text-white', description: 'สีหลักของแอปพลิเคชัน' },
    { name: 'Secondary', color: '#10B981', textColor: 'text-white', description: 'สีรองของแอปพลิเคชัน' },
    { name: 'Accent', color: '#8B5CF6', textColor: 'text-white', description: 'สีเน้นของแอปพลิเคชัน' },
    { name: 'Transformer Primary', color: '#1E40AF', textColor: 'text-white', description: 'สีหลักสำหรับหม้อแปลง' },
    { name: 'Transformer Secondary', color: '#1D4ED8', textColor: 'text-white', description: 'สีรองสำหรับหม้อแปลง' },
    { name: 'Warning', color: '#F59E0B', textColor: 'text-white', description: 'สีเตือน' },
    { name: 'Error', color: '#EF4444', textColor: 'text-white', description: 'สีแสดงข้อผิดพลาด' },
    { name: 'Success', color: '#10B981', textColor: 'text-white', description: 'สีแสดงความสำเร็จ' },
    { name: 'Dark', color: '#111827', textColor: 'text-white', description: 'สีเข้มสำหรับข้อความ' },
    { name: 'Light', color: '#F3F4F6', textColor: 'text-gray-700', description: 'สีอ่อนสำหรับพื้นหลัง' }
  ];

  const componentStyles = [
    { name: 'Button', variants: ['Default', 'Outline', 'Secondary', 'Destructive', 'Ghost', 'Link'] },
    { name: 'Card', variants: ['Default', 'Hover', 'Interactive'] },
    { name: 'Badge', variants: ['Default', 'Secondary', 'Outline', 'Destructive'] },
    { name: 'Form Elements', variants: ['Input', 'Select', 'Checkbox', 'Radio', 'Textarea'] },
    { name: 'Feedback', variants: ['Toast', 'Alert', 'Dialog'] },
    { name: 'Navigation', variants: ['Tabs', 'Sidebar', 'Breadcrumb', 'Pagination'] }
  ];

  const fontSizes = [
    { name: 'xs', value: '0.75rem', description: 'ข้อความขนาดเล็กมาก' },
    { name: 'sm', value: '0.875rem', description: 'ข้อความขนาดเล็ก' },
    { name: 'base', value: '1rem', description: 'ข้อความขนาดปกติ' },
    { name: 'lg', value: '1.125rem', description: 'ข้อความขนาดใหญ่' },
    { name: 'xl', value: '1.25rem', description: 'ข้อความขนาดใหญ่มาก' },
    { name: '2xl', value: '1.5rem', description: 'หัวข้อขนาดเล็ก' },
    { name: '3xl', value: '1.875rem', description: 'หัวข้อขนาดกลาง' },
    { name: '4xl', value: '2.25rem', description: 'หัวข้อขนาดใหญ่' },
    { name: '5xl', value: '3rem', description: 'หัวข้อขนาดใหญ่มาก' }
  ];

  const animationVariants = [
    { name: 'fade-in', description: 'เฟดอินเมื่อโหลดหน้า', code: 'opacity: 0 → 1' },
    { name: 'slide-in', description: 'สไลด์เข้าจากด้านล่าง', code: 'transform: translateY(20px) → 0' },
    { name: 'scale-in', description: 'ขยายเข้าจากศูนย์กลาง', code: 'transform: scale(0.9) → 1' },
    { name: 'spin', description: 'หมุนรอบตัวเอง', code: 'transform: rotate(0deg) → 360deg' },
    { name: 'pulse', description: 'เต้นเป็นจังหวะ', code: 'transform: scale(1) → 1.05 → 1' }
  ];

  return (
    <Layout>
      <motion.div 
        className="p-6 space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-transformer-dark flex items-center">
              <Paintbrush className="mr-2 h-6 w-6 text-blue-500" />
              Design System
            </h1>
            <p className="text-muted-foreground">ระบบการออกแบบสำหรับแอปพลิเคชัน Transformer Assessment</p>
          </div>
          
          <div className="flex items-center">
            <Badge variant="outline" className="mr-2">v1.0</Badge>
            <Button size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              อัปเดตล่าสุด
            </Button>
          </div>
        </div>
        
        <Tabs 
          defaultValue="colors" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="colors" className="flex items-center justify-center">
              <Palette className="mr-2 h-4 w-4" />
              <span>Colors</span>
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex items-center justify-center">
              <Type className="mr-2 h-4 w-4" />
              <span>Typography</span>
            </TabsTrigger>
            <TabsTrigger value="components" className="flex items-center justify-center">
              <Component className="mr-2 h-4 w-4" />
              <span>Components</span>
            </TabsTrigger>
            <TabsTrigger value="animations" className="flex items-center justify-center">
              <Layers className="mr-2 h-4 w-4" />
              <span>Animations</span>
            </TabsTrigger>
          </TabsList>

          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="mr-2 h-5 w-5 text-blue-500" />
                  Color Palette
                </CardTitle>
                <CardDescription>
                  สีหลักและสีรองที่ใช้ในแอปพลิเคชัน
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {colorPalette.map((color, index) => (
                    <div 
                      key={index} 
                      className="border rounded-lg overflow-hidden shadow-sm"
                    >
                      <div 
                        style={{ backgroundColor: color.color }} 
                        className="h-24 flex items-end p-3"
                      >
                        <div className={`${color.textColor}`}>
                          <div className="font-bold">{color.name}</div>
                          <div className="text-sm opacity-80">{color.color}</div>
                        </div>
                      </div>
                      <div className="p-3 bg-white text-sm text-muted-foreground">
                        {color.description}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Typography Tab */}
          <TabsContent value="typography" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Type className="mr-2 h-5 w-5 text-blue-500" />
                  Typography
                </CardTitle>
                <CardDescription>
                  ขนาดและรูปแบบตัวอักษรที่ใช้ในแอปพลิเคชัน
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold mb-3">Font Family</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="font-sans mb-2">
                      <span className="text-xs text-muted-foreground mr-2">Sans:</span>
                      <span className="text-lg">Inter, -apple-system, BlinkMacSystemFont, sans-serif</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-semibold mb-3">Font Sizes</h4>
                  {fontSizes.map((size, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4 items-center border-b pb-2">
                      <div className="text-sm font-mono text-muted-foreground">{size.name} ({size.value})</div>
                      <div style={{ fontSize: size.value }} className="truncate">Example Text</div>
                      <div className="text-xs text-muted-foreground">{size.description}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Components Tab */}
          <TabsContent value="components" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Box className="mr-2 h-5 w-5 text-blue-500" />
                  Component Styles
                </CardTitle>
                <CardDescription>
                  สไตล์และรูปแบบต่างๆ ของคอมโพเนนต์
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {componentStyles.map((component, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-medium text-lg mb-3">{component.name}</h4>
                      <div className="flex flex-wrap gap-2">
                        {component.variants.map((variant, vIndex) => (
                          <Badge key={vIndex} variant="secondary">
                            {variant}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Button Variants</CardTitle>
                  <CardDescription>รูปแบบต่างๆ ของปุ่มที่ใช้ในแอป</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Badge Variants</CardTitle>
                  <CardDescription>รูปแบบต่างๆ ของแบดจ์ที่ใช้ในแอป</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Animations Tab */}
          <TabsContent value="animations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Layers className="mr-2 h-5 w-5 text-blue-500" />
                  Animations
                </CardTitle>
                <CardDescription>
                  แอนิเมชันที่ใช้ในแอปพลิเคชัน
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {animationVariants.map((anim, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">{anim.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{anim.description}</p>
                      <div className="mt-3">
                        <code className="bg-gray-100 p-2 text-sm rounded font-mono block">{anim.code}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center text-sm text-muted-foreground">
                อนิเมชันจะถูกใช้ผ่าน Framer Motion ในส่วนต่างๆ ของแอปพลิเคชัน
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </Layout>
  );
};

export default DesignPage;
