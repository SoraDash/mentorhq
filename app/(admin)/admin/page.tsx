import OnboardingStepsServer from '@/components/client/onboarding/OnboardingStepsServer';
import { CalendlyTable } from '@/components/server/dashboard/CalendlyTable';
import { StatsCard } from '@/components/server/dashboard/StatsCard';
import { getUser } from '@/lib/auth/auth';
import { getLatestStats } from '@/lib/billing/stats';
import { generateCalendlyEvents } from '@/lib/calendly/fake-events';
import { Suspense } from 'react';

const DashboardPage = async () => {
  const stats = await getLatestStats();
  const user = await getUser();
  const events = await generateCalendlyEvents(20)


  return (
    <div>
      <section className="bg-coolGray-50 py-4" key={Math.random()}>
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap -m-3">
            {stats !== null && <StatsCard stats={stats} />}
          </div>
        </div>
      </section>
      <OnboardingStepsServer user={user} />
      {user?.calendly_token && (
        <CalendlyTable events={events} />
      )}
    </div>
  );
};

export default DashboardPage;