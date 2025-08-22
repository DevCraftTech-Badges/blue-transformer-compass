import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface OilAgingFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const OilAgingForm: React.FC<OilAgingFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    transformer: initialData?.transformer || '',
    testType: initialData?.testType || '',
    inspector: initialData?.inspector || '',
    nn: initialData?.nn || '',
    egatSN: initialData?.egatSN || initialData?.egatSn || '',
    date: initialData?.inspectionDate || initialData?.date || '',
    ift: initialData?.ift || '',
    pf100: initialData?.pf100 || '',
  });
  const viewOnly = initialData?.viewOnly;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewOnly) onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">หม้อแปลงไฟฟ้า</label>
            <select
              name="transformer"
              value={form.transformer}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
              disabled={viewOnly}
            >
              <option value="">เลือกหม้อแปลงไฟฟ้า</option>
              <option value="T1">T1</option>
              <option value="T2">T2</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">รูปแบบการทดสอบ</label>
            <select
              name="testType"
              value={form.testType}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
              disabled={viewOnly}
            >
              <option value="">เลือกรูปแบบการทดสอบ</option>
              <option value="type1">Type 1</option>
              <option value="type2">Type 2</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">ผู้ตรวจสอบ</label>
            <Input
              type="text"
              name="inspector"
              value={form.inspector}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
              disabled={viewOnly}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">NN</label>
            <Input
              type="text"
              name="nn"
              value={form.nn}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={viewOnly}
            />
          </div>
        </div>
        {/* Right column */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">EGAT S/N</label>
            <Input
              type="text"
              name="egatSN"
              value={form.egatSN}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={viewOnly}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">วันที่ตรวจสอบ</label>
            <Input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
              disabled={viewOnly}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">IFT</label>
            <Input
              type="text"
              name="ift"
              value={form.ift}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={viewOnly}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">PF100</label>
            <Input
              type="text"
              name="pf100"
              value={form.pf100}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={viewOnly}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-8">
        <Button type="button" variant="outline" onClick={onCancel}>
          {viewOnly ? 'ปิด' : 'ยกเลิก'}
        </Button>
        {!viewOnly && (
          <Button type="submit" className="bg-sky-500 text-white hover:bg-sky-600">
            บันทึก
          </Button>
        )}
      </div>
    </form>
  );
};

export default OilAgingForm;
