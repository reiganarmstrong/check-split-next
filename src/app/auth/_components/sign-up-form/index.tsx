"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import { useAppForm } from "@/hooks/use-app-form";
import {
  type SignUpSuccessStatus,
  signUpSuccessStatuses,
  signUpUser,
} from "@/lib/auth/sign-up";
import {
  type SignUpFormData,
  signUpFormSchema,
} from "./_types/sign-up-form-data";
export default () => {
  const router = useRouter();
  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    } satisfies SignUpFormData as SignUpFormData,
    validators: {
      onChange: signUpFormSchema,
      onSubmitAsync: async ({ value }) => {
        console.log(value);
        const res = await signUpUser(value);
        if (signUpSuccessStatuses.includes(res as SignUpSuccessStatus)) {
          router.push("/auth/verify-email");
        } else {
          return {
            formErrors: [{ message: res }],
          };
        }
      },
    },
    onSubmit: () => {},
  });

  return (
    <Card className="p-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="min-w-[250px] sm:min-w-sm"
      >
        <FieldSet>
          <FieldLegend className="w-full text-center">Sign Up</FieldLegend>
          <FieldGroup>
            <form.AppField name="email">
              {(field) => {
                return <field.Input label="Email" />;
              }}
            </form.AppField>
            <form.AppField name="password">
              {(field) => {
                return <field.Input label="Password" password />;
              }}
            </form.AppField>
            <form.AppField name="confirmPassword">
              {(field) => {
                return <field.Input label="Confirm Password" password />;
              }}
            </form.AppField>
            <form.AppForm>
              <form.SubmitButton
                buttonClasses="bg-brand hover:bg-brand-hover"
                buttonLabel="Sign Up"
              />
            </form.AppForm>
          </FieldGroup>
        </FieldSet>
      </form>
    </Card>
  );
};
