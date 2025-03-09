// Imports.
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Frontend.
const Game = () => {

  // Validation.
  const gameSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
  });

  // Submit.
  const handleSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
    try {
      const response = await fetch("http://localhost:5000/api/games/game/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Game added successfully! 🎮");
        resetForm();
      } else {
        setErrors({ server: data.error });
        toast.error(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error creating game:", error);
      setErrors({ server: "Something went wrong" });
      toast.error("Something went wrong! ❌");
    }
    setSubmitting(false);
  };

  return (
    <div className="relative h-screen p-5">
      <ToastContainer position="top-right" autoClose={3000} />

      <h1 className="text-xl text-white font-semibold mb-4">Game 🍪</h1>
      <Formik
        initialValues={{ title: "", description: "" }}
        validationSchema={gameSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form className="max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
            {errors.server && <p className="text-red-500 text-sm mb-4">{errors.server}</p>}

            {/* Title */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-300 mb-1">Title</label>
              <Field
                id="title"
                name="title"
                type="text"
                className="w-full p-2 border rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <ErrorMessage name="title" component="p" className="text-red-400 text-sm mt-1" />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-300 mb-1">Description</label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className="w-full p-2 border rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <ErrorMessage name="description" component="p" className="text-red-400 text-sm mt-1" />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full justify-center rounded-md bg-[#6842ff] px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-[#5630d0] transition-all"
            >
              {isSubmitting ? "Adding..." : "Add Game"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Game;