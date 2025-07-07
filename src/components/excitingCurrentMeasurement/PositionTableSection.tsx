import React from 'react';
import { Input } from '@/components/ui/input';

interface PositionRow {
  position: string;
  acVolt?: string;
  hh0hh1?: string;
  h2h0h2h3?: string;
  h3h0h3h1?: string;
  remark?: string;
}

interface PositionTableSectionProps {
  hvWdgPositions?: PositionRow[];
  onUpdateTableData: (
    tableType: 'hvWdgPositions',
    index: number,
    field: string,
    value: string
  ) => void;
}

const PositionTableSection: React.FC<PositionTableSectionProps> = ({
  hvWdgPositions,
  onUpdateTableData
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">HV WDG Position</h3>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-2 py-2 text-xs">Position</th>
              <th className="border border-gray-300 px-2 py-2 text-xs">AC(VOLT)</th>
              <th className="border border-gray-300 px-2 py-2 text-xs">HH0/HH1</th>
              <th className="border border-gray-300 px-2 py-2 text-xs">H2H0/H2H3</th>
              <th className="border border-gray-300 px-2 py-2 text-xs">H3H0/H3H1</th>
              <th className="border border-gray-300 px-2 py-2 text-xs">Remark</th>
            </tr>
          </thead>
          <tbody>
            {hvWdgPositions?.map((row, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-1 py-1 text-center text-sm font-medium">
                  {row.position}
                </td>
                <td className="border border-gray-300 px-1 py-1">
                  <Input
                    value={row.acVolt || ''}
                    onChange={(e) => onUpdateTableData('hvWdgPositions', index, 'acVolt', e.target.value)}
                    className="text-xs h-8"
                  />
                </td>
                <td className="border border-gray-300 px-1 py-1">
                  <Input
                    value={row.hh0hh1 || ''}
                    onChange={(e) => onUpdateTableData('hvWdgPositions', index, 'hh0hh1', e.target.value)}
                    className="text-xs h-8"
                  />
                </td>
                <td className="border border-gray-300 px-1 py-1">
                  <Input
                    value={row.h2h0h2h3 || ''}
                    onChange={(e) => onUpdateTableData('hvWdgPositions', index, 'h2h0h2h3', e.target.value)}
                    className="text-xs h-8"
                  />
                </td>
                <td className="border border-gray-300 px-1 py-1">
                  <Input
                    value={row.h3h0h3h1 || ''}
                    onChange={(e) => onUpdateTableData('hvWdgPositions', index, 'h3h0h3h1', e.target.value)}
                    className="text-xs h-8"
                  />
                </td>
                <td className="border border-gray-300 px-1 py-1">
                  <Input
                    value={row.remark || ''}
                    onChange={(e) => onUpdateTableData('hvWdgPositions', index, 'remark', e.target.value)}
                    className="text-xs h-8"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PositionTableSection;