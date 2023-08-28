import CalendlyAuth from '@/components/calendly';
import { DashboardCard } from '@/components/dashboard/InfoCard';
import { getAuthSession } from '@/lib/auth';

interface DashboardPageProps { }

const DashboardPage: React.FC<DashboardPageProps> = async () => {
  const session = await getAuthSession();
  return (
    <div>
      <section className="bg-coolGray-50 py-4">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap -m-3">
            <DashboardCard />
          </div>
        </div>
      </section>
      DashboardPage
      <CalendlyAuth />
    </div>
  );
}
export default DashboardPage;