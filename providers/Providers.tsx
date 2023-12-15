"use client";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { Toaster } from "react-hot-toast";
import { Toaster as HeadlessToast } from "@/components/ui/toaster";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <SessionProvider>
      <NextUIProvider>
        <NextThemesProvider {...props}>
          {children}
          <HeadlessToast />
          <Toaster position="bottom-right" />
        </NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
