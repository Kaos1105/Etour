import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import routes from "./routes";
import withTracker from "./withTracker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import "./assets/css/login.css";
import "./assets/css/util.css";
import "./assets/css/custom.css";

import { Dispatcher, Constants } from "./flux";

import APIHelper from "./app/utils/apihelper.js";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "shards-react";

window.API_DOMAIN = "https://localhost:5001";
window.CLIENT_DOMAIN = "http://localhost:3000";

export default () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    setIsLoading(true);
    APIHelper.getWithBearer(
      window.API_DOMAIN + "/api/user",
      localStorage.getItem("torika_token")
    )
      .then(response => {
        console.log(response);
        if (response.userName && response.userName.length > 0) {
          window.currentUser = response;
          Dispatcher.dispatch({ actionType: Constants.LOAD_SIDEBAR });
          setUser(response); 
          setIsLoggedIn(true);
        }
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
        console.log(e);
      });
  }, []);

  let filteredRoutes = [];
  if (isLoading) {
    return null;
  }
  if (isLoggedIn && user.userName.includes("admin")) {
    filteredRoutes = routes.filter(r => r.isAdmin);
  } else if (isLoggedIn) {
    filteredRoutes = routes.filter(r => r.isUser);
  } else {
    filteredRoutes = routes.filter(r => !r.isAdmin && !r.isUser);
  }
  console.log(filteredRoutes);
  return (
    <Router basename={process.env.REACT_APP_BASENAME || ""}>
      <div>
        {filteredRoutes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={withTracker(props => {
                return (
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
                );
              })}
            />
          );
        })}
      </div>
    </Router>
  );
};
