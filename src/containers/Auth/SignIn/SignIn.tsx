import { connect } from 'react-redux';
import { Form, Input, Select, Button } from 'antd';
import firebase from "firebase/app";

import { showError } from 'redux-base/actions';

import { withSendCodeHOC } from '../SendCode';
import { withRedirectHOC } from '../withRedirect';

const { Option } = Select;

const mapDispatchToProps = { showError };

interface ISignUp {
  isCaptchaLoading: boolean;
  onCapchaLoading: (status: boolean) => void;
  showError: (error: firebase.FirebaseError) => void;
}

export const SignIn = ({
  onCapchaLoading,
  showError,

  isCaptchaLoading,
}: ISignUp) => {
  const [singIn] = Form.useForm();
    
  const handleSendPhoneNumber = async (values: { prefix: string, phone: string }) => {
    const appVerifier = window.recaptchaVerifier;
    onCapchaLoading(true);

    try {
      const confirmationResult = await firebase.auth().signInWithPhoneNumber(`+${values.prefix}${values.phone}`, appVerifier);
      window.confirmationResult = confirmationResult;
    } catch (error) {
      grecaptcha.reset(window.recaptchaWidgetId);
      showError(error);
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 100 }}>
        <Option value="1">+1</Option>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
        <Option value="380">+380</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form
      labelCol={{
        xs: { span: 24 },
        sm: { span: 24 },
      }}
      form={singIn}
      name="singIn"
      labelAlign="left"
      onFinish={handleSendPhoneNumber}
      initialValues={{ prefix: '1' }}
      scrollToFirstError
    >
      <Form.Item
        name="phone"
        label="Mobile phone"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item>
        <Button
          id="auth-button"
          type="primary"
          htmlType="submit"
          style={{ width: '100%' }}
          loading={isCaptchaLoading}
        >
            Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default withRedirectHOC(withSendCodeHOC(connect(null, mapDispatchToProps)(SignIn)));

