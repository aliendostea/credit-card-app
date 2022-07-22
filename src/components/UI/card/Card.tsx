import style from "./Card.module.scss";

interface CardProps {
  children?: JSX.Element;
  theme?: string;
}
const Card = ({ children, theme }: CardProps) => {
  const classes = [style.card, theme && style[`card-${theme}`]].join(" ");
  return <div className={classes}>{children}</div>;
};

export default Card;
