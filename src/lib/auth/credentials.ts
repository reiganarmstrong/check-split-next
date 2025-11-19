import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

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
