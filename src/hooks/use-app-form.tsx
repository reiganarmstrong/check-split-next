import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import formInput from "@/components/ui/tanstack-form/form-input";

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    Input: formInput,
  },
  formComponents: {},
});

export { useFieldContext, useFormContext, useAppForm };
