import { studentColumns } from '@/components/client/tables/admin/students/columns';
import { DataTable } from '@/components/client/tables/students/data-table';
import { getStudents } from '@/lib/admin/students';


const StudentsPage = async () => {
  const students = await getStudents();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={studentColumns} data={students} />
    </div>
  );
}
export default StudentsPage;