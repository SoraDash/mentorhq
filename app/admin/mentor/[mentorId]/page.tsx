import Avatar from '@/components/client/Avatar';
import { SocialMediaIcons } from '@/components/client/SocialMediaIcons';
import { redirectAdminPage } from '@/components/server/redirect-if-not-admin';
import { getMentor } from '@/lib/admin/mentors';
import { redirect } from 'next/navigation';
import { roleConfig } from '@/lib/roleConfig';
import React from 'react';
import { cn } from '@/lib/utils';
import { capitalize } from 'lodash-es'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'



interface StudentProfilePageProps {
  params: {
    mentorId: string;
  }
}

const MentorProfilePage: React.FC<StudentProfilePageProps> = async ({ params }) => {
  const mentorId = params.mentorId;
  const mentor = await getMentor(mentorId);
  const { color, icon: RoleIcon } = roleConfig[mentor?.role!];


  if (await redirectAdminPage()) {
    redirect('/dashboard')
  }

  if (!mentor) {
    return <div>Mentor not found</div>
  }
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-3">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
                <Avatar entity={mentor} className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0" profile />

                <h1 className="text-xl font-bold">{mentor.name}</h1>
                <p className="text-gray-600 flex items-center font-bold">{capitalize(mentor.role)} <RoleIcon className={cn("w-5 h-5 ml-1", color ? color : 'text-gray-600')} /></p>


                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Contact</a>
                  <a href="#" className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">Resume</a>
                </div>
              </div>
              <hr className="my-6 border-t border-gray-300" />
              <div className="flex flex-col">
                <span className="text-gray-600 uppercase font-bold tracking-wider mb-2">Skills</span>
                <ul>
                  <li className="mb-2">JavaScript</li>
                  <li className="mb-2">React</li>
                  <li className="mb-2">Node.js</li>
                  <li className="mb-2">HTML/CSS</li>
                  <li className="mb-2">Tailwind Css</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-span-4 sm:col-span-9">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">About Me</h2>
              {mentor.bio && (
                <div className="prose prose-blue max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw as any]}>
                    {mentor.bio}
                  </ReactMarkdown>

                </div>

              )}

              <h3 className="font-semibold text-center mt-3 -mb-2">
                Reach me on
              </h3>
              <div className="flex justify-center items-center gap-6 my-6">
                <SocialMediaIcons user={mentor} />
              </div>


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
          </div>
        </div>
      </div>
    </div >
  );
}

export default MentorProfilePage;