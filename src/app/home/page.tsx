"use client";
import useCredentials from "@/hooks/use-credentials";

export default () => {
  const userInfo = useCredentials();
  if (userInfo === null) {
    return null;
  }

  return (
    <div className="w-full h-full flex justify-center items-center flex-row">
      <div>Welcome, {userInfo?.username}</div>
    </div>
  );
};
