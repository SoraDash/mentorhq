import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { Student } from '@prisma/client';
import { useEffect, useState } from 'react';
import { FaChalkboardTeacher } from 'react-icons/fa';

export default function AddSessionModal({ studentId }: { studentId: string }) {
  console.log(studentId)
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [student, setStudent] = useState<Student | null>(null);
  // use effect async to fetch a student by id

  useEffect(() => {
    const fetchStudent = async () => {
      const student = await fetch(`/api/students/${studentId}`).then(res => res.json() as Promise<Student>);
      if (!student) return;
      setStudent(student);
      console.log(student);
    }
    fetchStudent();
  }, [studentId]);
  if (!student) return null;
  return (
    <>
      <Button onPress={ onOpen } startContent={ <FaChalkboardTeacher /> } variant='light' color='primary'></Button>
      <Modal isOpen={ isOpen } onOpenChange={ onOpenChange } isDismissable={ true } backdrop='blur' size='3xl'>
        <ModalContent>
          { (onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Let&apos;s record a session</ModalHeader>
              <ModalBody>
                <pre>
                  { JSON.stringify(student, null, 2) }
                </pre>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={ onClose }>
                  Close
                </Button>
                <Button color="primary" onPress={ onClose }>
                  Action
                </Button>
              </ModalFooter>
            </>
          ) }
        </ModalContent>
      </Modal>
    </>
  );
}
