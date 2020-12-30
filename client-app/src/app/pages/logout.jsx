import React, { Component } from "react"; 
 
export default () => {
  localStorage.setItem("torika_token", "");
  window.location.href = window.CLIENT_DOMAIN + "/booking";
  return null;
};
