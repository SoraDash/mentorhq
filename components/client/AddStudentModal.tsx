'use client';

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { ContactMethod, Student } from '@prisma/client';
import { Form, Formik, FormikValues } from 'formik';
import { capitalize } from 'lodash-es';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaSkype } from 'react-icons/fa';
import { PiStudentBold } from 'react-icons/pi';

import { createStudent } from '@/lib/students';
import { courses } from '@/prisma/data';

import { FormikSelect } from '../forms/FormikSelect';
import { useToast } from '../ui/use-toast';

export default function AddStudentModal() {
  const { toast } = useToast();
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const initialValues = {
    name: '',
    email: '',
    status: 'Unknown',
    courseCode: '',
    programmeID: {},
    skype: '',
    slack: '',
    github: '',
    linkedIn: '',
    contactMethod: {
      value: 'SLACK',
      label: 'Slack',
      image: '/brands/slack.svg',
    },
  };

  const programmeIdOptions = courses.map((course) => ({
    value: course.courseCode,
    label: `${course.name} (${course.courseCode} - ${course.prefix}${course.projectCount})`,
    description: course.description,
    prefix: course.prefix,
    projectCount: course.projectCount,
  }));

  const courseOptions = Object.keys(ContactMethod).map((item) => ({
    value: item,
    label: capitalize(item),
    image: `/brands/${item.toLowerCase()}.svg`,
  }));
  const [currentSection, setCurrentSection] = useState(1);

  return (
    <>
      <Button color="primary" onPress={onOpen} startContent={<PiStudentBold />}>
        Add Student
      </Button>
      <Modal
        backdrop="blur"
        isDismissable={false}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="3xl"
      >
        <ModalContent>
          {() => (
            <Formik
              initialValues={initialValues}
              onSubmit={async (values: FormikValues, actions) => {
                actions.setSubmitting(true);
                console.log({ values, actions });

                try {
                  const student = {
                    ...values,
                    programmeID: values.programmeID.value,
                    contactMethod: values.contactMethod.value,
                  } as Student;

                  await createStudent(student);
                  toast({
                    title: 'Success',
                    description: 'Student created',
                    variant: 'success',
                  });
                } catch (error: string | any) {
                  toast({
                    title: 'Error',
                    description: error.message,
                    variant: 'destructive',
                  });
                } finally {
                  actions.setSubmitting(false);
                  onClose();
                  router.refresh();
                }
              }}
            >
              {(formikProps) => {
                const { handleChange, isSubmitting, values } = formikProps;

                return (
                  <Form className="space-y-3">
                    <ModalHeader className="flex flex-col gap-1">
                      Let&apos;s record a session
                    </ModalHeader>
                    <ModalBody>
                      {currentSection === 1 && (
                        <>
                          <Input
                            className="my-5"
                            id="name"
                            isRequired
                            label="Student Full Name"
                            onChange={handleChange}
                            type="text"
                            value={values.name}
                          />
                          <Input
                            className="mb-5"
                            id="email"
                            isRequired
                            label="Student Email"
                            onChange={handleChange}
                            type="email"
                            value={values.email}
                          />
                        </>
                      )}

                      {currentSection === 2 && (
                        <>
                          <Input
                            className="mb-5"
                            id="courseCode"
                            isRequired
                            label="Course Code"
                            onChange={handleChange}
                            type="text"
                            value={values.courseCode || ''}
                          />
                          <FormikSelect
                            isRequired
                            label="Programme ID"
                            name="programmeID"
                            options={programmeIdOptions}
                          />
                          <FormikSelect
                            className="mb-5"
                            defaultValue={courseOptions[0]}
                            isRequired
                            label="Prefered Contact Method"
                            name="contactMethod"
                            options={courseOptions}
                          />
                        </>
                      )}

                      {currentSection === 3 && (
                        <>
                          {/* Add your social fields here */}
                          <Input
                            id="skype"
                            label="Skype Username"
                            onChange={handleChange}
                            startContent={<FaSkype />}
                            type="text"
                            value={values.skype || ''}
                          />
                          <Input
                            id="slack"
                            label="Slack Handle"
                            onChange={handleChange}
                            startContent={
                              <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">
                                  @
                                </span>
                              </div>
                            }
                            type="text"
                            value={values.slack || ''}
                          />
                          <Input
                            id="github"
                            label="GitHub Username"
                            onChange={handleChange}
                            startContent={
                              <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">
                                  @
                                </span>
                              </div>
                            }
                            type="text"
                            value={values.github || ''}
                          />
                          <Input
                            id="linkedIn"
                            label="LinkedIn Username"
                            onChange={handleChange}
                            startContent={
                              <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">
                                  https://linkedin.com/in/
                                </span>
                              </div>
                            }
                            type="text"
                            value={values.linkedIn || ''}
                          />
                        </>
                      )}
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
                      {currentSection < 3 && (
                        <Button
                          color="primary"
                          onPress={() => setCurrentSection((prev) => prev + 1)}
                        >
                          Next
                        </Button>
                      )}
                      {currentSection === 3 && (
                        <Button
                          color="success"
                          disabled={isSubmitting}
                          type="submit"
                        >
                          Submit
                        </Button>
                      )}
                    </ModalFooter>
                  </Form>
                );
              }}
            </Formik>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
