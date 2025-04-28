
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const months = Array.from({ length: 13 }, (_, i) => i.toString())

export const LoadFactorSection = ({ form }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Load Factor</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left py-2">Load Factor Range</th>
              <th className="text-left py-2">Number of Months</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2">&lt;= 0.6</td>
              <td>
                <FormField
                  control={form.control}
                  name="loadFactors.below06"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select months" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {months.map((month) => (
                            <SelectItem key={month} value={month}>
                              {month}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </td>
            </tr>
            {/* Similar rows for other load factor ranges */}
            <tr>
              <td className="py-2">0.6 &lt; LF &lt;= 1</td>
              <td>
                <FormField
                  control={form.control}
                  name="loadFactors.from06to1"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select months" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {months.map((month) => (
                            <SelectItem key={month} value={month}>
                              {month}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </td>
            </tr>
            {/* Continue with other load factor ranges */}
          </tbody>
        </table>
      </div>
    </div>
  )
}
