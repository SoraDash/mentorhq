"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { FaKey } from "react-icons/fa";
import { Icons } from "./Icons";
import UserAuthForm from "./UserAuthForm";

export default function SignIn() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isSignUp, setIsSignUp] = useState(false); // New state to toggle between Sign-in and Sign-up

  const toggleMode = () => {
    setIsSignUp((prevState) => !prevState);
  };

  return (
    <>
      <Button
        onPress={onOpen}
        color='primary'
        endContent={<FaKey />}>
        Get Started
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                <Icons.textLogo className='mx-auto h-24 w-full' />
              </ModalHeader>
              <ModalBody className='text-center mb-5'>
                <h1 className='text-2xl font-semibold tracking-tight'>
                  {isSignUp ? "Create an Account" : "Welcome back"}
                </h1>
                <p className='text-sm max-w-xs mx-auto'>
                  By continuing, you are{" "}
                  {isSignUp ? "creating" : "logging into"} a MentorHQ account
                  and agree to our User Agreement and Privacy Policy.
                </p>
                <UserAuthForm />
                <p className='px-8 text-center text-sm text-muted-foreground'>
                  {isSignUp ? "Already have an account?" : "New to MentorHQ?"}
                  <span
                    onClick={toggleMode}
                    className='hover:text-brand text-sm underline underline-offset-4 cursor-pointer'>
                    {isSignUp ? " Sign In" : " Sign Up"}
                  </span>
                </p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
