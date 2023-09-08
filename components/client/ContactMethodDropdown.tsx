import { updateStudent } from '@/lib/students';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner } from '@nextui-org/react';
import { ContactMethod, Student } from '@prisma/client';
import { capitalize } from 'lodash-es';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BiLogoGoogle, BiLogoSkype, BiLogoSlack, BiLogoZoom } from "react-icons/bi";
import { useToast } from '../ui/use-toast';


type ContactMethodConfig = {
  [key in ContactMethod]: React.ComponentType; // The React.ComponentType signifies that each key of the ContactMethod enum will have an associated React component (i.e., icon).
};

export const knownContactMethods: ContactMethodConfig = {
  [ContactMethod.SKYPE]: BiLogoSkype,
  [ContactMethod.ZOOM]: BiLogoZoom,
  [ContactMethod.SLACK]: BiLogoSlack,
  [ContactMethod.GOOGLE]: BiLogoGoogle,
};

interface ContactMethodDropdownProps {
  studentId: string;
  currentMethod: ContactMethod;
}

export const ContactMethodDropdown: React.FC<ContactMethodDropdownProps> = ({ studentId, currentMethod }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);




  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return <Spinner />



  const handleMethodChange = async (method: string) => {
    setIsEditing(false); // Close the dropdown after selecting an option
    if (method === currentMethod) return;
    try {
      const student = await updateStudent(studentId, { contactMethod: method } as Partial<Student>);
      router.refresh();
      toast({
        description: `Success: Updated ${student.firstName}'s contact method to ${capitalize(student.contactMethod ?? "")}!`,
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: `Something went wrong`,
        description: `Failed to update contact method: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  const dropdownItems = Object.entries(knownContactMethods).map(([method, IconComponent]) => ({
    key: method,
    label: method,
    IconComponent: IconComponent,
  }));
  const CurrentMethodIcon = knownContactMethods[currentMethod]

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" startContent={<CurrentMethodIcon />}>
          {capitalize(currentMethod)}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Contact Methods">
        {dropdownItems.map(item => (
          <DropdownItem
            key={item.key}
            onClick={() => handleMethodChange(item.key)}
            startContent={<item.IconComponent />}
          >
            {capitalize(item.label)}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ContactMethodDropdown;

