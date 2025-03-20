import React, { useEffect, useState } from "react";
import { Button, Input, Drawer } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const LoginModel = ({ open, setOpen, setSignupOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    /* Load Google API */
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleGoogleLogin = () => {
    google.accounts.id.initialize({
      client_id: "YOUR_GOOGLE_CLIENT_ID",
      callback: handleCredentialResponse,
    });

    google.accounts.id.prompt(); // Show Google Sign-In popup
  };

  const handleCredentialResponse = (response) => {
    console.log("Google JWT Token:", response.credential);
    const user = decodeJwt(response.credential);
    console.log("User Info:", user);
  };

  const decodeJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1])); // Decode JWT token
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    /* Load Facebook SDK */
    window.fbAsyncInit = function () {
      FB.init({
        appId: "YOUR_FACEBOOK_APP_ID",
        cookie: true,
        xfbml: true,
        version: "v18.0",
      });
    };

    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleFacebookLogin = () => {
    FB.login(
      (response) => {
        if (response.authResponse) {
          FB.api("/me", { fields: "name,email,picture" }, (userInfo) => {
            console.log("Facebook User Info:", userInfo);
          });
        }
      },
      { scope: "public_profile,email" }
    );
  };

  // Handle Email & Password changes
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    checkButtonState(e.target.value, password);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    checkButtonState(email, e.target.value);
  };

  const checkButtonState = (email, password) => {
    setIsButtonEnabled(email.trim() !== "" && password.trim() !== "");
  };

  const handleLogin = () => {
    console.log("Logging in with:", { email, password });
    // TODO: Add authentication logic here
  };

  const handleSignupRedirect = () => {
    setOpen(false); // Close login modal
    setSignupOpen(true); // Open signup modal
  };

  return (
    <Drawer
      placement="right"
      closable={false}
      onClose={() => setOpen(false)}
      open={open}
      width={400}
      className="bg-[#28293d] relative rounded-lg custom-drawer"
    >
      {/* Close Button */}
      <div className="absolute top-4 right-4">
        <CloseOutlined
          className="text-white text-2xl cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>

      <div className="p-6 pt-12">
        <h3 className="text-center text-white font-bold text-xl mb-6">
          Log in or sign up
        </h3>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center bg-white text-black py-2 rounded-full font-medium mb-4 shadow-md hover:bg-white"
          style={{ cursor: "pointer", outline: "none" }}
        >
          <FcGoogle className="text-xl mr-2" />
          Sign in with Google
        </button>

        {/* Facebook Sign-In Button */}
        <button
          onClick={handleFacebookLogin}
          className="w-full flex items-center justify-center bg-[#1877f2] text-white py-2 rounded-full font-medium mb-4 shadow-md hover:bg-[#1877f2]"
          style={{ cursor: "pointer", outline: "none" }}
        >
          <FaFacebook className="text-xl mr-2" />
          Continue with Facebook
        </button>

        {/* OR Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-600" />
          <span className="px-3 text-gray-400 text-center whitespace-nowrap">
            OR
          </span>
          <hr className="flex-1 border-gray-600" />
        </div>

        {/* Email Input */}
        <Input
          placeholder="Enter your email"
          className="custom-input p-3 mb-4 bg-[#3b3c54] border-none text-white rounded-md placeholder-gray-400 focus:outline-none"
          value={email}
          onChange={handleEmailChange}
        />

        {/* Password Input */}
        <Input.Password
          placeholder="Enter your password"
          className="custom-input p-3 mb-4 mt-3  bg-[#3b3c54] border-none text-white rounded-md placeholder-gray-400 focus:outline-none"
          value={password}
          onChange={handlePasswordChange}
        />

        {/* Log in Button */}
        <Button
          type="primary"
          block
          className={`py-1 rounded-full focus:outline-none custom-button ${
            isButtonEnabled
              ? "bg-blue-500 text-white cursor-pointer hover:bg-blue-600"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
          disabled={!isButtonEnabled}
          onClick={handleLogin}
          style={{ outline: "none" }}
        >
          Log in
        </Button>

        {/* Signup Redirect Link */}
        <p className="text-center text-gray-400 mt-4">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={handleSignupRedirect}
          >
            Signup
          </span>
        </p>
      </div>
    </Drawer>
  );
};

export default LoginModel;
