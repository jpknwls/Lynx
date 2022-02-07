
import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Page from "./pages/Page";
import Register from "./pages/Register";
import Home from "./pages/Home";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import ProtectedProfile from "./routes/ProtectedRoutes";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/profile" element={<ProtectedProfile/>} />
            <Route path="/:id/" element={<Page  />}  />
          </Routes>
        </div>
      </Router>
     </PersistGate>
    </Provider>
    )
}