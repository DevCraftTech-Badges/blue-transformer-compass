
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

const TransformerImportanceForm = () => {
  const { toast } = useToast()
  const form = useForm<TransformerImportanceFormValues>({
    resolver: zodResolver(transformerImportanceSchema),
    defaultValues: {
      damageProperties: [],
      loadFactors: {
        below06: "0",
        from06to1: "0",
        from1to12: "0",
        from12to15: "0",
        above15: "0",
      },
    },
  })

  const onSubmit = (values: TransformerImportanceFormValues) => {
    toast({
      title: "บันทึกข้อมูลสำเร็จ",
      description: "ข้อมูลถูกบันทึกเรียบร้อยแล้ว",
    })
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>ข้อมูลหม้อแปลง</CardTitle>
          </CardHeader>
          <CardContent>
            <TransformerInfoSection form={form} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ความเสียหายของทรัพย์สิน</CardTitle>
          </CardHeader>
          <CardContent>
            <DamagePropertySection form={form} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Load Factor</CardTitle>
          </CardHeader>
          <CardContent>
            <LoadFactorSection form={form} />
          </CardContent>
        </Card>

        <div className="flex justify-end pt-6">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            บันทึกข้อมูล
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default TransformerImportanceForm
