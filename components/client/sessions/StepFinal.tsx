'use client';

import { FormikValues, useFormikContext } from 'formik';
import Lottie from 'lottie-react';
import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';

import { useToast } from '@/components/ui/use-toast';
import animationData from '@/public/checkmark-static.json';

interface StepFinalProps {
  name: string;
}

export const StepFinal = ({ name }: StepFinalProps) => {
  const { values } = useFormikContext<FormikValues>();
  const { toast } = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard',
      description: `${
        text === name ? name : `${text} minutes`
      } copied to clipboard`,
      variant: 'success',
      duration: 1500,
    });
  };

  return (
    <div className="flex flex-col items-center p-6">
      <Lottie
        animationData={animationData}
        autoplay={true}
        loop={false}
        style={{ height: 150, width: 150 }}
      />
      <div className="text-center mt-4">
        <div className="text-2xl font-semibold mb-2">Session Submitted</div>
        <div className="mb-4">Here is the summary for your convenience</div>
        <div className="flex items-center justify-center">
          <div
            className=" p-2 rounded-md mr-2"
            onClick={() => handleCopy(name)}
          >
            <span>Student name: </span>
            <span className="font-semibold">{name}</span>
          </div>
          <FiCopy className="cursor-pointer" onClick={() => handleCopy(name)} />
        </div>
        <div className="flex items-center justify-center mt-2">
          <div className="p-2 rounded-md mr-2">
            <span>
              Session Time:{' '}
              <span className="font-semibold">{values.duration} minutes</span>
            </span>
          </div>
          <FiCopy
            className="cursor-pointer"
            onClick={() => handleCopy(values.duration.toString())}
          />
        </div>
      </div>
    </div>
  );
};
