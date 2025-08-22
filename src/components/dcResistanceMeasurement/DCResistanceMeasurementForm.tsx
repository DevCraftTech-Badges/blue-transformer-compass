import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';

// ---------------- Types ----------------
export interface GeneralInfo {
  transformer?: string;
  inspector?: string;
  testType?: string;
  inspectionDate?: string; // ISO date string
  workOrderNo?: string;
  oilTemp?: string;
  ambientTemp?: string;
  wdgTemp?: string;
  humidity?: string;
  weather?: string;
}

export interface HVRow {
  tap: string; // 12R .. 1R, 0R, N, 1L .. 12L
  h1_dcV?: string; h1_dcA?: string; h1_ohm?: string; h1_error?: string;
  h2_dcV?: string; h2_dcA?: string; h2_ohm?: string; h2_error?: string;
  h3_dcV?: string; h3_dcA?: string; h3_ohm?: string; h3_error?: string;
  remark?: string;
}

export interface SimpleRow { // LV / TV rows
  tap: string; // same as terminal label for simplicity
  dcV?: string; dcA?: string; ohm?: string; error?: string; remark?: string;
}

export interface DCResistanceMeasurementData {
  general: GeneralInfo;
  hv: HVRow[];
  lv: SimpleRow[]; // two rows (X1X0/X1X2, X3X0/X3X1)
  tv: SimpleRow[]; // three rows (Y1Y2, Y2Y3, Y3Y1)
}

export interface DCResistanceMeasurementFormProps {
  initialData?: DCResistanceMeasurementData;
  onSubmit: (data: DCResistanceMeasurementData) => void;
  onCancel: () => void;
  viewOnly?: boolean;
}

// ---------------- Constants ----------------
const HV_TAPS: string[] = [
  '12R','11R','10R','9R','8R','7R','6R','5R','4R','3R','2R','1R','0R','N',
  '1L','2L','3L','4L','5L','6L','7L','8L','9L','10L','11L','12L'
];
// Added middle terminal X2X0/X2/X3 per request
const LV_TERMINALS = ['X1X0/X1X2','X2X0/X2/X3','X3X0/X3X1'];
const TV_TERMINALS = ['Y1Y2','Y2Y3','Y3Y1'];

// ---------------- Helpers ----------------
const calcOhm = (v?: string, a?: string): string | undefined => {
  if (!v || !a) return undefined; const V = parseFloat(v); const A = parseFloat(a);
  if (!isFinite(V) || !isFinite(A) || A === 0) return undefined; return (V / A).toFixed(2);
};

const calcErrorsForGroup = (ohms: (string | undefined)[]): (string | undefined)[] => {
  const numeric = ohms.map(o => (o ? parseFloat(o) : undefined));
  const valid = numeric.filter(n => n !== undefined) as number[];
  if (valid.length < 2) return ohms.map(() => undefined);
  const avg = valid.reduce((s,n)=>s+n,0)/valid.length;
  return numeric.map(n => (n === undefined || avg === 0) ? undefined : ((Math.abs(n - avg)/avg)*100).toFixed(2));
};

