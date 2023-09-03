import { studentColumns } from '@/components/client/tables/students/columns';
import { DataTable } from '@/components/client/tables/students/data-table';
import { getAllStudentsAdmin } from '@/lib/admin/students';
import React from 'react';

interface StudentsPageProps { }

const StudentsPage: React.FC<StudentsPageProps> = async () => {
  const students = await getAllStudentsAdmin();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={studentColumns} data={students} />
    </div>
  );
}
export default StudentsPage;