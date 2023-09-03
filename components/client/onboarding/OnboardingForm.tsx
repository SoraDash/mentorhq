"use client";
import { onboardUser } from '@/actions/user.actions';
import { useToast } from '@/components/ui/use-toast';
import { getUser } from '@/lib/auth/auth';
import { useStepStore } from '@/store/useStepStore';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useEffect } from 'react';

const OnboardingForm: React.FC = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { currentStep, updateFormData, back, next, steps, isFirstStep } = useStepStore();
  const formData = useStepStore(state => state.formData);
  const isLastStep = useStepStore(state => state.isLastStep);


  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUser();

      if (user) {
        const nameData = {
          firstName: user.firstName || "",
          lastName: user.lastName || "",
        };
        const miscData = {
          ciEmail: user.email || "",
          ciApiKey: user.ciApiKey || "",
          paidPerHour: user.paidPerHour || 0,
          sendWelcomeEmail: user.sendWelcomeEmail || false,
          website: user.website || ""
        };
        const socialData = {
          github: user.github || "",
          twitter: user.twitter || "",
          linkedIn: user.linkedIn || "",
          slack: user.slack || "",
          skype: user.skype || ""
        };
        updateFormData('name', nameData);
        updateFormData('misc', miscData);
        updateFormData('social', socialData);
      }
    };

    fetchUserData();
  }, [updateFormData]);



  const getMergedFormData = () => {
    const mergedData = {
      ...formData.name,
      ...formData.misc,
      ...formData.social,
    }
    return mergedData;
  };

  const mergedData = getMergedFormData();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isLastStep) return next();
    onboardUser(mergedData)
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
      .catch(error => {
        console.log(error);
        toast({
          title: "Error: Something went wrong",
          description: "Please try again.",
          variant: "destructive",
        });
      })
  };

  const CurrentFormComponent = steps[currentStep] || (() => <div>Error: Unknown step!</div>);

  return (
    <div>
      <CurrentFormComponent />

      <div className="mt-4 flex justify-end">
        {/* Show Back button if it's not the first step */}
        {!isFirstStep && (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded mr-2"
            onClick={back}
          >
            Prev
          </button>
        )}

        {/* Show Next button if it's not the last step */}
        {!isLastStep && (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={next}
          >
            Next
          </button>
        )}

        {/* Show Submit button only on the last step */}
        {isLastStep && (
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default OnboardingForm;