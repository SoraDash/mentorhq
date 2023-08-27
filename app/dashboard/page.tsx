import { getAuthSession } from '@/lib/auth';

interface DashboardPageProps { }

const DashboardPage: React.FC<DashboardPageProps> = async () => {
  const session = await getAuthSession();
  return (
    <div>
      DashboardPage
    </div>
  );
}
export default DashboardPage;