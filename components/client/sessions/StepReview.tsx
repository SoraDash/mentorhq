import { format } from 'date-fns';
import { FormikValues, useFormikContext } from 'formik';
import {
  BarChartIcon,
  CalendarIcon,
  ClockIcon,
  FileIcon,
  FolderIcon,
  LaptopIcon,
  MailboxIcon,
  PlaneIcon,
} from 'lucide-react';

export const StepReview = () => {
  const { values } = useFormikContext<FormikValues>();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <p>
          <CalendarIcon className="w-4 h-4 inline-block mr-2" />
          <span className="font-semibold">Date:</span>{' '}
          {format(new Date(values.date), 'dd MMM yyyy')}
        </p>
        <p>
          <ClockIcon className="w-4 h-4 inline-block mr-2" />
          <span className="font-semibold">Duration:</span> {values.duration}{' '}
          minutes
        </p>
        <p>
          <FolderIcon className="w-4 h-4 inline-block mr-2" />
          <span className="font-semibold">Project:</span> {values.project.label}
        </p>
        <p>
          <BarChartIcon className="w-4 h-4 inline-block mr-2" />
          <span className="font-semibold">Progress:</span>
          <span className={`font-bold ${progressColor(values.progress.label)}`}>
            {values.progress.label} {values.progress.emoji}
          </span>
        </p>
        <p>
          <PlaneIcon className="w-4 h-4 inline-block mr-2" />
          <span className="font-semibold">Submission Type:</span>{' '}
          {values.submissionType.value}
        </p>
        <p>
          <MailboxIcon className="w-4 h-4 inline-block mr-2" />
          <span className="font-semibold">Follow-up:</span>{' '}
          {values.follow_up.value}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {values.personalNotes && (
          <p>
            <FileIcon className="w-4 h-4 inline-block mr-2" />
            <span className="font-semibold">Personal Notes:</span>
            <br />
            {values.personalNotes}
          </p>
        )}
        <p>
          <LaptopIcon className="w-4 h-4 inline-block mr-2" />
          <span className="font-semibold">Summary:</span>
          <br />
          {values.summary}
        </p>
      </div>
    </div>
  );
};

// Helper function to determine progress color
const progressColor = (label: string) => {
  switch (label) {
    case 'Poor':
      return 'text-red-500';
    case 'Excellent':
      return 'text-green-500';
    default:
      return 'text-gray-500';
  }
};
