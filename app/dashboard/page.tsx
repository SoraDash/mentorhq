import CalendlyAuth from '@/components/calendly';
import { DashboardCard } from '@/components/dashboard/InfoCard';
import { studentsFromGoogleSheets, syncStudentsWithDatabase } from '@/lib/actions/students.actions';
import { getAuthSession } from '@/lib/auth';
import { Student } from '@prisma/client';

interface DashboardPageProps { }

const DashboardPage: React.FC<DashboardPageProps> = async () => {
  const session = await getAuthSession();
  const test = await studentsFromGoogleSheets()
  const studentList = await syncStudentsWithDatabase()
  console.log(studentList.newStudents)
  console.log(studentList.unassignedStudents)

  return (
    <div>
      <section className="bg-coolGray-50 py-4">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap -m-3">
            <DashboardCard />
          </div>
        </div>
      </section>
      DashboardPage
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Course Code</th>
            <th>Programme ID</th>
            <th>Mentor</th>
            <th>Skype</th>
            <th>Slack</th>
            <th>Github</th>
            <th>Deadlines Count</th>
          </tr>
        </thead>
        <tbody>
          {studentList.newStudents.map((student: Student) => (
            <tr key={student.email}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.status}</td>
              <td>{student.courseCode}</td>
              <td>{student.programmeID}</td>
              <td>{student.mentorId}</td>
              <td>{student.skype || 'N/A'}</td>
              <td>{student.slack || 'N/A'}</td>
              <td>{student.github || 'N/A'}</td>
              {/* <td>{student.deadlines.length}</td> */}
            </tr>
          ))}
        </tbody>
      </table>


      {/* <CalendlyAuth /> */}
    </div>
  );
}
export default DashboardPage;