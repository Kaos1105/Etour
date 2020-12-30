import React, { useState } from "react";

import Config from "../../config/index";

import APIHelper from "../utils/apihelper";

import Lib from "../utils/lib";

import PopupNotification from "../../app/components/utils/popupnotification";

export default () => {
  const [showPopup, setShowPopup] = useState({});
  const closePopup = () => {
    setShowPopup(false);
  };
  const goToLogin = () => {
    window.location.href = window.CLIENT_DOMAIN + "/login" + window.location.search;
  };
  const signUp = event => {
    console.log(event);
    event.preventDefault();
    const emailElem = document.querySelector("#email");
    const pwdElem = document.querySelector("#password");
    const confirmpwdElem = document.querySelector("#confirmpwd");
    const usernameElem = document.querySelector("#username");
    const fullnameElem = document.querySelector("#fullname");
    console.log(emailElem, pwdElem);
    if (
      !emailElem ||
      !pwdElem ||
      !confirmpwdElem ||
      !usernameElem ||
      !fullnameElem
    ) {
      return setShowPopup({
        open: true,
        title: "Error",
        content: "Please refresh the page and try again !"
      });
    }

    if (
      !emailElem ||
      !pwdElem ||
      !confirmpwdElem ||
      !usernameElem ||
      !fullnameElem
    ) {
      return setShowPopup({
        open: true,
        title: "Try again",
        content: "Please refresh the page and try again !"
      });
    }
    if (
      !Lib.validateEmail(emailElem.value) ||
      !pwdElem.value ||
      !confirmpwdElem.value ||
      !usernameElem.value ||
      !fullnameElem.value ||
      confirmpwdElem.value !== pwdElem.value
    )
      return setShowPopup({
        open: true,
        title: "Try again",
        content: "Please check your input and try again !"
      });

    APIHelper.post(window.API_DOMAIN + "/api/user/register", {
      email: emailElem.value,
      password: pwdElem.value,
      displayName: fullnameElem.value,
      username: usernameElem.value
    })
      .then(data => {
        debugger;
        if ((data.errors && typeof data.errors === "string") || !data.errors) {
          return setShowPopup({
            open: true,
            title: "Signup Successfully",
            content: "You will be redirected to login page",
            callback: goToLogin
          });
        }
        console.log("data ne", data);
        const errorContents = [];
        for (let key in data.errors) {
          errorContents.push(data.errors[key]);
        }
        return setShowPopup({
          open: true,
          title: "Errors",
          content: !errorContents.length && "Something's wrong !",
          contents: errorContents
        });
      })
      .catch(err => {
        console.log(err);
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
                style={{ cursor: "pointer" }}
                alt="LOGO"
              />
            </div>

            <span class="login100-form-title p-t-20 p-b-45"></span>

            <div
              class="wrap-input100 validate-input m-b-10"
              data-validate="Full name is required"
            >
              <input
                class="input100"
                type="text"
                id="fullname"
                placeholder="Full name"
              />
              <span class="focus-input100"></span>
              <span class="symbol-input100">
                <i class="fa fa-id-card"></i>
              </span>
            </div>

            <div
              class="wrap-input100 validate-input m-b-10"
              data-validate="Username is required"
            >
              <input
                class="input100"
                type="text"
                id="username"
                placeholder="Username"
              />
              <span class="focus-input100"></span>
              <span class="symbol-input100">
                <i class="fa fa-user"></i>
              </span>
            </div>

            <div
              class="wrap-input100 validate-input m-b-10"
              data-validate="Email is required"
            >
              <input
                class="input100"
                type="text"
                id="email"
                placeholder="Email"
              />
              <span class="focus-input100"></span>
              <span class="symbol-input100">
                <i class="fa fa-envelope"></i>
              </span>
            </div>

            <div
              class="wrap-input100 validate-input m-b-10"
              data-validate="Password is required"
            >
              <input
                class="input100"
                id="password"
                type="password"
                placeholder="Password"
              />
              <span class="focus-input100"></span>
              <span class="symbol-input100">
                <i class="fa fa-lock"></i>
              </span>
            </div>

            <div
              class="wrap-input100 validate-input m-b-10"
              data-validate="Confirm your password is required"
            >
              <input
                class="input100"
                type="password"
                id="confirmpwd"
                placeholder="Confirm your password"
              />
              <span class="focus-input100"></span>
              <span class="symbol-input100">
                <i class="fa fa-lock"></i>
              </span>
            </div>

            <div class="container-login100-form-btn p-t-10">
              <button
                onClick={event => signUp(event)}
                class="login100-form-btn"
              >
                Sign up
              </button>
            </div>

            <div class="text-center w-full p-t-25 p-b-230">
              <a href="#" class="txt1"></a>
            </div>

            <div class="text-center w-full">
              <a class="txt1" href="./login">
                Login
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
          contents={showPopup.contents}
        />
      ) : null}
    </div>
  );
};
