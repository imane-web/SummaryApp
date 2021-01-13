import React, {useState, useEffect} from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Search from "./components/layout/searchBar";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import userContext from "./context/UserContext";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./index.css";
import Axios from "axios";


export default function App() {
  const [userData,setUserData] = useState({
    token: undefined,
    user: undefined

  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:4000/users/login",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:4000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);
 // jiiiiiiii
  return (
    <>
      <BrowserRouter>
      <userContext.Provider value={{userData,setUserData}}>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </div>
          </userContext.Provider>
      </BrowserRouter>
    </>
  );
}