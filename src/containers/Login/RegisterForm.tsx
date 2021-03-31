import { Form, Input, Select, Button } from 'antd';
import firebase from "firebase/app";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

interface ILogin {
  setIsCodeSent: (status: boolean) => void;
  showError: (error: firebase.FirebaseError) => void;
}

export const RegisterForm = ({
  setIsCodeSent,
  showError,
}: ILogin) => {
  const [register] = Form.useForm();
    
  const handleSendPhoneNumber = (values: { prefix: string, phone: string }) => {
    const appVerifier = window.recaptchaVerifier;

    firebase.auth().signInWithPhoneNumber(`+${values.prefix}${values.phone}`, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        setIsCodeSent(true);
      }).catch((error) => {
        grecaptcha.reset(window.recaptchaWidgetId);
        showError(error);
      });
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
    <>
      <Form
        {...formItemLayout}
        form={register}
        name="register"
        onFinish={handleSendPhoneNumber}
        initialValues={{ prefix: '1' }}
        scrollToFirstError
      >
        <Form.Item
          name="phone"
          label="Phone Number"
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
            id="sign-in-button"
            type="primary"
            htmlType="submit"
            style={{ width: '100%' }}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
      <div id="recaptcha-container"/>
    </>
  );
};