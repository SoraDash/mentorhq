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
import { useEffect, useState } from 'react';
import React from 'react';
import { FaChalkboardTeacher } from 'react-icons/fa';

import { UnifiedStudent } from '@/lib/students';

import { StepA } from './sessions/StepA';
import { StepB } from './sessions/StepB';
import { StepC } from './sessions/StepC';
import { StepD } from './sessions/StepD';
import { StepFinal } from './sessions/StepFinal';

interface StepComponent {
  Component: React.FC<any>;
  props: any;
}

export default function AddSessionModal({ studentId }: { studentId: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentSection, setCurrentSection] = useState(1);
  const [sessions, setSessions] = useState<SessionType[]>([]); // TODO: Replace with SessionType[
  const [student, setStudent] = useState<UnifiedStudent | null>(null);
  const initialValues = {
    studentId,
    id: null,
    date: new Date().toISOString().split('T')[0],
    duration: '11',
    session: {},
    project: {},
    progress: {},
    summary: '',
    personalNotes: '',
    submissionType: 'First Time Submission',
    follow_up: 'No',
  };

  const stepComponents: StepComponent[] = [
    { Component: StepA, props: {} },
    {
      Component: StepB,
      props: {
        sortedSessions: sessions || [],
        projects: student?.projects || [],
      },
    },
    { Component: StepC, props: {} },
    { Component: StepD, props: {} },
    { Component: StepFinal, props: {} },
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

  const onSubmit = (values: FormikValues) => {
    if (currentSection === totalSteps) {
      console.log('Final part of the form submitted', values);
      onOpenChange();
    } else {
      console.log(`Submitting Step ${currentSection}`, values);
      setCurrentSection((prev) => prev + 1);
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
                  Let&apos;s record a session
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
                  {currentSection < totalSteps && (
                    <Button color="primary" type="submit">
                      Next
                    </Button>
                  )}
                  {currentSection === totalSteps && (
                    <Button color="success" type="submit">
                      Submit
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
