import { MentorWithCount } from '@/lib/admin/mentors';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import React from 'react';

interface MentorBioProps {
  mentor: MentorWithCount
}

export const MentorBio: React.FC<MentorBioProps> = async ({ mentor }) => {
  return (
    <div className="dark:bg-navbar bg-white shadow rounded-lg p-6">
      {mentor.bio && (
        <>
          <h2 className="text-xl font-bold mb-4">{mentor.firstName}&apos;s Github Profile</h2>
          <div className="prose prose-blue max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw as any]}>
              {mentor.bio}
            </ReactMarkdown>

          </div>
        </>
      )}

      <h2 className="text-xl font-bold mt-6 mb-4">Experience</h2>
      <div className="mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600 font-bold">Web Developer</span>
          <p>
            <span className="text-gray-600 mr-2">at ABC Company</span>
            <span className="text-gray-600">2017 - 2019</span>
          </p>
        </div>
        <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est vitae
          tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas
          suscipit.
        </p>
      </div>
      <div className="mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600 font-bold">Web Developer</span>
          <p>
            <span className="text-gray-600 mr-2">at ABC Company</span>
            <span className="text-gray-600">2017 - 2019</span>
          </p>
        </div>
        <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est vitae
          tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas
          suscipit.
        </p>
      </div>
      <div className="mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600 font-bold">Web Developer</span>
          <p>
            <span className="text-gray-600 mr-2">at ABC Company</span>
            <span className="text-gray-600">2017 - 2019</span>
          </p>
        </div>
        <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est vitae
          tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas
          suscipit.
        </p>
      </div>
    </div>
  );
}