"use client"
import React, { useEffect, useState } from 'react';
import { StepA } from './StepA';
import { StepB } from './StepB';
import { StepC } from './StepC';
import { StepD } from './StepD';
import { StepE } from './StepE';
import { StepFinal } from './StepFinal';

interface MultiStepFormProps {
  showStepNumber: string | number | boolean;
}

// STEP A Date & Time of Session
// STEP B Session Information
// STEP C Session Notes
// STEP D CI Information
// STEP E Confirmation

// STEP Final: Success Result

const intialFormData = {
  sessionDate: new Date().toISOString(),
  sessionTime: 0 || "",
  sessionType: "",
  projectType: "",
  sessionProgress: "",
  summary: "",
  personalNotes: "",
  resubmission: false,
  ciFollowUp: false,
}
const stepsToTake = ["A", "B", "C", "D", "E"]

export const MultiStepForm: React.FC<MultiStepFormProps> = ({
  showStepNumber
}) => {
  const [step, setStep] = useState("A")
  const [formData, setFormData] = useState(intialFormData)

  const handleNextStep = () => {
    if (step === "A") setStep("B")
    else if (step === "B") setStep("C")
    else if (step === "C") setStep("D")
    else if (step === "D") setStep("E")
  }
  const handlePrevStep = () => {
    if (step === "E") setStep("D")
    else if (step === "D") setStep("C")
    else if (step === "C") setStep("B")
    else if (step === "B") setStep("A")
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name
    let fieldValue;
    if (fieldName === "resubmission" || fieldName === "ciFollowUp") {
      fieldValue = e.target.checked
    } else {
      fieldValue = e.target.value
    }
    setFormData({
      ...formData,
      [fieldName]: fieldValue
    })
  }
  const handleSubmitFormData = () => {
    setStep("Final")
  }

  const renderTopStepNumbers = () => {
    if (!showStepNumber || step === "Final") return null
    return (
      <div className="mt-2 mb-4 flex justify-between">
        {stepsToTake.map((stepName, index) => (
          <div key={stepName + index}
            className={`w-8 h-8 rounded-full border-2 border-600 flex items-center justify-center ${stepName === step ? 'bg-primary' : ''}`}
            onClick={() => setStep(stepName)}
          >
            {stepName}
          </div>
        ))
        }
      </div >
    )
  }
  useEffect(() => {
    console.log(formData)
  }, [formData])
  return (
    <div className='px-6 py-1 mx-auto rounded-lg  cursor-pointer'>
      {renderTopStepNumbers()}
      {step === "A" && <StepA />}
      {step === "B" && <StepB />}
      {step === "C" && <StepC />}
      {step === "D" && <StepD />}
      {step === "E" && <StepE />}
      {step === "Final" && <StepFinal />}
    </div>
  );
}