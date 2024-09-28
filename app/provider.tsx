"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export function Providers({ children }: 
    { children: React.ReactNode }) 
{ 
  return  <SessionProvider>
      {children}
    </SessionProvider>
}