import { Input } from '@nextui-org/react';
import { FormikValues, useFormikContext } from 'formik';
import { useState } from 'react';

export const StepA = () => {
  const { setFieldValue, values } = useFormikContext<FormikValues>();
  const [displayDuration, setDisplayDuration] = useState(
    values.duration || '15',
  );
  const [infoMessage, setInfoMessage] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleDurationChange = (value: string) => {
    const duration = parseInt(value, 10) || 0;

    setDisplayDuration(value); // Update display value

    // For durations less than 15
    if (duration < 15) {
      setInfoMessage('');
      setFieldValue('duration', ''); // Clear the value in Formik
    } else {
      // Calculate and display the total session time
      const totalSessionTime = duration > 15 ? duration + 4 : duration;

      setInfoMessage(
        `Total session time: <span className="font-semibold">${totalSessionTime}</span> minutes (including 4 minutes for admin work)`,
      );
      setFieldValue('duration', duration); // Update the value in Formik

      // Check if total session time exceeds 45 minutes
      if (totalSessionTime > 45) {
        setConfirmationMessage(
          `Total session time is over 45 minutes. Are you sure?`,
        );
      } else {
        setConfirmationMessage('');
      }
    }
  };

  return (
    <div>
      <Input
        className="my-5"
        id="date"
        isRequired
        label="Session Date"
        onChange={(e) => setFieldValue('date', e.target.value)}
        type="date"
        value={values.date}
      />
      <Input
        className="mb-5"
        errorMessage={displayDuration < 15 ? 'Minimum time is 15 minutes.' : ''}
        id="duration"
        isRequired
        label="Duration"
        min="15"
        onValueChange={handleDurationChange}
        type="number"
        value={displayDuration}
      />
      {infoMessage && (
        <p className="text-sm text-gray-500">
          <span className="font-semibold">Total session time: </span>
          <span className="font-bold">
            {parseInt(displayDuration, 10) + 4}
          </span>{' '}
          minutes{' '}
          <span className="italic">(including 4 minutes for admin work)</span>
        </p>
      )}
      {confirmationMessage && (
        <p className="text-sm text-red-500 mt-3 font-semibold">
          {confirmationMessage}
        </p>
      )}
    </div>
  );
};
