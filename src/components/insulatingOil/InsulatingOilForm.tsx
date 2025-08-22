import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

// Data structures
export interface GeneralInfoOil {
  transformer?: string; testType?: string; workOrderNo?: string; inspector?: string; inspectionDate?: string;
  oilTemp?: string; ambientTemp?: string; wdgTemp?: string; humidity?: string; weather?: string;
}
export interface BreakdownSet { gapDistance?: string; xi: string[]; }
export interface PowerFactorRow { type: 'OLTC' | 'MAIN TANK'; current?: string; watt?: string; pf?: string; pfCor?: string; remark?: string; }
export interface InsulatingOilData { general: GeneralInfoOil; breakdown: { oltc: BreakdownSet; main: BreakdownSet; calculated: boolean }; power: PowerFactorRow[]; }
export interface InsulatingOilFormProps { initialData?: Partial<InsulatingOilData> & { viewOnly?: boolean }; onSubmit: (d: InsulatingOilData)=>void; onCancel: ()=>void; viewOnly?: boolean; }

const buildInitial = (initial?: InsulatingOilFormProps['initialData']): InsulatingOilData => ({
  general: initial?.general || {},
  breakdown: initial?.breakdown || { oltc: { gapDistance: '', xi: Array(5).fill('') }, main: { gapDistance: '', xi: Array(5).fill('') }, calculated: false },
  power: initial?.power || [ { type:'OLTC' }, { type:'MAIN TANK' } ],
});

const numberInput = 'w-full border rounded px-2 py-1.5 h-9 text-right tabular-nums focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:bg-muted bg-background/70';
const textInput = 'w-full border rounded px-3 py-2 h-10 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:bg-muted bg-background/70';
const selectInput = textInput;

const format = (v: number | null | undefined, digits=2) => v==null || isNaN(v) ? '' : v.toFixed(digits);

const computeStats = (set: BreakdownSet) => {
  const values = set.xi.map(x => parseFloat(x)).filter(v => !isNaN(v));
  const n = values.length; if(n===0) return { sum:0, mean:0, squares:Array(5).fill(0), sumSquares:0, s:0, cv:0 };
  const sum = values.reduce((a,b)=>a+b,0);
  const mean = sum / n;
  const squaresPer = set.xi.map(x => { const val = parseFloat(x); if(isNaN(val)) return 0; const diff = val - mean; return diff*diff; });
  const sumSquares = squaresPer.reduce((a,b)=>a+b,0);
  const s = n>1 ? Math.sqrt(sumSquares/(n-1)) : 0;
  const cv = mean !==0 ? (s/mean)*100 : 0;
  return { sum, mean, squares: squaresPer, sumSquares, s, cv };
};

