
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActionButtonsProps {
  onCreateNew: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onCreateNew }) => {
  return (
    <Button 
      className="bg-transformer-primary hover:bg-transformer-primary/90" 
      onClick={onCreateNew}
    >
      <PlusCircle className="h-4 w-4 mr-2" />
      สร้างรายการใหม่
    </Button>
  );
};

export default ActionButtons;
