"use client"

import { onboardUser } from '@/actions/user.actions';
import MiscForm from '@/components/server/forms/onboarding/MiscForm';
import NameForm from '@/components/server/forms/onboarding/NameForm';
import SocialForm from '@/components/server/forms/onboarding/SocialForm';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { useToast } from '@/components/ui/use-toast';
import { useMultistepForm } from '@/hooks/useMultiStepForm';
import useOnboardingModal from "@/hooks/useOnboardingModal";
import { getUser } from '@/lib/auth/auth';
import { INITIAL_DATA } from '@/lib/validations/UserValidation';
import { CustomFormData } from '@/types/FormDataTypes';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

export const OnboardingModal = () => {
  const modal = useOnboardingModal();
  const [data, setData] = useState(INITIAL_DATA);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUser();
      if (user) {
        setData((prev) => ({
          ...prev,
          firstName: user.firstName || prev.firstName,
          lastName: user.lastName || prev.lastName,
          ciEmail: user.email || prev.ciEmail,
          ciApiKey: user.ciApiKey || prev.ciApiKey,
          github: user.github || prev.github,
          twitter: user.twitter || prev.twitter,
          linkedIn: user.linkedIn || prev.linkedIn,
          paidPerHour: user.paidPerHour || prev.paidPerHour,
          sendWelcomeEmail: user.sendWelcomeEmail || prev.sendWelcomeEmail,
          website: user.website || prev.website,
          slack: user.slack || prev.slack,
          skype: user.skype || prev.skype,
        }));
      }
    };

    fetchUserData();
  }, []);

  function updateFields(fields: Partial<FormData | CustomFormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { currentStepIndex, step, stepTitles, stepDescriptions, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      {
        title: "Basic Information",
        description: "Provide some basic details about yourself",
        component: <NameForm {...data} updateFields={updateFields} key={"name"} />,
      },
      {
        title: "Code Insitute Information",
        description: "Gather some info about your Code Institute account",
        component: <MiscForm {...data} updateFields={updateFields} key={"misc"} />,
      },
      {
        title: "Additional Information",
        description: "Share extra information for a better profile",
        component: <SocialForm {...data} updateFields={updateFields} key={"social"} />,
      },
    ]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    onboardUser(data)
      .then(response => {
        if (response.success) {
          modal.onClose();
          toast({
            title: "Success: You're in!",
            description: "You've successfully completed onboarding.",
            variant: "success",
          })
        }
        setTimeout(() => router.refresh(), 300)
      })
      .catch(error => {

      });
  }

  return (
    <Dialog open={modal.isOpen} onOpenChange={modal.onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <form onSubmit={onSubmit}>
          <DialogTitle>{stepTitles[currentStepIndex]}</DialogTitle>
          <DialogDescription>{stepDescriptions[currentStepIndex]}</DialogDescription>
          {step}
          <DialogFooter className="flex justify-between items-center">
            {!isFirstStep && (
              <button
                type="button"
                onClick={back}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
              >
                Back
              </button>
            )}
            <div className="flex space-x-4">
              <button
                type="submit"
                className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded`}
              >
                {isLastStep ? 'Finish' : 'Next'}
              </button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
