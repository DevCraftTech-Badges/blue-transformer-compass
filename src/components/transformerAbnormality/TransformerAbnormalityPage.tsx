
import React from 'react';
import { FilterSection } from './FilterSection';
import { AbnormalityForm } from './AbnormalityForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TransformerAbnormalityPage = () => {
  const [selectedZone, setSelectedZone] = React.useState<string>('');
  const [selectedTransformer, setSelectedTransformer] = React.useState<string>('');

  const handleFilterChange = (zone: string, transformer: string) => {
    setSelectedZone(zone);
    setSelectedTransformer(transformer);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>ความผิดปกติหม้อแปลง</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <FilterSection onFilterChange={handleFilterChange} />
            <AbnormalityForm
              selectedZone={selectedZone}
              selectedTransformer={selectedTransformer}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
