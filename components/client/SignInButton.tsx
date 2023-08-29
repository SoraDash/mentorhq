"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

export const SignInButton = () => {
  return (
    <Button
      variant="ghost"
      onClick={() => {
        signIn();
      }}
    >
      Sign In
    </Button>
  );
};
