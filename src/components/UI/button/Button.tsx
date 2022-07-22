import style from "./Button.module.scss";

interface btnTypes {
  label?: string;
  children?: JSX.Element;
  icon?: boolean;
  iconType?: string;
  theme?: string;
  btnType?: string;
  size?: boolean;
  fullwidth?: boolean;
  iconRotation?: boolean;
  disabled?: boolean;
  type?: string | undefined;
  onClick?: () => void;
}

const Button: React.FC<btnTypes> = ({
  label,
  children,
  icon = false,
  iconType,
  theme = "",
  btnType = "normal",
  size = false,
  disabled = false,
  fullwidth = false,
  type = "submit",
  onClick,
}) => {
  const classes = [
    style.btn,
    size && style[`btn_${size}`],
    theme && style[`btn-${theme}`],
    btnType && style[`btn-${btnType}`],
    iconType && style[`btn-${iconType}`],
    fullwidth && style.btn_fluid,
  ].join(" ");

  return (
    <button
      className={classes}
      onClick={onClick}
      type="submit"
      disabled={disabled}
    >
      {children && children}
      {iconType && (
        <span className="material-symbols-rounded">{iconType} </span>
      )}
      {label && <span className={style.btn_text}>{label}</span>}
    </button>
  );
};

export default Button;
