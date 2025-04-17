
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
} from '@/components/ui/dialog';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel 
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';

interface Field {
  name: string;
  type: 'text' | 'select' | 'date';
}

interface Category {
  id: string;
  title: string;
  icon?: React.ReactNode;
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
  onSave: (data: Omit<InspectionItem, 'id'>) => void;
  item: InspectionItem | null;
  category: Category;
}

const VisualInspectionModal: React.FC<VisualInspectionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  item,
  category,
}) => {
  const form = useForm({
    defaultValues: item || {
      transformerName: '',
      egatSN: '',
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
            <SelectTrigger>
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
            {...form.register(field.name.toLowerCase().replace(/ /g, ''))}
          />
        );
      default:
        return (
          <Input 
            type="text" 
            {...form.register(field.name.toLowerCase().replace(/ /g, ''))}
          />
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {item ? 'แก้ไขข้อมูล' : 'สร้างรายการใหม่'} - {category.title}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
            {category.fields.map((field, index) => (
              <FormItem key={index}>
                <FormLabel>{field.name}</FormLabel>
                <FormControl>
                  {getFormField(field)}
                </FormControl>
              </FormItem>
            ))}

            <DialogFooter className="pt-4">
              <Button variant="outline" onClick={onClose} type="button">
                ยกเลิก
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                บันทึกข้อมูล
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default VisualInspectionModal;
