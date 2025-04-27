
import { FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UseFormReturn } from "react-hook-form"
import { TransformerImportanceFormValues } from "../schema"

interface LoadFactorSectionProps {
  form: UseFormReturn<TransformerImportanceFormValues>
}

const loadFactorRanges = [
  { key: "below06", label: "<= 0.6" },
  { key: "from06to1", label: "0.6 < LF <= 1" },
  { key: "from1to12", label: "1 < LF <= 1.2" },
  { key: "from12to15", label: "1.2 < LF <= 1.5" },
  { key: "above15", label: "> 1.5" }
]

export const LoadFactorSection = ({ form }: LoadFactorSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Load Factor</h2>
      <div className="grid gap-4">
        {loadFactorRanges.map((item) => (
          <FormField
            key={item.key}
            control={form.control}
            name={`loadFactors.${item.key}` as any}
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-2 items-center gap-4">
                  <FormLabel>{item.label}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select months" />
                    </SelectTrigger>
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
  )
}
