import classes from "./ProfileForm.module.css";
import { useRef, useContext,useHistory } from "react";
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
  const newPasswordRef = useRef();
  const authCtx = useContext(AuthContext);
    const history = useHistory();


  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordRef.current.value;


    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBjN7mZ1axTHHgEQNmj-2DQRlzEmEGyGHw",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
      .then((res) => {
        if (res.ok) {
          alert("Password updated successfully!");
          history.replace("/");
        } else {
          return res.json().then((data) => {
            let errorMessage = "Password update failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
