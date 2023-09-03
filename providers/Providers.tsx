"use client";

import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";



export function Providers({ children, ...props }: ThemeProviderProps) {
  return (

    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem {...props}>
      <SessionProvider>
        <TooltipProvider>
          <Toaster />
          {children}
        </TooltipProvider>
      </SessionProvider>
    </NextThemesProvider>


  );
}