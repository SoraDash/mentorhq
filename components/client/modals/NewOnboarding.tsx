import React, { useEffect, useState, FormEvent } from 'react';
import { onboardUser } from '@/actions/user.actions';
import NameForm from '@/components/server/forms/onboarding/NameForm';
import MiscForm from '@/components/server/forms/onboarding/MiscForm';
import SocialForm from '@/components/server/forms/onboarding/SocialForm';
import { useToast } from '@/components/ui/use-toast';
import { useMultistepForm } from '@/hooks/useMultiStepForm';
import { getUser } from '@/lib/auth/auth';
import { INITIAL_DATA } from '@/lib/validations/UserValidation';
import { useRouter } from 'next/navigation';
import { CustomFormData } from '@/types/FormDataTypes';

const NewOnboarding = () => {
  const [open, setOpen] = useState(false);
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

  const updateFields = (fields: Partial<FormData | CustomFormData>) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { currentStepIndex, step, stepTitles, isFirstStep, isLastStep, back, next } =
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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isLastStep) return next();
    onboardUser(data)
      .then(response => {
        if (response.success) {
          toast({
            title: "Success: You're in!",
            description: "You've successfully completed onboarding.",
            variant: "success",
          });
        }
        setTimeout(() => router.refresh(), 300);
      })
      .catch(error => { /* Handle errors here */ });
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>{stepTitles[currentStepIndex]}</h1>
      {step}
      <div>
        {!isFirstStep && <button type="button" onClick={back}>Back</button>}
        <button type="submit">{isLastStep ? 'Finish' : 'Next'}</button>
      </div>
    </form>
  );
};

export default NewOnboarding;
