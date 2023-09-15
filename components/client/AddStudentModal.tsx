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
import { FaSkype } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { FormikSelect } from "../FormikSelect";

export default function AddStudentModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const initialValues: Partial<Student> = {
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
  };

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
  return (
    <>
      <Button
        onPress={ onOpen }
        startContent={ <PiStudentBold /> }
        color='primary'>
        Add Student
      </Button>
      <Modal
        isOpen={ isOpen }
        onOpenChange={ onOpenChange }
        isDismissable={ false }
        backdrop='blur'
        size='3xl'>
        <ModalContent>
          { (onClose) => (
            <>
              <Formik
                initialValues={ initialValues }

                onSubmit={ (values, actions) => {
                  console.log({ values, actions });
                  alert(JSON.stringify(values, null, 2));
                  actions.setSubmitting(false);
                } }>
                { formikProps => {
                  const { values, handleChange, isValid, isSubmitting } = formikProps;

                  return (
                    <Form className='space-y-3'>
                      <ModalHeader className='flex flex-col gap-1'>
                        Let&apos;s record a session
                      </ModalHeader>
                      <ModalBody>
                        {/* Name Field */ }
                        <Input
                          type='text'
                          label='Student Full Name'
                          id='name'
                          isRequired
                          className='my-5'
                          value={ values.name }
                          onChange={ handleChange }
                        />
                        <Input
                          type='email'
                          label='Student Email'
                          id='email'
                          isRequired
                          className='mb-5'
                          value={ values.email }
                          onChange={ handleChange }
                        />
                        <Input
                          type='text'
                          label='Course Code'
                          id='courseCode'
                          isRequired
                          className='mb-5'
                          value={ values.courseCode || "" }
                          onChange={ handleChange }
                        />
                        <FormikSelect
                          name='programmeID'
                          label='Programme ID'
                          options={ programmeIdOptions }
                          isRequired
                        />
                        <FormikSelect
                          name='contactMethod'
                          label='Prefered Contact Method'
                          options={ courseOptions }
                          className='mb-5'
                          isRequired
                        />
                        <Input
                          type='text'
                          label='Skype Username'
                          id='skype'
                          startContent={ <FaSkype /> }
                          value={ values.skype || "" }
                          onChange={ handleChange }
                        />
                        <Input
                          type='text'
                          label='Slack Handle'
                          id='slack'
                          startContent={
                            <div className='pointer-events-none flex items-center'>
                              <span className='text-default-400 text-small'>@</span>
                            </div>
                          }
                          value={ values.slack || "" }
                          onChange={ handleChange }
                        />
                        <Input
                          type='text'
                          label='GitHub Username'
                          id='github'
                          startContent={
                            <div className='pointer-events-none flex items-center'>
                              <span className='text-default-400 text-small'>@</span>
                            </div>
                          }
                          value={ values.github || "" }
                          onChange={ handleChange }
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
                          value={ values.linkedIn || "" }
                          onChange={ handleChange }
                        />
                      </ModalBody>
                      <ModalFooter className='flex justify-between'>
                        <Button
                          color='danger'
                          onPress={ onClose }>
                          Close
                        </Button>
                        <Button
                          type='submit'
                          color='success'
                          disabled={ isSubmitting }
                        >
                          Save
                        </Button>
                      </ModalFooter>
                    </Form>
                  )
                } }
              </Formik>
            </>
          ) }
        </ModalContent>
      </Modal>
    </>
  );
}
