import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

// ---------------- Types ----------------
export interface GeneralInfoEC {
  transformer?: string;
  inspector?: string;
  testType?: string;
  inspectionDate?: string; // ISO date
  workOrderNo?: string;
  oilTemp?: string; ambientTemp?: string; wdgTemp?: string; humidity?: string; weather?: string;
}

export interface SmallBlockRow { // for LV/TV/HV small blocks (two rows AC(VOLT|kV) + N)
  label: 'AC' | 'N';
  h1?: string; h2?: string; h3?: string; remark?: string; // h1/h2/h3 correspond to terminal columns
  acValue?: string; // only used on AC row (shared single input) kept separate for clarity
}

export interface HVBigRow { // big right table rows per tap
  tap: string;
  h1?: string; h2?: string; h3?: string; remark?: string;
}

export interface ExcitingCurrentFormData {
  general: GeneralInfoEC;
  lv: SmallBlockRow[]; // two rows
  tv: SmallBlockRow[]; // two rows
  hv: SmallBlockRow[]; // two rows (AC(kV) + N)
  hvTableAcVolt?: string; // single excitation voltage for big table
  hvTable: HVBigRow[];
}

export interface ExcitingCurrentMeasurementFormProps {
  initialData?: any; // accept legacy shape
  onSubmit: (data: any) => void; // return unified object with top-level fields for parent table compatibility
  onCancel: () => void;
  viewOnly?: boolean;
}

// ---------------- Constants ----------------
const HV_BIG_TAPS: string[] = [
  '12R','11R','10R','9R','8R','7R','6R','5R','4R','3R','2R','1R','N',
  '1L','2L','3L','4L','5L','6L','7L','8L','9L','10L','11L','12L'
]; // 25 rows (excluded 0R)

const LV_TERMINALS = ['Terminal:X1X0/X1X2','Terminal:X2X0/X2X3','Terminal:X3X0/X3X1'];
const TV_TERMINALS = ['Terminal:Y1Y2','Terminal:Y2Y3','Terminal:Y3Y1'];
const HV_TERMINALS = ['Terminal:H1H0/H1H2','Terminal:H2H0/H2H3','Terminal:H3H0/H3H1'];

// Utility to build two-row small block
const buildSmallBlock = (): SmallBlockRow[] => ([
  { label: 'AC', acValue: '' }, // will render one input spanning terminals
  { label: 'N', h1: '', h2: '', h3: '', remark: '' }
]);

