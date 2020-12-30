import React, { Component, useState } from "react";

import Config from "../../config/index";

import APIHelper from "../utils/apihelper";

import Lib from "../utils/lib";

import PopupNotification from "../../app/components/utils/popupnotification";

export default () => {
  const [showPopup, setShowPopup] = useState({});
  const closePopup = () => {
    setShowPopup(false);
  };
  const goToDashBoard = () => {
    if (Lib.getParameterByName("redirect")) {
      return Lib.navigateWithQuery(
        window.CLIENT_DOMAIN + Lib.getParameterByName("redirect")
      );
    }
    console.log("redirect ...");
    window.location.href = window.CLIENT_DOMAIN + "/dashboard";
  };
  const logIn = event => {
    console.log(event);
    event.preventDefault();
    const emailElem = document.querySelector("#email");
    const pwdElem = document.querySelector("#password");
    console.log(emailElem, pwdElem);
    if (!emailElem || !pwdElem) {
      return setShowPopup({
        open: true,
        title: "Try again",
        content: "Please refresh the page !"
      });
    }
    if (!Lib.validateEmail(emailElem.value)) {
      return setShowPopup({
        open: true,
        title: "Try again",
        content: "Check your email format / Password can not be empty!"
      });
    }

    APIHelper.post(window.API_DOMAIN + "/api/user/login", {
      email: emailElem.value,
      password: pwdElem.value
    })
      .then(data => {
        if (data.token && data.token.length > 0) {
          localStorage.setItem("torika_token", data.token);
          return setShowPopup({
            open: true,
            title: "Login Successfully",
            content: "You will be redirected to your dashboard",
            callback: goToDashBoard
          });
        }
        return setShowPopup({
          open: true,
          title: "Login Failed",
          content: "Please check your email or password and try again !"
        });
      })
      .catch(err => {
        return setShowPopup({
          open: true,
          title: "Login Failed",
          content: "Please refresh the page and try again !"
        });
      });
  };
  return (
    <div class="limiter">
      <div class="container-login100">
        <div class="wrap-login100 p-t-190 p-b-30">
          <form class="login100-form validate-form">
            <div class="login100-form-avatar">
              <img
                src={Config.LOGO_URL}
                onClick={() =>
                  (window.location.href = window.CLIENT_DOMAIN + "/booking")
                }
                style={{cursor: 'pointer'}}
                alt="LOGO"
              />
            </div>

            <span class="login100-form-title p-t-20 p-b-45"></span>

            <div
              class="wrap-input100 validate-input m-b-10"
              data-validate="Username is required"
            >
              <input
                class="input100"
                id="email"
                type="email"
                placeholder="Email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              />
              <span class="focus-input100"></span>
              <span class="symbol-input100">
                <i class="fa fa-user"></i>
              </span>
            </div>

            <div
              class="wrap-input100 validate-input m-b-10"
              data-validate="Password is required"
            >
              <input
                required
                id="password"
                class="input100"
                type="password"
                placeholder="Password"
              />
              <span class="focus-input100"></span>
              <span class="symbol-input100">
                <i class="fa fa-lock"></i>
              </span>
            </div>

            <div class="container-login100-form-btn p-t-10">
              <button onClick={event => logIn(event)} class="login100-form-btn">
                Login
              </button>
            </div>

            <div class="text-center w-full p-t-25 p-b-230">
              <a href="#" class="txt1"></a>
            </div>

            <div class="text-center w-full">
              <a class="txt1" href={"./signup" + window.location.search}>
                Create new account
                <i class="fa fa-long-arrow-right"></i>
              </a>
            </div>
          </form>
        </div>
      </div>
      {showPopup.open ? (
        <PopupNotification
          title={showPopup.title}
          close={closePopup.bind(this)}
          content={showPopup.content}
          callback={showPopup.callback}
        />
      ) : null}
    </div>
  );
};
