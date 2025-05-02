
import * as z from "zod"

export const transformerImportanceSchema = z.object({
  transformerName: z.string({
    required_error: "กรุณาเลือกชื่อหม้อแปลง",
  }),
  recordedDate: z.date({
    required_error: "กรุณาเลือกวันที่",
  }),
  busVoltageHV: z.string({
    required_error: "กรุณาเลือกแรงดันไฟฟ้าด้าน HV",
  }),
  systemFaultLevelHV: z.number({
    required_error: "กรุณาระบุระดับความผิดพลาดของระบบด้าน HV",
  }),
  mvaHV: z.string({
    required_error: "กรุณาระบุ MVA ด้าน HV",
  }),
  busVoltageLV: z.string({
    required_error: "กรุณาเลือกแรงดันไฟฟ้าด้าน LV",
  }),
  systemFaultLevelLV: z.number({
    required_error: "กรุณาระบุระดับความผิดพลาดของระบบด้าน LV",
  }),
  mvaLV: z.string({
    required_error: "กรุณาระบุ MVA ด้าน LV",
  }),
  probabilityOfForceOutage: z.string({
    required_error: "กรุณาเลือกความน่าจะเป็นของการดับไฟ",
  }),
  socialAspect: z.string({
    required_error: "กรุณาเลือกด้านสังคม",
  }),
  loadShedding: z.string({
    required_error: "กรุณาเลือกการจ่ายโหลด",
  }),
  publicImage: z.string({
    required_error: "กรุณาเลือกภาพลักษณ์",
  }),
  nMinusOneCriteria: z.string({
    required_error: "กรุณาเลือกเกณฑ์ N-1",
  }),
  applicationUse: z.string({
    required_error: "กรุณาเลือกการใช้งาน",
  }),
  systemStability: z.string({
    required_error: "กรุณาเลือกความเสถียรของระบบ",
  }),
  pollution: z.string({
    required_error: "กรุณาเลือกมลพิษ",
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
