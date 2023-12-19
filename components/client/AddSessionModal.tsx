"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";

import { UnifiedStudent } from "@/lib/students";
import { SessionType } from "@prisma/client";
import { Formik } from "formik";
import { StepA } from "./sessions/StepA";
import { StepB } from "./sessions/StepB";
import { StepC } from "./sessions/StepC";
import { StepD } from "./sessions/StepD";

export default function AddSessionModal({ studentId }: { studentId: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentSection, setCurrentSection] = useState(1);
  const [summary, setSummary] = useState<string | null>(null);
  const [sessions, setSessions] = useState<SessionType[]>([]); // TODO: Replace with SessionType[
  const [student, setStudent] = useState<UnifiedStudent | null>(null);

  const initialValues = {
    // Todays date as a string
    date: new Date().toISOString().split("T")[0],
    duration: "11",
    session: "",
    project: "",
    progress: "",
    summary: "",
    personalNotes: "",
    submissionType: "First Time Submission",
    follow_up: "No",
    // Add other form fields as needed
  };

  useEffect(() => {
    const fetchSessions = async () => {
      const sessions = await fetch(`/api/sessions/types`).then((res) =>
        res.json()
      );

      if (!sessions) return;
      sessions.sort((a: SessionType, b: SessionType) => a.order - b.order);
      setSessions(sessions);
    };
    fetchSessions();
  }, []);

  useEffect(() => {
    const fetchStudent = async () => {
      const student = await fetch(`/api/students/${studentId}`).then((res) =>
        res.json()
      );

      if (!student) return;

      // Sort the projects based on the prefix
      if (student.projects) {
        student.projects.sort((a: any, b: any) => {
          const numA = a.prefix
            ? parseInt(a.prefix.replace("pp", ""), 10)
            : NaN;
          const numB = b.prefix
            ? parseInt(b.prefix.replace("pp", ""), 10)
            : NaN;

          if (isNaN(numA)) return 1; // Move items with invalid prefix to the end
          if (isNaN(numB)) return -1; // Move items with invalid prefix to the beginning

          return numA - numB; // Simplified return for sorting
        });
      }

      setStudent(student);
    };

    fetchStudent();
  }, [studentId]);
  if (!student) return null;

  const onSubmit = (data: any) => {
    console.log(data);
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
        onOpenChange={onOpenChange}
        size="3xl">
        <ModalContent>
          {(onClose) => (
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}>
              {({ values, setFieldValue, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <ModalHeader className="flex flex-col gap-1">
                    Let&apos;s record a session
                  </ModalHeader>
                  <ModalBody>
                    {currentSection === 1 && <StepA />}
                    {currentSection === 2 && (
                      <StepB
                        sortedSessions={sessions}
                        projects={student.projects}
                      />
                    )}
                    {currentSection === 3 && <StepC />}
                    {currentSection === 4 && <StepD />}
                  </ModalBody>
                  <ModalFooter className="flex justify-between">
                    {currentSection > 1 && (
                      <Button
                        color="default"
                        onPress={() => setCurrentSection((prev) => prev - 1)}>
                        Back
                      </Button>
                    )}
                    {currentSection < 4 && (
                      <Button
                        color="primary"
                        onPress={() => setCurrentSection((prev) => prev + 1)}>
                        Next
                      </Button>
                    )}
                    {currentSection === 4 && (
                      <Button
                        type="submit"
                        color="success">
                        Submit
                      </Button>
                    )}
                  </ModalFooter>
                </form>
              )}
            </Formik>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
