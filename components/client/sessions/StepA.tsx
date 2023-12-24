import { Input } from '@nextui-org/react';
import { format, isValid, parse } from 'date-fns';
import { FormikValues, useFormikContext } from 'formik';
import { ChangeEventHandler, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';

import { DatePicker } from '../DatePicker';

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
      if (totalSessionTime > 50) {
        setConfirmationMessage(
          `Total session time is over 50 minutes. Are you sure?`,
        );
      } else {
        setConfirmationMessage('');
      }
    }
  };

  // Date picker
  const [selected, setSelected] = useState<Date>();
  const [inputValue, setInputValue] = useState<string>('');
  const [isPopperOpen, setIsPopperOpen] = useState(false);

  const popperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const closePopper = () => {
    setIsPopperOpen(false);
    buttonRef?.current?.focus();
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.currentTarget.value);
    const date = parse(e.currentTarget.value, 'y-MM-dd', new Date());

    if (isValid(date)) {
      setSelected(date);
      setFieldValue('date', e.target.value);
    } else {
      setSelected(undefined);
    }
  };

  const handleButtonClick = () => {
    setIsPopperOpen(true);
  };

  return (
    <div>
      <div>
        <div className="flex items-center" ref={popperRef}>
          <Input
            className="my-5"
            classNames={{
              inputWrapper: 'rounded-r-none',
            }}
            id="date"
            isRequired
            label="Session Date"
            onChange={handleInputChange}
            placeholder={format(new Date(), 'dd-MM-y')}
            type="text"
            value={inputValue}
          />
          <Button
            aria-label="Pick a date"
            className="rounded-l-none py-7 bg-sky-700 hover:bg-sky-900"
            onClick={handleButtonClick}
            ref={buttonRef}
            type="button"
          >
            Choose
          </Button>
        </div>
        {isPopperOpen && (
          <DatePicker
            buttonRef={buttonRef}
            closePopper={closePopper}
            isPopperOpen={isPopperOpen}
            popperRef={popperRef}
            selected={selected}
            setFieldValue={setFieldValue}
            setInputValue={setInputValue}
            setSelected={setSelected}
          />
        )}
      </div>

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
