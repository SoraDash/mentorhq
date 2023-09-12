import { MultiStepForm } from '@/components/client/sessions/SimpleMultiStepForm';

const SessionsPage = async () => {
  return (
    <div>
      <MultiStepForm showStepNumber={ true } />
    </div>
  );
}
export default SessionsPage;