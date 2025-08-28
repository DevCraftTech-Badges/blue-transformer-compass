import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Types
interface GeneralInfo {
  transformer: string;
  testType: string;
  workOrderNo: string;
  inspector: string;
  inspectionDate: string; // yyyy-mm-dd
  oilTemp?: string;
  ambientTemp?: string;
  wdgTemp?: string;
  humidity?: string;
  weather: string;
}

type VA = { V: string; A: string };

interface BlockInputs {
  tap: string;
  mode: "Commissioning" | "First Test";
  cols: [VA, VA, VA];
  taps?: [string, string, string]; // per-column tap field shown in the table row
  tapExtra?: string; // input next to the TAP label (left cell)
}

const tapOptions = Array.from({ length: 33 }, (_, i) => `${i + 1}`);

const parseNum = (v: string) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
};

const calcZ = (v: string, a: string): number => {
  const V = parseNum(v);
  const A = parseNum(a);
  if (!Number.isFinite(V) || !Number.isFinite(A) || A === 0) return 0;
  return V / A;
};

function useBlockComputed(block: BlockInputs) {
  return useMemo(() => {
    const Zs = block.cols.map((c) => calcZ(c.V, c.A));
    const valid = Zs.filter((z) => z > 0);
    const avg = valid.length ? valid.reduce((s, z) => s + z, 0) / valid.length : 0;
  const deviations = avg > 0 ? Zs.map((z) => ((z - avg) / avg) * 100) : [0, 0, 0];
  const deviationsAbs = deviations.map((d) => Math.abs(d));
  const maxAbsDeviation = deviationsAbs.reduce((m, d) => Math.max(m, d), 0);
  return { Zs, avg, deviationsAbs, maxAbsDeviation };
  }, [block.cols]);
}

