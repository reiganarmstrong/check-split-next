"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuthenticatedUserInfo, type UserInfo } from "@/lib/auth";
export default () => {
  const [userInfo, setUserInfo] = useState<UserInfo>(null);
  const router = useRouter();
  useEffect(() => {
    // Simulate an authentication check
    const getUserInfo = async () => {
      const details = await getAuthenticatedUserInfo();
      if (details === null) {
        router.push("/login");
      }
      setUserInfo(details);
    };
    getUserInfo();
  }, [router]);
  return userInfo;
};
