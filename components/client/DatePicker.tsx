import { format } from 'date-fns';
import FocusTrap from 'focus-trap-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { DayPicker, SelectSingleEventHandler } from 'react-day-picker';
import { usePopper } from 'react-popper';

import 'react-day-picker/dist/style.css';

interface DatePickerProps {
  buttonRef: React.RefObject<HTMLButtonElement>;
  closePopper: () => void;
  isPopperOpen: boolean;
  popperRef: React.RefObject<HTMLDivElement>;
  selected: Date | undefined;
  setFieldValue: (field: string, value: string) => void;
  setInputValue: (value: string) => void;
  setSelected: (date: Date | undefined) => void;
}

export const DatePicker = ({
  buttonRef,
  closePopper,
  isPopperOpen,
  popperRef,
  selected,
  setFieldValue,
  setInputValue,
  setSelected,
}: DatePickerProps) => {
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );

  const popper = usePopper(popperRef.current, popperElement, {
    placement: 'right-start',
    strategy: 'fixed',
  });

  const handleDaySelect: SelectSingleEventHandler = (date) => {
    setSelected(date);

    if (date) {
      setInputValue(format(date, 'dd-MM-y'));
      setFieldValue('date', format(date, 'y-MM-dd'));
      closePopper();
    } else {
      setInputValue('');
    }
  };

  return (
    <FocusTrap
      active
      focusTrapOptions={{
        initialFocus: false,
        allowOutsideClick: true,
        clickOutsideDeactivates: true,
        fallbackFocus: buttonRef.current || undefined,
      }}
    >
      <AnimatePresence>
        <motion.div
          className="dialog-sheet dark:bg-neutral-900 bg-white border-2 rounded-md"
          style={{
            ...popper.styles.popper,
            zIndex: 100,
            transform: 'translate3d(240px, 2px, 0px)',
            position: 'absolute',
          }}
          tabIndex={-1}
          {...popper.attributes.popper}
          animate={{ x: 250, opacity: 1 }}
          aria-label="DayPicker calendar"
          exit={{ x: -300, opacity: 0 }}
          initial={{ x: -300, opacity: 0 }}
          ref={setPopperElement}
          role="dialog"
        >
          <DayPicker
            defaultMonth={selected}
            initialFocus={isPopperOpen}
            mode="single"
            modifiersClassNames={{
              selected: 'my-selected',
              today: 'my-today',
            }}
            numberOfMonths={1}
            onSelect={handleDaySelect}
            selected={selected}
            weekStartsOn={1}
          />
        </motion.div>
      </AnimatePresence>
    </FocusTrap>
  );
};
