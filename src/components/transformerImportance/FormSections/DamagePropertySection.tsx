
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { UseFormReturn } from "react-hook-form"
import { TransformerImportanceFormValues } from "../schema"

interface DamagePropertySectionProps {
  form: UseFormReturn<TransformerImportanceFormValues>
}

const damageProperties = [
  "มีผนังกั้นไฟ (Fire Wall)",
  "มี Oil Pit",
  "ระยะห่างจากหม้อแปลงตัวแม่ > 11m สำหรับหม้อแปลง Loading และ > 15m สำหรับหม้อแปลง Tie หรือไม่มีหม้อแปลงตัวข้าง",
  "ติดตั้งบริเวณห้อง พร้อมระบบดับเพลิง สำหรับพื้นที่ปิด",
  "ไม่มีข้อ 1 ถึงข้อ 4 ข้างต้น"
]

export const DamagePropertySection = ({ form }: DamagePropertySectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Damage Of Property</h2>
      <FormField
        control={form.control}
        name="damageProperties"
        render={() => (
          <FormItem>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {damageProperties.map((item) => (
                <FormField
                  key={item}
                  control={form.control}
                  name="damageProperties"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item)}
                          onCheckedChange={(checked) => {
                            const values = new Set(field.value)
                            checked ? values.add(item) : values.delete(item)
                            field.onChange(Array.from(values))
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {item}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </FormItem>
        )}
      />
    </div>
  )
}
