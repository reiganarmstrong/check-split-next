import { useFormContext } from "@/hooks/use-app-form";
import { Button } from "../button";
import { Field, FieldError } from "../field";

type Props = {
  buttonClasses: string;
  buttonLabel: string;
};

export default ({ buttonClasses, buttonLabel }: Props) => {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={(state) => {
        return {
          canSubmit: state.canSubmit,
          isFormValidating: state.isFormValidating,
          errorMap: state.errorMap.onSubmit?.formErrors,
        };
      }}
    >
      {({ canSubmit, isFormValidating, errorMap }) => {
        return (
          <Field className="mt-4">
            {<FieldError errors={errorMap} className="w-full text-center" />}
            <Button
              className={buttonClasses}
              aria-disabled={!canSubmit}
              disabled={isFormValidating}
              type="submit"
            >
              {isFormValidating ? "..." : buttonLabel}
            </Button>
          </Field>
        );
      }}
    </form.Subscribe>
  );
};
