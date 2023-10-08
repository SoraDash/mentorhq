import { Profile } from "@/components/Profile";
import { ProfileSidebar } from "@/components/ProfileSidebar";
import { getMentorById } from "@/lib/admin/mentors";
import { getUser } from "@/lib/auth/auth";
import React from "react";

const UserProfilePage: React.FC = async () => {
  const user = await getUser();
  if (!user) {
    return <div>No User found</div>;
  }
  const mentor = await getMentorById(user.id);
  if (!mentor) {
    return <div>No Mentor found</div>;
  }
  return (
    <>
      <div className='container mx-auto py-8'>
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-6 px-4'>
          <div className='col-span-4 sm:col-span-3'>
            <ProfileSidebar
              profile={{
                ...mentor,
                isPremium: mentor.isPremium || false,
                image: mentor.image || "",
                github: mentor.github || "",
              }}
            />
          </div>
          <div className='col-span-4 sm:col-span-9'>
            <Profile profile={mentor} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
