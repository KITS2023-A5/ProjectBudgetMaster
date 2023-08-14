import "./loading.module.scss";
import classNames from "classnames/bind";
import styles from "./loading.module.scss";
import loading from "../../assets/images/loading2.gif";

const cx = classNames.bind(styles);

const Loading = () => {
  return (
    <>
      <div className={cx("loading")}>
        <img src={loading} alt="loading" />
      </div>
    </>
  );
};

export default Loading;
