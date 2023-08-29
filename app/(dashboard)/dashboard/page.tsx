import CalendlyAuth from '@/components/calendly';
import { DashboardCard } from '@/components/dashboard/InfoCard';
import { studentsFromGoogleSheets, syncStudentsWithDatabase } from '@/lib/actions/students.actions';
import { getAuthSession } from '@/lib/auth';
import { Student } from '@prisma/client';

interface DashboardPageProps { }

const DashboardPage: React.FC<DashboardPageProps> = async () => {



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