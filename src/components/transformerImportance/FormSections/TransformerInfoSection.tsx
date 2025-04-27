
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { UseFormReturn } from "react-hook-form"
import { TransformerImportanceFormValues } from "../schema"

interface TransformerInfoSectionProps {
  form: UseFormReturn<TransformerImportanceFormValues>
}

export const TransformerInfoSection = ({ form }: TransformerInfoSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">ข้อมูลหม้อแปลง</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      variant={"outline"}
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
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
