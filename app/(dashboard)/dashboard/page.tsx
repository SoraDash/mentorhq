import { redirect } from 'next/navigation';
import { FaRegCalendarTimes } from 'react-icons/fa';

import { getCalendlyEvents } from '@/actions/calendly.actions';
import EmptyState from '@/components/EmptyState';
import { CalendlyTable } from '@/components/server/dashboard/CalendlyTable';
import { StatsCard } from '@/components/server/dashboard/StatsCard';
import { TodayCard } from '@/components/server/dashboard/TodayCard';
import { getUser } from '@/lib/auth/auth';
import { getLatestStats } from '@/lib/billing/stats';

const DashboardPage = async () => {
  const response = await getLatestStats();
  const user = await getUser();
  const events = await getCalendlyEvents();

  if (!user) return redirect('/');
  if (!user.isOnboarded) return redirect('/onboarding');

  let stats;

  if (response.status !== 'success') {
    console.error(response.message);
  } else {
    stats = response.stats;
  }

  return (
    <>
      <section className="py-4">
        <div className="container px-4 mx-auto">
          <div className="-m-3 grid grid-cols-1 gap-4 space-y-4">
            <TodayCard user={user} />
            {response.status === 'empty' || response.message ? (
              <div className="p-4 bg-red-100 text-red-700 border border-red-200 rounded-md">
                {response.message}
              </div>
            ) : (
              stats && <StatsCard stats={stats} />
            )}
          </div>
        </div>
      </section>
      {user?.calendly_token ? (
        <div className="px-5">
          <CalendlyTable events={events} />
        </div>
      ) : (
        <EmptyState
          description={
            !user?.calendly_token
              ? 'Please allow calendly to show your latest events'
              : 'No Calendly events are available at the moment. Please check back later.'
          }
          icon={FaRegCalendarTimes}
          title="No Events Available"
        />
      )}
    </>
  );
};

export default DashboardPage;
