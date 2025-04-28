import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

const damageProperties = [
  {
    id: "firewall",
    label: "มีผนังกั้นไฟ (Fire Wall)",
  },
  {
    id: "oilpit",
    label: "มี Oil Pit",
  },
  {
    id: "distance",
    label: "ระยะห่างจากหม้อแปลงตัวแม่ > 11m (Loading) หรือ > 15m (Tie) หรือไม่มีหม้อแปลงตัวข้าง",
  },
  {
    id: "room",
    label: "ติดตั้งบริเวณห้อง พร้อมระบบดับเพลิง สำหรับพื้นที่ปิด",
  },
  {
    id: "none",
    label: "ไม่มีข้อ 1 ถึงข้อ 4 ข้างต้น",
  },
]

export const DamagePropertySection = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="damageProperties"
      render={() => (
        <FormItem>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {damageProperties.map((property) => (
              <FormField
                key={property.id}
                control={form.control}
                name="damageProperties"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={property.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <Checkbox
                        checked={field.value?.includes(property.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, property.id])
                            : field.onChange(
                                field.value?.filter(
                                  (value) => value !== property.id
                                )
                              )
                        }}
                      />
                      <FormLabel className="font-normal">
                        {property.label}
                      </FormLabel>
                    </FormItem>
                  )
                }}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
