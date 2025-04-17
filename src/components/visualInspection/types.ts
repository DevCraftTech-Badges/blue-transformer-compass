
export interface Field {
  name: string;
  type: 'text' | 'select' | 'date';
}

export interface Category {
  id: string;
  title: string;
  icon?: React.ReactNode;
  fields: Field[];
}

export interface InspectionItem {
  id: number;
  transformerName: string;
  egatSN: string;
  testType: string;
  testDate: string;
  testTime: string;
  inspector: string;
  [key: string]: any;
}
