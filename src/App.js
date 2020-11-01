import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// components
import HomePage from "./containers/HomePage/HomePage";
import LoginPage from "./containers/Login/LoginPage";
import SignupPage from "./containers/Signup/SignupPage";
import PrivateRoute from "./components/PrivateRoute";

import "./App.css";
import { isLoggedInUser } from "./actions";

function App() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isLoggedInUser());
    }
  }, []);

  return (
    <div className="App">
      <Router>
        {/* only logged in user can see the HomePage */}
        <PrivateRoute path="/" component={HomePage} exact />

        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
      </Router>
    </div>
  );
}

export default App;
