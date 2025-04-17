
import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { MainEquipmentWeightItem } from "@/types/mainEquipmentWeight";

interface MainEquipmentWeightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<MainEquipmentWeightItem, "id">) => void;
  initialData?: MainEquipmentWeightItem;
  isEditing: boolean;
}

const MainEquipmentWeightModal: React.FC<MainEquipmentWeightModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditing,
}) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Omit<MainEquipmentWeightItem, "id">>({
    defaultValues: {
      activePart: initialData?.activePart || 0,
      bushing: initialData?.bushing || 0,
      arrester: initialData?.arrester || 0,
      oil: initialData?.oil || 0,
      oltc: initialData?.oltc || 0,
    }
  });

  useEffect(() => {
    if (isOpen && initialData) {
      reset({
        activePart: initialData.activePart,
        bushing: initialData.bushing,
        arrester: initialData.arrester,
        oil: initialData.oil,
        oltc: initialData.oltc,
      });
    } else if (isOpen) {
      reset({
        activePart: 0,
        bushing: 0,
        arrester: 0,
        oil: 0,
        oltc: 0,
      });
    }
  }, [isOpen, initialData, reset]);

  const submitHandler = (data: Omit<MainEquipmentWeightItem, "id">) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "แก้ไขข้อมูล" : "สร้างรายการใหม่"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="activePart" className="text-right">
                Active Part
              </Label>
              <Input
                id="activePart"
                type="number"
                min="0"
                max="100"
                className="col-span-3"
                {...register("activePart", {
                  required: "This field is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Value must be positive" },
                  max: { value: 100, message: "Value must be 100 or less" }
                })}
              />
              {errors.activePart && (
                <p className="text-red-500 text-sm col-span-4 text-right">{errors.activePart.message}</p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bushing" className="text-right">
                Bushing
              </Label>
              <Input
                id="bushing"
                type="number"
                min="0"
                max="100"
                className="col-span-3"
                {...register("bushing", {
                  required: "This field is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Value must be positive" },
                  max: { value: 100, message: "Value must be 100 or less" }
                })}
              />
              {errors.bushing && (
                <p className="text-red-500 text-sm col-span-4 text-right">{errors.bushing.message}</p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="arrester" className="text-right">
                Arrester
              </Label>
              <Input
                id="arrester"
                type="number"
                min="0"
                max="100"
                className="col-span-3"
                {...register("arrester", {
                  required: "This field is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Value must be positive" },
                  max: { value: 100, message: "Value must be 100 or less" }
                })}
              />
              {errors.arrester && (
                <p className="text-red-500 text-sm col-span-4 text-right">{errors.arrester.message}</p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="oil" className="text-right">
                Oil
              </Label>
              <Input
                id="oil"
                type="number"
                min="0"
                max="100"
                className="col-span-3"
                {...register("oil", {
                  required: "This field is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Value must be positive" },
                  max: { value: 100, message: "Value must be 100 or less" }
                })}
              />
              {errors.oil && (
                <p className="text-red-500 text-sm col-span-4 text-right">{errors.oil.message}</p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="oltc" className="text-right">
                OLTC
              </Label>
              <Input
                id="oltc"
                type="number"
                min="0"
                max="100"
                className="col-span-3"
                {...register("oltc", {
                  required: "This field is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Value must be positive" },
                  max: { value: 100, message: "Value must be 100 or less" }
                })}
              />
              {errors.oltc && (
                <p className="text-red-500 text-sm col-span-4 text-right">{errors.oltc.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              ยกเลิก
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {isEditing ? "บันทึกการแก้ไข" : "บันทึกข้อมูล"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MainEquipmentWeightModal;
