import { studentColumns } from '@/components/tables/students/columns';
import { DataTable } from '@/components/tables/students/data-table';
import { getStudents } from '@/lib/actions/students.actions';

interface StudentsPageProps { }

const StudentsPage: React.FC<StudentsPageProps> = async () => {
  const students = await getStudents();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={studentColumns} data={students} />
    </div>
  );
}
export default StudentsPage;