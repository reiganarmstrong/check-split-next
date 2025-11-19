"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import { useAppForm } from "@/hooks/use-app-form";
import {
  autoLogin,
  type VerifyEmailSuccessStatus,
  verifyEmail,
  verifyEmailSuccessStatuses,
} from "@/lib/auth/verify-email";
import {
  type VerifyEmailFormData,
  verifyEmailFormSchema,
} from "./_types/verify-email-form-data";

export default () => {
  const router = useRouter();
  const form = useAppForm({
    defaultValues: {
      email: "",
      code: "",
    } satisfies VerifyEmailFormData as VerifyEmailFormData,
    validators: {
      onChange: verifyEmailFormSchema,
      onSubmitAsync: async ({ value }) => {
        console.log(value);
        const res: VerifyEmailSuccessStatus | string = await verifyEmail(value);
        if (
          verifyEmailSuccessStatuses.includes(res as VerifyEmailSuccessStatus)
        ) {
          if (res === "DONE") {
            // TODO: login manually
            router.push("/home");
          } else {
            // TODO: auto login
            autoLogin();
            router.push("/home");
          }
        } else {
          console.log("Verify email error:", res);
          return {
            formErrors: [{ message: res }],
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
            <form.AppField name="code">
              {(field) => {
                return <field.Input label="Confirmation Code" />;
              }}
            </form.AppField>
            <form.AppForm>
              <form.SubmitButton
                buttonClasses="bg-brand hover:bg-brand-hover"
                buttonLabel="Verify Email"
              />
            </form.AppForm>
          </FieldGroup>
        </FieldSet>
      </form>
    </Card>
  );
};
