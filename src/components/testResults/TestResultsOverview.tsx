
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const transformers = ['AN-KT1A', 'AN-KT2A', 'AN-KT3A'];

const testCategories = [
  {
    category: 'Arrester',
    subtopics: [
      'HV %Leakage Current & Watt Loss & Insulation Resistance',
      'LV %Leakage Current & Watt Loss & Insulation Resistance',
      'TV %Leakage Current & Watt Loss & Insulation Resistance'
    ]
  },
  {
    category: 'Bushing',
    subtopics: [
      'HV %PF & Capacitance',
      'LV %PF & Capacitance',
      'TV %PF & Capacitance'
    ]
  },
  {
    category: 'Core Insulation Resistance',
    subtopics: ['Core Insulation Resistance']
  },
  {
    category: 'Exciting Current',
    subtopics: ['Exciting Current']
  },
  {
    category: 'HV WINDING Tests',
    subtopics: ['%Idiff@200V', '%Idiff@10kV', 'Iexc']
  },
  {
    category: 'LV WINDING Tests',
    subtopics: ['%Idiff@200V', 'Iexc']
  },
  {
    category: 'TV WINDING Tests',
    subtopics: ['%Idiff@200V', 'Iexc']
  },
  {
    category: 'Ratio Measurement',
    subtopics: ['HV-LV %Error', 'HV-TV', 'LV-TV']
  },
  {
    category: 'DC Resistance Measurement',
    subtopics: ['HV', 'HV-TV', 'LV-TV', 'TV WINDING DC Resistance']
  },
  {
    category: 'Single Phase Impedance Measurement',
    subtopics: ['HV-LV', 'HV-TV', 'LV-TV']
  },
  {
    category: 'Three Phase Impedance Measurement',
    subtopics: ['HV', 'LV', 'HV-LV', 'HV-TV', 'LV-TV']
  },
  {
    category: 'Auto Winding Insulation Resistance',
    subtopics: ['HV', 'LV Insulation & Power Factor']
  },
  {
    category: 'Two Winding Insulation Resistance',
    subtopics: ['HV', 'TV Windings']
  },
  {
    category: 'Three Winding Insulation Resistance',
    subtopics: ['HV', 'LV', 'TV Insulation']
  },
  {
    category: 'Oil Tests',
    subtopics: ['Oil Aging', 'Oil Contamination']
  },
  {
    category: 'OLTC Tests',
    subtopics: ['OLTC Contact', 'Dielectric Property', 'DGA of Gas', 'OLTC Oil Contamination']
  },
  {
    category: 'Visual Inspection',
    subtopics: ['DGA Factor', 'DGA of Gas', 'Furan', 'Power Factor', 'Load History', 'Thermo Scan', 'Oil Quality']
  }
];

const TestResultsOverview = () => {
  const [selectedTransformer, setSelectedTransformer] = useState<string>('');
  const [showResults, setShowResults] = useState(false);

  const handleGenerate = () => {
    if (selectedTransformer) {
      setShowResults(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="w-full sm:w-64">
          <Select value={selectedTransformer} onValueChange={setSelectedTransformer}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
            </SelectTrigger>
            <SelectContent>
              {transformers.map((transformer) => (
                <SelectItem key={transformer} value={transformer}>
                  {transformer}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button 
          onClick={handleGenerate}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
          disabled={!selectedTransformer}
        >
          GENERATE
        </Button>
      </div>

      {showResults && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testCategories.map((item, index) => (
            <Accordion key={index} type="single" collapsible className="bg-white rounded-lg shadow-sm">
              <AccordionItem value={`item-${index}`} className="border-none">
                <AccordionTrigger className="px-4 py-3 text-lg font-semibold text-gray-700 hover:bg-gray-50 rounded-t-lg">
                  {item.category}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <ul className="space-y-2">
                    {item.subtopics.map((subtopic, subIndex) => (
                      <li 
                        key={subIndex} 
                        className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer pl-4 py-1 hover:bg-gray-50 rounded"
                      >
                        {subtopic}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestResultsOverview;
