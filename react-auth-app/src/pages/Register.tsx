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


function Register() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleRegister = (username: string, email: string, password: string) => {

    var data = {
      "email": email, 
      "password": password, 
      "username": username,
      };
      console.log(data)
    axios 
      .post(`${process.env.REACT_APP_API_URL}/auth/register/`, data)
      .then((res: any) => {
          console.log(res);
          let user = {
              "id": res.data.id,
              "email": data.email, 
              "username": data.username,
              "created": res.data.created,
              "updated": res.data.updated,
              "is_active": res.data.is_active,
              "links": "",
              "access": res.data.access,
              "refresh": res.data.token
          }

          dispatch(setAccount(user));
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
        if (err & err.response.data) {

            setMessage(err.response.data.detail.toString());
        }      
    });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",

    },
    onSubmit: (values: any) => {
      setLoading(true);
      handleRegister(values.username, values.email, values.password);
    },
    validationSchema: Yup.object({
      username: Yup.string().trim().required("Username is required."),
      email: Yup.string().trim().required("Email is required."),
      password: Yup.string().trim().required("Password is required.").min(8, 'Password must be 8 characters or more'),
    }),
  });

  return (
    <div className="h-screen flex bg-gradient-to-t from-green-100 to-lime-100 flex flex-col">
      <div className="w-full max-w-md m-auto bg-green-200 rounded-lg border border-primaryBorder shadow-lg py-10 px-16">
        <h1 className="font-medium text-5xl mt-4 mb-12 text-center">
          Register
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-4 ">
             <input
              className="border-b border-gray-300 w-full px-2 h-8 rounded focus:border-green-500 shadow-sm focus:shadow-lg"
              id="username"
              type="username"
              placeholder="Username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <input
              className="border-b border-gray-300 w-full px-2 h-8 rounded focus:border-green-500 shadow-sm focus:shadow-lg"
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email ? <div className="text-danger text-center my-2 px-4">{formik.errors.email} </div> : null}
            <input
              className="border-b border-gray-300 w-full px-2 h-8 rounded focus:border-green-500 shadow-sm focus:shadow-lg"
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password ? (
              <div className="text-danger text-center my-2 px-4">{formik.errors.password} </div>
            ) : null}
          </div>
          <div className="text-danger text-center my-2 px-4" hidden={false}>
            {message}
          </div>

          <div className="flex flex-col justify-center items-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg p-2 text-xl  m-2 w-32 bg-lime-400 text-white text-center flex-end shadow-lg hover:opacity-50 hover:shadow-sm"
            >
              Register
            </button>
              <Link 
                 to="/"
                 className="rounded-lg p-2 text-xl m-2 w-32 bg-lime-400 text-white text-center flex-end shadow-lg hover:opacity-50 hover:shadow-sm">
                     Home
            </Link>
          </div>
        </form>


      </div>

      <Footer />
    </div>
  );
}

export default Register;