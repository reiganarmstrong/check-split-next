import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import FormInput from "@/components/ui/tanstack-form/form-input";
import SubmitButton from "@/components/ui/tanstack-form/submit-button";

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    Input: FormInput,
  },
  formComponents: {
    SubmitButton: SubmitButton,
  },
});

export { useFieldContext, useFormContext, useAppForm };
