"use client";
import { PasswordInput } from "@/components/client/ShowHideInput";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { useStepStore } from "@/store/useStepStore";
import { MiscFormData } from "@/types/FormDataTypes";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import React, { useState } from "react";

const MiscForm: React.FC = () => {
  const formData = useStepStore((state) => state.formData.misc || {});
  const updateFormData = useStepStore((state) => state.updateFormData);

  const updateFields = (fields: Partial<MiscFormData>) => {
    updateFormData("misc", fields);
  };
  const [date, setDate] = useState(new Date());

  const handleDateSelect = (selectedDate: any) => {
    setDate(selectedDate);
  };

  return (
    <div className='grid grid-cols-1 gap-4 mt-3 mb-4 space-y-5'>
      <div>
        <Popover placement='right'>
          <PopoverTrigger>
            <Button>Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode='single'
              selected={date}
              onSelect={handleDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <label
          className='block text-gray-700 dark:text-white text-sm font-bold mb-2'
          htmlFor='paidPerHour'>
          Paid Per Hour
        </label>
        <Input
          type='number'
          id='paidPerHour'
          value={formData.paidPerHour || ""}
          onChange={(e) => updateFields({ paidPerHour: +e.target.value })}
          className='w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none'
        />
      </div>
      <div>
        <label
          className='block text-gray-700 dark:text-white text-sm font-bold mb-2'
          htmlFor='ciApiKey'>
          CI API Key
        </label>
        <PasswordInput
          id='ciApiKey'
          value={formData.ciApiKey || ""}
          onChange={(e) => updateFields({ ciApiKey: e.target.value })}
          className='w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none'
        />
        <label
          className='block text-gray-700 dark:text-white text-sm font-bold my-5'
          htmlFor='ciApiKey'>
          CI Api Email
          <span className='text-red-500 ml-3'>Case Sensetive</span>
        </label>
        <Input
          type='email'
          id='ciEmail'
          value={formData.ciEmail || ""}
          onChange={(e) => updateFields({ ciEmail: e.target.value })}
          className='w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none'
        />
      </div>

      <div className='mt-5'>
        <div className='flex items-center'>
          <Input
            type='checkbox'
            id='sendWelcomeEmail'
            checked={formData.sendWelcomeEmail || false}
            onChange={(e) =>
              updateFields({ sendWelcomeEmail: e.target.checked })
            }
            className='peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground'
          />
          <span className='ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
            Send Welcome Email to students
          </span>
        </div>
        <p className='text-xs text-gray-500 dark:text-white mt-3 mb-1'>
          Enable this to have the system email students when they are assigned
          to you?
        </p>
      </div>
    </div>
  );
};

export default MiscForm;
