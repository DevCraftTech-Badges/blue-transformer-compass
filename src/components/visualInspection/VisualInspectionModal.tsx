
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel 
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Category, InspectionItem, Field } from './types';
import { motion } from 'framer-motion';

interface VisualInspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<InspectionItem, 'id'>) => void;
  item: InspectionItem | null;
  category: Category | undefined;
  transformerName?: string;
  egatSN?: string;
}

const VisualInspectionModal: React.FC<VisualInspectionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  item,
  category,
  transformerName = '',
  egatSN = '',
}) => {
  const form = useForm({
    defaultValues: item || {
      transformerName: transformerName || '',
      egatSN: egatSN || '',
      testType: 'Weekly Test',
      testDate: new Date().toISOString().split('T')[0],
      testTime: new Date().toTimeString().split(' ')[0].substring(0, 5),
      inspector: '',
    },
  });

  const handleSubmit = (data: any) => {
    onSave(data);
  };

  const getFormField = (field: Field) => {
    switch (field.type) {
      case 'select':
        return (
          <Select 
            defaultValue={item ? item[field.name.toLowerCase().replace(/ /g, '')] : ''}
            onValueChange={(value) => form.setValue(field.name.toLowerCase().replace(/ /g, ''), value)}
          >
            <SelectTrigger className="border-blue-200 focus:ring-blue-400">
              <SelectValue placeholder="เลือก" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Normal">Normal</SelectItem>
              <SelectItem value="Abnormal">Abnormal</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        );
      case 'date':
        return (
          <Input 
            type="date" 
            className="border-blue-200 focus-visible:ring-blue-400"
            {...form.register(field.name.toLowerCase().replace(/ /g, ''))}
          />
        );
      default:
        return (
          <Input 
            type="text" 
            className="border-blue-200 focus-visible:ring-blue-400"
            {...form.register(field.name.toLowerCase().replace(/ /g, ''))}
          />
        );
    }
  };

  // Function to split fields into chunks for two columns
  const getFieldChunks = () => {
    if (!category || !category.fields) {
      return [];
    }
    
    // Create pairs of fields for 2-column layout
    const chunks = [];
    for (let i = 0; i < category.fields.length; i += 2) {
      const chunk = [
        category.fields[i],
        i + 1 < category.fields.length ? category.fields[i + 1] : null
      ];
      chunks.push(chunk);
    }
    return chunks;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${category?.id === 'conservator-tank' || category?.id === 'lightning-arrester' ? 'sm:max-w-4xl' : 'sm:max-w-xl'} max-h-[90vh] flex flex-col bg-white`}>
        <DialogHeader>
          <DialogTitle className="text-blue-800">
            {item ? 'แก้ไขข้อมูล' : 'สร้างรายการใหม่'} - {category?.title || ''}
          </DialogTitle>
          <DialogDescription>กรอกข้อมูลการตรวจสอบ {category?.title || ''}</DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-grow overflow-y-auto px-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 py-4">
              {/* Conditional rendering based on category */}
              {category?.id === 'bushing' ? (
                // Bushing Form Layout - 4 Sections
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* กลุ่ม 1: Bushing (ข้อมูลทั่วไป) – ซ้ายบน */}
                  <motion.div 
                    className="space-y-4 p-4 border border-blue-200 rounded-lg bg-blue-50/30"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">ข้อมูลทั่วไป</h3>
                    
                    <FormField
                      control={form.control}
                      name="transformerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-800">หม้อแปลงไฟฟ้า</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger className="border-blue-200 focus:ring-blue-400">
                                <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="TR-001">TR-001</SelectItem>
                                <SelectItem value="TR-002">TR-002</SelectItem>
                                <SelectItem value="TR-003">TR-003</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="egatSN"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-800">EGAT S/N</FormLabel>
                          <FormControl>
                            <Input 
                              type="text" 
                              className="border-blue-200 focus-visible:ring-blue-400"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="testType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-800">รูปแบบการทดสอบ</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger className="border-blue-200 focus:ring-blue-400">
                                <SelectValue placeholder="เลือกรูปแบบการทดสอบ" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Weekly Test">Weekly Test</SelectItem>
                                <SelectItem value="Monthly Test">Monthly Test</SelectItem>
                                <SelectItem value="Annual Test">Annual Test</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="testDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-800">วันที่ตรวจสอบ 📅</FormLabel>
                          <FormControl>
                            <Input 
                              type="date" 
                              className="border-blue-200 focus-visible:ring-blue-400"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="workOrderNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-800">เลขที่คำสั่งปฏิบัติงาน</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger className="border-blue-200 focus:ring-blue-400">
                                <SelectValue placeholder="เลือกเลขที่คำสั่ง" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="WO-001">WO-001</SelectItem>
                                <SelectItem value="WO-002">WO-002</SelectItem>
                                <SelectItem value="WO-003">WO-003</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="inspector"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-800">ผู้ตรวจสอบ</FormLabel>
                          <FormControl>
                            <Input 
                              type="text" 
                              className="border-blue-200 focus-visible:ring-blue-400"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  {/* กลุ่ม 2: LV Bushing (แรงดันต่ำ) – ขวาบน */}
                  <motion.div 
                    className="space-y-4 p-4 border border-green-200 rounded-lg bg-green-50/30"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-lg font-semibold text-green-800 mb-3">LV Bushing (แรงดันต่ำ)</h3>
                    
                    {['สภาพ Porcelain', 'ความสะอาดของ Porcelain', 'การรั่วซึมของน้ำมัน', 'ระดับน้ำมัน', 'สีของน้ำมัน'].map((fieldName, index) => (
                      <FormField
                        key={`lv_${index}`}
                        control={form.control}
                        name={`lv${fieldName.replace(/\s/g, '')}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-green-800">{fieldName}</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="border-green-200 focus:ring-green-400">
                                  <SelectValue placeholder="เลือก" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Normal">Normal</SelectItem>
                                  <SelectItem value="Abnormal">Abnormal</SelectItem>
                                  <SelectItem value="Good">Good</SelectItem>
                                  <SelectItem value="Poor">Poor</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    ))}
                  </motion.div>

                  {/* กลุ่ม 3: HV Bushing (แรงดันสูง) – ซ้ายล่าง */}
                  <motion.div 
                    className="space-y-4 p-4 border border-red-200 rounded-lg bg-red-50/30"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold text-red-800 mb-3">HV Bushing (แรงดันสูง)</h3>
                    
                    {['สภาพ Porcelain', 'ความสะอาดของ Porcelain', 'การรั่วซึมของน้ำมัน', 'ระดับน้ำมัน', 'สีของน้ำมัน'].map((fieldName, index) => (
                      <FormField
                        key={`hv_${index}`}
                        control={form.control}
                        name={`hv${fieldName.replace(/\s/g, '')}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-red-800">{fieldName}</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="border-red-200 focus:ring-red-400">
                                  <SelectValue placeholder="เลือก" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Normal">Normal</SelectItem>
                                  <SelectItem value="Abnormal">Abnormal</SelectItem>
                                  <SelectItem value="Good">Good</SelectItem>
                                  <SelectItem value="Poor">Poor</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    ))}
                  </motion.div>

                  {/* กลุ่ม 4: TV Bushing (แรงดันกลาง) – ขวาล่าง */}
                  <motion.div 
                    className="space-y-4 p-4 border border-purple-200 rounded-lg bg-purple-50/30"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-lg font-semibold text-purple-800 mb-3">TV Bushing (แรงดันกลาง)</h3>
                    
                    {['สภาพ Porcelain', 'ความสะอาดของ Porcelain', 'การรั่วซึมของน้ำมัน', 'ระดับน้ำมัน', 'สีของน้ำมัน'].map((fieldName, index) => (
                      <FormField
                        key={`tv_${index}`}
                        control={form.control}
                        name={`tv${fieldName.replace(/\s/g, '')}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-purple-800">{fieldName}</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="border-purple-200 focus:ring-purple-400">
                                  <SelectValue placeholder="เลือก" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Normal">Normal</SelectItem>
                                  <SelectItem value="Abnormal">Abnormal</SelectItem>
                                  <SelectItem value="Good">Good</SelectItem>
                                  <SelectItem value="Poor">Poor</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    ))}
                  </motion.div>

                </div>
              ) : category?.id === 'lightning-arrester' ? (
                // Lightning Arrester Form Layout - 4 Sections
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* กลุ่ม 1: Lightning Arrester (ด้านซ้ายบน) */}
                  <motion.div 
                    className="space-y-4 p-4 border border-yellow-200 rounded-lg bg-yellow-50/30"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h3 className="text-lg font-semibold text-yellow-800 mb-3">Lightning Arrester</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="electricalSystemType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-yellow-800">ประเภทระบบไฟฟ้า</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="border-yellow-200 focus:ring-yellow-400">
                                  <SelectValue placeholder="เลือกประเภทระบบ" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="AC">AC</SelectItem>
                                  <SelectItem value="DC">DC</SelectItem>
                                  <SelectItem value="Mixed">Mixed</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="testType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-yellow-800">รูปแบบการทดสอบ</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="border-yellow-200 focus:ring-yellow-400">
                                  <SelectValue placeholder="เลือกรูปแบบการทดสอบ" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Weekly Test">Weekly Test</SelectItem>
                                  <SelectItem value="Monthly Test">Monthly Test</SelectItem>
                                  <SelectItem value="Annual Test">Annual Test</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="testCenter"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-yellow-800">เลือกศูนย์ทดสอบ</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="border-yellow-200 focus:ring-yellow-400">
                                  <SelectValue placeholder="เลือกศูนย์ทดสอบ" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Center-001">ศูนย์ทดสอบ 001</SelectItem>
                                  <SelectItem value="Center-002">ศูนย์ทดสอบ 002</SelectItem>
                                  <SelectItem value="Center-003">ศูนย์ทดสอบ 003</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="egatSN"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-yellow-800">EGAT S/N</FormLabel>
                            <FormControl>
                              <Input 
                                type="text" 
                                className="border-yellow-200 focus-visible:ring-yellow-400"
                                placeholder="กรอก EGAT S/N"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="testDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-yellow-800">วันที่ตรวจสอบ 📅</FormLabel>
                            <FormControl>
                              <Input 
                                type="date" 
                                className="border-yellow-200 focus-visible:ring-yellow-400"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="inspector"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-yellow-800">ผู้ตรวจสอบ</FormLabel>
                            <FormControl>
                              <Input 
                                type="text" 
                                className="border-yellow-200 focus-visible:ring-yellow-400"
                                placeholder="กรอกชื่อผู้ตรวจสอบ"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="documentNumber"
                        render={({ field }) => (
                          <FormItem className="sm:col-span-2">
                            <FormLabel className="text-yellow-800">เลขที่หนังสือ/บันทึก</FormLabel>
                            <FormControl>
                              <Input 
                                type="text" 
                                className="border-yellow-200 focus-visible:ring-yellow-400"
                                placeholder="กรอกเลขที่หนังสือ/บันทึก"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </motion.div>

                  {/* กลุ่ม 2: LV Arrester (ด้านขวาบน) */}
                  <motion.div 
                    className="space-y-4 p-4 border border-green-200 rounded-lg bg-green-50/30"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-lg font-semibold text-green-800 mb-3">LV Arrester</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {['สภาพ Porcelain', 'ความสะอาดของ Porcelain', 'สภาพ Grounding Connector', 'Surge Counter'].map((fieldName, index) => (
                        <FormField
                          key={`lv_arrester_${index}`}
                          control={form.control}
                          name={`lvArrester${fieldName.replace(/\s/g, '')}`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-green-800">{fieldName}</FormLabel>
                              <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <SelectTrigger className="border-green-200 focus:ring-green-400">
                                    <SelectValue placeholder="เลือก" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Normal">Normal</SelectItem>
                                    <SelectItem value="Abnormal">Abnormal</SelectItem>
                                    <SelectItem value="Good">Good</SelectItem>
                                    <SelectItem value="Poor">Poor</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </motion.div>

                  {/* กลุ่ม 3: HV Arrester (ด้านซ้ายล่าง) */}
                  <motion.div 
                    className="space-y-4 p-4 border border-red-200 rounded-lg bg-red-50/30"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold text-red-800 mb-3">HV Arrester</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {['สภาพ Porcelain', 'ความสะอาดของ Porcelain', 'สภาพ Grounding Connector', 'Surge Counter'].map((fieldName, index) => (
                        <FormField
                          key={`hv_arrester_${index}`}
                          control={form.control}
                          name={`hvArrester${fieldName.replace(/\s/g, '')}`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-red-800">{fieldName}</FormLabel>
                              <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <SelectTrigger className="border-red-200 focus:ring-red-400">
                                    <SelectValue placeholder="เลือก" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Normal">Normal</SelectItem>
                                    <SelectItem value="Abnormal">Abnormal</SelectItem>
                                    <SelectItem value="Good">Good</SelectItem>
                                    <SelectItem value="Poor">Poor</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </motion.div>

                  {/* กลุ่ม 4: TV Arrester (ด้านขวาล่าง) */}
                  <motion.div 
                    className="space-y-4 p-4 border border-purple-200 rounded-lg bg-purple-50/30"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-lg font-semibold text-purple-800 mb-3">TV Arrester</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {['สภาพ Porcelain', 'ความสะอาดของ Porcelain', 'สภาพ Grounding Connector', 'Surge Counter'].map((fieldName, index) => (
                        <FormField
                          key={`tv_arrester_${index}`}
                          control={form.control}
                          name={`tvArrester${fieldName.replace(/\s/g, '')}`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-purple-800">{fieldName}</FormLabel>
                              <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <SelectTrigger className="border-purple-200 focus:ring-purple-400">
                                    <SelectValue placeholder="เลือก" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Normal">Normal</SelectItem>
                                    <SelectItem value="Abnormal">Abnormal</SelectItem>
                                    <SelectItem value="Good">Good</SelectItem>
                                    <SelectItem value="Poor">Poor</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </motion.div>

                </div>
              ) : category?.id === 'conservator-tank' ? (
                // Conservator Tank Form Layout - 3 Sections
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* กลุ่ม 1: Conservator Tank (ด้านซ้ายบน) */}
                  <motion.div 
                    className="space-y-4 p-4 border border-blue-200 rounded-lg bg-blue-50/30"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">Conservator Tank</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="electricalDisplay"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">หัวข้อแสดงไฟฟ้า</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="border-blue-200 focus:ring-blue-400">
                                  <SelectValue placeholder="เลือกหัวข้อแสดงไฟฟ้า" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Active">Active</SelectItem>
                                  <SelectItem value="Inactive">Inactive</SelectItem>
                                  <SelectItem value="Normal">Normal</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="testType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">รูปแบบการทดสอบ</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="border-blue-200 focus:ring-blue-400">
                                  <SelectValue placeholder="เลือกรูปแบบการทดสอบ" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Weekly Test">Weekly Test</SelectItem>
                                  <SelectItem value="Monthly Test">Monthly Test</SelectItem>
                                  <SelectItem value="Annual Test">Annual Test</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="workOrderNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">เลขที่คำสั่งปฏิบัติงาน</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="border-blue-200 focus:ring-blue-400">
                                  <SelectValue placeholder="เลือกเลขที่คำสั่ง" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="WO-001">WO-001</SelectItem>
                                  <SelectItem value="WO-002">WO-002</SelectItem>
                                  <SelectItem value="WO-003">WO-003</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="egatSN"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">EGAT S/N</FormLabel>
                            <FormControl>
                              <Input 
                                type="text" 
                                className="border-blue-200 focus-visible:ring-blue-400"
                                placeholder="กรอก EGAT S/N"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="testDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">วันที่ตรวจสอบ 📅</FormLabel>
                            <FormControl>
                              <Input 
                                type="date" 
                                className="border-blue-200 focus-visible:ring-blue-400"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="inspector"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">ผู้ตรวจสอบ</FormLabel>
                            <FormControl>
                              <Input 
                                type="text" 
                                className="border-blue-200 focus-visible:ring-blue-400"
                                placeholder="กรอกชื่อผู้ตรวจสอบ"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </motion.div>

                  {/* กลุ่ม 2: Main Tank (ขวาบน) */}
                  <motion.div 
                    className="space-y-4 p-4 border border-green-200 rounded-lg bg-green-50/30"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-lg font-semibold text-green-800 mb-3">Main Tank</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {['ความผุกร่อน', 'ระดับน้ำมัน', 'Breather', 'การรั่วซึมของน้ำมัน', 'สีของ Silica Gel'].map((fieldName, index) => (
                        <FormField
                          key={`mainTank_${index}`}
                          control={form.control}
                          name={`mainTank${fieldName.replace(/\s/g, '')}`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-green-800">{fieldName}</FormLabel>
                              <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <SelectTrigger className="border-green-200 focus:ring-green-400">
                                    <SelectValue placeholder="เลือก" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Normal">Normal</SelectItem>
                                    <SelectItem value="Abnormal">Abnormal</SelectItem>
                                    <SelectItem value="Good">Good</SelectItem>
                                    <SelectItem value="Poor">Poor</SelectItem>
                                    <SelectItem value="High">High</SelectItem>
                                    <SelectItem value="Low">Low</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </motion.div>

                  {/* กลุ่ม 3: OLTC (ล่างซ้าย-กลาง) */}
                  <motion.div 
                    className="space-y-4 p-4 border border-orange-200 rounded-lg bg-orange-50/30 lg:col-span-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold text-orange-800 mb-3">OLTC</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {['ความผุกร่อน', 'ระดับน้ำมัน', 'Breather', 'การรั่วซึมของน้ำมัน', 'สีของ Silica Gel'].map((fieldName, index) => (
                        <FormField
                          key={`oltc_${index}`}
                          control={form.control}
                          name={`oltc${fieldName.replace(/\s/g, '')}`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-orange-800">{fieldName}</FormLabel>
                              <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <SelectTrigger className="border-orange-200 focus:ring-orange-400">
                                    <SelectValue placeholder="เลือก" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Normal">Normal</SelectItem>
                                    <SelectItem value="Abnormal">Abnormal</SelectItem>
                                    <SelectItem value="Good">Good</SelectItem>
                                    <SelectItem value="Poor">Poor</SelectItem>
                                    <SelectItem value="High">High</SelectItem>
                                    <SelectItem value="Low">Low</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </motion.div>

                </div>
              ) : category?.id === 'main-tank' ? (
                // Main Tank Form Layout - 2 Column Layout
                <motion.div 
                  className="p-4 border border-blue-200 rounded-lg bg-blue-50/30"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">Main Tank</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* Left Column - 4 Select Fields */}
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="transformerName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">หม้อแปลงไฟฟ้า</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="border-blue-200 focus:ring-blue-400">
                                  <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า ▼" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="TR-001">TR-001</SelectItem>
                                  <SelectItem value="TR-002">TR-002</SelectItem>
                                  <SelectItem value="TR-003">TR-003</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="testType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">รูปแบบการทดสอบ</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="border-blue-200 focus:ring-blue-400">
                                  <SelectValue placeholder="เลือกรูปแบบการทดสอบ ▼" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Weekly Test">Weekly Test</SelectItem>
                                  <SelectItem value="Monthly Test">Monthly Test</SelectItem>
                                  <SelectItem value="Annual Test">Annual Test</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="workOrderNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">เลขที่คำสั่งปฏิบัติงาน</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="border-blue-200 focus:ring-blue-400">
                                  <SelectValue placeholder="เลือกเลขที่คำสั่งปฏิบัติงาน ▼" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="WO-001">WO-001</SelectItem>
                                  <SelectItem value="WO-002">WO-002</SelectItem>
                                  <SelectItem value="WO-003">WO-003</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="corrosion"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">ความผุกร่อน</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="border-blue-200 focus:ring-blue-400">
                                  <SelectValue placeholder="เลือกความผุกร่อน ▼" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Normal">Normal</SelectItem>
                                  <SelectItem value="Minor">Minor</SelectItem>
                                  <SelectItem value="Severe">Severe</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Right Column - Text, Date, Text, Select Fields */}
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="egatSN"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">EGAT S/N</FormLabel>
                            <FormControl>
                              <Input 
                                type="text" 
                                className="border-blue-200 focus-visible:ring-blue-400"
                                placeholder="กรอก EGAT S/N"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="testDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">วันที่ตรวจสอบ 📅</FormLabel>
                            <FormControl>
                              <Input 
                                type="date" 
                                className="border-blue-200 focus-visible:ring-blue-400"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="inspector"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">ผู้ตรวจสอบ</FormLabel>
                            <FormControl>
                              <Input 
                                type="text" 
                                className="border-blue-200 focus-visible:ring-blue-400"
                                placeholder="กรอกชื่อผู้ตรวจสอบ"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="oilLeakage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">การรั่วซึมของน้ำมัน</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="border-blue-200 focus:ring-blue-400">
                                  <SelectValue placeholder="เลือกสภาพการรั่วซึม ▼" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Normal">Normal</SelectItem>
                                  <SelectItem value="Minor Leak">Minor Leak</SelectItem>
                                  <SelectItem value="Major Leak">Major Leak</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                  </div>
                </motion.div>
              ) : (
                // General Condition Form Layout - 2 Column Layout (for other categories)
                <motion.div 
                  className="p-4 border border-blue-200 rounded-lg bg-blue-50/30"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">General Condition</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* Left Column */}
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="transformerName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">หม้อแปลงไฟฟ้า</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="border-blue-200 focus:ring-blue-400">
                                  <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า ▼" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="TR-001">TR-001</SelectItem>
                                  <SelectItem value="TR-002">TR-002</SelectItem>
                                  <SelectItem value="TR-003">TR-003</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="testType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">รูปแบบการทดสอบ</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="border-blue-200 focus:ring-blue-400">
                                  <SelectValue placeholder="เลือกรูปแบบการทดสอบ ▼" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Weekly Test">Weekly Test</SelectItem>
                                  <SelectItem value="Monthly Test">Monthly Test</SelectItem>
                                  <SelectItem value="Annual Test">Annual Test</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="workOrderNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">เลขที่คำสั่งปฏิบัติงาน</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="border-blue-200 focus:ring-blue-400">
                                  <SelectValue placeholder="เลือกเลขที่คำสั่งปฏิบัติงาน ▼" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="WO-001">WO-001</SelectItem>
                                  <SelectItem value="WO-002">WO-002</SelectItem>
                                  <SelectItem value="WO-003">WO-003</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="maxLoad"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">Max. Load ของหม้อแปลง</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="border-blue-200 focus:ring-blue-400">
                                  <SelectValue placeholder="เลือก Max. Load ▼" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Normal">Normal</SelectItem>
                                  <SelectItem value="High">High</SelectItem>
                                  <SelectItem value="Overload">Overload</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="vibration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">การสั่นสะเทือน</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="border-blue-200 focus:ring-blue-400">
                                  <SelectValue placeholder="เลือกสภาพการสั่นสะเทือน ▼" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Normal">Normal</SelectItem>
                                  <SelectItem value="Abnormal">Abnormal</SelectItem>
                                  <SelectItem value="High">High</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="foundation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">Foundation</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="border-blue-200 focus:ring-blue-400">
                                  <SelectValue placeholder="เลือกสภาพ Foundation ▼" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Good">Good</SelectItem>
                                  <SelectItem value="Fair">Fair</SelectItem>
                                  <SelectItem value="Poor">Poor</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="egatSN"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">EGAT S/N</FormLabel>
                            <FormControl>
                              <Input 
                                type="text" 
                                className="border-blue-200 focus-visible:ring-blue-400"
                                placeholder="กรอก EGAT S/N"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="testDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">วันที่ตรวจสอบ 📅</FormLabel>
                            <FormControl>
                              <Input 
                                type="date" 
                                className="border-blue-200 focus-visible:ring-blue-400"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="inspector"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">ผู้ตรวจสอบ</FormLabel>
                            <FormControl>
                              <Input 
                                type="text" 
                                className="border-blue-200 focus-visible:ring-blue-400"
                                placeholder="กรอกชื่อผู้ตรวจสอบ"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="transformerSound"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">เสียงของหม้อแปลง</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="border-blue-200 focus:ring-blue-400">
                                  <SelectValue placeholder="เลือกสภาพเสียง ▼" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Normal">Normal</SelectItem>
                                  <SelectItem value="Abnormal">Abnormal</SelectItem>
                                  <SelectItem value="Loud">Loud</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="groundingConnector"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">Grounding Connector</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="border-blue-200 focus:ring-blue-400">
                                  <SelectValue placeholder="เลือกสภาพ Grounding Connector ▼" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Good">Good</SelectItem>
                                  <SelectItem value="Fair">Fair</SelectItem>
                                  <SelectItem value="Poor">Poor</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="animalProtection"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">Animal Protection</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="border-blue-200 focus:ring-blue-400">
                                  <SelectValue placeholder="เลือกสภาพ Animal Protection ▼" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Good">Good</SelectItem>
                                  <SelectItem value="Fair">Fair</SelectItem>
                                  <SelectItem value="Poor">Poor</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                  </div>
                </motion.div>
              )}
            </form>
          </Form>
        </ScrollArea>

        <DialogFooter className="pt-4 border-t border-gray-100">
          <Button variant="outline" onClick={onClose} type="button" className="border-blue-200 text-blue-800">
            ยกเลิก
          </Button>
          <Button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700" 
            onClick={form.handleSubmit(handleSubmit)}
          >
            บันทึกข้อมูล
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VisualInspectionModal;
