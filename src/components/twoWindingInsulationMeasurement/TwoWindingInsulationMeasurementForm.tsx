import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';

// -------- Types --------
export interface GeneralInfoTW {
  transformer?: string; inspector?: string; testType?: string; inspectionDate?: string; workOrderNo?: string;
  oilTemp?: string; ambientTemp?: string; wdgTemp?: string; humidity?: string; weather?: string;
}

export interface IRRowTW { vdc?: string; m1?: string; m10?: string; }
export interface PFRowTW { current?: string; watt?: string; pf?: string; cor20?: string; cap?: string; remark?: string; }

export interface TwoWindingInsulationData {
  general: GeneralInfoTW;
  irRows: IRRowTW[]; // 2 rows
  pfHeader: { cor20?: string; testKV?: string; };
  pfRows: PFRowTW[]; // 4 rows
}

export interface TwoWindingInsulationMeasurementFormProps {
  initialData?: Partial<TwoWindingInsulationData> & { viewOnly?: boolean };
  onSubmit: (data: TwoWindingInsulationData) => void;
  onCancel: () => void;
  viewOnly?: boolean;
}

const buildInitial = (initial?: TwoWindingInsulationMeasurementFormProps['initialData']): TwoWindingInsulationData => ({
  general: initial?.general || {},
  irRows: initial?.irRows || [{}, {}],
  pfHeader: initial?.pfHeader || {},
  pfRows: initial?.pfRows || [
    { remark: 'C1' },
    { remark: 'C2' },
    { remark: 'C3' },
    { remark: 'C4' },
  ],
});