// ---------------- Component ----------------
const DCResistanceMeasurementForm: React.FC<DCResistanceMeasurementFormProps> = ({ initialData, onSubmit, onCancel, viewOnly }) => {
  const [data, setData] = useState<DCResistanceMeasurementData>(() => initialData || {
    general: {},
    hv: HV_TAPS.map(tap => ({ tap })),
    lv: LV_TERMINALS.map(tap => ({ tap })),
    tv: TV_TERMINALS.map(tap => ({ tap })),
  });

  // Recompute OHM + ERROR derived values
  const enhancedHV = useMemo(() => {
    return data.hv.map(r => {
      const h1_ohm = calcOhm(r.h1_dcV, r.h1_dcA);
      const h2_ohm = calcOhm(r.h2_dcV, r.h2_dcA);
      const h3_ohm = calcOhm(r.h3_dcV, r.h3_dcA);
      const [h1_error, h2_error, h3_error] = calcErrorsForGroup([h1_ohm, h2_ohm, h3_ohm]);
      return { ...r, h1_ohm, h2_ohm, h3_ohm, h1_error, h2_error, h3_error } as HVRow;
    });
  }, [data.hv]);

  const enhancedLV = useMemo(() => data.lv.map(r => {
    const ohm = calcOhm(r.dcV, r.dcA); return { ...r, ohm } as SimpleRow;
  }), [data.lv]);
  const enhancedTV = useMemo(() => data.tv.map(r => {
    const ohm = calcOhm(r.dcV, r.dcA); return { ...r, ohm } as SimpleRow;
  }), [data.tv]);

  const lvErrors = useMemo(() => {
    const ohms = enhancedLV.map(r => r.ohm);
    return calcErrorsForGroup(ohms);
  }, [enhancedLV]);
  const tvErrors = useMemo(() => {
    const ohms = enhancedTV.map(r => r.ohm);
    return calcErrorsForGroup(ohms);
  }, [enhancedTV]);

  // Input handlers
  const updateGeneral = (field: keyof GeneralInfo, value: string) => setData(p => ({ ...p, general: { ...p.general, [field]: value }}));
  const updateHV = (idx: number, field: keyof HVRow, value: string) => setData(p => ({ ...p, hv: p.hv.map((row,i)=> i===idx? { ...row, [field]: value }: row )}));
  const updateSimple = (type: 'lv' | 'tv', idx: number, field: keyof SimpleRow, value: string) => setData(p => ({ ...p, [type]: p[type].map((row,i)=> i===idx? { ...row, [field]: value }: row ) }));

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSubmit({ ...data, hv: enhancedHV, lv: enhancedLV.map((r,i)=> ({ ...r, error: lvErrors[i] })), tv: enhancedTV.map((r,i)=> ({ ...r, error: tvErrors[i] })) }); };

  const disabled = !!viewOnly;

  // Reusable class tokens
  const inputBase = "w-full border rounded px-3 py-2 transition disabled:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 text-sm";
  const numInput = inputBase + " text-right tabular-nums";
  const textInput = inputBase;
  const tableInput = "w-24 border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:bg-muted bg-background/70";
  const tableNumInput = tableInput + " text-right tabular-nums";
  const tableRemarkInput = "w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:bg-muted bg-background/70";

  // Larger variant specifically for LV/TV simple blocks (better readability)
  const simpleNumInput = "w-full border rounded-md px-3 py-2 h-10 text-sm md:text-[15px] font-medium tracking-wide bg-background/70 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:bg-muted text-right tabular-nums";
  // Enlarged remark input (taller & slightly larger font)
  const simpleRemarkInput = "w-full border rounded-md px-3 py-2 h-11 text-sm md:text-[15px] bg-background/70 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:bg-muted";

  // Reusable renderer for LV/TV block
  const renderSimpleBlock = (
    label: string,
    rows: SimpleRow[],
    errors: (string | undefined)[],
    type: 'lv' | 'tv'
  ) => (
    <div className="rounded-2xl border bg-background/80 p-5 shadow-sm ring-1 ring-border/40 group transition hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="font-semibold text-sm tracking-wide text-transformer-dark flex items-center gap-2">
          <span className="h-2 w-2 rounded-sm bg-primary/80" />
          {label}
        </div>
        <div className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary font-medium">AUTO CALC</div>
      </div>
      <div className="overflow-x-auto rounded-md border">
        <table className="w-full text-[12px] md:text-[13px] border-collapse">
          <colgroup>
            <col className="w-[110px]" />
            <col className="w-[140px]" />
            <col className="w-[140px]" />
            <col className="w-[110px]" />
            <col className="w-[170px]" />
            <col className="w-[220px]" />
          </colgroup>
          <thead className="bg-muted/50 text-[11px] md:text-[12px] uppercase tracking-wide">
            <tr className="h-9">
              <th className="border px-3 py-2 text-left font-semibold">TAP</th>
              <th className="border px-3 py-2 font-semibold">DC (V)</th>
              <th className="border px-3 py-2 font-semibold">DC (A)</th>
              <th className="border px-3 py-2 font-semibold">OHM</th>
              <th className="border px-3 py-2 font-semibold">%MAXIMUM ERROR</th>
              <th className="border px-3 py-2 font-semibold">REMARK</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={row.tap} className="odd:bg-background even:bg-muted/30 hover:bg-primary/5 h-12 align-middle">
                <td className="border px-3 py-2 font-medium text-[13px]">{row.tap}</td>
                <td className="border px-3 py-2">
                  <input
                    disabled={disabled}
                    type="number"
                    value={row.dcV || ''}
                    onChange={e => updateSimple(type, idx, 'dcV', e.target.value)}
                    className={simpleNumInput}
                    placeholder="0.00"
                  />
                </td>
                <td className="border px-3 py-2">
                  <input
                    disabled={disabled}
                    type="number"
                    value={row.dcA || ''}
                    onChange={e => updateSimple(type, idx, 'dcA', e.target.value)}
                    className={simpleNumInput}
                    placeholder="0.000"
                  />
                </td>
                <td className="border px-3 py-2 text-center text-muted-foreground tabular-nums text-[13px]">{row.ohm || '0.0'}</td>
                <td className="border px-3 py-2 text-center text-muted-foreground tabular-nums text-[13px]">{errors[idx] || '0.0'}</td>
                <td className="border px-3 py-2">
                  <input
                    disabled={disabled}
                    type="text"
                    value={row.remark || ''}
                    onChange={e => updateSimple(type, idx, 'remark', e.target.value)}
                    className={simpleRemarkInput + ' placeholder:text-muted-foreground/60'}
                    placeholder="หมายเหตุ"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        {/* Left Column (General + LV/TV) */}
        <div className="xl:col-span-2 space-y-8">
          {/* General Info */}
          <div className="rounded-xl border bg-gradient-to-b from-background/70 to-background/40 backdrop-blur p-5 shadow-sm ring-1 ring-border/50">
            <h3 className="font-semibold mb-4 text-transformer-dark tracking-wide flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span>ข้อมูลทั่วไป</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-1">หม้อแปลงไฟฟ้า</label>
                <select disabled={disabled} className={inputBase} value={data.general.transformer || ''} onChange={e=>updateGeneral('transformer', e.target.value)} required>
                  <option value="">เลือกหม้อแปลง</option>
                  <option value="TR-001">TR-001</option>
                  <option value="TR-002">TR-002</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">ผู้ตรวจสอบ</label>
                <input disabled={disabled} type="text" className={textInput} value={data.general.inspector||''} onChange={e=>updateGeneral('inspector', e.target.value)} placeholder="เช่น นาย ก" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">รูปแบบการทดสอบ</label>
                <select disabled={disabled} className={inputBase} value={data.general.testType||''} onChange={e=>updateGeneral('testType', e.target.value)} required>
                  <option value="">เลือกรูปแบบ</option>
                  <option value="Standard">Standard</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Routine">Routine</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">วันที่ตรวจสอบ</label>
                <input disabled={disabled} type="date" className={textInput} value={data.general.inspectionDate||''} onChange={e=>updateGeneral('inspectionDate', e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">เลขที่คำสั่งปฏิบัติงาน</label>
                <select disabled={disabled} className={inputBase} value={data.general.workOrderNo||''} onChange={e=>updateGeneral('workOrderNo', e.target.value)}>
                  <option value="">เลือกเลขที่</option>
                  <option value="WO-2024-001">WO-2024-001</option>
                  <option value="WO-2024-002">WO-2024-002</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Oil Temp. (°C)</label>
                <input disabled={disabled} type="number" className={numInput} value={data.general.oilTemp||''} onChange={e=>updateGeneral('oilTemp', e.target.value)} placeholder="0" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ambient Temp. (°C)</label>
                <input disabled={disabled} type="number" className={numInput} value={data.general.ambientTemp||''} onChange={e=>updateGeneral('ambientTemp', e.target.value)} placeholder="0" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Wdg Temp. (°C)</label>
                <input disabled={disabled} type="number" className={numInput} value={data.general.wdgTemp||''} onChange={e=>updateGeneral('wdgTemp', e.target.value)} placeholder="0" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Humidity (%)</label>
                <input disabled={disabled} type="number" className={numInput} value={data.general.humidity||''} onChange={e=>updateGeneral('humidity', e.target.value)} placeholder="0" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Weather</label>
                <input disabled={disabled} type="text" className={textInput} value={data.general.weather||''} onChange={e=>updateGeneral('weather', e.target.value)} placeholder="Sunny / Cloudy" />
              </div>
            </div>
            <div className="mt-4 text-[11px] text-muted-foreground leading-relaxed">
              หมายเหตุ: ค่า OHM และ %ERROR จะคำนวณอัตโนมัติเมื่อกรอก DC (V) & DC (A)
            </div>
          </div>

          {/* LV / TV WDG Blocks */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground pl-1">
              <span className="h-1.5 w-1.5 rounded-sm bg-primary" />LV / TV WDG Blocks
            </div>
            {/* LV Blocks */}
            {renderSimpleBlock('LV WDG', enhancedLV, lvErrors, 'lv')}
            {/* TV Blocks */}
            {renderSimpleBlock('TV WDG', enhancedTV, tvErrors, 'tv')}
          </div>
        </div>

        {/* Right Column HV */}
        <div className="xl:col-span-3">
          <div className="rounded-xl border bg-gradient-to-b from-background/70 to-background/40 backdrop-blur p-5 shadow-sm h-full flex flex-col ring-1 ring-border/50">
            <h3 className="font-semibold mb-4 text-transformer-dark tracking-wide flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />HV WDG.
            </h3>
            <div className="overflow-auto -mx-5 -mb-5 px-5 pb-5 border-t pt-2 max-h-[72vh] relative">
              <table className="w-full text-[11px] border-separate border-spacing-0">
                <thead className="sticky top-0 bg-muted/80 backdrop-blur z-20 shadow">
                <tr>
                    <th className="border px-3 py-1.5 sticky left-0 z-30 bg-muted/80 backdrop-blur">TAP</th>
                    <th className="border px-3 py-1.5" colSpan={4}>Terminal: H1H0/H1H2</th>
                    <th className="border px-3 py-1.5" colSpan={4}>Terminal: H2H0/H2H3</th>
                    <th className="border px-3 py-1.5" colSpan={4}>Terminal: H3H0/H3H1</th>
                    <th className="border px-3 py-1.5" rowSpan={2}>REMARK</th>
                </tr>
                  <tr>
                  {/* For each terminal group: DC(V) DC(A) OHM %ERROR */}
                    <th className="border px-3 py-1.5 sticky left-0 z-30 bg-muted/80">&nbsp;</th>
                    <th className="border px-3 py-1.5">DC (V)</th>
                    <th className="border px-3 py-1.5">DC (A)</th>
                    <th className="border px-3 py-1.5">OHM</th>
                    <th className="border px-3 py-1.5">%MAXIMUM ERROR BETWEEN CM&PHASE</th>
                    <th className="border px-3 py-1.5">DC (V)</th>
                    <th className="border px-3 py-1.5">DC (A)</th>
                    <th className="border px-3 py-1.5">OHM</th>
                    <th className="border px-3 py-1.5">%MAXIMUM ERROR BETWEEN CM&PHASE</th>
                    <th className="border px-3 py-1.5">DC (V)</th>
                    <th className="border px-3 py-1.5">DC (A)</th>
                    <th className="border px-3 py-1.5">OHM</th>
                    <th className="border px-3 py-1.5">%MAXIMUM ERROR BETWEEN CM&PHASE</th>
                  </tr>
                </thead>
                <tbody className="[&>tr:hover]:bg-primary/5">
                  {enhancedHV.map((row, idx) => (
                    <tr key={row.tap} className="odd:bg-background even:bg-muted/10">
                      <td className="border px-3 py-1.5 font-medium sticky left-0 z-10 bg-background/90 backdrop-blur">
                        {row.tap}
                      </td>
                    {/* H1 */}
                      <td className="border px-2 py-1.5"><input disabled={disabled} type="number" value={row.h1_dcV||''} onChange={e=>updateHV(idx,'h1_dcV',e.target.value)} className={tableNumInput} /></td>
                      <td className="border px-2 py-1.5"><input disabled={disabled} type="number" value={row.h1_dcA||''} onChange={e=>updateHV(idx,'h1_dcA',e.target.value)} className={tableNumInput} /></td>
                      <td className="border px-2 py-1.5 text-center text-muted-foreground">{row.h1_ohm || '0.0'}</td>
                      <td className="border px-2 py-1.5 text-center text-muted-foreground">{row.h1_error || '0.0'}</td>
                    {/* H2 */}
                      <td className="border px-2 py-1.5"><input disabled={disabled} type="number" value={row.h2_dcV||''} onChange={e=>updateHV(idx,'h2_dcV',e.target.value)} className={tableNumInput} /></td>
                      <td className="border px-2 py-1.5"><input disabled={disabled} type="number" value={row.h2_dcA||''} onChange={e=>updateHV(idx,'h2_dcA',e.target.value)} className={tableNumInput} /></td>
                      <td className="border px-2 py-1.5 text-center text-muted-foreground">{row.h2_ohm || '0.0'}</td>
                      <td className="border px-2 py-1.5 text-center text-muted-foreground">{row.h2_error || '0.0'}</td>
                    {/* H3 */}
                      <td className="border px-2 py-1.5"><input disabled={disabled} type="number" value={row.h3_dcV||''} onChange={e=>updateHV(idx,'h3_dcV',e.target.value)} className={tableNumInput} /></td>
                      <td className="border px-2 py-1.5"><input disabled={disabled} type="number" value={row.h3_dcA||''} onChange={e=>updateHV(idx,'h3_dcA',e.target.value)} className={tableNumInput} /></td>
                      <td className="border px-2 py-1.5 text-center text-muted-foreground">{row.h3_ohm || '0.0'}</td>
                      <td className="border px-2 py-1.5 text-center text-muted-foreground">{row.h3_error || '0.0'}</td>
                      {/* Remark */}
                      <td className="border px-2 py-1.5"><input disabled={disabled} type="text" value={row.remark||''} onChange={e=>updateHV(idx,'remark',e.target.value)} className={tableRemarkInput + ' w-36'} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pointer-events-none absolute top-0 right-0 h-full w-6 bg-gradient-to-l from-background to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 pt-6 border-t">
        <Button type="button" variant="outline" onClick={onCancel} className="min-w-[120px] shadow-sm">ยกเลิก</Button>
        {!viewOnly && <Button type="submit" className="min-w-[140px] shadow-sm">บันทึก</Button>}
      </div>
    </form>
  );
};

export default DCResistanceMeasurementForm;
