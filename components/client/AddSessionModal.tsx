"use client";
import {
  Avatar,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaChalkboardTeacher } from "react-icons/fa";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UnifiedStudent } from "@/lib/students";
import { SessionType } from "@prisma/client";

export default function AddSessionModal({ studentId }: { studentId: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [student, setStudent] = useState<UnifiedStudent | null>(null);
  const [sessions, setSessions] = useState<SessionType[]>([]); // TODO: Replace with SessionType[
  const [currentSection, setCurrentSection] = useState(1);
  const [summary, setSummary] = useState<string | null>(null);
  const form = useForm();

  const progressOptions = [
    {
      text: "Poor",
      value: "POOR",
      startContent: <>👎</>,
    },
    {
      text: "Average",
      value: "AVERAGE",
      startContent: <>👍</>,
    },
    {
      text: "Excellent",
      value: "EXCELLENT",
      startContent: <>🙌</>,
    },
  ];
  const submissionOptions = [
    {
      value: "First Time Submission",
    },
    {
      value: "Project Resubmission",
    },
  ];
  const followUpOptions = [
    {
      value: "Yes",
    },
    {
      value: "No",
    },
  ];

  useEffect(() => {
    const fetchSessions = async () => {
      const sessions = await fetch(`/api/sessions/types`).then((res) =>
        res.json()
      );

      if (!sessions) return;
      sessions.sort((a: SessionType, b: SessionType) => a.order - b.order);
      setSessions(sessions);
      console.log(sessions);
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
            <>
              <Form {...form}>
                <form
                  className="space-y-8"
                  onSubmit={form.handleSubmit(onSubmit)}>
                  <ModalHeader className="flex flex-col gap-1">
                    Let&apos;s record a session
                  </ModalHeader>
                  <ModalBody>
                    {currentSection === 1 && (
                      <>
                        <FormField
                          control={form.control}
                          name="date"
                          render={() => (
                            <FormItem>
                              <FormLabel />
                              <FormControl />
                              <FormLabel>Session Date</FormLabel>
                              <Input type="date" />
                              <FormDescription />
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="duration"
                          render={() => (
                            <FormItem>
                              <FormLabel />
                              <FormControl />
                              <FormLabel>Session Duration</FormLabel>
                              <Input type="number" />
                              <FormDescription>
                                System will add 4 minutes automatically
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                    {currentSection === 2 && (
                      <>
                        <FormField
                          control={form.control}
                          name="session"
                          render={() => (
                            <FormItem>
                              <FormLabel />
                              <FormControl />
                              <Select
                                items={sessions}
                                label="Session Type"
                                placeholder="Select Session Type"
                                labelPlacement="outside"
                                classNames={{
                                  trigger: "h-12",
                                }}
                                renderValue={(items) => {
                                  return items.map((item) => (
                                    <div
                                      key={item.key}
                                      className="flex items-center gap-2">
                                      <Avatar
                                        alt={item.data?.name}
                                        className="flex-shrink-0"
                                        size="sm"
                                        color="default"
                                        name={item.data?.icon}
                                      />
                                      <div className="flex flex-col">
                                        <span>{item?.data?.name}</span>
                                      </div>
                                    </div>
                                  ));
                                }}>
                                {(session) => (
                                  <SelectItem
                                    key={session.id}
                                    textValue={session.name}>
                                    <div className="flex gap-2 items-center">
                                      <Avatar
                                        alt={session.name}
                                        className="flex-shrink-0"
                                        size="sm"
                                        color="default"
                                        name={session.icon}
                                      />
                                      <div className="flex flex-col">
                                        <span className="text-small">
                                          {session.name}
                                        </span>
                                      </div>
                                    </div>
                                  </SelectItem>
                                )}
                              </Select>
                              <FormDescription />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="project"
                          render={() => (
                            <FormItem>
                              <FormLabel />
                              <FormControl />
                              <Select
                                items={student.projects}
                                label="Project"
                                placeholder="Select Project"
                                labelPlacement="outside"
                                classNames={{
                                  trigger: "h-12",
                                }}
                                renderValue={(items) => {
                                  return items.map((item) => (
                                    <div
                                      key={item.key}
                                      className="flex items-center gap-2">
                                      <Avatar
                                        alt={item.data?.prefix.toUpperCase()}
                                        className="flex-shrink-0"
                                        size="sm"
                                        color="danger"
                                        name={item.data?.prefix.toUpperCase()}
                                      />
                                      <div className="flex flex-col">
                                        <span>{item?.data?.name}</span>
                                      </div>
                                    </div>
                                  ));
                                }}>
                                {(project) => (
                                  <SelectItem
                                    key={project.id}
                                    textValue={project.name}>
                                    <div className="flex gap-2 items-center">
                                      <Avatar
                                        alt={project.name}
                                        className="flex-shrink-0"
                                        size="sm"
                                        color="danger"
                                        name={project.prefix.toUpperCase()}
                                      />
                                      <div className="flex flex-col">
                                        <span className="text-small">
                                          {project.name}
                                        </span>
                                      </div>
                                    </div>
                                  </SelectItem>
                                )}
                              </Select>
                              <FormDescription />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="progress"
                          render={() => (
                            <FormItem>
                              <FormLabel />
                              <FormControl />

                              <Select
                                label="Progress"
                                placeholder="Select student progress">
                                {progressOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                    startContent={option.startContent}>
                                    {option.text}
                                  </SelectItem>
                                ))}
                              </Select>
                              <FormDescription />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                    {currentSection === 3 && (
                      <>
                        <Textarea
                          isRequired
                          maxRows={4}
                          label="Summary"
                          labelPlacement="outside"
                          placeholder="Summary of the session"
                          value={summary!}
                          onChange={(e) => setSummary(e.target.value)}
                        />
                        <Textarea
                          maxRows={4}
                          label="Personal Notes"
                          labelPlacement="outside"
                          placeholder="Personal Notes (Not given to CI)"
                        />
                      </>
                    )}
                    {currentSection === 4 && (
                      <>
                        <FormField
                          control={form.control}
                          name="submission"
                          render={() => (
                            <FormItem>
                              <FormLabel />
                              <FormControl />

                              <Select
                                label="Was this for a first time project submission or a project re-submission?"
                                placeholder="Select type of submission"
                                isRequired>
                                {submissionOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                    defaultValue={"First Time Submission"}>
                                    {option.value}
                                  </SelectItem>
                                ))}
                              </Select>
                              <FormDescription />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="followup"
                          render={() => (
                            <FormItem>
                              <FormLabel />
                              <FormControl />
                              <Select
                                isRequired
                                label="Do you want Student Care to follow up with the student?"
                                placeholder="Is a follow up required">
                                {followUpOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                    defaultValue={"No"}>
                                    {option.value}
                                  </SelectItem>
                                ))}
                              </Select>
                              <FormDescription />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
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
              </Form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
