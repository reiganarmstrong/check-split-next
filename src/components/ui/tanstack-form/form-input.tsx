import { useFieldContext } from "@/hooks/use-app-form";
import { Input } from "../input";
import type { FormControlProps } from "./form-base";
import FormBase from "./form-base";

type FormInputProps = FormControlProps & {
  password?: boolean;
};

export default (props: FormInputProps) => {
  const field = useFieldContext<string>();
  const isInvalid =
    field.state.meta.isTouched && field.state.meta.isValid === false;
  return (
    <FormBase {...props}>
      <Input
        aria-invalid={isInvalid}
        id={field.name}
        name={field.name}
        value={field.state.value}
        onChange={(e) => {
          field.handleChange(e.target.value);
        }}
        type={props.password ? "password" : "text"}
        onBlur={field.handleBlur}
      />
    </FormBase>
  );
};
