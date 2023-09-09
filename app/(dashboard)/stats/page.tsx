import AddSessionForm from '@/components/client/AddSessionForm';
import React from 'react';

interface StatsPageProps { }

const StatsPage: React.FC<StatsPageProps> = async () => {
  return (
    <div>
      <AddSessionForm />
    </div>
  );
}
export default StatsPage;