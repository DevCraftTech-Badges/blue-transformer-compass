
import * as z from "zod"

export const transformerImportanceSchema = z.object({
  transformerName: z.string({
    required_error: "กรุณาเลือกหม้อแปลง",
  }),
  recordedDate: z.date({
    required_error: "กรุณาเลือกวันที่",
  }),
  busVoltageHv: z.string({
    required_error: "กรุณาเลือกแรงดันไฟฟ้า HV",
  }),
  systemFaultLevelHv: z.number({
    required_error: "กรุณากรอกค่า System Fault Level HV",
  }),
  busVoltageLv: z.string({
    required_error: "กรุณาเลือกแรงดันไฟฟ้า LV",
  }),
  systemFaultLevelLv: z.number({
    required_error: "กรุณากรอกค่า System Fault Level LV",
  }),
  probabilityOutage: z.string({
    required_error: "กรุณาเลือก Probability Of Force Outage",
  }),
  socialAspect: z.string({
    required_error: "กรุณาเลือก Social Aspect",
  }),
  loadShedding: z.string({
    required_error: "กรุณาเลือก Load Shedding",
  }),
  publicImage: z.string({
    required_error: "กรุณาเลือก Public Image",
  }),
  nOneCriteria: z.string({
    required_error: "กรุณาเลือก N-1 Criteria",
  }),
  applicationUse: z.string({
    required_error: "กรุณาเลือก Application Use",
  }),
  systemStability: z.string({
    required_error: "กรุณาเลือก System Stability",
  }),
  pollution: z.string({
    required_error: "กรุณาเลือก Pollution",
  }),
  damageProperties: z.array(z.string()),
  loadFactors: z.object({
    below06: z.string(),
    from06to1: z.string(),
    from1to12: z.string(),
    from12to15: z.string(),
    above15: z.string(),
  }),
})

export type TransformerImportanceFormValues = z.infer<typeof transformerImportanceSchema>
