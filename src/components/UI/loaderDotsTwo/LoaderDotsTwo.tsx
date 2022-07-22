import style from "./LoaderDotsTwo.module.scss";

const LoaderDotsTwo = ({ label }: { label?: string }) => {
  return (
    <div className={style["loader__parent"]}>
      <ul className={style.loader}>
        <li className={style["loader__item"]}></li>
        <li className={style["loader__item"]}></li>
        <li className={style["loader__item"]}></li>
      </ul>
      {label && <p>We're looking for the best bus routes for you...</p>}
    </div>
  );
};

export default LoaderDotsTwo;
