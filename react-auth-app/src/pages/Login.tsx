// ./src/pages/Login.tsx

import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router";
import authSlice from "../store/slices/auth";
import { setAuthTokens, setAccount }from "../store/slices/auth";
import { AccountResponse } from "../types" 
import { Link } from "react-router-dom"
import Footer from "../pages/Footer";



function Login() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleLogin = (email: string, password: string) => {
    axios 
      .post(`${process.env.REACT_APP_API_URL}/auth/login/`, {email, password})
      .then((res: any) => {
          dispatch(setAccount(res.data.user));
          dispatch(
              setAuthTokens({
                  token: res.data.access,
                  refreshToken: res.data.refresh,
              })
          );
        
         setLoading(false);
         history("/profile");
      })
      .catch((err: any) => {
        setMessage(err.response.data.detail.toString())
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values: any) => {
      setLoading(true);
      handleLogin(values.email, values.password);
    },
    validationSchema: Yup.object({
      email: Yup.string().trim().required("Email is required."),
      password: Yup.string().trim().required("Password is required."),
    }),
  });

  return (
    <div className="h-screen flex bg-gradient-to-t from-green-100 to-lime-100 flex flex-col">
      <div className="w-full max-w-md m-auto bg-green-200 rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className="font-medium text-5xl mt-4 mb-12 text-center">
          Log in
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
            <input
              className="border-b border-gray-300 w-full px-2 h-8 rounded focus:border-blue-500"
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email ? <div>{formik.errors.email} </div> : null}
            <input
              className="border-b border-gray-300 w-full px-2 h-8 rounded focus:border-blue-500"
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password ? (
              <div>{formik.errors.password} </div>
            ) : null}
          </div>
          <div className="text-danger text-center my-2" hidden={false}>
            {message}
          </div>

          <div className="flex flex-col justify-center items-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg text-xl p-2  m-2 w-32 bg-lime-400 text-white text-center flex-end shadow-lg hover:opacity-50 hover:shadow-sm"
            >
              Login
            </button>

             <Link 
                 to="/"
                 className="rounded-lg text-xl p-2  m-2 w-32 bg-lime-400 text-white text-center flex-end shadow-lg hover:opacity-50 hover:shadow-sm">
                     Home
            </Link>

          </div>

        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Login;