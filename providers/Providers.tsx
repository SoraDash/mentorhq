"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { SessionProvider } from "next-auth/react";
import { TooltipProvider } from '../components/ui/tooltip';
import { ModalProvider } from './ModalProvider';

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (

    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      {...props}
    >
      <SessionProvider>
        <TooltipProvider>
          <ModalProvider />
          {children}
        </TooltipProvider>
      </SessionProvider>
    </NextThemesProvider>
  );
}