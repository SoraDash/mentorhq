import { studentColumns } from '@/components/client/tables/admin/students/columns';
import { DataTable } from '@/components/client/tables/admin/students/data-table';
import { getAllStudentsAdmin } from '@/lib/students';


const StudentsPage = async () => {
  const students = await getAllStudentsAdmin();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={studentColumns} data={students} />
    </div>
  );
}
export default StudentsPage;