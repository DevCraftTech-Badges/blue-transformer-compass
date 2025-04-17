
import React from "react";
import { useForm } from "react-hook-form";
import { ScoreWeightTestingItem } from "./ScoreWeightTestingPage";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  performGroup: z.string().min(1, { message: "จำเป็นต้องระบุ Perform Group" }),
  subGroup: z.string().min(1, { message: "จำเป็นต้องระบุ Sub Group" }),
  morePerform: z.string().min(1, { message: "จำเป็นต้องระบุ More Perform" }),
  evaluation: z.string().min(1, { message: "จำเป็นต้องระบุ Evaluation" }),
  variable: z.string().min(1, { message: "จำเป็นต้องระบุ Variable" }),
  variableMin: z.number().min(0, { message: "Variable Min ต้องมีค่ามากกว่าหรือเท่ากับ 0" }),
  variableMax: z.number().min(0, { message: "Variable Max ต้องมีค่ามากกว่าหรือเท่ากับ 0" })
});

interface ScoreWeightTestingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<ScoreWeightTestingItem, "id">) => void;
  initialData: ScoreWeightTestingItem | null;
}

const ScoreWeightTestingModal: React.FC<ScoreWeightTestingModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      performGroup: initialData?.performGroup || "",
      subGroup: initialData?.subGroup || "",
      morePerform: initialData?.morePerform || "",
      evaluation: initialData?.evaluation || "",
      variable: initialData?.variable || "",
      variableMin: initialData?.variableMin || 0,
      variableMax: initialData?.variableMax || 0,
    },
  });

  React.useEffect(() => {
    if (isOpen) {
      form.reset({
        performGroup: initialData?.performGroup || "",
        subGroup: initialData?.subGroup || "",
        morePerform: initialData?.morePerform || "",
        evaluation: initialData?.evaluation || "",
        variable: initialData?.variable || "",
        variableMin: initialData?.variableMin || 0,
        variableMax: initialData?.variableMax || 0,
      });
    }
  }, [isOpen, initialData, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSave({
      performGroup: values.performGroup,
      subGroup: values.subGroup,
      morePerform: values.morePerform,
      evaluation: values.evaluation,
      variable: values.variable,
      variableMin: values.variableMin,
      variableMax: values.variableMax,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "แก้ไขรายการ" : "สร้างรายการใหม่"}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="performGroup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Perform Group</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="subGroup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub Group</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="morePerform"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>More Perform</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="evaluation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Evaluation</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="variable"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variable</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="variableMin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variable Min</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="variableMax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variable Max</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
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

export default ScoreWeightTestingModal;
