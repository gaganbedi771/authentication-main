import { Switch, Route, Redirect } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "./store/auth-context";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";

function App() {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const checkToken = async () => {
      if (!authCtx.token) {
        return;
      }
      try {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBjN7mZ1axTHHgEQNmj-2DQRlzEmEGyGHw",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: authCtx.token,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (!res.ok) {
          throw new Error("Token validation failed!");
        }
      } catch (error) {
        console.log(error);
        authCtx.logout();
      }
    };
  }, [authCtx]);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/profile">
            <UserProfile />
          </Route>
        )}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
