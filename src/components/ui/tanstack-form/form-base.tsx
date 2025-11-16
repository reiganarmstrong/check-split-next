import type { ReactNode } from "react";
import { useFieldContext } from "@/hooks/use-app-form";
import { Field, FieldContent, FieldError, FieldLabel } from "../field";

export type FormControlProps = {
  label: string;
  description?: string;
};

type FormBaseProps = FormControlProps & {
  children: ReactNode;
  horizontal?: boolean;
  controlFirst?: boolean;
};

export default ({
  label,
  description,
  children,
  horizontal,
  controlFirst,
}: FormBaseProps) => {
  const field = useFieldContext();
  const isInvalid =
    field.state.meta.isTouched && field.state.meta.isValid === false;

  const errorElement = isInvalid ? (
    <FieldError errors={field.state.meta.errors} />
  ) : null;
  const labelElement = (
    <>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      {description && <div>{description}</div>}
    </>
  );

  return (
    <Field
      data-invalid={isInvalid}
      orientation={horizontal ? "horizontal" : undefined}
    >
      {controlFirst ? (
        <>
          {children}
          <FieldContent>
            {labelElement}
            {errorElement}
          </FieldContent>
        </>
      ) : (
        <>
          <FieldContent>{labelElement}</FieldContent>
          {children}
          {errorElement}
        </>
      )}
    </Field>
  );
};
