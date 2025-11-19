"use client";

import { configureAuth } from "@/lib/auth/config";

configureAuth();
export default ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
