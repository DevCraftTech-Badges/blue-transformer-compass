
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { transformerImportanceSchema, TransformerImportanceFormValues } from "./schema"
import { TransformerInfoSection } from "./FormSections/TransformerInfoSection"
import { DamagePropertySection } from "./FormSections/DamagePropertySection"
import { LoadFactorSection } from "./FormSections/LoadFactorSection"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Save } from "lucide-react"

interface TransformerImportanceFormProps {
  onSubmit: (data: TransformerImportanceFormValues) => void;
  editingId?: string;
}

const TransformerImportanceForm = ({ onSubmit, editingId }: TransformerImportanceFormProps) => {
  const { toast } = useToast()
  const form = useForm<TransformerImportanceFormValues>({
    resolver: zodResolver(transformerImportanceSchema),
    defaultValues: {
      damageProperties: [],
      mvaHV: "",
      mvaLV: "",
      loadFactors: {
        below06: "0",
        from06to1: "0",
        from1to12: "0",
        from12to15: "0",
        above15: "0",
      },
    },
  })

  const handleSubmit = (values: TransformerImportanceFormValues) => {
    toast({
      title: "บันทึกข้อมูลสำเร็จ",
      description: "ข้อมูลถูกบันทึกเรียบร้อยแล้ว",
    })
    console.log(values)
    onSubmit(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <Card className="border-blue-100 shadow-sm">
          <CardHeader className="bg-[#f0f8ff] border-b border-blue-100">
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <span className="bg-blue-800 p-1 rounded text-white text-sm">1</span>
              ข้อมูลหม้อแปลง
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <TransformerInfoSection form={form} />
          </CardContent>
        </Card>

        <Card className="border-blue-100 shadow-sm">
          <CardHeader className="bg-[#f0f8ff] border-b border-blue-100">
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <span className="bg-blue-800 p-1 rounded text-white text-sm">2</span>
              ความเสียหายของทรัพย์สิน
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <DamagePropertySection form={form} />
          </CardContent>
        </Card>

        <Card className="border-blue-100 shadow-sm">
          <CardHeader className="bg-[#f0f8ff] border-b border-blue-100">
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <span className="bg-blue-800 p-1 rounded text-white text-sm">3</span>
              Load Factor
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <LoadFactorSection form={form} />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 pt-6">
          <Button type="button" variant="outline" className="border-blue-200">
            ยกเลิก
          </Button>
          <Button 
            type="submit" 
            className="bg-blue-800 hover:bg-blue-900 text-white gap-2"
          >
            <Save size={18} />
            บันทึกข้อมูล
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default TransformerImportanceForm
