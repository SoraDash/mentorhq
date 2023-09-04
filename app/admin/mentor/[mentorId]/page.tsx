
import { MentorBio } from '@/components/MentorProfile';
import { MentorSidebar } from '@/components/ProfileSidebar';
import { isAdmin } from '@/components/server/routeguards';
import { getMentorByIdWithCountAdmin } from '@/lib/admin/mentors';
import { redirect } from 'next/navigation';
import React from 'react';




interface StudentProfilePageProps {
  params: {
    mentorId: string;
  }
}

const MentorProfilePage: React.FC<StudentProfilePageProps> = async ({ params }) => {
  const mentorId = params.mentorId;
  const mentor = await getMentorByIdWithCountAdmin(mentorId);

  if (!await isAdmin()) {
    redirect('/dashboard');
  }


  if (!mentor) {
    return <div>Mentor not found</div>
  }
  return (
    <>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-3">
            <MentorSidebar profile={mentor} />
          </div>
          <div className="col-span-4 sm:col-span-9">
            <MentorBio mentor={mentor} />
          </div>
        </div>
      </div >
    </ >
  );
}

export default MentorProfilePage;