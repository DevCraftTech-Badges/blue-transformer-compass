
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Field {
  name: string;
  type: 'text' | 'select' | 'date';
}

interface Category {
  id: string;
  title: string;
  fields: Field[];
}

interface InspectionItem {
  id: number;
  transformerName: string;
  egatSN: string;
  testType: string;
  testDate: string;
  testTime: string;
  inspector: string;
  [key: string]: any;
}

interface VisualInspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  item: InspectionItem | null;
  category: Category;
}

// Mock data for select options
const transformers = [
  { value: 'TR-EGAT-001', label: 'TR-EGAT-001' },
  { value: 'TR-EGAT-002', label: 'TR-EGAT-002' },
  { value: 'TR-EGAT-003', label: 'TR-EGAT-003' },
];

const testTypes = [
  { value: 'Weekly Test', label: 'Weekly Test' },
  { value: 'Monthly Test', label: 'Monthly Test' },
  { value: 'Quarterly Test', label: 'Quarterly Test' },
  { value: 'Yearly Test', label: 'Yearly Test' },
];

const conditionOptions = [
  { value: 'Normal', label: 'Normal' },
  { value: 'Abnormal', label: 'Abnormal' },
  { value: 'Critical', label: 'Critical' },
];

const VisualInspectionModal: React.FC<VisualInspectionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  item,
  category,
}) => {
  const [formData, setFormData] = useState<any>({
    transformerName: '',
    egatSN: '',
    testType: 'Weekly Test',
    testDate: new Date().toISOString().split('T')[0],
    testTime: new Date().toTimeString().split(' ')[0].slice(0, 5),
    inspector: '',
    workOrder: '',
  });

  useEffect(() => {
    if (item) {
      setFormData({
        transformerName: item.transformerName || '',
        egatSN: item.egatSN || '',
        testType: item.testType || 'Weekly Test',
        testDate: item.testDate || new Date().toISOString().split('T')[0],
        testTime: item.testTime || new Date().toTimeString().split(' ')[0].slice(0, 5),
        inspector: item.inspector || '',
        workOrder: item.workOrder || '',
        maxLoad: item.maxLoad || 'Normal',
        sound: item.sound || 'Normal',
        vibration: item.vibration || 'Normal',
        groundingConnector: item.groundingConnector || 'Normal',
        foundation: item.foundation || 'Normal',
        animalProtection: item.animalProtection || 'Normal',
      });
    } else {
      // Reset form for new item
      setFormData({
        transformerName: '',
        egatSN: '',
        testType: 'Weekly Test',
        testDate: new Date().toISOString().split('T')[0],
        testTime: new Date().toTimeString().split(' ')[0].slice(0, 5),
        inspector: '',
        workOrder: '',
        maxLoad: 'Normal',
        sound: 'Normal',
        vibration: 'Normal',
        groundingConnector: 'Normal',
        foundation: 'Normal',
        animalProtection: 'Normal',
      });
    }
  }, [item]);

  const handleChange = (
    field: string,
    value: string
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));

    // Set EGAT S/N based on transformer selection for demo purposes
    if (field === 'transformerName') {
      const egatSN = value === 'TR-EGAT-001' ? 'SN001' : 
                     value === 'TR-EGAT-002' ? 'SN002' : 
                     value === 'TR-EGAT-003' ? 'SN003' : '';
      
      setFormData((prev: any) => ({
        ...prev,
        egatSN,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const renderField = (field: Field) => {
    switch (field.name) {
      case 'หม้อแปลงไฟฟ้า':
        return (
          <div className="space-y-2" key={field.name}>
            <Label htmlFor="transformerName">{field.name}</Label>
            <Select 
              value={formData.transformerName} 
              onValueChange={(value) => handleChange('transformerName', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
              </SelectTrigger>
              <SelectContent>
                {transformers.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      
      case 'รูปแบบการทดสอบ':
        return (
          <div className="space-y-2" key={field.name}>
            <Label htmlFor="testType">{field.name}</Label>
            <Select 
              value={formData.testType} 
              onValueChange={(value) => handleChange('testType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="เลือกรูปแบบการทดสอบ" />
              </SelectTrigger>
              <SelectContent>
                {testTypes.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      
      case 'วันที่ตรวจสอบ':
        return (
          <div className="space-y-2" key={field.name}>
            <Label htmlFor="testDate">{field.name}</Label>
            <Input
              type="date"
              id="testDate"
              value={formData.testDate}
              onChange={(e) => handleChange('testDate', e.target.value)}
            />
          </div>
        );
      
      case 'ผู้ตรวจสอบ':
        return (
          <div className="space-y-2" key={field.name}>
            <Label htmlFor="inspector">{field.name}</Label>
            <Input
              type="text"
              id="inspector"
              value={formData.inspector}
              onChange={(e) => handleChange('inspector', e.target.value)}
              placeholder="ระบุชื่อผู้ตรวจสอบ"
            />
          </div>
        );
      
      case 'เลขที่คำสั่งปฏิบัติงาน':
        return (
          <div className="space-y-2" key={field.name}>
            <Label htmlFor="workOrder">{field.name}</Label>
            <Input
              type="text"
              id="workOrder"
              value={formData.workOrder}
              onChange={(e) => handleChange('workOrder', e.target.value)}
              placeholder="ระบุเลขที่คำสั่งปฏิบัติงาน"
            />
          </div>
        );
      
      case 'Max. Load ของหม้อแปลง':
        return (
          <div className="space-y-2" key={field.name}>
            <Label htmlFor="maxLoad">{field.name}</Label>
            <Select 
              value={formData.maxLoad} 
              onValueChange={(value) => handleChange('maxLoad', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="เลือกสถานะ" />
              </SelectTrigger>
              <SelectContent>
                {conditionOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      
      case 'เสียงของหม้อแปลง':
        return (
          <div className="space-y-2" key={field.name}>
            <Label htmlFor="sound">{field.name}</Label>
            <Select 
              value={formData.sound} 
              onValueChange={(value) => handleChange('sound', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="เลือกสถานะ" />
              </SelectTrigger>
              <SelectContent>
                {conditionOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      
      case 'การสั่นสะเทือน':
        return (
          <div className="space-y-2" key={field.name}>
            <Label htmlFor="vibration">{field.name}</Label>
            <Select 
              value={formData.vibration} 
              onValueChange={(value) => handleChange('vibration', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="เลือกสถานะ" />
              </SelectTrigger>
              <SelectContent>
                {conditionOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      
      case 'Grounding Connector':
        return (
          <div className="space-y-2" key={field.name}>
            <Label htmlFor="groundingConnector">{field.name}</Label>
            <Select 
              value={formData.groundingConnector} 
              onValueChange={(value) => handleChange('groundingConnector', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="เลือกสถานะ" />
              </SelectTrigger>
              <SelectContent>
                {conditionOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      
      case 'Foundation':
        return (
          <div className="space-y-2" key={field.name}>
            <Label htmlFor="foundation">{field.name}</Label>
            <Select 
              value={formData.foundation} 
              onValueChange={(value) => handleChange('foundation', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="เลือกสถานะ" />
              </SelectTrigger>
              <SelectContent>
                {conditionOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      
      case 'Animal Protection':
        return (
          <div className="space-y-2" key={field.name}>
            <Label htmlFor="animalProtection">{field.name}</Label>
            <Select 
              value={formData.animalProtection} 
              onValueChange={(value) => handleChange('animalProtection', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="เลือกสถานะ" />
              </SelectTrigger>
              <SelectContent>
                {conditionOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {item ? 'แก้ไขข้อมูล' : 'สร้างรายการใหม่'} - {category.title}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            {category.fields.map((field) => renderField(field))}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              ยกเลิก
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              บันทึกข้อมูล
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VisualInspectionModal;
