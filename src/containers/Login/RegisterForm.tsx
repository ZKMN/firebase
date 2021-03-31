import { Form, Input, Select, Button } from 'antd';
import firebase from "firebase/app";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

interface ILogin {
  onCapchaLoading: (status: boolean) => void;
  showError: (error: firebase.FirebaseError) => void;
  isCaptchaLoading: boolean;
}

export const RegisterForm = ({
  onCapchaLoading,
  showError,

  isCaptchaLoading,
}: ILogin) => {
  const [register] = Form.useForm();
    
  const handleSendPhoneNumber = async (values: { prefix: string, phone: string, displayName: string }) => {
    const appVerifier = window.recaptchaVerifier;
    onCapchaLoading(true);

    try {
      const confirmationResult = await firebase.auth().signInWithPhoneNumber(`+${values.prefix}${values.phone}`, appVerifier);
      window.confirmationResult = confirmationResult;
      window.userName = values.displayName;
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
    <>
      <Form
        {...formItemLayout}
        form={register}
        name="register"
        labelAlign="left"
        onFinish={handleSendPhoneNumber}
        initialValues={{ prefix: '1' }}
        scrollToFirstError
      >
        <Form.Item
          name="displayName"
          label="Full name"
          rules={[
            {
              required: true,
              message: 'Please input your full name!',
            },
          ]}
        >
          <Input style={{ width: '100%' }} />
        </Form.Item>
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
            id="sign-in-button"
            type="primary"
            htmlType="submit"
            style={{ width: '100%' }}
            loading={isCaptchaLoading}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
      <div id="recaptcha-container"/>
    </>
  );
};