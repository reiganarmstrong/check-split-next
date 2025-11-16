"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { useAppForm } from "@/hooks/use-app-form";
import { type LoginFormData, loginFormSchema } from "./_types/login-form-data";

export default () => {
  const form = useAppForm({
    defaultValues: {
      username: "",
      password: "",
    } satisfies LoginFormData as LoginFormData,
    validators: { onSubmit: loginFormSchema },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="w-full h-full flex justify-center items-start pt-20">
      <Card className="p-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="min-w-sm sm:min-w-lg"
        >
          <FieldGroup>
            <form.AppField name="username">
              {(field) => {
                return <field.Input label="Username" />;
              }}
            </form.AppField>
            <form.AppField name="password">
              {(field) => {
                return <field.Input label="Password" password={true} />;
              }}
            </form.AppField>
            <Button
              type="submit"
              className="mt-4 bg-brand hover:bg-brand-hover"
            >
              Login
            </Button>
          </FieldGroup>
        </form>
      </Card>
    </div>
  );
};
