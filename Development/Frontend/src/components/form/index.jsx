import { Form } from "antd";
import classNames from "classnames/bind";
import styles from "./form.module.scss";

const cx = classNames.bind(styles);

const FormComponent = (props) => {
  return (
    <>
      <Form
        name={props.name}
        className={props.className}
        initialValues={props.initialValues}
        onFinish={props.onFinish}
      >
        {props.children}
      </Form>
    </>
  );
};

export default FormComponent;
