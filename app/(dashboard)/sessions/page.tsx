import AddSessionModal from '@/components/client/AddSessionModal';

const SessionsPage = async () => {
  return (
    <div>
      <AddSessionModal
        studentEmail="test@me.com"
        studentId="00dbb83f-3274-43ba-8a3f-dece1aff5e6e"
        studentName="Guillermo"
      />
    </div>
  );
};

export default SessionsPage;
