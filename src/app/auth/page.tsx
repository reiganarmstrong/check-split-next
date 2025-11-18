"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormContainer from "./_components/form-container";
import LoginForm from "./_components/login-form";
import SignUpForm from "./_components/sign-up-form";

export default () => {
  return (
    <FormContainer>
      <Tabs defaultValue="login">
        <TabsList className="justify-center w-full">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="signup">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </FormContainer>
  );
};
