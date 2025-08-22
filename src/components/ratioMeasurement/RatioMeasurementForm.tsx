import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';

export interface GeneralInfoRatio {
  transformer?: string; inspector?: string; testType?: string; inspectionDate?: string; workOrderNo?: string;
  oilTemp?: string; ambientTemp?: string; wdgTemp?: string; humidity?: string; weather?: string;
  minTap?: string; maxTap?: string;
}
export interface MinTapRow { tap: string; hv?: string; lv?: string; rated?: string; ratio1?: string; ratio2?: string; ratio3?: string; remark?: string; }
export interface MaxBlockRow { wdg: 'HV' | 'LV'; hv?: string; lv?: string; rated?: string; ratio1?: string; ratio2?: string; ratio3?: string; remark?: string; }
export interface RatioMeasurementData { general: GeneralInfoRatio; minRows: MinTapRow[]; maxRows: MaxBlockRow[]; }
export interface RatioMeasurementFormProps { initialData?: Partial<RatioMeasurementData> & { viewOnly?: boolean }; onSubmit: (d: RatioMeasurementData)=>void; onCancel: ()=>void; viewOnly?: boolean; }

const TAP_SEQUENCE = ['12R','11R','10R','9R','8R','7R','6R','5R','4R','3R','2R','1R','N','1L','2L','3L','4L','5L','6L','7L','8L','9L','10L','11L','12L'];
const buildInitial = (initial?: RatioMeasurementFormProps['initialData']): RatioMeasurementData => ({
  general: initial?.general || { minTap: '12R', maxTap: '12L' },
  minRows: initial?.minRows || TAP_SEQUENCE.map(t=>({ tap: t })),
  maxRows: initial?.maxRows || [{ wdg:'HV' }, { wdg:'LV' }],
});

