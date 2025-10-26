"use client";
import { Amplify } from "aws-amplify";
import { authConfig, ssrConfig } from "@/lib/auth";

Amplify.configure(
  {
    Auth: authConfig,
  },
  ssrConfig,
);

export default ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
