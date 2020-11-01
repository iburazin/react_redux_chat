import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import firebase from "firebase";
import { Provider } from "react-redux";
import store from "./store";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPvsWys8ClVly7nZzdL6CgweMOBugn8MU",
  authDomain: "web-messenger-1f1e4.firebaseapp.com",
  databaseURL: "https://web-messenger-1f1e4.firebaseio.com",
  projectId: "web-messenger-1f1e4",
  storageBucket: "web-messenger-1f1e4.appspot.com",
  messagingSenderId: "491213913881",
  appId: "1:491213913881:web:a6f98853114d69d9110f88",
  measurementId: "G-4YCFX7642P"
};

firebase.initializeApp(firebaseConfig);

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