const TapAndMode: React.FC<{
  tapLabel: string;
  state: BlockInputs;
  onChange: (next: BlockInputs) => void;
}> = ({ tapLabel, state, onChange }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
    <div className="flex flex-col">
      <label className="text-sm text-slate-700 mb-1">{tapLabel}</label>
      <Select value={state.tap} onValueChange={(v) => onChange({ ...state, tap: v })}>
        <SelectTrigger className="h-9">
          <SelectValue placeholder="เลือก Tap" />
        </SelectTrigger>
        <SelectContent>
          {tapOptions.map((t) => (
            <SelectItem key={t} value={t}>
              {t}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    <div className="flex flex-col md:col-span-2">
      <label className="text-sm text-slate-700 mb-1">COMMISSIONING OR FIRST TEST</label>
      <Select value={state.mode} onValueChange={(v) => onChange({ ...state, mode: v as BlockInputs["mode"] })}>
        <SelectTrigger className="h-9">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Commissioning">Commissioning</SelectItem>
          <SelectItem value="First Test">First Test</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
);

const BlockCard: React.FC<{
  title: string;
  tapLabel: string;
  columns: { terminal: string; short?: string }[];
  state: BlockInputs;
  onChange: (next: BlockInputs) => void;
}> = ({ title, tapLabel, columns, state, onChange }) => {
  const { Zs, maxAbsDeviation } = useBlockComputed(state);

  const updateCol = (idx: number, field: keyof VA, value: string) => {
    const cols = state.cols.map((c, i) => (i === idx ? { ...c, [field]: value } : c)) as [VA, VA, VA];
    onChange({ ...state, cols });
  };

  return (
    <div className="rounded-md border bg-white shadow-sm">
      <div className="px-4 py-3 border-b bg-slate-50 font-semibold">{title}</div>
      <div className="p-4 space-y-3">
        <TapAndMode tapLabel={tapLabel} state={state} onChange={onChange} />

        <div className="overflow-x-auto">
          <table className="w-full text-sm border">
            <thead>
              <tr className="bg-slate-100 text-slate-700">
                {columns.map((c, i) => (
                  <th key={i} className="px-3 py-2 border text-left align-top">
                    <div className="font-medium">Terminal: {c.terminal}</div>
                    {c.short && (
                      <div className="text-xs text-slate-600">WDH.SHORT: {c.short}</div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {state.cols.map((_, i) => (
                  <td key={`v-${i}`} className="px-3 py-2 border">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">(V)</span>
                      <Input
                        inputMode="decimal"
                        type="number"
                        value={state.cols[i].V}
                        onChange={(e) => updateCol(i, "V", e.target.value)}
                        className="h-8"
                      />
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                {state.cols.map((_, i) => (
                  <td key={`a-${i}`} className="px-3 py-2 border">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">(A)</span>
                      <Input
                        inputMode="decimal"
                        type="number"
                        value={state.cols[i].A}
                        onChange={(e) => updateCol(i, "A", e.target.value)}
                        className="h-8"
                      />
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="bg-slate-50">
                {Zs.map((z, i) => (
                  <td key={`z-${i}`} className="px-3 py-2 border text-slate-700">
                    <div className="text-xs text-slate-500">Z (calc)</div>
                    <div className="font-medium">{z.toFixed(3)}</div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="text-right text-sm text-slate-700">
          <span className="text-slate-500 mr-2">%DEVIATION:</span>
          <span className="font-semibold">{maxAbsDeviation.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
};

// H-L block layout matching the screenshot: left label column and grouped controls per column
const HLBlock: React.FC<{
  title: string;
  rowTapLabel: string; // e.g., "Min Tap:" | "N Tap:" | "Max Tap:"
  columns: { terminal: string; short?: string }[];
  state: BlockInputs;
  onChange: (next: BlockInputs) => void;
}> = ({ title, rowTapLabel, columns, state, onChange }) => {
  const { Zs, deviationsAbs, maxAbsDeviation } = useBlockComputed(state);

  const updateCol = (idx: number, field: keyof VA, value: string) => {
    const cols = state.cols.map((c, i) => (i === idx ? { ...c, [field]: value } : c)) as [VA, VA, VA];
    onChange({ ...state, cols });
  };
  const updateTapPerCol = (idx: number, value: string) => {
    const taps = (state.taps ?? ["", "", ""]).map((t, i) => (i === idx ? value : t)) as [string, string, string];
    onChange({ ...state, taps });
  };

  return (
    <div className="rounded-md border bg-white shadow-sm">
      <div className="px-4 py-3 border-b bg-slate-50 font-semibold">{title}</div>
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border">
            <thead>
      <tr className="bg-slate-100 text-slate-700">
                <th className="w-40 px-3 py-2 border text-left align-top">&nbsp;</th>
                {columns.map((c, i) => (
                  <th key={i} className="px-3 py-2 border text-left align-top">
        <div className="font-medium">WDG.ENERGIZE: {c.terminal}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Row: Min/N/Max Tap selector (overall) */}
              <tr>
                <td className="px-3 py-2 border text-slate-700">
                  <div className="flex items-center gap-3 whitespace-nowrap">
                    <span>{rowTapLabel}</span>
                    <div className="min-w-[160px]">
                      <Select value={state.tap} onValueChange={(v) => onChange({ ...state, tap: v })}>
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="เลือก Tap" />
                        </SelectTrigger>
                        <SelectContent>
                          {tapOptions.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </td>
                {columns.map((c, idx) => (
                  <td key={`short-${idx}`} className="px-3 py-2 border align-middle">
                    {c.short && (
                      <div className="text-xs text-slate-600">WDH.SHORT: {c.short}</div>
                    )}
                  </td>
                ))}
              </tr>

              {/* Row: WDG. (V/A/Z per column) */}
              <tr>
                <td className="px-3 py-2 border text-slate-700 align-top">WDG.</td>
                {state.cols.map((col, i) => (
                  <td key={`wdg-${i}`} className="px-3 py-2 border">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">(V.)</span>
                        <Input
                          inputMode="decimal"
                          type="number"
                          value={col.V}
                          onChange={(e) => updateCol(i, "V", e.target.value)}
                          className="h-8"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">(A.)</span>
                        <Input
                          inputMode="decimal"
                          type="number"
                          value={col.A}
                          onChange={(e) => updateCol(i, "A", e.target.value)}
                          className="h-8"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">Z</span>
                        <div className="text-slate-700 font-medium">{Zs[i].toFixed(1)}</div>
                      </div>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Row: TAP (left input + per column) */}
              <tr>
                <td className="px-3 py-2 border text-slate-700">
                  <div className="flex items-center gap-2">
                    <span>TAP</span>
                    <Input
                      value={state.tapExtra ?? ""}
                      onChange={(e) => onChange({ ...state, tapExtra: e.target.value })}
                      className="h-8 w-24"
                    />
                  </div>
                </td>
                {(state.taps ?? ["", "", ""]).map((t, i) => (
                  <td key={`tapcol-${i}`} className="px-3 py-2 border">
                    <Input
                      value={t}
                      onChange={(e) => updateTapPerCol(i, e.target.value)}
                      className="h-8"
                    />
                  </td>
                ))}
              </tr>

              {/* Row: Commissioning/First Test */}
              <tr>
                <td className="px-3 py-2 border text-slate-700 align-middle">
                  COMMISSIONING OR FIRST TEST:
                </td>
                <td className="px-3 py-2 border" colSpan={2}>
                  <Select value={state.mode} onValueChange={(v) => onChange({ ...state, mode: v as BlockInputs["mode"] })}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Commissioning">COMMISSIONING</SelectItem>
                      <SelectItem value="First Test">FIRST TEST</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-3 py-2 border"></td>
              </tr>

              {/* Row: %DEVIATION (per column) */}
              <tr>
                <td className="px-3 py-2 border text-slate-700">%DEVIATION</td>
                {deviationsAbs.map((d, i) => (
                  <td key={`dev-${i}`} className="px-3 py-2 border text-slate-700">{d.toFixed(1)}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

type SavePayload = {
  general: GeneralInfo;
  blocks: {
    b21: BlockInputs;
    b22: BlockInputs;
    b23: BlockInputs;
    b24: BlockInputs;
    b25: BlockInputs;
  };
};

const SPIForm: React.FC<{ onSave?: (data: SavePayload) => void; onCancel?: () => void }> = ({ onSave, onCancel }) => {
  const [general, setGeneral] = useState<GeneralInfo>({
    transformer: "",
    testType: "",
    workOrderNo: "",
    inspector: "",
    inspectionDate: "",
    oilTemp: "",
    ambientTemp: "",
    wdgTemp: "",
    humidity: "",
    weather: "",
  });

  const makeBlock = (): BlockInputs => ({
    tap: "",
    mode: "Commissioning",
    cols: [
      { V: "", A: "" },
      { V: "", A: "" },
      { V: "", A: "" },
    ],
  taps: ["", "", ""],
  tapExtra: "",
  });

  const [b21, setB21] = useState<BlockInputs>(makeBlock());
  const [b22, setB22] = useState<BlockInputs>(makeBlock());
  const [b23, setB23] = useState<BlockInputs>(makeBlock());
  const [b24, setB24] = useState<BlockInputs>(makeBlock());
  const [b25, setB25] = useState<BlockInputs>(makeBlock());

  const handleCancel = () => {
    setGeneral({
      transformer: "",
      testType: "",
      workOrderNo: "",
      inspector: "",
      inspectionDate: "",
      oilTemp: "",
      ambientTemp: "",
      wdgTemp: "",
      humidity: "",
      weather: "",
    });
    setB21(makeBlock());
    setB22(makeBlock());
    setB23(makeBlock());
    setB24(makeBlock());
    setB25(makeBlock());
    onCancel?.();
  };

  const handleSave = () => {
    const payload: SavePayload = {
      general,
      blocks: { b21, b22, b23, b24, b25 },
    };
    onSave?.(payload);
  };

  const handleCalculate = () => {
    console.log("CALC");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left panel */}
      <section className="lg:col-span-5 xl:col-span-4">
        <div className="rounded-md border bg-white shadow-sm">
          <div className="px-4 py-3 border-b bg-slate-50 font-semibold">ข้อมูลทั่วไป</div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm text-slate-700 mb-1">หม้อแปลงไฟฟ้า</label>
              <Select value={general.transformer} onValueChange={(v) => setGeneral({ ...general, transformer: v })}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="เลือกหม้อแปลง" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TR-001">TR-001</SelectItem>
                  <SelectItem value="TR-002">TR-002</SelectItem>
                  <SelectItem value="TR-003">TR-003</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-slate-700 mb-1">รูปแบบการทดสอบ</label>
              <Select value={general.testType} onValueChange={(v) => setGeneral({ ...general, testType: v })}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="เลือก" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Standard Test">Standard Test</SelectItem>
                  <SelectItem value="Routine Test">Routine Test</SelectItem>
                  <SelectItem value="Emergency Test">Emergency Test</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-slate-700 mb-1">เลขที่คำสั่งปฏิบัติงาน</label>
              <Select value={general.workOrderNo} onValueChange={(v) => setGeneral({ ...general, workOrderNo: v })}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="เลือก" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WO-001">WO-001</SelectItem>
                  <SelectItem value="WO-002">WO-002</SelectItem>
                  <SelectItem value="WO-003">WO-003</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-slate-700 mb-1">ผู้ตรวจสอบ</label>
              <Input value={general.inspector} onChange={(e) => setGeneral({ ...general, inspector: e.target.value })} />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-slate-700 mb-1">วันที่ตรวจสอบ</label>
              <Input type="date" value={general.inspectionDate} onChange={(e) => setGeneral({ ...general, inspectionDate: e.target.value })} />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-slate-700 mb-1">Oil Temp. (°C)</label>
              <Input type="number" value={general.oilTemp} onChange={(e) => setGeneral({ ...general, oilTemp: e.target.value })} />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-slate-700 mb-1">Ambient Temp. (°C)</label>
              <Input type="number" value={general.ambientTemp} onChange={(e) => setGeneral({ ...general, ambientTemp: e.target.value })} />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-slate-700 mb-1">Wdg Temp. (°C)</label>
              <Input type="number" value={general.wdgTemp} onChange={(e) => setGeneral({ ...general, wdgTemp: e.target.value })} />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-slate-700 mb-1">Humidity (%)</label>
              <Input type="number" value={general.humidity} onChange={(e) => setGeneral({ ...general, humidity: e.target.value })} />
            </div>
            <div className="flex flex-col sm:col-span-2">
              <label className="text-sm text-slate-700 mb-1">Weather</label>
              <Input value={general.weather} onChange={(e) => setGeneral({ ...general, weather: e.target.value })} />
            </div>
          </div>
          <div className="px-4 py-3 border-t flex gap-2">
            <Button variant="outline" onClick={handleCancel}>ยกเลิก</Button>
            <Button onClick={handleSave}>บันทึก</Button>
            <Button variant="secondary" onClick={handleCalculate}>คำนวณ</Button>
          </div>
        </div>
      </section>

      {/* Right panel */}
      <section className="lg:col-span-7 xl:col-span-8 space-y-6">
        <HLBlock
          title="BETWEEN ENERGIZE: (H-L)"
          rowTapLabel="Min Tap:"
          columns={[
            { terminal: "H1H0/H1H2", short: "X1X0/X1X2" },
            { terminal: "H2H0/H2H3", short: "X2X0/X2X3" },
            { terminal: "H3H0/H3H1", short: "X3X0/X3X1" },
          ]}
          state={b21}
          onChange={setB21}
        />

        <HLBlock
          title="BETWEEN ENERGIZE: (H-L)"
          rowTapLabel="N Tap:"
          columns={[
            { terminal: "H1H0/H1H2", short: "X1X0/X1X2" },
            { terminal: "H2H0/H2H3", short: "X2X0/X2X3" },
            { terminal: "H3H0/H3H1", short: "X3X0/X3X1" },
          ]}
          state={b22}
          onChange={setB22}
        />

        <HLBlock
          title="BETWEEN ENERGIZE: (H-L)"
          rowTapLabel="Max Tap:"
          columns={[
            { terminal: "H1H0/H1H2", short: "X1X0/X1X2" },
            { terminal: "H2H0/H2H3", short: "X2X0/X2X3" },
            { terminal: "H3H0/H3H1", short: "X3X0/X3X1" },
          ]}
          state={b23}
          onChange={setB23}
        />

        <BlockCard
          title="BETWEEN ENERGIZE: (H-T) – N Tap"
          tapLabel="N Tap"
          columns={[
            { terminal: "H1H2", short: "Y1Y2" },
            { terminal: "H2H3", short: "Y2Y3" },
            { terminal: "H3H1", short: "Y3Y1" },
          ]}
          state={b24}
          onChange={setB24}
        />

        <BlockCard
          title="BETWEEN ENERGIZE: (L-T) – N Tap"
          tapLabel="N Tap"
          columns={[
            { terminal: "X1X0", short: "Y1Y2" },
            { terminal: "X2X0", short: "Y2Y3" },
            { terminal: "X3X0", short: "Y3Y1" },
          ]}
          state={b25}
          onChange={setB25}
        />
      </section>
    </div>
  );
};

export default SPIForm;
