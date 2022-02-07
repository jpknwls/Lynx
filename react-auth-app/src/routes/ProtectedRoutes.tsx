// ./src/routes/ProtectedRoute.tsx

import React from "react";
import { Navigate, Route,  RouteProps } from "react-router";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Profile from "../pages/Profile"


const ProtectedProfile = (props: RouteProps) => {
    const auth = useSelector((state: RootState) => state.auth);
    return auth.refreshToken ? <Profile account={ auth.account! }/> : <Navigate to="/login" />;
};

export default ProtectedProfile;