const TwoWindingInsulationMeasurementForm: React.FC<TwoWindingInsulationMeasurementFormProps> = ({ initialData, onSubmit, onCancel, viewOnly }) => {
  const [data, setData] = useState<TwoWindingInsulationData>(() => buildInitial(initialData));
  const disabled = !!(viewOnly || initialData?.viewOnly);

  // Derived PI values for IR table
  const irDerived = useMemo(() => data.irRows.map(r => {
    const m1 = r.m1 ? parseFloat(r.m1) : undefined;
    const m10 = r.m10 ? parseFloat(r.m10) : undefined;
    const pi = (m1 && m1 !== 0 && m10) ? (m10 / m1).toFixed(2) : '0.00';
    return { ...r, pi };
  }), [data.irRows]);

  const updateGeneral = (f: keyof GeneralInfoTW, v: string) => setData(p => ({ ...p, general: { ...p.general, [f]: v } }));
  const updateIr = (idx: number, f: keyof IRRowTW, v: string) => setData(p => ({ ...p, irRows: p.irRows.map((r,i)=> i===idx? { ...r, [f]: v }: r ) }));
  const updatePfHeader = (f: 'cor20' | 'testKV', v: string) => setData(p => ({ ...p, pfHeader: { ...p.pfHeader, [f]: v } }));
  const updatePfRow = (idx: number, f: keyof PFRowTW, v: string) => setData(p => ({ ...p, pfRows: p.pfRows.map((r,i)=> i===idx? { ...r, [f]: v }: r ) }));

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSubmit(data); };

  // Reusable classes
  const inputBase = 'w-full border rounded px-3 py-2 transition disabled:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 text-sm';
  const numInput = inputBase + ' text-right tabular-nums';
  const textInput = inputBase;
  const tableNum = 'w-full border rounded px-2 py-1.5 h-9 text-right tabular-nums focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:bg-muted bg-background/70';

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* General Info */}
      <div className="rounded-xl border bg-gradient-to-b from-background/70 to-background/40 backdrop-blur p-5 shadow-sm ring-1 ring-border/50">
        <h3 className="font-semibold mb-4 tracking-wide flex items-center gap-2 text-transformer-dark"><span className="h-2 w-2 rounded-full bg-primary animate-pulse"/>ข้อมูลทั่วไป</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1">หม้อแปลงไฟฟ้า</label>
            <select disabled={disabled} className={inputBase} value={data.general.transformer||''} onChange={e=>updateGeneral('transformer',e.target.value)} required>
              <option value="">เลือกหม้อแปลง</option>
              <option value="TR-001">TR-001</option>
              <option value="TR-002">TR-002</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">ผู้ตรวจสอบ</label>
            <input disabled={disabled} type="text" className={textInput} value={data.general.inspector||''} onChange={e=>updateGeneral('inspector',e.target.value)} placeholder="เช่น นาย ก" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">รูปแบบการทดสอบ</label>
            <select disabled={disabled} className={inputBase} value={data.general.testType||''} onChange={e=>updateGeneral('testType',e.target.value)} required>
              <option value="">เลือกรูปแบบ</option>
              <option value="Standard">Standard</option>
              <option value="Emergency">Emergency</option>
              <option value="Routine">Routine</option>
            </select>
          </div>
            <div>
            <label className="block text-sm font-medium mb-1">วันที่ตรวจสอบ</label>
            <input disabled={disabled} type="date" className={textInput} value={data.general.inspectionDate||''} onChange={e=>updateGeneral('inspectionDate',e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">เลขที่คำสั่งปฏิบัติงาน</label>
            <select disabled={disabled} className={inputBase} value={data.general.workOrderNo||''} onChange={e=>updateGeneral('workOrderNo',e.target.value)}>
              <option value="">เลือกเลขที่</option>
              <option value="WO-2024-001">WO-2024-001</option>
              <option value="WO-2024-002">WO-2024-002</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Oil Temp. (°C)</label>
            <input disabled={disabled} type="number" className={numInput} value={data.general.oilTemp||''} onChange={e=>updateGeneral('oilTemp',e.target.value)} placeholder="0" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ambient Temp. (°C)</label>
            <input disabled={disabled} type="number" className={numInput} value={data.general.ambientTemp||''} onChange={e=>updateGeneral('ambientTemp',e.target.value)} placeholder="0" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Wdg Temp. (°C)</label>
            <input disabled={disabled} type="number" className={numInput} value={data.general.wdgTemp||''} onChange={e=>updateGeneral('wdgTemp',e.target.value)} placeholder="0" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Humidity (%)</label>
            <input disabled={disabled} type="number" className={numInput} value={data.general.humidity||''} onChange={e=>updateGeneral('humidity',e.target.value)} placeholder="0" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Weather</label>
            <input disabled={disabled} type="text" className={textInput} value={data.general.weather||''} onChange={e=>updateGeneral('weather',e.target.value)} placeholder="Sunny / Cloudy" />
          </div>
        </div>
      </div>

      {/* IR Table */}
      <div className="rounded-xl border bg-background/70 backdrop-blur p-5 shadow-sm ring-1 ring-border/50">
        <h4 className="font-semibold mb-4 tracking-wide flex items-center gap-2 text-transformer-dark"><span className="h-2 w-2 rounded-full bg-primary"/>INSULATION RESISTANCE MEASUREMENT</h4>
        <div className="overflow-x-auto rounded-md border">
          <table className="w-full text-[11px] md:text-[12px] border-collapse">
            <thead className="bg-muted/60">
              <tr>
                <th className="border px-2 py-2">NO.</th>
                <th className="border px-2 py-2">Vdc.</th>
                <th className="border px-2 py-2">MΩ at 1' Min</th>
                <th className="border px-2 py-2">MΩ at 10' Min</th>
                <th className="border px-2 py-2">PI = MΩ at 10' / MΩ at 1'</th>
              </tr>
            </thead>
            <tbody>
              {irDerived.map((r, idx) => (
                <tr key={idx} className="odd:bg-background even:bg-muted/20">
                  <td className="border px-2 py-1.5 text-center font-medium">{idx + 1}</td>
                  <td className="border px-2 py-1.5"><input disabled={disabled} type="number" value={r.vdc||''} onChange={e=>updateIr(idx,'vdc',e.target.value)} className={tableNum} placeholder="0" /></td>
                  <td className="border px-2 py-1.5"><input disabled={disabled} type="number" value={r.m1||''} onChange={e=>updateIr(idx,'m1',e.target.value)} className={tableNum} placeholder="0" /></td>
                  <td className="border px-2 py-1.5"><input disabled={disabled} type="number" value={r.m10||''} onChange={e=>updateIr(idx,'m10',e.target.value)} className={tableNum} placeholder="0" /></td>
                  <td className="border px-2 py-1.5 text-center text-muted-foreground tabular-nums">{r.pi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PF & Cap Table */}
      <div className="rounded-xl border bg-background/70 backdrop-blur p-5 shadow-sm ring-1 ring-border/50">
        <h4 className="font-semibold mb-4 tracking-wide flex items-center gap-2 text-transformer-dark"><span className="h-2 w-2 rounded-full bg-primary"/>INSULATION POWER FACTOR AND CAPACITANCE MEASUREMENT</h4>
        <div className="flex flex-wrap gap-6 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-medium">COR 20°C</span>
            <input disabled={disabled} type="number" value={data.pfHeader.cor20||''} onChange={e=>updatePfHeader('cor20',e.target.value)} className="w-28 border rounded px-2 py-1.5 h-9 text-right tabular-nums focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:bg-muted bg-background/70" placeholder="0" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">TEST (kV)</span>
            <input disabled={disabled} type="number" value={data.pfHeader.testKV||''} onChange={e=>updatePfHeader('testKV',e.target.value)} className="w-28 border rounded px-2 py-1.5 h-9 text-right tabular-nums focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:bg-muted bg-background/70" placeholder="0" />
          </div>
        </div>
        <div className="overflow-x-auto rounded-md border">
          <table className="w-full text-[11px] md:text-[12px] border-collapse">
            <thead className="bg-muted/60">
              <tr>
                <th className="border px-2 py-2">NO.</th>
                <th className="border px-2 py-2">CURRENT (mA)<br/><span className="text-[10px] font-normal">AVG.</span></th>
                <th className="border px-2 py-2">WATT<br/><span className="text-[10px] font-normal">AVG.</span></th>
                <th className="border px-2 py-2">%POWER FACTOR<br/><span className="text-[10px] font-normal">AVG.</span></th>
                <th className="border px-2 py-2">COR 20°C</th>
                <th className="border px-2 py-2">CAP (pF)<br/><span className="text-[10px] font-normal">AVG.</span></th>
                <th className="border px-2 py-2">REMARK</th>
              </tr>
            </thead>
            <tbody>
              {data.pfRows.map((r, idx) => (
                <tr key={idx} className="odd:bg-background even:bg-muted/20">
                  <td className="border px-2 py-1.5 text-center font-medium">{idx + 1}</td>
                  <td className="border px-2 py-1.5"><input disabled={disabled} type="number" value={r.current||''} onChange={e=>updatePfRow(idx,'current',e.target.value)} className={tableNum} placeholder="0" /></td>
                  <td className="border px-2 py-1.5"><input disabled={disabled} type="number" value={r.watt||''} onChange={e=>updatePfRow(idx,'watt',e.target.value)} className={tableNum} placeholder="0" /></td>
                  <td className="border px-2 py-1.5"><input disabled={disabled} type="number" value={r.pf||''} onChange={e=>updatePfRow(idx,'pf',e.target.value)} className={tableNum} placeholder="0" /></td>
                  <td className="border px-2 py-1.5"><input disabled={disabled} type="number" value={r.cor20||''} onChange={e=>updatePfRow(idx,'cor20',e.target.value)} className={tableNum} placeholder="0" /></td>
                  <td className="border px-2 py-1.5"><input disabled={disabled} type="number" value={r.cap||''} onChange={e=>updatePfRow(idx,'cap',e.target.value)} className={tableNum} placeholder="0" /></td>
                  <td className="border px-2 py-1.5 text-center text-muted-foreground">{r.remark}</td>
                </tr>
              ))}
              <tr className="bg-muted/30">
                <td className="border px-3 py-2 font-semibold">CALCULATED RESULT</td>
                <td className="border px-2 py-1.5 text-center text-muted-foreground">0.0</td>
                <td className="border px-2 py-1.5 text-center text-muted-foreground">0.0</td>
                <td className="border px-2 py-1.5 text-center text-muted-foreground">0.0</td>
                <td className="border px-2 py-1.5 text-center text-muted-foreground">0.0</td>
                <td className="border px-2 py-1.5 text-center text-muted-foreground">0.0</td>
                <td className="border px-2 py-1.5 text-center text-muted-foreground">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-6 border-t">
        <Button type="button" variant="outline" onClick={onCancel} className="min-w-[120px] shadow-sm">ยกเลิก</Button>
        {!disabled && <Button type="submit" className="min-w-[140px] shadow-sm">บันทึก</Button>}
      </div>
    </form>
  );
};

export default TwoWindingInsulationMeasurementForm;
