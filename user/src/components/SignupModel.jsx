// Imports.
import React, { useState } from "react";
import axios from "axios";
import { Button, Drawer, Checkbox } from "antd";
import { CloseOutlined, LeftOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// Frontend.
const SignupModel = ({ open, setOpen, setLoginOpen }) => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      gender: "",
      termsAccepted: false,
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
      gender: Yup.string().required("Gender is required"),
      termsAccepted: Yup.boolean().oneOf([true], "You must accept the terms"),
    }),
    onSubmit: async (values, {resetForm}) => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/auth/signup`,
          values,
          {
            withCredentials: true,
          }
        );

        if (response.status === 201) {
          toast.success("Signup successful! 🎉", { autoClose: 2000 });
          localStorage.setItem("jwt", response.data.token);
          setTimeout(() => {
            resetForm();
            setOpen(false);
            setLoginOpen(true);
          }, 1500);
        }
      } catch (error) {
        toast.error(error.response?.data?.error || "Signup failed. Try again.");
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
      className="custom-drawer bg-gray-900 relative transition-all duration-300 ease-in-out"
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div
        className="absolute top-4 left-4 cursor-pointer"
        onClick={() => setOpen(false)}
      >
        <LeftOutlined className="text-white text-2xl" />
      </div>
      <div
        className="absolute top-4 right-4 cursor-pointer"
        onClick={() => setOpen(false)}
      >
        <CloseOutlined className="text-white text-2xl" />
      </div>
      <div className="p-6 pt-12">
        <h3 className="text-center text-white font-bold text-2xl mb-6">
          Sign up
        </h3>
        <p className="text-center text-white text-lg font-semibold mb-4">
          Create a free account
        </p>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          {/* Username. */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="custom-input"
            {...formik.getFieldProps("username")}
          />
          {formik.touched.username && formik.errors.username && (
            <p className="text-red-500 text-sm">{formik.errors.username}</p>
          )}

          {/* Email. */}
          <input
            type="email"
            name="email"
            placeholder="Email"
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
            placeholder="Password"
            className="custom-input"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}

          {/* Gender. */}
          <select
            name="gender"
            className="custom-input"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {formik.touched.gender && formik.errors.gender && (
            <p className="text-red-500 text-sm">{formik.errors.gender}</p>
          )}

          {/* Terms */}
          <div className="flex items-center gap-2">
            <Checkbox
              name="termsAccepted"
              checked={formik.values.termsAccepted}
              onChange={formik.handleChange}
              className="text-white"
            />
            <span className="text-white">
              I am 13 years (or the applicable minimum age) or older and accept
              the terms and conditions and privacy policy
            </span>
          </div>
          {formik.touched.termsAccepted && formik.errors.termsAccepted && (
            <p className="text-red-500 text-sm">
              {formik.errors.termsAccepted}
            </p>
          )}

          {/* Button. */}
          <Button
            type="primary"
            htmlType="submit"
            className="flex w-full justify-center rounded-md bg-[#6842ff] px-3 py-1.5 text-sm font-semibold text-white shadow-xs transition duration-200 hover:!bg-[#4e2bbf] focus:!outline-[#3c2196]"
            disabled={loading}
          >
            {loading ? <div className="loader" /> : "Sign Up"}
          </Button>
        </form>

        <p className="text-center text-white text-sm mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => {
              setOpen(false);
              setLoginOpen(true);
            }}
          >
            Log in
          </span>
        </p>
      </div>
    </Drawer>
  );
};

export default SignupModel;
