"use client";

import { Card } from "@/components/ui/card";
import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import { useAppForm } from "@/hooks/use-app-form";
import { signUpUser } from "@/lib/auth";
import {
  type SignUpFormData,
  signUpFormSchema,
} from "./_types/sign-up-form-data";

export default () => {
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
        const result = await signUpUser(value);
        if (typeof result === "string") {
          console.log("Sign up error:", result);
          return {
            formErrors: [{ message: result }],
          };
        }
      },
    },
    onSubmit: () => {
      console.log("Form submitted");
    },
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
          <FieldLegend className="w-full text-center">Verify Email</FieldLegend>
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
