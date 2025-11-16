import { Amplify, type ResourcesConfig } from "aws-amplify";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

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
