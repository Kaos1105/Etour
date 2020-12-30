import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";

import Login from './app/pages/login';
import Signup from './app/pages/signup';

import Place from './app/pages/place';
import Tour from './app/pages/tour';
import Trip from './app/pages/trip';
import Booking from './app/pages/booking';

import YourTickets from './app/pages/yourtickets'

import Profile from './app/pages/profile'

import Logout from './app/pages/logout'


import Ticket from './app/pages/ticket'

import Dashboard from './app/pages/dashboard'

export default [{
        path: "/logout",
        layout: Logout,
        component: null,
        isUser: true,
        isAdmin: true,
    },
    {
        path: "/booking",
        layout: DefaultLayout,
        component: Dashboard,
        isAdmin: true,
    }, 
    {
        path: "/ticket",
        layout: DefaultLayout,
        component: Ticket,
        isAdmin: true,
    }, {
        path: "/place",
        layout: DefaultLayout,
        component: Place,
        isAdmin: true
    },
    {
        path: "/tour",
        layout: DefaultLayout,
        component: Tour,
        isAdmin: true
    },
    {
        path: "/trip",
        layout: DefaultLayout,
        component: Trip,
        isAdmin: true
    }, {
        path: "/overview",
        layout: DefaultLayout,
        component: Dashboard,
        isAdmin: true,
    }, {
        path: "/booking",
        layout: Booking,
        component: null,
        isUser: true,
    }, {
        path: "/your-tickets",
        layout: DefaultLayout,
        component: YourTickets,
        isUser: true
    },
    {
        path: "/user-profile",
        layout: DefaultLayout,
        component: Profile,
        isUser: true
    },
    {
        path: "/login",
        layout: Login,
        component: null
    },
    {
        path: "/signup",
        layout: Signup,
        component: null
    },


    {
        path: "/booking",
        layout: Booking,
        component: null,
    },

    {
        path: "/your-tickets",
        layout: Login,
        component: null,
    },
    {
        path: "/", 
        exact: true,
        layout: Booking,
        component: null,
    },
    {
        path: "/", 
        exact: true,
        layout: Booking,
        component: null,
        isUser:true
    },
    {
        path: "/your-tickets",
        layout: DefaultLayout,
        component: Dashboard,
        isAdmin: true
    },
    {
        path: "/",
        exact: true,
        layout: DefaultLayout,
        component: Dashboard,
        isAdmin: true
    },
    {
        path: "/dashboard",
        layout: DefaultLayout,
        component: YourTickets,
        isUser: true
    },





];