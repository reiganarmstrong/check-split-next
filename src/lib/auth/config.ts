import { Amplify, type ResourcesConfig } from "aws-amplify";

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
