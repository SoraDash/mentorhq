import OnboardingStepsClient from '@/components/client/onboarding/OnboardingStepsClient';
import OnboardingStepsServer from '@/components/client/onboarding/OnboardingStepsServer';
import { StatsCard } from '@/components/server/dashboard/StatsCard';
import { getUser } from '@/lib/auth/auth';
import { getLatestStats } from '@/lib/billing/stats';
import { Suspense } from 'react';

const DashboardPage: React.FC = async () => {
  const stats = await getLatestStats();
  const user = await getUser();


  return (
    <div>
      <section className="bg-coolGray-50 py-4" key={Math.random()}>
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap -m-3">
            <Suspense fallback={"We are loading stuff"}>
              {stats !== null && <StatsCard stats={stats} />}
            </Suspense>
          </div>
        </div>
      </section>
      <OnboardingStepsServer user={user} />
    </div>
  );
};

export default DashboardPage;