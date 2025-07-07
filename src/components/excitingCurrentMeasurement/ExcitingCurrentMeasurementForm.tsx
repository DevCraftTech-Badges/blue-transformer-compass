import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import GeneralInformationSection from './GeneralInformationSection';
import MeasurementTablesSection from './MeasurementTablesSection';
import PositionTableSection from './PositionTableSection';

interface ExcitingCurrentMeasurementFormData {
  transformer?: string;
  testType?: string;
  inspector?: string;
  workOrderNo?: string;
  inspectionDate?: Date;
  oilTemp?: string;
  ambientTemp?: string;
  wdgTemp?: string;
  humidity?: string;
  weather?: string;
  remark?: string;
  // LV WDG measurements
  lvWdg?: {
    terminal: string;
    acVolt?: string;
    acMa?: string;
    n?: string;
    remark?: string;
  }[];
  // TV WDG measurements  
  tvWdg?: {
    terminal: string;
    acVolt?: string;
    acMa?: string;
    n?: string;
    remark?: string;
  }[];
  // HV WDG measurements
  hvWdg?: {
    terminal: string;
    acVolt?: string;
    acMa?: string;
    n?: string;
    remark?: string;
  }[];
  // HV WDG Position measurements (12R to 12L)
  hvWdgPositions?: {
    position: string;
    acVolt?: string;
    hh0hh1?: string;
    h2h0h2h3?: string;
    h3h0h3h1?: string;
    remark?: string;
  }[];
}

interface ExcitingCurrentMeasurementFormProps {
  initialData?: ExcitingCurrentMeasurementFormData;
  onSubmit: (data: ExcitingCurrentMeasurementFormData) => void;
  onCancel: () => void;
}

const ExcitingCurrentMeasurementForm: React.FC<ExcitingCurrentMeasurementFormProps> = ({
  initialData,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<ExcitingCurrentMeasurementFormData>(
    initialData || {
      lvWdg: [
        { terminal: 'X1X0/X1X2', acVolt: '', acMa: '', n: '', remark: '' },
        { terminal: 'X2X0/X2X3', acVolt: '', acMa: '', n: '', remark: '' },
        { terminal: 'X3X0/X3X1', acVolt: '', acMa: '', n: '', remark: '' }
      ],
      tvWdg: [
        { terminal: 'Y1Y2', acVolt: '', acMa: '', n: '', remark: '' },
        { terminal: 'Y2Y3', acVolt: '', acMa: '', n: '', remark: '' },
        { terminal: 'Y3Y1', acVolt: '', acMa: '', n: '', remark: '' }
      ],
      hvWdg: [
        { terminal: 'H1H0/H1H2', acVolt: '', acMa: '', n: '', remark: '' },
        { terminal: 'H2H0/H2H3', acVolt: '', acMa: '', n: '', remark: '' },
        { terminal: 'H3H0/H3H1', acVolt: '', acMa: '', n: '', remark: '' }
      ],
      hvWdgPositions: [
        { position: '12R', acVolt: '', hh0hh1: '', h2h0h2h3: '', h3h0h3h1: '', remark: '' },
        { position: '11R', acVolt: '', hh0hh1: '', h2h0h2h3: '', h3h0h3h1: '', remark: '' },
        { position: '10R', acVolt: '', hh0hh1: '', h2h0h2h3: '', h3h0h3h1: '', remark: '' },
        { position: '9R', acVolt: '', hh0hh1: '', h2h0h2h3: '', h3h0h3h1: '', remark: '' },
        { position: '8R', acVolt: '', hh0hh1: '', h2h0h2h3: '', h3h0h3h1: '', remark: '' },
        { position: '7R', acVolt: '', hh0hh1: '', h2h0h2h3: '', h3h0h3h1: '', remark: '' },
        { position: '6R', acVolt: '', hh0hh1: '', h2h0h2h3: '', h3h0h3h1: '', remark: '' },
        { position: 'N', acVolt: '', hh0hh1: '', h2h0h2h3: '', h3h0h3h1: '', remark: '' },
        { position: '6L', acVolt: '', hh0hh1: '', h2h0h2h3: '', h3h0h3h1: '', remark: '' },
        { position: '7L', acVolt: '', hh0hh1: '', h2h0h2h3: '', h3h0h3h1: '', remark: '' },
        { position: '8L', acVolt: '', hh0hh1: '', h2h0h2h3: '', h3h0h3h1: '', remark: '' },
        { position: '9L', acVolt: '', hh0hh1: '', h2h0h2h3: '', h3h0h3h1: '', remark: '' },
        { position: '10L', acVolt: '', hh0hh1: '', h2h0h2h3: '', h3h0h3h1: '', remark: '' },
        { position: '11L', acVolt: '', hh0hh1: '', h2h0h2h3: '', h3h0h3h1: '', remark: '' },
        { position: '12L', acVolt: '', hh0hh1: '', h2h0h2h3: '', h3h0h3h1: '', remark: '' },
      ]
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof ExcitingCurrentMeasurementFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateTableData = (
    tableType: 'lvWdg' | 'tvWdg' | 'hvWdg' | 'hvWdgPositions',
    index: number,
    field: string,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [tableType]: prev[tableType]?.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto">
      {/* General Information */}
      <GeneralInformationSection formData={formData} onInputChange={handleInputChange} />

      {/* Two Column Layout for Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - LV, TV, HV Tables */}
        <div className="lg:col-span-2">
          <MeasurementTablesSection
            lvWdg={formData.lvWdg}
            tvWdg={formData.tvWdg}
            hvWdg={formData.hvWdg}
            onUpdateTableData={updateTableData}
          />
        </div>

        {/* Right Column - HV WDG Position Table */}
        <div>
          <PositionTableSection
            hvWdgPositions={formData.hvWdgPositions}
            onUpdateTableData={updateTableData}
          />
        </div>
      </div>


      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          ยกเลิก
        </Button>
        <Button type="submit">
          บันทึก
        </Button>
      </div>
    </form>
  );
};

export default ExcitingCurrentMeasurementForm;