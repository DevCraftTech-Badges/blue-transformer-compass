
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export const TransformerInfoSection = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="transformerName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-blue-800">ชื่อหม้อแปลง</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกชื่อหม้อแปลง" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="transformer1">Transformer 1</SelectItem>
                <SelectItem value="transformer2">Transformer 2</SelectItem>
                <SelectItem value="transformer3">Transformer 3</SelectItem>
                <SelectItem value="transformer4">Transformer 4</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="recordedDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="text-blue-800">วันที่บันทึก</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>เลือกวันที่</span>
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
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="busVoltageHV"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-blue-800">Bus Voltage HV side [kV]</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกแรงดันไฟฟ้า" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="115">115</SelectItem>
                <SelectItem value="230">230</SelectItem>
                <SelectItem value="500">500</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="systemFaultLevelHV"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-blue-800">System Fault Level: HV side [kA]</FormLabel>
            <FormControl>
              <Input type="number" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="mvaHV"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-blue-800">[MVA] HV side</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="busVoltageLV"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-blue-800">Bus Voltage LV side [kV]</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกแรงดันไฟฟ้า" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="22">22</SelectItem>
                <SelectItem value="33">33</SelectItem>
                <SelectItem value="115">115</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="systemFaultLevelLV"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-blue-800">System Fault Level: LV side [kA]</FormLabel>
            <FormControl>
              <Input type="number" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="mvaLV"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-blue-800">[MVA] LV side</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="probabilityOfForceOutage"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-blue-800">Probability Of Force Outage Per Year</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกความน่าจะเป็น" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="low">ต่ำ</SelectItem>
                <SelectItem value="medium">ปานกลาง</SelectItem>
                <SelectItem value="high">สูง</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="socialAspect"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-blue-800">Social Aspect</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกด้านสังคม" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="low">ต่ำ</SelectItem>
                <SelectItem value="medium">ปานกลาง</SelectItem>
                <SelectItem value="high">สูง</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="loadShedding"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-blue-800">Load Shedding</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกการจ่ายโหลด" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="low">ต่ำ</SelectItem>
                <SelectItem value="medium">ปานกลาง</SelectItem>
                <SelectItem value="high">สูง</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="publicImage"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-blue-800">Public Image</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกภาพลักษณ์" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="low">ต่ำ</SelectItem>
                <SelectItem value="medium">ปานกลาง</SelectItem>
                <SelectItem value="high">สูง</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="nMinusOneCriteria"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-blue-800">N-1 Criteria</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกเกณฑ์ N-1" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="low">ต่ำ</SelectItem>
                <SelectItem value="medium">ปานกลาง</SelectItem>
                <SelectItem value="high">สูง</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="applicationUse"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-blue-800">Application Use</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกการใช้งาน" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="low">ต่ำ</SelectItem>
                <SelectItem value="medium">ปานกลาง</SelectItem>
                <SelectItem value="high">สูง</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="systemStability"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-blue-800">System Stability</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกความเสถียรของระบบ" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="low">ต่ำ</SelectItem>
                <SelectItem value="medium">ปานกลาง</SelectItem>
                <SelectItem value="high">สูง</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="pollution"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-blue-800">Pollution</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกมลพิษ" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="low">ต่ำ</SelectItem>
                <SelectItem value="medium">ปานกลาง</SelectItem>
                <SelectItem value="high">สูง</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
