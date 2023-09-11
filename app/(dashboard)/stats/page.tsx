import { MultiStepForm } from '@/components/client/sessions/SimpleMultiStepForm';
import AddSessionForm from '@/components/client/AddSessionForm';
import React from 'react';

interface StatsPageProps { }

const StatsPage: React.FC<StatsPageProps> = async () => {
  return (
    <div>
      <MultiStepForm showStepNumber={true} />
    </div>
  );
}
export default StatsPage;