// Imports.
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input, Drawer, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// Frontend.
const LoginModel = ({ open, setOpen, setSignupOpen }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
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
    google.accounts.id.prompt();
  };

  const handleCredentialResponse = (response) => {
    console.log("Google JWT Token:", response.credential);
    const user = decodeJwt(response.credential);
    console.log("User Info:", user);
  };

  const decodeJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
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

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/auth/login`,
          values,
          { 
            withCredentials: true 
          }
        );
        console.log("API Response Data:", response.data); // Debugging step

        const { token, _id, ...user } = response.data; // Ensure structure
        console.log("User Data:", user); // Debugging step
    
        if (token && user) {
          localStorage.setItem("jwt", token);
          localStorage.setItem("userId", _id);
          localStorage.setItem("user", JSON.stringify(user));

          console.log("Stored User ID:", localStorage.getItem("userId"));
          console.log("Stored User:", localStorage.getItem("user")); // Debugging step
          toast.success("Login successful! 🎮", { autoClose: 2000 });
    
          setOpen(false);
          resetForm();
        }
      } catch (error) {
        toast.error(error.response?.data?.error || "Login failed. Try again.");
      }
      setLoading(false);
    },
  });

  return (
    <Drawer
      placement="right"
      closable={false}
      onClose={() => setOpen(false)}
      open={open}
      width={400}
      className="bg-[#28293d] relative rounded-lg custom-drawer"
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className="absolute top-4 right-4">
        <CloseOutlined className="text-white text-2xl cursor-pointer" onClick={() => setOpen(false)} />
      </div>

      <div className="p-6 pt-12">
        <h3 className="text-center text-white font-bold text-xl mb-6">Log in or sign up</h3>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center bg-white text-black py-2 rounded-full font-medium mb-4 shadow-md hover:bg-white"
        >
          <FcGoogle className="text-xl mr-2" /> Sign in with Google
        </button>

        <button
          onClick={handleFacebookLogin}
          className="w-full flex items-center justify-center bg-[#1877f2] text-white py-2 rounded-full font-medium mb-4 shadow-md hover:bg-[#1877f2]"
        >
          <FaFacebook className="text-xl mr-2" /> Continue with Facebook
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-600" />
          <span className="px-3 text-gray-400">OR</span>
          <hr className="flex-1 border-gray-600" />
        </div>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">

        {/* Email. */}
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="custom-input"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}

        {/* Password. */}
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="custom-input"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}

          <Button
            type="primary"
            htmlType="submit"
            className="flex w-full justify-center rounded-md bg-[#6842ff] px-3 py-1.5 text-sm font-semibold text-white shadow-xs transition duration-200 hover:!bg-[#4e2bbf] focus:!outline-[#3c2196]"
            disabled={loading}
          >
            {loading ? <div className="loader" /> : "Log In"}
          </Button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Don't have an account? <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => { setOpen(false); setSignupOpen(true); }}>Signup</span>
        </p>
      </div>
    </Drawer>
  );
};

export default LoginModel;
