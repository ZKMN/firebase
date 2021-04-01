import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import firebase from "firebase/app";

import { loginSuccess, showError } from 'redux-base/actions';

interface ISendCodeForm {
  loginSuccess: (user: firebase.User | null) => void;
  showError: (error: firebase.FirebaseError) => void;
  onCapchaLoading: (status: boolean) => void;
  onCodeSent: (status: boolean) => void;
}

const mapDispatchToProps = { 
  loginSuccess,
  showError,
};

const SendCodeForm = ({
  loginSuccess,
  showError,

  onCapchaLoading,
  onCodeSent,
}: ISendCodeForm) => {
  const [code] = Form.useForm();

  const handleSendCode = async (values: { codeNum: string }) => {
    try {
      const result = await window.confirmationResult.confirm(values.codeNum);
      loginSuccess(result.user);
      onCapchaLoading(false);
      onCodeSent(false);
    } catch (error) {
      showError(error);
    }
  };

  return (
    <Form
      labelCol={{
        xs: { span: 24 },
        sm: { span: 24 },
      }}
      form={code}
      name="code"
      labelAlign="left"
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

export default connect(null, mapDispatchToProps)(SendCodeForm);