import style from "./Textfield.module.scss";

interface inputTypes {
  id?: string;
  name: string;
  label: string;
  placeholder?: string;
  value?: number | string;
  type?: string;
  error?: string | undefined;
  touched?: boolean;
  onBlur?: (e: React.FocusEvent<any, Element>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Textfield: React.FC<inputTypes> = ({
  name,
  label,
  error,
  touched,
  ...props
}) => {
  return (
    <div className={style["input-box"]}>
      <label
        htmlFor={name}
        className={
          error && touched
            ? `${style["input-label"]} ${style["input-label--error"]}`
            : style["input-label"]
        }
      >
        {label}
      </label>
      <input
        className={
          error && touched
            ? `${style.input} ${style["input--error"]}`
            : `${style.input}`
        }
        {...props}
      />

      {error && touched && (
        <span className={style["input-span-error"]}>{error}</span>
      )}
    </div>
  );
};

export default Textfield;
