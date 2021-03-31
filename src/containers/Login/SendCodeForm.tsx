import { Form, Input, Button } from 'antd';
import firebase from "firebase/app";

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
  loginSuccess: (user: firebase.User | null) => void;
  showError: (error: firebase.FirebaseError) => void;
}

export const SendCodeForm = ({
  loginSuccess,
  showError,
}: ILogin) => {
  const [code] = Form.useForm();

  const handleSendCode = (values: { codeNum: string }) => {
    window.confirmationResult.confirm(values.codeNum).then((result: any) => {
      // User signed in successfully.
      loginSuccess(result.user);
    }).catch((error: firebase.FirebaseError) => {
      showError(error);
    });
  };

  return (
    <Form
      {...formItemLayout}
      form={code}
      name="code"
      onFinish={handleSendCode}
      scrollToFirstError
    >
      <Form.Item
        name="codeNum"
        label="Code"
        rules={[
          {
            required: true,
            message: 'Please input your code',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: '100%' }}
        >
          Send Code
        </Button>
      </Form.Item>
    </Form>
  );
};