const RatioMeasurementForm: React.FC<RatioMeasurementFormProps> = ({ initialData, onSubmit, onCancel, viewOnly }) => {
  const [data, setData] = useState<RatioMeasurementData>(()=>buildInitial(initialData));
  const disabled = !!(viewOnly || initialData?.viewOnly);
  const updateGeneral = (f: keyof GeneralInfoRatio, v: string) => setData(p=>({ ...p, general:{ ...p.general, [f]: v }}));
  const updateMin = (idx:number, f: keyof MinTapRow, v:string) => setData(p=>({ ...p, minRows: p.minRows.map((r,i)=>i===idx?{...r,[f]:v}:r)}));
  const updateMax = (idx:number, f: keyof MaxBlockRow, v:string) => setData(p=>({ ...p, maxRows: p.maxRows.map((r,i)=>i===idx?{...r,[f]:v}:r)}));
  // If needed later: a calculate button could auto-derive ratio fields from hv/lv.
  const handleSubmit = (e:React.FormEvent)=>{ e.preventDefault(); onSubmit(data); };

  const computeError = (ratio?: string, rated?: string) => {
    const R = parseFloat(ratio||''); const RR = parseFloat(rated||'');
    if(isNaN(R) || isNaN(RR) || RR === 0) return '';
    const err = ((R - RR)/RR)*100;
    return err.toFixed(2);
  };

  const triggerCalculate = () => {
    setData(prev => ({
      ...prev,
      minRows: prev.minRows.map(r => {
        const HV = parseFloat(r.hv||''); const LV = parseFloat(r.lv||'');
        if(isNaN(HV)||isNaN(LV)||LV===0) return r;
        const measured = (HV/LV).toFixed(4);
        return { ...r, ratio1: r.ratio1 || measured, ratio2: r.ratio2 || measured, ratio3: r.ratio3 || measured };
      }),
      maxRows: prev.maxRows.map(r => {
        const HV = parseFloat(r.hv||''); const LV = parseFloat(r.lv||'');
        if(isNaN(HV)||isNaN(LV)||LV===0) return r;
        const measured = (HV/LV).toFixed(4);
        return { ...r, ratio1: r.ratio1 || measured, ratio2: r.ratio2 || measured, ratio3: r.ratio3 || measured };
      }),
    }));
  };

  const inputBase = 'w-full border rounded px-3 py-2 transition disabled:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 text-sm';
  const numInput = inputBase + ' text-right tabular-nums';
  const textInput = inputBase;
  const tableNum = 'w-full border rounded px-2 py-1.5 h-9 text-right tabular-nums focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:bg-muted bg-background/70';
  const tableText = 'w-full border rounded px-2 py-1.5 h-9 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:bg-muted bg-background/70 text-sm';

  const minStartIndex = data.general.minTap ? data.minRows.findIndex(r=>r.tap===data.general.minTap) : 0;
  const visibleMinRows = minStartIndex>=0 ? data.minRows.slice(minStartIndex) : data.minRows;

  return (
    <form onSubmit={handleSubmit} className="h-full flex flex-col">
      <div className="flex flex-col xl:flex-row gap-8 flex-1 overflow-auto pr-2">
        <div className="xl:w-2/5 space-y-6 min-w-[380px]">
          <div className="rounded-xl border bg-gradient-to-b from-background/70 to-background/40 backdrop-blur p-5 shadow-sm ring-1 ring-border/50">
            <h3 className="font-semibold mb-4 tracking-wide flex items-center gap-2 text-transformer-dark"><span className="h-2 w-2 rounded-full bg-primary animate-pulse"/>ข้อมูลทั่วไป</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div><label className="block text-sm font-medium mb-1">หม้อแปลงไฟฟ้า</label><select disabled={disabled} className={inputBase} value={data.general.transformer||''} onChange={e=>updateGeneral('transformer',e.target.value)} required><option value="">เลือกหม้อแปลง</option><option value="TR-001">TR-001</option><option value="TR-002">TR-002</option></select></div>
              <div><label className="block text-sm font-medium mb-1">ผู้ตรวจสอบ</label><input disabled={disabled} type="text" className={textInput} value={data.general.inspector||''} onChange={e=>updateGeneral('inspector',e.target.value)} placeholder="เช่น นาย ก" required /></div>
              <div><label className="block text-sm font-medium mb-1">รูปแบบการทดสอบ</label><select disabled={disabled} className={inputBase} value={data.general.testType||''} onChange={e=>updateGeneral('testType',e.target.value)} required><option value="">เลือกรูปแบบ</option><option value="Standard">Standard</option><option value="Emergency">Emergency</option><option value="Routine">Routine</option></select></div>
              <div><label className="block text-sm font-medium mb-1">วันที่ตรวจสอบ</label><input disabled={disabled} type="date" className={textInput} value={data.general.inspectionDate||''} onChange={e=>updateGeneral('inspectionDate',e.target.value)} required /></div>
              <div><label className="block text-sm font-medium mb-1">เลขที่คำสั่งปฏิบัติงาน</label><select disabled={disabled} className={inputBase} value={data.general.workOrderNo||''} onChange={e=>updateGeneral('workOrderNo',e.target.value)}><option value="">เลือกเลขที่</option><option value="WO-2024-001">WO-2024-001</option><option value="WO-2024-002">WO-2024-002</option></select></div>
              <div><label className="block text-sm font-medium mb-1">Oil Temp. (°C)</label><input disabled={disabled} type="number" className={numInput} value={data.general.oilTemp||''} onChange={e=>updateGeneral('oilTemp',e.target.value)} placeholder="0" /></div>
              <div><label className="block text-sm font-medium mb-1">Ambient Temp. (°C)</label><input disabled={disabled} type="number" className={numInput} value={data.general.ambientTemp||''} onChange={e=>updateGeneral('ambientTemp',e.target.value)} placeholder="0" /></div>
              <div><label className="block text-sm font-medium mb-1">Wdg Temp. (°C)</label><input disabled={disabled} type="number" className={numInput} value={data.general.wdgTemp||''} onChange={e=>updateGeneral('wdgTemp',e.target.value)} placeholder="0" /></div>
              <div><label className="block text-sm font-medium mb-1">Humidity (%)</label><input disabled={disabled} type="number" className={numInput} value={data.general.humidity||''} onChange={e=>updateGeneral('humidity',e.target.value)} placeholder="0" /></div>
              <div><label className="block text-sm font-medium mb-1">Weather</label><input disabled={disabled} type="text" className={textInput} value={data.general.weather||''} onChange={e=>updateGeneral('weather',e.target.value)} placeholder="Sunny / Cloudy" /></div>
              <div><label className="block text-sm font-medium mb-1">Min Tap</label><select disabled={disabled} className={inputBase} value={data.general.minTap||''} onChange={e=>updateGeneral('minTap',e.target.value)}>{TAP_SEQUENCE.map(t=> <option key={t} value={t}>{t}</option>)}</select></div>
              <div><label className="block text-sm font-medium mb-1">Max Tap</label><select disabled={disabled} className={inputBase} value={data.general.maxTap||''} onChange={e=>updateGeneral('maxTap',e.target.value)}>{TAP_SEQUENCE.slice().reverse().map(t=> <option key={t} value={t}>{t}</option>)}</select></div>
            </div>
            <div className="flex flex-wrap gap-3 pt-6 border-t mt-6 justify-end"><Button type="button" variant="outline" onClick={onCancel} className="min-w-[110px]">ยกเลิก</Button>{!disabled && <Button type="button" variant="secondary" onClick={triggerCalculate} className="min-w-[120px]">คำนวณ</Button>}{!disabled && <Button type="submit" className="min-w-[130px]">บันทึก</Button>}</div>
          </div>
        </div>
        <div className="flex-1 space-y-10 min-w-[700px]">
          <div className="rounded-xl border bg-background/70 backdrop-blur p-5 shadow-sm ring-1 ring-border/50">
            <h4 className="font-semibold mb-4 tracking-wide flex items-center gap-2 text-transformer-dark"><span className="h-2 w-2 rounded-full bg-primary"/>HV WDG. – MIN</h4>
            <div className="overflow-x-auto rounded-md border">
              <table className="w-full text-[11px] md:text-[12px] border-collapse">
                <thead className="bg-muted/60">
                  <tr><th className="border px-2 py-2">TAP</th><th className="border px-2 py-2">VOLTAGE – HV</th><th className="border px-2 py-2">VOLTAGE – LV</th><th className="border px-2 py-2">RATED RATIO</th><th className="border px-2 py-2" colSpan={2}>H1–H0:X1–X0</th><th className="border px-2 py-2" colSpan={2}>H2–H0:X2–X0</th><th className="border px-2 py-2" colSpan={2}>H3–H0:X3–X0</th><th className="border px-2 py-2">REMARK</th></tr>
                  <tr><th className="border px-2 py-1"/><th className="border px-2 py-1"/><th className="border px-2 py-1"/><th className="border px-2 py-1"/><th className="border px-2 py-1">RATIO</th><th className="border px-2 py-1">%ERROR</th><th className="border px-2 py-1">RATIO</th><th className="border px-2 py-1">%ERROR</th><th className="border px-2 py-1">RATIO</th><th className="border px-2 py-1">%ERROR</th><th className="border px-2 py-1"/></tr>
                </thead>
                <tbody>
                  {visibleMinRows.map((r, idx)=> { const globalIndex = minStartIndex+idx; return (
                    <tr key={r.tap} className="odd:bg-background even:bg-muted/20">
                      <td className="border px-2 py-1.5 font-medium text-center whitespace-nowrap">{r.tap}</td>
                      <td className="border px-2 py-1.5"><input disabled={disabled} value={r.hv||''} onChange={e=>updateMin(globalIndex,'hv',e.target.value)} className={tableNum} type="number" placeholder="0" /></td>
                      <td className="border px-2 py-1.5"><input disabled={disabled} value={r.lv||''} onChange={e=>updateMin(globalIndex,'lv',e.target.value)} className={tableNum} type="number" placeholder="0" /></td>
                      <td className="border px-2 py-1.5"><input disabled={disabled} value={r.rated||''} onChange={e=>updateMin(globalIndex,'rated',e.target.value)} className={tableNum} type="number" placeholder="0" /></td>
                      <td className="border px-2 py-1.5"><input disabled={disabled} value={r.ratio1||''} onChange={e=>updateMin(globalIndex,'ratio1',e.target.value)} className={tableNum} type="number" placeholder="0.0000" /></td>
                      <td className="border px-2 py-1.5 text-center text-muted-foreground tabular-nums">{computeError(r.ratio1,r.rated)}</td>
                      <td className="border px-2 py-1.5"><input disabled={disabled} value={r.ratio2||''} onChange={e=>updateMin(globalIndex,'ratio2',e.target.value)} className={tableNum} type="number" placeholder="0.0000" /></td>
                      <td className="border px-2 py-1.5 text-center text-muted-foreground tabular-nums">{computeError(r.ratio2,r.rated)}</td>
                      <td className="border px-2 py-1.5"><input disabled={disabled} value={r.ratio3||''} onChange={e=>updateMin(globalIndex,'ratio3',e.target.value)} className={tableNum} type="number" placeholder="0.0000" /></td>
                      <td className="border px-2 py-1.5 text-center text-muted-foreground tabular-nums">{computeError(r.ratio3,r.rated)}</td>
                      <td className="border px-2 py-1.5"><input disabled={disabled} value={r.remark||''} onChange={e=>updateMin(globalIndex,'remark',e.target.value)} className={tableText} placeholder="" /></td>
                    </tr>
                  ); })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="rounded-xl border bg-background/70 backdrop-blur p-5 shadow-sm ring-1 ring-border/50 space-y-8">
            <h4 className="font-semibold tracking-wide flex items-center gap-2 text-transformer-dark mb-2"><span className="h-2 w-2 rounded-full bg-primary"/>MAX BLOCK</h4>
            <div className="grid gap-10">
              <div className="space-y-3"><h5 className="font-semibold text-sm">HV WDG. (TAP N)</h5><div className="overflow-x-auto rounded-md border"><table className="w-full text-[11px] md:text-[12px] border-collapse"><thead className="bg-muted/60"><tr><th className="border px-2 py-2">VOLTAGE – HV</th><th className="border px-2 py-2">VOLTAGE – LV</th><th className="border px-2 py-2">RATED RATIO</th><th className="border px-2 py-2" colSpan={2}>H1–H0:Y1–Y2</th><th className="border px-2 py-2" colSpan={2}>H2–H0:Y2–T3</th><th className="border px-2 py-2" colSpan={2}>H3–H0:Y3–Y1</th><th className="border px-2 py-2">REMARK</th></tr><tr><th className="border px-2 py-1"/><th className="border px-2 py-1"/><th className="border px-2 py-1"/><th className="border px-2 py-1">RATIO</th><th className="border px-2 py-1">%ERROR</th><th className="border px-2 py-1">RATIO</th><th className="border px-2 py-1">%ERROR</th><th className="border px-2 py-1">RATIO</th><th className="border px-2 py-1">%ERROR</th><th className="border px-2 py-1"/></tr></thead><tbody>{data.maxRows.filter(r=>r.wdg==='HV').map((r,idx)=>{ return (<tr key={'HV'} className="odd:bg-background even:bg-muted/20"><td className="border px-2 py-1.5"><input disabled={disabled} value={r.hv||''} onChange={e=>updateMax(idx,'hv',e.target.value)} className={tableNum} type="number" placeholder="0" /></td><td className="border px-2 py-1.5"><input disabled={disabled} value={r.lv||''} onChange={e=>updateMax(idx,'lv',e.target.value)} className={tableNum} type="number" placeholder="0" /></td><td className="border px-2 py-1.5"><input disabled={disabled} value={r.rated||''} onChange={e=>updateMax(idx,'rated',e.target.value)} className={tableNum} type="number" placeholder="0" /></td><td className="border px-2 py-1.5"><input disabled={disabled} value={r.ratio1||''} onChange={e=>updateMax(idx,'ratio1',e.target.value)} className={tableNum} type="number" placeholder="0.0000" /></td><td className="border px-2 py-1.5 text-center text-muted-foreground">{computeError(r.ratio1,r.rated)}</td><td className="border px-2 py-1.5"><input disabled={disabled} value={r.ratio2||''} onChange={e=>updateMax(idx,'ratio2',e.target.value)} className={tableNum} type="number" placeholder="0.0000" /></td><td className="border px-2 py-1.5 text-center text-muted-foreground">{computeError(r.ratio2,r.rated)}</td><td className="border px-2 py-1.5"><input disabled={disabled} value={r.ratio3||''} onChange={e=>updateMax(idx,'ratio3',e.target.value)} className={tableNum} type="number" placeholder="0.0000" /></td><td className="border px-2 py-1.5 text-center text-muted-foreground">{computeError(r.ratio3,r.rated)}</td><td className="border px-2 py-1.5"><input disabled={disabled} value={r.remark||''} onChange={e=>updateMax(idx,'remark',e.target.value)} className={tableText} placeholder="" /></td></tr>); })}</tbody></table></div></div>
              <div className="space-y-3"><h5 className="font-semibold text-sm">LV WDG. (TAP N)</h5><div className="overflow-x-auto rounded-md border"><table className="w-full text-[11px] md:text-[12px] border-collapse"><thead className="bg-muted/60"><tr><th className="border px-2 py-2">VOLTAGE – HV</th><th className="border px-2 py-2">VOLTAGE – LV</th><th className="border px-2 py-2">RATED RATIO</th><th className="border px-2 py-2" colSpan={2}>X1–X0:Y1–Y2</th><th className="border px-2 py-2" colSpan={2}>X2–X0:Y2–Y3</th><th className="border px-2 py-2" colSpan={2}>X3–X0:Y3–Y1</th><th className="border px-2 py-2">REMARK</th></tr><tr><th className="border px-2 py-1"/><th className="border px-2 py-1"/><th className="border px-2 py-1"/><th className="border px-2 py-1">RATIO</th><th className="border px-2 py-1">%ERROR</th><th className="border px-2 py-1">RATIO</th><th className="border px-2 py-1">%ERROR</th><th className="border px-2 py-1">RATIO</th><th className="border px-2 py-1">%ERROR</th><th className="border px-2 py-1"/></tr></thead><tbody>{data.maxRows.filter(r=>r.wdg==='LV').map((r,_)=>{ const lvIndex=data.maxRows.findIndex(x=>x.wdg==='LV'); return (<tr key={'LV'} className="odd:bg-background even:bg-muted/20"><td className="border px-2 py-1.5"><input disabled={disabled} value={r.hv||''} onChange={e=>updateMax(lvIndex,'hv',e.target.value)} className={tableNum} type="number" placeholder="0" /></td><td className="border px-2 py-1.5"><input disabled={disabled} value={r.lv||''} onChange={e=>updateMax(lvIndex,'lv',e.target.value)} className={tableNum} type="number" placeholder="0" /></td><td className="border px-2 py-1.5"><input disabled={disabled} value={r.rated||''} onChange={e=>updateMax(lvIndex,'rated',e.target.value)} className={tableNum} type="number" placeholder="0" /></td><td className="border px-2 py-1.5"><input disabled={disabled} value={r.ratio1||''} onChange={e=>updateMax(lvIndex,'ratio1',e.target.value)} className={tableNum} type="number" placeholder="0.0000" /></td><td className="border px-2 py-1.5 text-center text-muted-foreground">{computeError(r.ratio1,r.rated)}</td><td className="border px-2 py-1.5"><input disabled={disabled} value={r.ratio2||''} onChange={e=>updateMax(lvIndex,'ratio2',e.target.value)} className={tableNum} type="number" placeholder="0.0000" /></td><td className="border px-2 py-1.5 text-center text-muted-foreground">{computeError(r.ratio2,r.rated)}</td><td className="border px-2 py-1.5"><input disabled={disabled} value={r.ratio3||''} onChange={e=>updateMax(lvIndex,'ratio3',e.target.value)} className={tableNum} type="number" placeholder="0.0000" /></td><td className="border px-2 py-1.5 text-center text-muted-foreground">{computeError(r.ratio3,r.rated)}</td><td className="border px-2 py-1.5"><input disabled={disabled} value={r.remark||''} onChange={e=>updateMax(lvIndex,'remark',e.target.value)} className={tableText} placeholder="" /></td></tr>); })}</tbody></table></div></div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
export default RatioMeasurementForm;
