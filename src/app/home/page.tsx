"use client";
import { getCurrentUser } from "aws-amplify/auth";
import { useEffect } from "react";

export default () => {
  useEffect(() => {
    const getCredentials = async () => {
      try {
        const { username, userId, signInDetails } = await getCurrentUser();
        console.log(username);
        console.log(userId);
        console.log(signInDetails);
      } catch (e) {
        console.log(e);
      }
    };
    getCredentials();
  }, []);

  return <div>home</div>;
};
