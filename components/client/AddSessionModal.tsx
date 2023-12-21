'use client';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { Project, SessionType } from '@prisma/client';
import { Formik, FormikValues } from 'formik';
import React, { useEffect, useState } from 'react';
import { FaChalkboardTeacher } from 'react-icons/fa';

import { generateFeedbackURL } from '@/lib/generate-url';

import { StepA } from './sessions/StepA';
import { StepB } from './sessions/StepB';
import { StepC } from './sessions/StepC';
import { StepD } from './sessions/StepD';
import { StepFinal } from './sessions/StepFinal';
import { StepReview } from './sessions/StepReview';
import { UnifiedStudent } from '../../lib/students/types';

interface StepComponent {
  Component: React.FC<any>;
  header: string;
  props: any;
}
interface AddSessionModalProps {
  studentEmail: string;
  studentId: string;
  studentName: string;
}

export default function AddSessionModal({
  studentId,
  studentName,
}: AddSessionModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentSection, setCurrentSection] = useState(1);
  const [sessions, setSessions] = useState<SessionType[]>([]); // TODO: Replace with SessionType[
  const [student, setStudent] = useState<UnifiedStudent | null>(null);
  const initialValues = {
    studentId,
    id: null,
    date: new Date().toISOString().split('T')[0],
    duration: '15',
    summary: '',
    personalNotes: '',
    session: {},
    project: {},
    progress: {
      label: 'Average',
      value: 'AVERAGE',
      emoji: '😊',
    },
    submissionType: {
      value: 'First Time Submission',
      label: 'First Time Submission',
      emoji: '🆕',
    },
    follow_up: {
      value: 'No',
      label: 'No',
      emoji: '👍',
    },
  };

  const stepComponents: StepComponent[] = [
    {
      Component: StepA,
      header: `Let's record a session for ${studentName}`,
      props: {},
    },
    {
      Component: StepB,
      header: `What type of session was this with ${studentName}`,
      props: {
        sortedSessions: sessions || [],
        projects: student?.projects || [],
      },
    },
    {
      Component: StepC,
      props: {},
      header: `Summary of session`,
    },
    {
      Component: StepD,
      props: {},
      header: 'Type of submission and CI follow up',
    },
    {
      Component: StepReview,
      header: `Are you satisfied with the session with ${studentName}?`,
      props: {},
    },
    {
      Component: StepFinal,
      header: `We have submitted the session for ${studentName}!`,
      props: {
        name: studentName,
      },
    },
  ];
  const totalSteps = stepComponents.length;
  const CurrentStepComponent = stepComponents[currentSection - 1].Component;
  const currentStepProps = stepComponents[currentSection - 1].props;

  useEffect(() => {
    async function fetchStudent() {
      const response = await fetch(`/api/students/${studentId}`);

      if (!response.ok) return;

      const student = await response.json();

      if (student && student.projects) {
        sortProjects(student.projects);
        setStudent(student);
      }
    }

    fetchStudent();
  }, [studentId]);

  const sortProjects = (projects: Project[]) => {
    projects.sort((a, b) => {
      const numA = a.prefix ? parseInt(a.prefix.replace('pp', ''), 10) : NaN;
      const numB = b.prefix ? parseInt(b.prefix.replace('pp', ''), 10) : NaN;

      if (isNaN(numA)) return 1;
      if (isNaN(numB)) return -1;

      return numA - numB;
    });
  };

  useEffect(() => {
    const fetchSessions = async () => {
      const sessions = await fetch(`/api/sessions/types`).then((res) =>
        res.json(),
      );

      if (!sessions) return;
      sessions.sort((a: SessionType, b: SessionType) => a.order - b.order);
      setSessions(sessions);
    };

    fetchSessions();
  }, []);

  if (!student) return null;

  const onSubmit = async (values: FormikValues) => {
    // Adjust the duration if necessary
    const duration = parseInt(values.duration, 10);

    if (duration > 15) {
      values.duration = duration + 4;
    }

    if (currentSection === totalSteps - 1) {
      // Changed to next-to-last step
      console.log('values on submit', values);

      const feedbackURL = await generateFeedbackURL({
        studentEmail: student?.email,
        values,
      });

      console.log('Feedback URL:', feedbackURL); // Log the generated URL

      setCurrentSection((prev) => prev + 1); // Proceed to the final step
    } else if (currentSection === totalSteps) {
      console.log('Final part of the form submitted', values);
      onOpenChange(); // Close the modal or handle final step
    } else {
      console.log(`Submitting Step ${currentSection}`, values);
      setCurrentSection((prev) => prev + 1); // Proceed to the next step
    }
  };

  const handleModalChange = (isOpen: boolean) => {
    if (!isOpen) {
      setCurrentSection(1);
    }

    onOpenChange();
  };

  return (
    <>
      <Button
        color="primary"
        onPress={onOpen}
        startContent={<FaChalkboardTeacher />}
        variant="light"
      />
      <Modal
        backdrop="blur"
        isDismissable={true}
        isOpen={isOpen}
        onOpenChange={handleModalChange}
        size="3xl"
      >
        <ModalContent>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <ModalHeader className="flex flex-col gap-1">
                  {stepComponents[currentSection - 1].header}
                </ModalHeader>
                <ModalBody>
                  <CurrentStepComponent {...currentStepProps} />
                </ModalBody>
                <ModalFooter className="flex justify-between">
                  {currentSection > 1 && (
                    <Button
                      color="default"
                      onPress={() => setCurrentSection((prev) => prev - 1)}
                    >
                      Back
                    </Button>
                  )}
                  {currentSection < totalSteps &&
                    currentSection !== totalSteps - 1 && (
                      <Button color="primary" type="submit">
                        Next
                      </Button>
                    )}
                  {currentSection === totalSteps - 1 && (
                    <Button color="success" type="submit">
                      Submit it 🚀
                    </Button>
                  )}
                  {currentSection === totalSteps && (
                    <Button color="primary" type="submit">
                      Finish
                    </Button>
                  )}
                </ModalFooter>
              </form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
}
