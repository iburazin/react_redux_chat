import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signin } from "../../actions";

import Layout from "../../components/Layout";
import Card from "../../components/Card/Card";

import "./style.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const userLogin = e => {
    e.preventDefault();

    if (email === "") {
      alert("Email is required!");
      return;
    }
    if (password === "") {
      alert("Password is required!");
      return;
    }

    dispatch(signin({ email, password }));
  };

  if (auth.authenticated) {
    return <Redirect to={"/"} />;
  }

  return (
    <Layout>
      <div className="loginContainer">
        <Card>
          <form onSubmit={userLogin}>
            <input name="email" type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />

            <div>
              <button>Login</button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
