import {
  autoSignIn,
  type ConfirmSignUpOutput,
  confirmSignUp,
} from "aws-amplify/auth";
import type { VerifyEmailFormData } from "@/app/auth/verify-email/_components/verify-email-form/_types/verify-email-form-data";

export const verifyEmailSuccessStatuses = ["DONE", "AUTO_LOGIN"] as const;
export type VerifyEmailSuccessStatus =
  (typeof verifyEmailSuccessStatuses)[number];
const verifyEmailSuccessStatusMappings: {
  [key: string]: VerifyEmailSuccessStatus;
} = {
  SIGN_UP_COMPLETE: "DONE",
  COMPLETE_AUTO_SIGN_IN: "AUTO_LOGIN",
};

export const verifyEmail = async ({
  email,
  code,
}: VerifyEmailFormData): Promise<VerifyEmailSuccessStatus | string> => {
  const defaultErrorMessage =
    "Internal error occurred during email verification";
  try {
    const res: ConfirmSignUpOutput = await confirmSignUp({
      username: email,
      confirmationCode: code,
    });
    if (
      Object.hasOwn(verifyEmailSuccessStatusMappings, res.nextStep.signUpStep)
    ) {
      return verifyEmailSuccessStatusMappings[res.nextStep.signUpStep];
    } else {
      return defaultErrorMessage;
    }
  } catch (error: unknown) {
    console.log("Error verifying email:", error);
    return (error as Error)?.message ?? defaultErrorMessage;
  }
};

export const autoLogin = async () => {
  try {
    const { nextStep } = await autoSignIn();
    return nextStep.signInStep === "DONE";
  } catch (error: unknown) {
    console.log("Error verifying email:", error);
    return false;
  }
};