// ---------------- Component ----------------
const ExcitingCurrentMeasurementForm: React.FC<ExcitingCurrentMeasurementFormProps> = ({ initialData, onSubmit, onCancel, viewOnly }) => {
  const derivedViewOnly = viewOnly || initialData?.viewOnly;

  const [data, setData] = useState<ExcitingCurrentFormData>(() => {
    // Attempt to map legacy initialData if provided
    if (initialData && initialData.hvWdgPositions) {
      const mappedRows: HVBigRow[] = HV_BIG_TAPS.map(tap => {
        const found = initialData.hvWdgPositions.find((r: any) => r.position === tap);
        return { tap, h1: found?.hh0hh1 || '', h2: found?.h2h0h2h3 || '', h3: found?.h3h0h3h1 || '', remark: found?.remark || '' };
      });
      return {
        general: {
          transformer: initialData.transformer,
          inspector: initialData.inspector,
          testType: initialData.testType,
          inspectionDate: initialData.inspectionDate ? (typeof initialData.inspectionDate === 'string' ? initialData.inspectionDate : initialData.inspectionDate.toISOString().split('T')[0]) : '',
          workOrderNo: initialData.workOrderNo,
          oilTemp: initialData.oilTemp,
          ambientTemp: initialData.ambientTemp,
          wdgTemp: initialData.wdgTemp,
          humidity: initialData.humidity,
          weather: initialData.weather,
        },
        lv: buildSmallBlock(),
        tv: buildSmallBlock(),
        hv: buildSmallBlock(),
        hvTableAcVolt: '',
        hvTable: mappedRows
      };
    }
    return {
      general: {},
      lv: buildSmallBlock(),
      tv: buildSmallBlock(),
      hv: buildSmallBlock(),
      hvTableAcVolt: '',
      hvTable: HV_BIG_TAPS.map(tap => ({ tap }))
    };
  });

  // Handlers
  const updateGeneral = (field: keyof GeneralInfoEC, value: string) => setData(p => ({ ...p, general: { ...p.general, [field]: value } }));
  const updateSmallBlock = (block: 'lv' | 'tv' | 'hv', rowIndex: number, field: keyof SmallBlockRow, value: string) => {
    setData(p => ({ ...p, [block]: p[block].map((r,i)=> i===rowIndex ? { ...r, [field]: value } : r ) }));
  };
  const updateHVBig = (idx: number, field: keyof HVBigRow, value: string) => setData(p => ({ ...p, hvTable: p.hvTable.map((r,i)=> i===idx? { ...r, [field]: value }: r ) }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submission = {
      ...data.general,
      hvTableAcVolt: data.hvTableAcVolt,
      hvBig: data.hvTable,
      blocks: { lv: data.lv, tv: data.tv, hv: data.hv }
    };
    onSubmit(submission);
  };

  const disabled = !!derivedViewOnly;

  const inputBase = "w-full border rounded px-3 py-2 transition disabled:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 text-sm";
  const numInput = inputBase + " text-right tabular-nums";
  const textInput = inputBase;
  const smallNum = "w-full border rounded px-2 py-1.5 h-9 text-sm text-right tabular-nums focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:bg-muted bg-background/70";
  const smallRemark = "w-full border rounded px-2 py-1.5 h-9 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:bg-muted bg-background/70";

  // Combined multi-section table (LV / TV / HV) matching provided screenshot
  const renderCombinedBlocks = () => {
    const sections: { key: 'lv'|'tv'|'hv'; title: string; voltageUnit: string; terminals: string[] }[] = [
      { key: 'lv', title: 'LV WDG.', voltageUnit: 'VOLT', terminals: LV_TERMINALS },
      { key: 'tv', title: 'TV WDG.', voltageUnit: 'VOLT', terminals: TV_TERMINALS },
      { key: 'hv', title: 'HV WDG.', voltageUnit: 'kV', terminals: HV_TERMINALS },
    ];
    return (
      <div className="rounded-xl border bg-background/70 backdrop-blur p-0 shadow-sm ring-1 ring-border/50 overflow-hidden">
        <table className="w-full text-[11px] md:text-[12px] border-collapse">
          <tbody>
            {sections.map((s, si) => {
              const rows = data[s.key];
              const remarkValue = rows[0].remark || rows[1].remark || '';
              return (
                <React.Fragment key={s.key}>
                  <tr className="bg-muted/40">
                    <td className="border px-2 py-1.5 font-medium whitespace-nowrap w-28 align-middle">{s.title}</td>
                    {s.terminals.map(t => (
                      <td key={t} className="border px-2 py-1.5 text-center font-medium whitespace-nowrap">{t}</td>
                    ))}
                    <td className="border px-2 py-1.5 font-medium text-center w-40">REMARK</td>
                  </tr>
                  {/* AC row (remark spans two rows) */}
                  <tr className="odd:bg-background even:bg-muted/20">
                    <td className="border px-2 py-1.5 font-medium space-y-1">
                      <div>AC({s.voltageUnit})</div>
                      <input
                        disabled={disabled}
                        type="number"
                        value={rows[0].acValue || ''}
                        onChange={e=>updateSmallBlock(s.key,0,'acValue',e.target.value)}
                        className={smallNum}
                        placeholder="0"
                      />
                    </td>
                    {s.terminals.map(t => (
                      <td key={t+'-label'} className="border px-2 py-1.5 text-center text-muted-foreground">AC(mA)</td>
                    ))}
                    <td className="border px-2 py-1.5" rowSpan={2}>
                      <input
                        disabled={disabled}
                        type="text"
                        value={remarkValue}
                        onChange={e=>{
                          updateSmallBlock(s.key,0,'remark',e.target.value);
                          updateSmallBlock(s.key,1,'remark',e.target.value); // keep in sync
                        }}
                        className={smallRemark + ' h-[70px]'}
                        placeholder="หมายเหตุ"
                      />
                    </td>
                  </tr>
                  {/* N row (no remark cell) */}
                  <tr className="odd:bg-background even:bg-muted/20">
                    <td className="border px-2 py-1.5 font-medium">N</td>
                    <td className="border px-2 py-1.5"><input disabled={disabled} type="number" value={rows[1].h1||''} onChange={e=>updateSmallBlock(s.key,1,'h1',e.target.value)} className={smallNum} placeholder="0" /></td>
                    <td className="border px-2 py-1.5"><input disabled={disabled} type="number" value={rows[1].h2||''} onChange={e=>updateSmallBlock(s.key,1,'h2',e.target.value)} className={smallNum} placeholder="0" /></td>
                    <td className="border px-2 py-1.5"><input disabled={disabled} type="number" value={rows[1].h3||''} onChange={e=>updateSmallBlock(s.key,1,'h3',e.target.value)} className={smallNum} placeholder="0" /></td>
                  </tr>
                  {si < sections.length -1 && (
                    <tr className="h-2"><td colSpan={s.terminals.length + 2} className="bg-muted/10 p-0" /></tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        {/* Left Panel */}
        <div className="xl:col-span-2 space-y-8">
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
              <div className="mt-4 text-[11px] text-muted-foreground leading-relaxed">หมายเหตุ: ฟอร์มนี้ใช้กรอกข้อมูลการทดสอบ Exciting Current</div>
            </div>

          {/* Combined LV / TV / HV table */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground pl-1"><span className="h-1.5 w-1.5 rounded-sm bg-primary"/>LV / TV / HV WDG.</div>
            {renderCombinedBlocks()}
          </div>
        </div>

        {/* Right Panel - Big HV WDG Table */}
        <div className="xl:col-span-3">
          <div className="rounded-xl border bg-gradient-to-b from-background/70 to-background/40 backdrop-blur p-5 shadow-sm h-full flex flex-col ring-1 ring-border/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold tracking-wide flex items-center gap-2 text-transformer-dark"><span className="h-2 w-2 rounded-full bg-primary"/>HV WDG. (TAPS)</h3>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground">AC(VOLT)</span>
                <input disabled={disabled} type="number" value={data.hvTableAcVolt||''} onChange={e=>setData(p=>({...p,hvTableAcVolt:e.target.value}))} className="w-32 border rounded px-2 py-1.5 h-9 text-right tabular-nums focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:bg-muted bg-background/70" placeholder="0" />
              </div>
            </div>
            <div className="overflow-auto -mx-5 -mb-5 px-5 pb-5 border-t pt-2 max-h-[72vh] relative">
              <table className="w-full text-[11px] border-separate border-spacing-0">
                <thead className="sticky top-0 bg-muted/80 backdrop-blur z-20 shadow">
                  <tr>
                    <th className="border px-3 py-1.5 sticky left-0 z-30 bg-muted/80">TAP</th>
                    <th className="border px-3 py-1.5">AC(mA) H1H0/H1H2</th>
                    <th className="border px-3 py-1.5">AC(mA) H2H0/H2H3</th>
                    <th className="border px-3 py-1.5">AC(mA) H3H0/H3H1</th>
                    <th className="border px-3 py-1.5">REMARK</th>
                  </tr>
                </thead>
                <tbody className="[&>tr:hover]:bg-primary/5">
                  {data.hvTable.map((row,idx)=>(
                    <tr key={row.tap} className="odd:bg-background even:bg-muted/10">
                      <td className="border px-3 py-1.5 font-medium sticky left-0 bg-background/90 backdrop-blur z-10">{row.tap}</td>
                      <td className="border px-2 py-1.5"><input disabled={disabled} type="number" value={row.h1||''} onChange={e=>updateHVBig(idx,'h1',e.target.value)} className="w-24 border rounded px-2 py-1.5 h-9 text-right tabular-nums focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:bg-muted bg-background/70" /></td>
                      <td className="border px-2 py-1.5"><input disabled={disabled} type="number" value={row.h2||''} onChange={e=>updateHVBig(idx,'h2',e.target.value)} className="w-24 border rounded px-2 py-1.5 h-9 text-right tabular-nums focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:bg-muted bg-background/70" /></td>
                      <td className="border px-2 py-1.5"><input disabled={disabled} type="number" value={row.h3||''} onChange={e=>updateHVBig(idx,'h3',e.target.value)} className="w-24 border rounded px-2 py-1.5 h-9 text-right tabular-nums focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:bg-muted bg-background/70" /></td>
                      <td className="border px-2 py-1.5"><input disabled={disabled} type="text" value={row.remark||''} onChange={e=>updateHVBig(idx,'remark',e.target.value)} className="w-40 border rounded px-2 py-1.5 h-9 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:bg-muted bg-background/70" placeholder="หมายเหตุ" /></td>
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
        {!disabled && <Button type="submit" className="min-w-[140px] shadow-sm">บันทึก</Button>}
      </div>
    </form>
  );
};

export default ExcitingCurrentMeasurementForm;