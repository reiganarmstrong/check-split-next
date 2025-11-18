"use client";

import { Card } from "@/components/ui/card";
import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import { useAppForm } from "@/hooks/use-app-form";
import { loginUser } from "@/lib/auth";
import { type LoginFormData, loginFormSchema } from "./_types/login-form-data";

export default () => {
  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    } satisfies LoginFormData as LoginFormData,
    validators: {
      onChange: loginFormSchema,
      onSubmitAsync: async ({ value }) => {
        const res = await loginUser(value);
        console.log("Login result:", res);
        if (typeof res === "string") {
          console.log("Login error:", res);
          return {
            formErrors: [{ message: res }],
          };
        } else if (
          res.isSignedIn === false &&
          res.nextStep.signInStep !== "CONFIRM_SIGN_UP"
        ) {
          return {
            formErrors: [{ message: "" }],
          };
        }
      },
    },
    onSubmit: (values) => {
      console.log(values);
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
          <FieldLegend className="w-full text-center">Login</FieldLegend>
          <FieldGroup>
            <form.AppField name="email">
              {(field) => {
                return <field.Input label="Email" />;
              }}
            </form.AppField>
            <form.AppField name="password">
              {(field) => {
                return <field.Input label="Password" password={true} />;
              }}
            </form.AppField>
            <form.AppForm>
              <form.SubmitButton
                buttonClasses="bg-brand hover:bg-brand-hover"
                buttonLabel="Login"
              />
            </form.AppForm>
          </FieldGroup>
        </FieldSet>
      </form>
    </Card>
  );
};
