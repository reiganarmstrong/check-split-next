"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getAuthenticatedUserInfo,
  type UserInfo,
} from "@/lib/auth/credentials";

export default () => {
  const [userInfo, setUserInfo] = useState<UserInfo>(null);
  const router = useRouter();
  useEffect(() => {
    const getUserInfo = async () => {
      const details = await getAuthenticatedUserInfo();
      if (details === null) {
        router.replace("/auth");
      }
      setUserInfo(details);
    };
    getUserInfo();
  }, [router]);
  return userInfo;
};
