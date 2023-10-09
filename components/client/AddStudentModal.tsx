"use client";
import { courses } from "@/prisma/data";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { ContactMethod, Student } from "@prisma/client";
import { Form, Formik } from "formik";
import { capitalize } from "lodash-es";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSkype } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { FormikSelect } from "../FormikSelect";

export default function AddStudentModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const initialValues = {
    name: "",
    email: "",
    status: "Unknown",
    courseCode: "",
    programmeID: "",
    skype: "",
    slack: "",
    github: "",
    linkedIn: "",
    contactMethod: "SLACK",
  } as Student;

  const programmeIdOptions = courses.map((course) => ({
    value: course.courseCode,
    label: course.name,
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
      <Button
        onPress={onOpen}
        startContent={<PiStudentBold />}
        color='primary'>
        Add Student
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        backdrop='blur'
        size='3xl'>
        <ModalContent>
          {() => (
            <Formik
              initialValues={initialValues}
              onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                console.log({ values, actions });
                // await createStudent(values);
                actions.setSubmitting(false);
                router.refresh();
              }}>
              {(formikProps) => {
                const { values, handleChange, isSubmitting } = formikProps;

                return (
                  <Form className='space-y-3'>
                    <ModalHeader className='flex flex-col gap-1'>
                      Let&apos;s record a session
                    </ModalHeader>
                    <ModalBody>
                      {currentSection === 1 && (
                        <>
                          <Input
                            type='text'
                            label='Student Full Name'
                            id='name'
                            isRequired
                            className='my-5'
                            value={values.name}
                            onChange={handleChange}
                          />
                          <Input
                            type='email'
                            label='Student Email'
                            id='email'
                            isRequired
                            className='mb-5'
                            value={values.email}
                            onChange={handleChange}
                          />
                        </>
                      )}

                      {currentSection === 2 && (
                        <>
                          <Input
                            type='text'
                            label='Course Code'
                            id='courseCode'
                            isRequired
                            className='mb-5'
                            value={values.courseCode || ""}
                            onChange={handleChange}
                          />
                          <FormikSelect
                            name='programmeID'
                            label='Programme ID'
                            options={programmeIdOptions}
                            isRequired
                          />
                          <FormikSelect
                            name='contactMethod'
                            label='Prefered Contact Method'
                            options={courseOptions}
                            className='mb-5'
                            isRequired
                          />
                        </>
                      )}

                      {currentSection === 3 && (
                        <>
                          {/* Add your social fields here */}
                          <Input
                            type='text'
                            label='Skype Username'
                            id='skype'
                            startContent={<FaSkype />}
                            value={values.skype || ""}
                            onChange={handleChange}
                          />
                          <Input
                            type='text'
                            label='Slack Handle'
                            id='slack'
                            startContent={
                              <div className='pointer-events-none flex items-center'>
                                <span className='text-default-400 text-small'>
                                  @
                                </span>
                              </div>
                            }
                            value={values.slack || ""}
                            onChange={handleChange}
                          />
                          <Input
                            type='text'
                            label='GitHub Username'
                            id='github'
                            startContent={
                              <div className='pointer-events-none flex items-center'>
                                <span className='text-default-400 text-small'>
                                  @
                                </span>
                              </div>
                            }
                            value={values.github || ""}
                            onChange={handleChange}
                          />
                          <Input
                            type='text'
                            label='LinkedIn Username'
                            id='linkedIn'
                            startContent={
                              <div className='pointer-events-none flex items-center'>
                                <span className='text-default-400 text-small'>
                                  https://linkedin.com/in/
                                </span>
                              </div>
                            }
                            value={values.linkedIn || ""}
                            onChange={handleChange}
                          />
                        </>
                      )}
                    </ModalBody>
                    <ModalFooter className='flex justify-between'>
                      {currentSection > 1 && (
                        <Button
                          color='default'
                          onPress={() => setCurrentSection((prev) => prev - 1)}>
                          Back
                        </Button>
                      )}
                      {currentSection < 3 && (
                        <Button
                          color='primary'
                          onPress={() => setCurrentSection((prev) => prev + 1)}>
                          Next
                        </Button>
                      )}
                      {currentSection === 3 && (
                        <Button
                          type='submit'
                          color='success'
                          disabled={isSubmitting}>
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
