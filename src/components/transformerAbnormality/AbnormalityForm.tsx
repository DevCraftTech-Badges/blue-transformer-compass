
import React from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { BasicInformation } from './sections/BasicInformation';
import { EnvironmentStatus } from './sections/EnvironmentStatus';
import { TimingInformation } from './sections/TimingInformation';
import { TestDetails } from './sections/TestDetails';
import { DamageAssessment } from './sections/DamageAssessment';
import { ManagementNotes } from './sections/ManagementNotes';

interface AbnormalityFormProps {
  selectedZone: string;
  selectedTransformer: string;
}

export const AbnormalityForm = ({
  selectedZone,
  selectedTransformer,
}: AbnormalityFormProps) => {
  const form = useForm();
  const [environment, setEnvironment] = React.useState('');
  const [operationStatus, setOperationStatus] = React.useState('');
  const [testDetails, setTestDetails] = React.useState('');
  const [subGroup, setSubGroup] = React.useState('');
  const [testPart, setTestPart] = React.useState('');
  const [damageLevel, setDamageLevel] = React.useState('');
  const [damageCause, setDamageCause] = React.useState('');
  const [management, setManagement] = React.useState('');

  const generateTimeOptions = (max: number) => {
    return Array.from({ length: max }, (_, i) => 
      i.toString().padStart(2, '0')
    );
  };

  const hours = generateTimeOptions(24);
  const minutes = generateTimeOptions(60);

  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-6">
          <BasicInformation
            form={form}
            selectedZone={selectedZone}
            selectedTransformer={selectedTransformer}
          />
          
          <EnvironmentStatus
            form={form}
            environment={environment}
            setEnvironment={setEnvironment}
            operationStatus={operationStatus}
            setOperationStatus={setOperationStatus}
            testDetails={testDetails}
            setTestDetails={setTestDetails}
          />

          <TimingInformation
            form={form}
            hours={hours}
            minutes={minutes}
          />

          <TestDetails
            form={form}
            subGroup={subGroup}
            setSubGroup={setSubGroup}
            testPart={testPart}
            setTestPart={setTestPart}
          />

          <DamageAssessment
            form={form}
            damageLevel={damageLevel}
            setDamageLevel={setDamageLevel}
            damageCause={damageCause}
            setDamageCause={setDamageCause}
          />

          <ManagementNotes
            form={form}
            management={management}
            setManagement={setManagement}
          />
        </div>

        <div className="sticky bottom-0 bg-white p-4 border-t mt-6">
          <Button type="submit" className="w-full md:w-auto">
            บันทึกข้อมูล
          </Button>
        </div>
      </form>
    </Form>
  );
};
