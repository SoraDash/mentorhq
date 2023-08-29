"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { SessionProvider } from "next-auth/react";
import { TooltipProvider } from '@/components/ui/tooltip';
import { ModalProvider } from './ModalProvider';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react';
import { queryClientOptions } from '@/lib/queryClientOptions';



export function Providers({ children, ...props }: ThemeProviderProps) {
  const [queryClient] = useState(() => new QueryClient(queryClientOptions))
  return (

    <QueryClientProvider client={queryClient}>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem {...props}>
        <SessionProvider>
          <TooltipProvider>
            <Toaster />
            <ModalProvider />
            {children}
          </TooltipProvider>
        </SessionProvider>
      </NextThemesProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>


  );
}