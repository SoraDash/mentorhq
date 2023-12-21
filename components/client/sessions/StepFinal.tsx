import { format } from 'date-fns';
import { FormikValues, useFormikContext } from 'formik';
import {
  BarChartIcon,
  CalendarIcon,
  ClockIcon,
  CreditCardIcon,
  FileIcon,
  FolderIcon,
  LaptopIcon,
  MailboxIcon,
  PlaneIcon,
} from 'lucide-react';
import React from 'react';

export const StepFinal = () => {
  const { values } = useFormikContext<FormikValues>();

  return (
    <div className="grid grid-cols-2 gap-4">
      <p className="col-span-2">
        <CreditCardIcon className="w-4 h-4 inline-block mr-2" />
        <span className="font-semibold mr-1">Student ID:</span>
        <span>{values.studentId}</span>
      </p>
      <p>
        <CalendarIcon className="w-4 h-4 inline-block mr-2" />
        <span className="font-semibold mr-1">Date:</span>
        <span>{format(new Date(values.date), 'dd MMM yyyy')}</span>
      </p>
      <p>
        <ClockIcon className="w-4 h-4 inline-block mr-2" />
        <span className="font-semibold mr-1">Session:</span>
        <span>{values.session.label}</span>
      </p>
      <p>
        <ClockIcon className="w-4 h-4 inline-block mr-2" />
        <span className="font-semibold mr-1">Duration:</span>
        <span>{values.duration} minutes</span>
      </p>
      <p>
        <FolderIcon className="w-4 h-4 inline-block mr-2" />
        <span className="font-semibold mr-1">Project:</span>
        <span>{values.project.label}</span>
      </p>
      <p>
        <BarChartIcon className="w-4 h-4 inline-block mr-2" />
        <span className="font-semibold mr-1">Progress:</span>
        <span>
          {values.progress.emoji} {values.progress.label}
        </span>
      </p>
      <p>
        <PlaneIcon className="w-4 h-4 inline-block mr-2" />
        <span className="font-semibold mr-1">Submission Type:</span>
        <span>{values.submissionType}</span>
      </p>
      <p>
        <MailboxIcon className="w-4 h-4 inline-block mr-2" />
        <span className="font-semibold mr-1">Follow-up:</span>
        <span>{values.follow_up}</span>
      </p>
      {values.personalNotes && (
        <p className="col-span-2">
          <FileIcon className="w-4 h-4 inline-block mr-2" />
          <span className="font-semibold mr-1">Personal Notes:</span>
          <br />
          <span>{values.personalNotes}</span>
        </p>
      )}
      <p className="col-span-2">
        <LaptopIcon className="w-4 h-4 inline-block mr-2" />
        <span className="font-semibold mr-1">Summary:</span>
        <br />
        <span>{values.summary}</span>
      </p>
    </div>
  );
};
