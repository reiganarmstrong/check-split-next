"use client";

import { configureAuth } from "@/lib/auth";

configureAuth();
export default ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
