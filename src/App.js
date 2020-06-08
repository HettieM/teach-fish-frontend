import React from "react";
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Landing from "./pages/landingPage/Landing";
import About from "./pages/aboutPage/About";
import Login from "./pages/loginPage/Login";
import SignUp from "./pages/signUpPage/SignUp";
import MyMissions from "./pages/myMissionsPage/MyMissions";
import MyProfile from "./pages/myProfilePage/MyProfile";
import Mission from "./pages/missionPage/Mission";

import netlifyIdentity from "netlify-identity-widget";
import auth from "../src/utils/auth";
import { loginUser, logoutUser } from "../src/utils/identityActions";

import "./App.css";
import { AppContextProvider } from "./utils/AppContext";

const App = () => {
  const [userInfo, setUserInfo] = React.useState();

  React.useEffect(() => {
    // const user = localStorage.getItem("gotrue.user");
    const user = netlifyIdentity.currentUser();
    console.log("user ", user);
    // console.log("app => user", user.token);
    // console.log(JSON.parse(user));

    if (user) {
      setUserInfo({ user: user });
      console.log(userInfo);
    } else {
      loginUser();
    }

    netlifyIdentity.on("login", (user) => setUserInfo({ user }, loginUser()));

    netlifyIdentity.on("logout", (user) =>
      setUserInfo({ user: null }, logoutUser()),
    );
  }, []);

  return (
    <AppContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={() => <Landing />} />
          <Route path="/about" component={() => <About />} />
          <Route path="/signup" component={() => <SignUp />} />
          <Route path="/login" component={() => <Login />} />

          {/* <Route path="/my-profile" component={auth(MyProfile, userInfo)} /> */}
          <Route
            path="/my-profile"
            component={auth(MyProfile, netlifyIdentity.currentUser())}
          />

          <Route path="/my-missions" component={() => <MyMissions />} />
          <Route path="/mission/:number" component={() => <Mission />} />
        </Switch>
      </Router>
    </AppContextProvider>
  );
};

const netlifyAuth = {
  isAuthenticated: false,
  user: null,
  authenticate(callback) {
    this.isAuthenticated = true;
    netlifyIdentity.open();
    netlifyIdentity.on("login", (user) => {
      this.user = user;
      callback(user);
    });
  },
  signout(callback) {
    this.isAuthenticated = false;
    netlifyIdentity.logout();
    netlifyIdentity.on("logout", () => {
      this.user = null;
      callback();
    });
  },
};

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        netlifyAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default App;
