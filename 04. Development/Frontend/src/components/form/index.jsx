import PropTypes from "prop-types";
import { Form } from "antd";

const FormComponent = ({ children, name, className, onFinish, ...props }) => {
  return (
    <>
      <Form name={name} className={className} onFinish={onFinish} {...props}>
        {children}
      </Form>
    </>
  );
};

FormComponent.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
  className: PropTypes.string,
  onFinish: PropTypes.func,
};

export default FormComponent;
