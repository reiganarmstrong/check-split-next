import { signUp } from "aws-amplify/auth";
import type { SignUpFormData } from "@/app/auth/_components/sign-up-form/_types/sign-up-form-data";

export const signUpSuccessStatuses = ["VERIFY_EMAIL"] as const;
export type SignUpSuccessStatus = (typeof signUpSuccessStatuses)[number];
const SignUpSuccessStatusMappings: { [key: string]: SignUpSuccessStatus } = {
  CONFIRM_SIGN_UP: "VERIFY_EMAIL",
} as const;

// amplify auth sign up wrapper
export const signUpUser = async ({
  email,
  password,
}: SignUpFormData): Promise<SignUpSuccessStatus | string> => {
  const defaultErrorMessage = "Internal error occurred during sign up";
  try {
    const res = await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email: email,
          name: email,
        },
        autoSignIn: { enabled: true },
      },
    });
    if (Object.hasOwn(SignUpSuccessStatusMappings, res.nextStep.signUpStep)) {
      return SignUpSuccessStatusMappings[res.nextStep.signUpStep];
    } else {
      return defaultErrorMessage;
    }
  } catch (error: unknown) {
    console.log("Error signing up user:", error);
    return (error as Error)?.message ?? defaultErrorMessage;
  }
};
