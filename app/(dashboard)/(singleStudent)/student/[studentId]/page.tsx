import { Profile } from "@/components/Profile";
import { ProfileSidebar } from "@/components/ProfileSidebar";
import { canAccessStudentPage } from "@/components/server/routeguards";
import { getStudent } from "@/lib/students";
import { redirect } from "next/navigation";
import React from "react";

interface StudentProfilePageProps {
  params: {
    studentId: string;
  };
}

const StudentProfilePage: React.FC<StudentProfilePageProps> = async ({
  params,
}) => {
  const studentId = params.studentId;
  const student = await getStudent(studentId);

  if (!(await canAccessStudentPage(student!))) {
    redirect("/dashboard");
  }

  if (!student) {
    return <div>Mentor not found</div>;
  }
  return (
    <>
      <div className='container mx-auto py-8'>
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-6 px-4'>
          <div className='col-span-4 sm:col-span-3'>
            <ProfileSidebar
              profile={{
                ...student,
              }}
            />
          </div>
          <div className='col-span-4 sm:col-span-9'>
            <Profile profile={student} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentProfilePage;
