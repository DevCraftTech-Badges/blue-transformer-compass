
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

  // Function to split fields into chunks for two columns
  const getFieldChunks = () => {
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
      <DialogContent className="sm:max-w-xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-transformer-dark">
            {item ? 'แก้ไขข้อมูล' : 'สร้างรายการใหม่'} - {category.title}
          </DialogTitle>
          <DialogDescription>กรอกข้อมูลการตรวจสอบ {category.title}</DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-grow overflow-y-auto px-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 py-4">
              {getFieldChunks().map((chunk, chunkIndex) => (
                <div key={chunkIndex} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {chunk.map((field, fieldIndex) => field && (
                    <FormItem key={fieldIndex} className="space-y-1.5">
                      <FormLabel>{field.name}</FormLabel>
                      <FormControl>
                        {getFormField(field)}
                      </FormControl>
                    </FormItem>
                  ))}
                </div>
              ))}
            </form>
          </Form>
        </ScrollArea>

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={onClose} type="button">
            ยกเลิก
          </Button>
          <Button 
            type="submit" 
            className="bg-transformer-primary hover:bg-transformer-primary/90" 
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
