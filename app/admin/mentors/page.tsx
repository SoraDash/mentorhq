import { mentorColumns } from '@/components/client/tables/admin/mentors/columns';
import { DataTable } from '@/components/client/tables/admin/mentors/data-table';
import { getAllMentorsWithCountAdmin } from '@/lib/admin/mentors';

const MentorsPage = async () => {
  const mentors = await getAllMentorsWithCountAdmin();

  return (
    <div className="container mx-auto py-10">
      {!mentors ? (
        <div>Loading...</div>
      ) : (
        <DataTable columns={mentorColumns} data={mentors} />
      )}
    </div>
  );
};

export default MentorsPage;
