
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart2 } from 'lucide-react';

interface StandardReportsListProps {
  onShowReport: (reportTitle: string) => void;
}

export const StandardReportsList: React.FC<StandardReportsListProps> = ({ onShowReport }) => {
  const reports = [
    "ความสัมพันธ์ของจำนวนหม้อแปลงเมื่อเทียบกับอายุการใช้งาน",
    "ความสัมพันธ์ของจำนวนหม้อแปลงกับบริษัทผู้ผลิต",
    "ความสัมพันธ์ของจำนวนหม้อแปลงในแต่ละเขตสถานีไฟฟ้า",
    "จำนวนครั้งที่เกิดความเสียหายแบ่งตามกลุ่มอุปกรณ์",
    "จำนวนครั้งที่เกิดความเสียหายแบ่งตามชิ้นส่วนอุปกรณ์",
    "จำนวนครั้งที่เกิดความเสียหายแบ่งตามรายละเอียดของความผิดปกติ",
    "จำนวนครั้งที่เกิดความเสียหายแบ่งตามสาเหตุที่แท้จริง",
    "จำนวนครั้งที่เกิดความเสียหายแบ่งตามระดับความรุนแรง",
    "จำนวนครั้งที่เกิดความเสียหายแบ่งตามบริษัทผู้ผลิต",
    "จำนวนครั้งที่เกิดความเสียหายแบ่งตามเขต",
    "จำนวนครั้งที่เกิดความเสียหายแบ่งตามอายุการใช้งาน",
  ];

  return (
    <Card>
      <CardContent className="pt-6">
        <ul className="space-y-4">
          {reports.map((report, index) => (
            <li key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
              <div className="flex-1 mb-2 sm:mb-0">{report}</div>
              <Button 
                onClick={() => onShowReport(report)}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 self-end sm:self-auto"
              >
                <BarChart2 size={18} />
                แสดง
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
