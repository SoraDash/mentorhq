import { UserWithCount } from "@/lib/db/types";
import { UnifiedStudent } from "@/lib/students";
import { Student } from "@prisma/client";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

type ProfileWithCounts = UserWithCount | UnifiedStudent | Student;

interface ProfileProps {
  profile: ProfileWithCounts;
}

export const Profile: React.FC<ProfileProps> = async ({ profile }) => {
  return (
    <div className='dark:bg-navbar bg-white shadow rounded-lg p-6'>
      {profile.bio ? (
        <>
          <h2 className='text-xl font-bold mb-4'>
            {profile.firstName || profile.name}&apos;s Github Profile
          </h2>
          <div className='prose prose-blue max-w-none'>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw as any]}>
              {profile.bio}
            </ReactMarkdown>
          </div>
        </>
      ) : (
        <>No github profile found for {profile.firstName || profile.name}</>
      )}
    </div>
  );
};
