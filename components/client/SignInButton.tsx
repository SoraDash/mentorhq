"use client";

import { Button } from '@nextui-org/react';
import { signIn } from "next-auth/react";

export const SignInButton = () => {
  return (
    <Button
      variant="flat"
      onClick={() => {
        signIn();
      }}
    >
      Sign In
    </Button>
  );
};
