import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // Validation Schema
  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Submit Handler
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/admin/login", values, { withCredentials: true });
      if (response.status === 200) {
        localStorage.setItem("jwt", response.data.token);
        alert("Login Successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      setErrors({ server: error.response?.data?.error || "Something went wrong" });
    }
    setSubmitting(false);
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 bg-black">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="LittleGames"
          src="/logo.png"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
          Login
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik initialValues={{ email: "", password: "" }} validationSchema={loginSchema} onSubmit={handleSubmit}>
          {({ isSubmitting, errors }) => (
            <Form className="space-y-6">
              {errors.server && <p className="text-red-500 text-sm">{errors.server}</p>}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white">Email address</label>
                <div className="mt-2">
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-black outline outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                  />
                  <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                </div>
                <div className="mt-2">
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-black outline outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                  />
                  <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus:outline-indigo-600"
                >
                  {isSubmitting ? "Logging in..." : "Sign in"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
