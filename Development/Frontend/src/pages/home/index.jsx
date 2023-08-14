import classNames from "classnames/bind";
import styles from "./home.module.scss";

const cx = classNames.bind(styles);

const HomePage = () => {
  return (
    <>
      <div className={cx("homepage")}>
        <h1 className={cx("title")}>Hello this is home page</h1>
      </div>
    </>
  );
};

export default HomePage;
