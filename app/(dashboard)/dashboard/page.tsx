"use client"
import { OnboardingSteps } from '@/components/client/OnboardingSteps';
import { StatsCard } from '@/components/server/dashboard/StatsCard';
import { fetchLatestStats } from '@/lib/queries/statQueries';
import { fetchUser } from '@/lib/queries/userQueries';
import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { CircleLoader } from 'react-spinners';

const DashboardPage: React.FC = () => {
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useQuery<User | null>(['user'], fetchUser);
  const { data: stats, isLoading: isStatsLoading, isError: isStatsError } = useQuery(['stats'], fetchLatestStats);
  const { refetch } = useQuery<User | null>(['user'], fetchUser);

  if (isUserLoading || isStatsLoading) {
    return <CircleLoader color="#36d7b7" />;
  }

  if (isUserError || isStatsError) {
    return <div>Error...</div>;
  }

  return (
    <div>
      <section className="bg-coolGray-50 py-4">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap -m-3">
            <StatsCard stats={stats} />
          </div>
        </div>
      </section>
      <OnboardingSteps user={user} refetchUser={refetch} />
    </div>
  );
};

export default DashboardPage;