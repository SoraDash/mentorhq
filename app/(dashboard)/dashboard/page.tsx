"use client"
import { OnboardingSteps } from '@/components/client/OnboardingSteps';
import { StatsCard } from '@/components/server/dashboard/StatsCard';
import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

interface DashboardPageProps { }

const DashboardPage: React.FC<DashboardPageProps> = () => {
  const fetchUser = async (): Promise<User> => {
    const response = await fetch('/api/user');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  const { data: user, isLoading, isError } = useQuery<User | null>(['user'], fetchUser);

  // Ensure user is not null or undefined
  if (isLoading) {
    // You can return a loading spinner or some placeholder here
    return <div>Loading...</div>;
  }
  if (isError) {
    // You can return a loading spinner or some placeholder here
    return <div>Error...</div>;
  }

  return (
    <div>
      <section className="bg-coolGray-50 py-4">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap -m-3">
            <StatsCard />
          </div>
        </div>
      </section>
      <OnboardingSteps user={user} />
    </div>
  );
}

export default DashboardPage;
