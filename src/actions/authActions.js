import { auth, firestore } from "firebase";
import { authConstants } from "./constants";

export const signup = user => {
  return async dispatch => {
    const db = firestore();

    dispatch({ type: authConstants.USER_LOGOUT_REQUEST });

    auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(data => {
        console.log(data);
        const currentUser = auth().currentUser;
        const name = `${user.username}`;
        currentUser
          .updateProfile({
            displayName: name
          })
          .then(() => {
            //the profile updated successfully
            db.collection("users")
              .doc(data.user.uid)
              .set({
                username: user.username,
                uid: data.user.uid,
                createdAt: new Date(),
                isOnline: true
              })
              .then(() => {
                // user data added to collection. Log in user
                const loggedInUser = {
                  username: user.username,
                  uid: data.user.uid,
                  email: user.email
                };
                localStorage.setItem("user", JSON.stringify(loggedInUser));
                console.log("Successful login!");
                dispatch({
                  type: authConstants.USER_LOGIN_SUCCESS,
                  payload: { user: loggedInUser }
                });
              })
              .catch(error => {
                console.log(error);
                dispatch({ type: authConstants.USER_LOGIN_FAILURE, payload: { error } });
              });
          });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const signin = user => {
  return async dispatch => {
    dispatch({ type: authConstants.USER_LOGIN_REQUEST });
    auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(data => {
        console.log(data);

        const db = firestore();
        db.collection("users")
          .doc(data.user.uid)
          .update({
            isOnline: true
          })
          .then(() => {
            const username = data.user.displayName;

            const loggedInUser = {
              username,
              uid: data.user.uid,
              email: data.user.email
            };

            localStorage.setItem("user", JSON.stringify(loggedInUser));

            dispatch({
              type: authConstants.USER_LOGIN_SUCCESS,
              payload: { user: loggedInUser }
            });
          })
          .catch(error => {
            console.log(error);
            dispatch({
              type: authConstants.USER_LOGIN_FAILURE,
              payload: { error }
            });
          })
          .catch(error => {
            console.log(error);
          });
      });
  };
};

export const isLoggedInUser = () => {
  return async dispatch => {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

    if (user) {
      dispatch({
        type: authConstants.USER_LOGIN_SUCCESS,
        payload: { user }
      });
    } else {
      dispatch({
        type: authConstants.USER_LOGOUT_FAILURE,
        payload: { error: "Login again please" }
      });
    }
  };
};

export const logout = uid => {
  return async dispatch => {
    dispatch({ type: authConstants.USER_LOGOUT_REQUEST });

    // sign out the user using firebase auth() methods

    const db = firestore();
    db.collection("users")
      .doc(uid)
      .update({
        isOnline: false
      })
      .then(() => {
        auth()
          .signOut()
          .then(() => {
            localStorage.clear();
            dispatch({ type: authConstants.USER_LOGOUT_SUCCESS });
          })
          .catch(error => {
            console.log(error);
            dispatch({ type: authConstants.USER_LOGOUT_FAILURE, payload: { error } });
          });
      })
      .catch(error => {
        console.log(error);
      });
  };
};
