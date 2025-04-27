
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const formSchema = z.object({
  transformerName: z.string(),
  recordedDate: z.date(),
  busVoltageHv: z.string(),
  systemFaultLevelHv: z.number().min(0),
  busVoltageLv: z.string(),
  systemFaultLevelLv: z.number().min(0),
  probabilityOutage: z.string(),
  socialAspect: z.string(),
  loadShedding: z.string(),
  publicImage: z.string(),
  nOneCriteria: z.string(),
  applicationUse: z.string(),
  systemStability: z.string(),
  pollution: z.string(),
  damageProperties: z.array(z.string()),
  loadFactors: z.object({
    below06: z.string(),
    from06to1: z.string(),
    from1to12: z.string(),
    from12to15: z.string(),
    above15: z.string(),
  }),
})

const TransformerImportanceForm = () => {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast({
      title: "บันทึกข้อมูลสำเร็จ",
      description: "ข้อมูลถูกบันทึกเรียบร้อยแล้ว",
    })
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Transformer Info Section */}
          <div className="col-span-full">
            <h2 className="text-lg font-semibold mb-4">ข้อมูลหม้อแปลง</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="transformerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ชื่อหม้อแปลง</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกหม้อแปลง" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="TR1">TR1</SelectItem>
                        <SelectItem value="TR2">TR2</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recordedDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Recorded Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Voltage and System Parameters */}
          <div className="col-span-full">
            <h2 className="text-lg font-semibold mb-4">พารามิเตอร์ระบบ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="busVoltageHv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bus Voltage HV side [kV]</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select voltage" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="115">115 kV</SelectItem>
                        <SelectItem value="230">230 kV</SelectItem>
                        <SelectItem value="500">500 kV</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="systemFaultLevelHv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>System Fault Level: HV side [kA]</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(+e.target.value)} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Damage of Property Section */}
          <div className="col-span-full">
            <h2 className="text-lg font-semibold mb-4">Damage of Property</h2>
            <FormField
              control={form.control}
              name="damageProperties"
              render={() => (
                <FormItem>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "มีผนังกั้นไฟ (Fire Wall)",
                      "มี Oil Pit",
                      "ระยะห่างจากหม้อแปลงตัวแม่ > 11m สำหรับหม้อแปลง Loading และ > 15m สำหรับหม้อแปลง Tie หรือไม่มีหม้อแปลงตัวข้าง",
                      "ติดตั้งบริเวณห้อง พร้อมระบบดับเพลิง สำหรับพื้นที่ปิด",
                      "ไม่มีข้อ 1 ถึงข้อ 4 ข้างต้น"
                    ].map((item) => (
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

          {/* Load Factor Section */}
          <div className="col-span-full">
            <h2 className="text-lg font-semibold mb-4">Load Factor</h2>
            <div className="grid gap-4">
              {[
                { key: "below06", label: "<= 0.6" },
                { key: "from06to1", label: "0.6 < LF <= 1" },
                { key: "from1to12", label: "1 < LF <= 1.2" },
                { key: "from12to15", label: "1.2 < LF <= 1.5" },
                { key: "above15", label: "> 1.5" }
              ].map((item) => (
                <FormField
                  key={item.key}
                  control={form.control}
                  name={`loadFactors.${item.key}` as any}
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <FormLabel>{item.label}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select months" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[...Array(13)].map((_, i) => (
                              <SelectItem key={i} value={i.toString()}>
                                {i} months
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            บันทึกข้อมูล
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default TransformerImportanceForm;
