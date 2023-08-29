"use client"
import { DashboardCard } from '@/components/dashboard/InfoCard';
import { OnboardingSteps } from '@/components/OnboardingSteps';
import { getUser } from '@/lib/auth';
import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { error } from 'console';

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
            <DashboardCard />
          </div>
        </div>
      </section>
      <OnboardingSteps user={user} />
    </div>
  );
}

export default DashboardPage;
