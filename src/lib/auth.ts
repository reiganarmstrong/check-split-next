"use client";
import { Amplify, type ResourcesConfig } from "aws-amplify";
import {
  type ConfirmSignUpOutput,
  confirmSignUp,
  fetchAuthSession,
  getCurrentUser,
  type SignInOutput,
  signIn,
  signUp,
} from "aws-amplify/auth";
import type { LoginFormData } from "@/app/auth/_components/login-form/_types/login-form-data";
import type { SignUpFormData } from "@/app/auth/_components/sign-up-form/_types/sign-up-form-data";
import type { VerifyEmailFormData } from "@/app/auth/verify-email/_components/verify-email-form/_types/verify-email-form-data";

// Auth configuration for AWS cognito
const authConfig: ResourcesConfig["Auth"] = {
  Cognito: {
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID ?? "",
    userPoolClientId: process.env.NEXT_PUBLIC_CLIENT_ID ?? "",
    loginWith: {
      email: true,
    },
    signUpVerificationMethod: "code",
    userAttributes: {
      email: {
        required: true,
      },
    },
    passwordFormat: {
      minLength: 8,
      requireLowercase: true,
      requireUppercase: true,
      requireNumbers: true,
      requireSpecialCharacters: true,
    },
  },
};

// configures amplify auth module (cognito)
export const configureAuth = () => {
  Amplify.configure({
    Auth: authConfig,
  });
};

// type for user info returned by getAuthenticatedUserInfo
export type UserInfo = {
  username: string;
  userId: string;
  signInDetails:
    | {
        loginId?: string | undefined;
        authFlowType?:
          | (
              | "USER_AUTH"
              | "USER_SRP_AUTH"
              | "CUSTOM_WITH_SRP"
              | "CUSTOM_WITHOUT_SRP"
              | "USER_PASSWORD_AUTH"
            )
          | undefined;
      }
    | undefined;
} | null;

// decodes id token to get user info
export const getUserInfo = async () => {
  try {
    const { username, userId, signInDetails } = await getCurrentUser();
    return { username, userId, signInDetails };
  } catch (err) {
    console.log(err);
    return null;
  }
};

// fetches user tokens, returns undefined on error
export const getUserTokens = async () => {
  try {
    const tokens = (await fetchAuthSession()).tokens;
    return tokens;
  } catch (error) {
    console.log("Error fetching user session:", error);
    return undefined;
  }
};

// fetches authenticated user info, returns null if not authenticated
export const getAuthenticatedUserInfo = async (): Promise<UserInfo> => {
  const tokens = await getUserTokens();
  if (!tokens) {
    return null;
  }
  const userInfo = getUserInfo();
  return userInfo;
};

// amplify auth sign up wrapper
export const signUpUser = async ({ email, password }: SignUpFormData) => {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
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
    return { isSignUpComplete, userId, nextStep };
  } catch (error: unknown) {
    console.log("Error signing up user:", error);
    return (
      (error as Error)?.message ?? "Internal error occurred during sign up"
    );
  }
};

// amplify auth login wrapper
export const loginUser = async ({ email, password }: LoginFormData) => {
  try {
    const res: SignInOutput = await signIn({
      username: email,
      password: password,
    });
    console.log("Login successful:", res);
    return res;
  } catch (error: unknown) {
    console.log("Error logging in user:", error);
    return (error as Error)?.message ?? "Internal error occurred during login";
  }
};

export const verifyEmail = async ({ email, code }: VerifyEmailFormData) => {
  try {
    const res: ConfirmSignUpOutput = await confirmSignUp({
      username: email,
      confirmationCode: code,
    });
    return res;
  } catch (error: unknown) {
    console.log("Error verifying email:", error);
    return (
      (error as Error)?.message ??
      "Internal error occurred during email verification, please try again later"
    );
  }
};
