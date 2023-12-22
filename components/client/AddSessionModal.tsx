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
import axios from 'axios';
import { Formik, FormikValues } from 'formik';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
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
  const [sessions, setSessions] = useState<SessionType[]>([]);
  const [student, setStudent] = useState<UnifiedStudent | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
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
      header: `Session Submitted for ${studentName}!`,
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

  if (!student) {
    return null;
  }

  const onSubmit = async (values: FormikValues, { setFieldValue }: any) => {
    let duration = parseInt(values.duration, 10);

    if (duration > 15) {
      duration = duration + 4;
      setFieldValue('duration', duration.toString());
    }

    values = { ...values, duration: duration.toString() };

    if (currentSection === totalSteps - 1) {
      console.log('values on submit', values);

      try {
        const feedbackURL = await generateFeedbackURL({
          studentEmail: student?.email,
          values,
        });

        console.log('Feedback URL:', feedbackURL);
        window.open(feedbackURL, '_blank');

        setCurrentSection((prev) => prev + 1);
      } catch (error) {
        console.error('Error generating feedback URL:', error);
      }
    } else if (currentSection === totalSteps) {
      console.log('Final part of the form submitted', values);
      onOpenChange();
    } else {
      console.log(`Submitting Step ${currentSection}`, values);

      try {
        const patchData = async () => {
          const response = await axios.patch('/api/sessions', values);
          const session = response.data;

          if (!sessionId) {
            setSessionId(session.id);
            setFieldValue('id', session.id);
          }

          setCurrentSection((prev) => prev + 1); // Proceed to the next step

          return session;
        };

        toast.promise(patchData(), {
          loading: 'Saving...',
          success: 'Session saved!',
          error: 'Oops! Problem with saving the session.',
        });
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  const handleModalChange = async () => {
    const deleteSession = async () => {
      await axios.delete(`/api/sessions/${sessionId}`);
      console.log(`Session with ID ${sessionId} has been deleted`);
    };

    if (sessionId) {
      toast
        .promise(deleteSession(), {
          loading: 'Vanishing session...',
          success: 'Poof! Gone! Session vanished into thin air!',
          error: 'Whoops! This session is playing hard to delete.',
        })
        .finally(() => {
          setSessionId(null);
          setCurrentSection(1);
        });
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
                <ModalHeader className="flex flex-col gap-1 text-center">
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
                    <Button
                      className="bg-green-500 text-white rounded py-2 px-4"
                      type="submit"
                    >
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
