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

type VA = { V: string; A: string };

interface GeneralInfo {
  transformer: string;
  testType: string;
  workOrderNo: string;
  inspector: string;
  inspectionDate: string;
  oilTemp?: string;
  ambientTemp?: string;
  wdgTemp?: string;
  humidity?: string;
  weather: string;
  baseHL?: string;
  baseHT?: string;
  baseLT?: string;
}

interface ColumnState {
  va: VA;
  z?: number; // derived
  kvTap?: string; // number string
  impFrom?: string; // select value
  impMeasurement?: string; // number string
}

type Mode = "Commissioning" | "First Test";

interface BlockState {
  overallTap: string; // Min/N/Max or N
  mode: Mode;
  cols: [ColumnState, ColumnState, ColumnState];
}

const TAP_OPTIONS = Array.from({ length: 33 }, (_, i) => `${i + 1}`);
const IMP_FROM_OPTIONS = ["MANUFACTURE", "SPEC", "HISTORY"];

const calcZ = (v: string, a: string) => {
  const V = Number(v);
  const A = Number(a);
  if (!Number.isFinite(V) || !Number.isFinite(A) || A === 0) return 0;
  return V / A;
};

function useBlockComputations(block: BlockState) {
  return useMemo(() => {
    const Zs = block.cols.map((c) => calcZ(c.va.V, c.va.A));
    const colsWithZ = block.cols.map((c, i) => ({ ...c, z: Zs[i] }));
  // Placeholder: %ERROR requires a numeric reference value. Until provided, show 0.0.
  const errors = colsWithZ.map(() => 0);
    return { Zs, errors };
  }, [block.cols]);
}

