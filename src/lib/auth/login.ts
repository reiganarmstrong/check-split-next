import { type SignInOutput, signIn } from "aws-amplify/auth";
import type { LoginFormData } from "@/app/auth/_components/login-form/_types/login-form-data";

export const loginSuccessStatuses = ["DONE", "VERIFY_EMAIL"] as const;
export type LoginSuccessStatus = (typeof loginSuccessStatuses)[number];
const loginSuccessStatusMappings: { [key: string]: LoginSuccessStatus } = {
  DONE: "DONE",
  CONFIRM_SIGN_UP: "VERIFY_EMAIL",
};

// amplify auth login wrapper
export const loginUser = async ({
  email,
  password,
}: LoginFormData): Promise<LoginSuccessStatus | string> => {
  const defaultErrorMessage = "Internal error occurred during login";
  try {
    const res: SignInOutput = await signIn({
      username: email,
      password: password,
    });
    console.log("Login successful:", res);
    if (Object.hasOwn(loginSuccessStatusMappings, res.nextStep.signInStep)) {
      return loginSuccessStatusMappings[res.nextStep.signInStep];
    } else {
      return defaultErrorMessage;
    }
  } catch (error: unknown) {
    console.log("Error logging in user:", error);
    return (error as Error)?.message ?? defaultErrorMessage;
  }
};
