import { format } from 'date-fns';
import { FormikValues, useFormikContext } from 'formik';
import {
  BarChartIcon,
  CalendarIcon,
  ClockIcon,
  FileIcon,
  FolderIcon,
  LaptopIcon,
  MessageCircle,
} from 'lucide-react';
import React from 'react';
import { MdSupportAgent } from 'react-icons/md';

export const StepReview = () => {
  const { values } = useFormikContext<FormikValues>();

  const convertDuration = (minutesStr: string) => {
    const minutes = parseInt(minutesStr, 10);
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = mins.toString().padStart(2, '0');

    return `${paddedHours}:${paddedMinutes}:00`;
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <CalendarIcon className="inline-block mr-2 font-semibold" />
          <div className="font-semibold">Date:</div>
          <div>{format(new Date(values.date), 'dd MMM yyyy')}</div>
        </div>
        <div>
          <ClockIcon className="inline-block mr-2 font-semibold" />
          <div className="font-semibold">Duration:</div>
          <div>{values.duration && convertDuration(values.duration)}</div>
        </div>
        <div>
          <BarChartIcon className="inline-block mr-2 font-semibold" />
          <div className="font-semibold">Progress:</div>
          <div>
            {values.progress.label} {values.progress.emoji}
          </div>
        </div>
        <div>
          <MdSupportAgent className="inline-block mr-2 font-semibold h-6 w-6" />
          <div className="font-semibold">Student Care needed:</div>
          <div>{values.follow_up.label}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <FolderIcon className="inline-block mr-2 font-semibold" />
          <div className="font-semibold">Project:</div>
          <div>{values.project.label}</div>
        </div>
        <div>
          <MessageCircle className="inline-block mr-2 font-semibold" />
          <div className="font-semibold">Session:</div>
          <div>{values.session.label}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="col-span-1 sm:col-span-2">
          <LaptopIcon className="inline-block mr-2 font-semibold" />
          <div className="font-semibold">Summary:</div>
          <div>{values.summary}</div>
        </div>
        {values.personalNotes && (
          <div className="col-span-1 sm:col-span-2">
            <FileIcon className="inline-block mr-2" />
            <div>
              <span className="font-semibold">Personal Notes </span>
              <span className="italic ">(will not be submitted to CI)</span>:
            </div>
            <div>{values.personalNotes}</div>
          </div>
        )}
      </div>
    </>
  );
};