const BlockTable: React.FC<{
  title: string;
  tapLabel: string; // e.g., Min Tap / N Tap / Max Tap
  columns: { energize: string; short?: string }[];
  state: BlockState;
  onChange: (next: BlockState) => void;
}> = ({ title, tapLabel, columns, state, onChange }) => {
  const { Zs, errors } = useBlockComputations(state);

  const updateCol = (idx: number, updater: (c: ColumnState) => ColumnState) => {
    const cols = state.cols.map((c, i) => (i === idx ? updater(c) : c)) as [
      ColumnState,
      ColumnState,
      ColumnState
    ];
    onChange({ ...state, cols });
  };

  return (
    <div className="rounded-md border bg-white shadow-sm">
      <div className="px-4 py-3 border-b bg-slate-50 font-semibold">{title}</div>
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border">
            <thead>
              <tr className="bg-slate-100 text-slate-700">
                <th className="w-48 px-3 py-2 border text-left align-top">&nbsp;</th>
                {columns.map((c, i) => (
                  <th key={i} className="px-3 py-2 border text-left align-top">
                    <div className="font-medium">WDG.ENERGIZE: {c.energize}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Row: Tap selector on the left, WDH.SHORT cells on right */}
              <tr>
                <td className="px-3 py-2 border text-slate-700">
                  <div className="flex items-center gap-3 whitespace-nowrap">
                    <span>{tapLabel}</span>
                    <div className="min-w-[160px]">
                      <Select
                        value={state.overallTap}
                        onValueChange={(v) => onChange({ ...state, overallTap: v })}
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="เลือก Tap" />
                        </SelectTrigger>
                        <SelectContent>
                          {TAP_OPTIONS.map((t) => (
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

              {/* Row: (V.), (A.), Z per column */}
              <tr>
                <td className="px-3 py-2 border text-slate-700 align-top">WDG.</td>
                {state.cols.map((c, i) => (
                  <td key={`wdg-${i}`} className="px-3 py-2 border">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">(V.)</span>
                        <Input
                          inputMode="decimal"
                          type="number"
                          value={c.va.V}
                          onChange={(e) =>
                            updateCol(i, (prev) => ({ ...prev, va: { ...prev.va, V: e.target.value } }))
                          }
                          className="h-8"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">(A.)</span>
                        <Input
                          inputMode="decimal"
                          type="number"
                          value={c.va.A}
                          onChange={(e) =>
                            updateCol(i, (prev) => ({ ...prev, va: { ...prev.va, A: e.target.value } }))
                          }
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

              {/* Row: kV TAP / TAP (number) */}
              <tr>
                <td className="px-3 py-2 border text-slate-700">kV TAP</td>
                {state.cols.map((c, i) => (
                  <td key={`kv-${i}`} className="px-3 py-2 border">
                    <Input
                      inputMode="decimal"
                      type="number"
                      value={c.kvTap ?? ""}
                      onChange={(e) => updateCol(i, (prev) => ({ ...prev, kvTap: e.target.value }))}
                      className="h-8"
                    />
                  </td>
                ))}
              </tr>

              {/* Row: %IMPEDANCE FROM (select) */}
              <tr>
                <td className="px-3 py-2 border text-slate-700">%IMPEDANCE FROM</td>
                {state.cols.map((c, i) => (
                  <td key={`from-${i}`} className="px-3 py-2 border">
                    <Select
                      value={c.impFrom ?? ""}
                      onValueChange={(v) => updateCol(i, (prev) => ({ ...prev, impFrom: v }))}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="เลือก" />
                      </SelectTrigger>
                      <SelectContent>
                        {IMP_FROM_OPTIONS.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                ))}
              </tr>

              {/* Row: %IMPEDANCE MEASUREMENT (number) */}
              <tr>
                <td className="px-3 py-2 border text-slate-700">%IMPEDANCE MEASUREMENT</td>
                {state.cols.map((c, i) => (
                  <td key={`meas-${i}`} className="px-3 py-2 border">
                    <Input
                      inputMode="decimal"
                      type="number"
                      value={c.impMeasurement ?? ""}
                      onChange={(e) => updateCol(i, (prev) => ({ ...prev, impMeasurement: e.target.value }))}
                      className="h-8"
                    />
                  </td>
                ))}
              </tr>

              {/* Row: %ERROR (read-only) */}
              <tr>
                <td className="px-3 py-2 border text-slate-700">%ERROR</td>
                {errors.map((err, i) => (
                  <td key={`err-${i}`} className="px-3 py-2 border text-slate-700">{err.toFixed(1)}</td>
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
    hlMin: BlockState;
    hlN: BlockState;
    hlMax: BlockState;
    htN: BlockState;
    ltN: BlockState;
  };
};

const TPIMForm: React.FC<{ onSave?: (data: SavePayload) => void; onCancel?: () => void }> = ({ onSave, onCancel }) => {
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
    baseHL: "",
    baseHT: "",
    baseLT: "",
  });

  const makeBlock = (): BlockState => ({
    overallTap: "",
    mode: "Commissioning",
    cols: [
      { va: { V: "", A: "" }, kvTap: "", impFrom: "", impMeasurement: "" },
      { va: { V: "", A: "" }, kvTap: "", impFrom: "", impMeasurement: "" },
      { va: { V: "", A: "" }, kvTap: "", impFrom: "", impMeasurement: "" },
    ],
  });

  const [hlMin, setHlMin] = useState<BlockState>(makeBlock());
  const [hlN, setHlN] = useState<BlockState>(makeBlock());
  const [hlMax, setHlMax] = useState<BlockState>(makeBlock());
  const [htN, setHtN] = useState<BlockState>(makeBlock());
  const [ltN, setLtN] = useState<BlockState>(makeBlock());

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
      baseHL: "",
      baseHT: "",
      baseLT: "",
    });
    setHlMin(makeBlock());
    setHlN(makeBlock());
    setHlMax(makeBlock());
    setHtN(makeBlock());
    setLtN(makeBlock());
    onCancel?.();
  };

  const handleSave = () => {
    onSave?.({
      general,
      blocks: { hlMin, hlN, hlMax, htN, ltN },
    });
  };

  const connectorHL = [
    { energize: "H1H0/H1H2", short: "X1X0/X1X2" },
    { energize: "H2H0/H2H3", short: "X2X0/X2X3" },
    { energize: "H3H0/H3H1", short: "X3X0/X3X1" },
  ];
  const connectorHT = [
    { energize: "H1H2", short: "Y1Y2" },
    { energize: "H2H3", short: "Y2Y3" },
    { energize: "H3H1", short: "Y3Y1" },
  ];
  const connectorLT = [
    { energize: "X1X0", short: "Y1Y2" },
    { energize: "X2X0", short: "Y2Y3" },
    { energize: "X3X0", short: "Y3Y1" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left panel */}
      <section className="lg:col-span-5 xl:col-span-4">
        <div className="rounded-md border bg-white shadow-sm h-full flex flex-col">
          <div className="px-4 py-3 border-b bg-slate-50 font-semibold">ข้อมูลทั่วไป</div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* selects */}
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
            {/* text/number/date */}
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
            <div className="flex flex-col">
              <label className="text-sm text-slate-700 mb-1">Base kVA (H-L)</label>
              <Input type="number" value={general.baseHL} onChange={(e) => setGeneral({ ...general, baseHL: e.target.value })} />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-slate-700 mb-1">Base kVA (H-T)</label>
              <Input type="number" value={general.baseHT} onChange={(e) => setGeneral({ ...general, baseHT: e.target.value })} />
            </div>
            <div className="flex flex-col sm:col-span-2">
              <label className="text-sm text-slate-700 mb-1">Base kVA (L-T)</label>
              <Input type="number" value={general.baseLT} onChange={(e) => setGeneral({ ...general, baseLT: e.target.value })} />
            </div>
          </div>
          <div className="px-4 py-3 border-t flex gap-2 mt-auto">
            <Button variant="outline" onClick={handleCancel}>ยกเลิก</Button>
            <Button onClick={handleSave}>บันทึก</Button>
            <Button variant="secondary">คำนวณ</Button>
          </div>
        </div>
      </section>

      {/* Right panel with 5 blocks */}
      <section className="lg:col-span-7 xl:col-span-8 space-y-6">
        <BlockTable
          title="BETWEEN ENERGIZE: (H-L) – Min Tap"
          tapLabel="Min Tap"
          columns={connectorHL}
          state={hlMin}
          onChange={setHlMin}
        />
        <BlockTable
          title="BETWEEN ENERGIZE: (H-L) – N Tap"
          tapLabel="N Tap"
          columns={connectorHL}
          state={hlN}
          onChange={setHlN}
        />
        <BlockTable
          title="BETWEEN ENERGIZE: (H-L) – Max Tap"
          tapLabel="Max Tap"
          columns={connectorHL}
          state={hlMax}
          onChange={setHlMax}
        />
        <BlockTable
          title="BETWEEN ENERGIZE: (H-T) – N Tap"
          tapLabel="N Tap"
          columns={connectorHT}
          state={htN}
          onChange={setHtN}
        />
        <BlockTable
          title="BETWEEN ENERGIZE: (L-T) – N Tap"
          tapLabel="N Tap"
          columns={connectorLT}
          state={ltN}
          onChange={setLtN}
        />
      </section>
    </div>
  );
};

export default TPIMForm;
