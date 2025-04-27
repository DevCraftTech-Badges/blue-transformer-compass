
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { MainEquipmentWeightItem, MainEquipmentWeightModalProps } from '@/types/mainEquipmentWeight';

const MainEquipmentWeightModal: React.FC<MainEquipmentWeightModalProps> = ({
  isOpen,
  onClose,
  onSave,
  item
}) => {
  const defaultValues = {
    name: item?.name || '',
    category: item?.category || '',
    weight: item?.weight || 0,
    activePart: item?.activePart || 0,
    bushing: item?.bushing || 0,
    arrester: item?.arrester || 0,
    oil: item?.oil || 0,
    oltc: item?.oltc || 0
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues
  });

  React.useEffect(() => {
    if (isOpen) {
      reset(defaultValues);
    }
  }, [isOpen, item, reset]);

  const onSubmit = (data: Omit<MainEquipmentWeightItem, "id">) => {
    onSave(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{item ? 'แก้ไขข้อมูล' : 'เพิ่มข้อมูลใหม่'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                ชื่อ
              </label>
              <Input id="name" className="col-span-3" {...register('name', { required: true })} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="category" className="text-right">
                หมวดหมู่
              </label>
              <Input id="category" className="col-span-3" {...register('category', { required: true })} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="weight" className="text-right">
                น้ำหนัก
              </label>
              <Input 
                id="weight" 
                className="col-span-3" 
                type="number" 
                {...register('weight', { 
                  required: true,
                  valueAsNumber: true
                })} 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="activePart" className="text-right">
                Active Part
              </label>
              <Input 
                id="activePart" 
                className="col-span-3" 
                type="number"
                {...register('activePart', { 
                  required: true,
                  valueAsNumber: true
                })} 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="bushing" className="text-right">
                Bushing
              </label>
              <Input 
                id="bushing" 
                className="col-span-3" 
                type="number"
                {...register('bushing', { 
                  required: true,
                  valueAsNumber: true
                })} 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="arrester" className="text-right">
                Arrester
              </label>
              <Input 
                id="arrester" 
                className="col-span-3" 
                type="number"
                {...register('arrester', { 
                  required: true,
                  valueAsNumber: true
                })} 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="oil" className="text-right">
                Oil
              </label>
              <Input 
                id="oil" 
                className="col-span-3" 
                type="number"
                {...register('oil', { 
                  required: true,
                  valueAsNumber: true
                })} 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="oltc" className="text-right">
                OLTC
              </label>
              <Input 
                id="oltc" 
                className="col-span-3" 
                type="number"
                {...register('oltc', { 
                  required: true,
                  valueAsNumber: true
                })} 
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              ยกเลิก
            </Button>
            <Button type="submit">บันทึก</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MainEquipmentWeightModal;
