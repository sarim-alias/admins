import React, { useState } from "react";
import { Button, Form, Input, Drawer, Checkbox } from "antd";
import { CloseOutlined, LeftOutlined } from "@ant-design/icons";

const SignupModel = ({ open, setOpen, setLoginOpen }) => {
  const [form] = Form.useForm();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const handleLoginRedirect = () => {
    setOpen(false);
    setLoginOpen(true); // No delay needed
  };

  const handleFormChange = () => {
    form
      .validateFields()
      .then(() => setIsButtonDisabled(!isChecked))
      .catch(() => setIsButtonDisabled(true));
  };

  return (
    <Drawer
      placement="right"
      closable={false}
      onClose={() => setOpen(false)}
      open={open}
      width={400}
      className="custom-drawer bg-gray-900 relative transition-all duration-300 ease-in-out"
    >
      <div className="absolute top-4 left-4 cursor-pointer" onClick={() => setOpen(false)}>
        <LeftOutlined className="text-white text-2xl" />
      </div>
      <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setOpen(false)}>
        <CloseOutlined className="text-white text-2xl" />
      </div>

      <div className="p-6 pt-12">
        <h3 className="text-center text-white font-bold text-2xl mb-6">Sign up</h3>
        <p className="text-center text-white text-lg font-semibold mb-4">Create a free account</p>

        <Form form={form} name="signupForm" layout="vertical" onChange={handleFormChange}>
          <Form.Item name="email" rules={[{ required: true, type: "email", message: "Please enter a valid email!" }]}>
            <Input placeholder="Email" className="custom-input" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please enter your password!" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password placeholder="Password" className="custom-input" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm password" className="custom-input" />
          </Form.Item>

          <p className="text-sm text-gray-500 mb-4">
            Passwords must be at least 6 characters and include both letters and numbers
          </p>

          <Form.Item>
            <Checkbox
              className="text-gray-400"
              checked={isChecked}
              onChange={(e) => {
                setIsChecked(e.target.checked);
                handleFormChange();
              }}
            >
              <span className="text-gray-400">I am 13 years (or the applicable minimum age) or older and accept the </span>{" "}
              <span className="text-blue-400 cursor-pointer">terms and conditions</span> <span className="text-gray-400">and</span>{" "}
              <span className="text-blue-400 cursor-pointer">privacy policy</span>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="custom-button bg-gray-600"
              disabled={isButtonDisabled}
            >
              Continue
            </Button>
          </Form.Item>
        </Form>

        <p className="text-center text-white text-sm mt-4">
          Already have an account?{" "}
          <span className="text-blue-400 cursor-pointer" onClick={handleLoginRedirect}>
            Log in
          </span>
        </p>
      </div>
    </Drawer>
  );
};

export default SignupModel;
