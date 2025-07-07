import React from 'react';
import { Input } from '@/components/ui/input';

interface MeasurementRow {
  terminal: string;
  acVolt?: string;
  acMa?: string;
  n?: string;
  remark?: string;
}

interface MeasurementTablesSectionProps {
  lvWdg?: MeasurementRow[];
  tvWdg?: MeasurementRow[];
  hvWdg?: MeasurementRow[];
  onUpdateTableData: (
    tableType: 'lvWdg' | 'tvWdg' | 'hvWdg',
    index: number,
    field: string,
    value: string
  ) => void;
}

const MeasurementTablesSection: React.FC<MeasurementTablesSectionProps> = ({
  lvWdg,
  tvWdg,
  hvWdg,
  onUpdateTableData
}) => {
  const renderMeasurementTable = (
    title: string,
    data: MeasurementRow[] | undefined,
    tableType: 'lvWdg' | 'tvWdg' | 'hvWdg'
  ) => (
    <div>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-3 py-2 text-sm">Terminal</th>
              <th className="border border-gray-300 px-3 py-2 text-sm">AC(VOLT)</th>
              <th className="border border-gray-300 px-3 py-2 text-sm">AC(mA)</th>
              <th className="border border-gray-300 px-3 py-2 text-sm">N</th>
              <th className="border border-gray-300 px-3 py-2 text-sm">Remark</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((row, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-2 py-1">
                  <Input
                    value={row.terminal}
                    onChange={(e) => onUpdateTableData(tableType, index, 'terminal', e.target.value)}
                    className="text-sm"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <Input
                    value={row.acVolt || ''}
                    onChange={(e) => onUpdateTableData(tableType, index, 'acVolt', e.target.value)}
                    className="text-sm"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <Input
                    value={row.acMa || ''}
                    onChange={(e) => onUpdateTableData(tableType, index, 'acMa', e.target.value)}
                    className="text-sm"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <Input
                    value={row.n || ''}
                    onChange={(e) => onUpdateTableData(tableType, index, 'n', e.target.value)}
                    className="text-sm"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <Input
                    value={row.remark || ''}
                    onChange={(e) => onUpdateTableData(tableType, index, 'remark', e.target.value)}
                    className="text-sm"
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
    <div className="space-y-6">
      {renderMeasurementTable('LV WDG', lvWdg, 'lvWdg')}
      {renderMeasurementTable('TV WDG', tvWdg, 'tvWdg')}
      {renderMeasurementTable('HV WDG', hvWdg, 'hvWdg')}
    </div>
  );
};

export default MeasurementTablesSection;