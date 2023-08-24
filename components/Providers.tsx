"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { SessionProvider } from "next-auth/react";
import { TooltipProvider } from './ui/tooltip';

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
          {children}
        </TooltipProvider>
      </SessionProvider>
    </NextThemesProvider>
  );
}