const InsulatingOilForm: React.FC<InsulatingOilFormProps> = ({ initialData, onSubmit, onCancel, viewOnly }) => {
  const [data, setData] = useState<InsulatingOilData>(()=>buildInitial(initialData));
  const disabled = !!(viewOnly || initialData?.viewOnly);

  const updateGeneral = (f: keyof GeneralInfoOil, v: string) => setData(p=>({ ...p, general:{ ...p.general, [f]: v }}));
  const updateBreakdownGap = (section: 'oltc'|'main', v: string) => setData(p=>({ ...p, breakdown: { ...p.breakdown, [section]: { ...p.breakdown[section], gapDistance: v }}}));
  const updateBreakdownXi = (section:'oltc'|'main', idx:number, v:string) => setData(p=>({ ...p, breakdown: { ...p.breakdown, [section]: { ...p.breakdown[section], xi: p.breakdown[section].xi.map((x,i)=> i===idx? v : x) }}}));
  const updatePower = (idx:number, f: keyof PowerFactorRow, v:string) => setData(p=>({ ...p, power: p.power.map((r,i)=> i===idx ? { ...r, [f]: v } : r ) }));
  const triggerCalculate = () => setData(p=>({ ...p, breakdown: { ...p.breakdown, calculated:true } }));
  const handleSubmit = (e:React.FormEvent)=>{ e.preventDefault(); onSubmit(data); };

  const statsOLTC = data.breakdown.calculated ? computeStats(data.breakdown.oltc) : null;
  const statsMAIN = data.breakdown.calculated ? computeStats(data.breakdown.main) : null;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      {/* General Info */}
      <div className="space-y-6">
        <div className="rounded-xl border bg-gradient-to-b from-background/70 to-background/40 backdrop-blur p-6 ring-1 ring-border/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold tracking-wide flex items-center gap-2 text-transformer-dark text-lg"><span className="h-2 w-2 rounded-full bg-primary animate-pulse"/>ข้อมูลทั่วไป</h3>
            <div className="flex gap-3 flex-wrap justify-end">
              <Button type="button" variant="outline" onClick={onCancel} className="min-w-[110px]">ยกเลิก</Button>
              {!disabled && <Button type="button" variant="secondary" onClick={triggerCalculate} className="min-w-[120px]">คำนวณ</Button>}
              {!disabled && <Button type="submit" className="min-w-[120px]">บันทึก</Button>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {/* Column 1 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">หม้อแปลงไฟฟ้า</label>
                <select disabled={disabled} className={selectInput} value={data.general.transformer||''} onChange={e=>updateGeneral('transformer',e.target.value)} required>
                  <option value="">เลือกหม้อแปลง</option>
                  <option value="TR-001">TR-001</option>
                  <option value="TR-002">TR-002</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">รูปแบบการทดสอบ</label>
                <select disabled={disabled} className={selectInput} value={data.general.testType||''} onChange={e=>updateGeneral('testType',e.target.value)} required>
                  <option value="">เลือกรูปแบบ</option>
                  <option value="Standard">Standard</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Routine">Routine</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">เลขที่คำสั่งปฏิบัติงาน</label>
                <select disabled={disabled} className={selectInput} value={data.general.workOrderNo||''} onChange={e=>updateGeneral('workOrderNo',e.target.value)}>
                  <option value="">เลือกคำสั่งงาน</option>
                  <option value="WO-2024-001">WO-2024-001</option>
                  <option value="WO-2024-002">WO-2024-002</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Oil Temp. (°C)</label>
                <input disabled={disabled} type="number" className={numberInput} value={data.general.oilTemp||''} onChange={e=>updateGeneral('oilTemp',e.target.value)} placeholder="0" />
              </div>
            </div>
            {/* Column 2 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">ผู้ตรวจสอบ</label>
                <input disabled={disabled} type="text" className={textInput} value={data.general.inspector||''} onChange={e=>updateGeneral('inspector',e.target.value)} placeholder="เช่น นาย ก" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">วันที่ตรวจสอบ</label>
                <input disabled={disabled} type="date" className={textInput} value={data.general.inspectionDate||''} onChange={e=>updateGeneral('inspectionDate',e.target.value)} required />
              </div>
            </div>
            {/* Column 3 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Ambient Temp. (°C)</label>
                <input disabled={disabled} type="number" className={numberInput} value={data.general.ambientTemp||''} onChange={e=>updateGeneral('ambientTemp',e.target.value)} placeholder="0" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Humidity (%)</label>
                <input disabled={disabled} type="number" className={numberInput} value={data.general.humidity||''} onChange={e=>updateGeneral('humidity',e.target.value)} placeholder="0" />
              </div>
            </div>
            {/* Column 4 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Wdg Temp. (°C)</label>
                <input disabled={disabled} type="number" className={numberInput} value={data.general.wdgTemp||''} onChange={e=>updateGeneral('wdgTemp',e.target.value)} placeholder="0" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Weather</label>
                <input disabled={disabled} type="text" className={textInput} value={data.general.weather||''} onChange={e=>updateGeneral('weather',e.target.value)} placeholder="Sunny / Cloudy" />
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown Voltage Test */}
        <div className="rounded-xl border bg-background/70 backdrop-blur p-6 ring-1 ring-border/50 space-y-6">
          <h4 className="font-semibold tracking-wide flex items-center gap-2 text-transformer-dark text-base"><span className="h-2 w-2 rounded-full bg-primary"/>DIELECTRIC BREAKDOWN VOLTAGE TEST</h4>
          <div className="grid md:grid-cols-2 gap-8">
            {(['oltc','main'] as const).map(section => { const title = section==='oltc'? 'OLTC':'MAIN TANK'; const set = data.breakdown[section]; const stats = section==='oltc'? statsOLTC : statsMAIN; return (
              <div key={section} className="rounded-lg border bg-background/60 p-4 space-y-4">
                <h5 className="font-medium text-center text-sm tracking-wide">{title}</h5>
                <div>
                  <label className="block text-xs font-medium mb-1">GAP DISTANCE (ASTM-D1816) [mm]</label>
                  <input disabled={disabled} type="number" className={numberInput} value={set.gapDistance||''} onChange={e=>updateBreakdownGap(section,e.target.value)} placeholder="0" />
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-medium">
                    <div>BREAK DOWN (kV) Xi</div>
                    <div className="text-center">(Xi − X)²</div>
                  </div>
                  {set.xi.map((val,i)=>(
                    <div key={i} className="grid grid-cols-2 gap-2">
                      <input disabled={disabled} type="number" className={numberInput} value={val} onChange={e=>updateBreakdownXi(section,i,e.target.value)} placeholder={`#${i+1}`} />
                      <div className="h-9 flex items-center justify-center text-xs border rounded bg-muted/40 font-mono tabular-nums">
                        {stats ? format(stats.squares[i],2) : '0.0'}
                      </div>
                    </div>
                  ))}
                  <div className="mt-3 pt-3 border-t grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] leading-tight font-medium">
                    <div>ΣXi: <span className="font-mono">{stats? format(stats.sum,2):'0.0'}</span></div>
                    <div>Σ[(Xi−X)²]: <span className="font-mono">{stats? format(stats.sumSquares,2):'0.0'}</span></div>
                    <div>X̄: <span className="font-mono">{stats? format(stats.mean,2):'0.0'}</span></div>
                    <div>S: <span className="font-mono">{stats? format(stats.s,2):'0.0'}</span></div>
                    <div>CV(%): <span className="font-mono">{stats? format(stats.cv,2):'0.0'}</span></div>
                  </div>
                </div>
              </div>
            ); })}
          </div>
        </div>

        {/* Power Factor Measurement */}
        <div className="rounded-xl border bg-background/70 backdrop-blur p-6 ring-1 ring-border/50 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h4 className="font-semibold tracking-wide flex items-center gap-2 text-transformer-dark text-base"><span className="h-2 w-2 rounded-full bg-primary"/>INSULATION POWER FACTOR MEASUREMENT</h4>
            <div className="flex gap-6 flex-wrap">
              <div>
                <label className="block text-xs font-medium mb-1">CF</label>
                <input disabled={disabled} type="number" className={numberInput} value={data.power[0].pfCor||''} onChange={e=>{/* reuse pfCor field for CF meta? better separate, but keep simple */}} placeholder="0" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Test (kV)</label>
                <input disabled={disabled} type="number" className={numberInput} value={data.power[0].pf||''} onChange={e=>{/* placeholder to store test kV maybe reuse pf field - can refactor later */}} placeholder="0" />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto rounded-md border">
            <table className="w-full text-[12px] border-collapse">
              <thead className="bg-muted/60">
                <tr>
                  <th className="border px-3 py-2 text-left">TYPE</th>
                  <th className="border px-3 py-2">CURRENT (mA)</th>
                  <th className="border px-3 py-2">WATT</th>
                  <th className="border px-3 py-2">%POWER FACTOR</th>
                  <th className="border px-3 py-2">%POWER FACTOR (COR 20°C)</th>
                  <th className="border px-3 py-2">REMARK</th>
                </tr>
              </thead>
              <tbody>
                {data.power.map((row,idx)=>(
                  <tr key={row.type} className="odd:bg-background even:bg-muted/30">
                    <td className="border px-3 py-2 font-medium">{row.type}</td>
                    <td className="border px-2 py-1.5"><input disabled={disabled} type="number" className={numberInput} value={row.current||''} onChange={e=>updatePower(idx,'current',e.target.value)} placeholder="0.0" /></td>
                    <td className="border px-2 py-1.5"><input disabled={disabled} type="number" className={numberInput} value={row.watt||''} onChange={e=>updatePower(idx,'watt',e.target.value)} placeholder="0.0" /></td>
                    <td className="border px-2 py-1.5"><input disabled={disabled} type="number" className={numberInput} value={row.pf||''} onChange={e=>updatePower(idx,'pf',e.target.value)} placeholder="0.0" /></td>
                    <td className="border px-2 py-1.5"><input disabled={disabled} type="number" className={numberInput} value={row.pfCor||''} onChange={e=>updatePower(idx,'pfCor',e.target.value)} placeholder="0.0" /></td>
                    <td className="border px-2 py-1.5"><input disabled={disabled} type="text" className={textInput} value={row.remark||''} onChange={e=>updatePower(idx,'remark',e.target.value)} placeholder="Remark" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </form>
  );
};

export default InsulatingOilForm;
