import AddSessionModal from '@/components/client/AddSessionModal';

const SessionsPage = async () => {
  return (
    <div>
      <AddSessionModal
        studentEmail="test@me.com"
        studentId="4a8a30bf-7842-4e57-b735-e5ea17218540"
        studentName="Guillermo"
      />
    </div>
  );
};

export default SessionsPage;
