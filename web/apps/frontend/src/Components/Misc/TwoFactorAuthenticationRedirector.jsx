import React from "react";
import { Navigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { useLocation } from "react-router-dom";

import { currentUserState } from "../../AppState";

/**
  The purpose of this component is to intercept authenticated users whom have
  two-factor authentication (2FA) enabled and they did not validate their 2FA
  code after logging on.
 */
function TwoFactorAuthenticationRedirector() {

    ////
    //// Global state.
    ////
    const [currentUser] = useRecoilState(currentUserState);

    ////
    //// Logic
    ////

    // Get the current location and if we are at specific URL paths then we
    // will not render this component.
    const ignorePathsArr = [
        "/",
        "/register",
        "/register-successful",
        "/index",
        "/login",
        "/login/2fa",
        "/logout",
        "/verify",
        "/forgot-password",
        "/password-reset",
        "/root/dashboard",
        "/root/tenants",
        "/root/tenant",
        "/terms",
        "/privacy"
    ];
    const location = useLocation();
    var arrayLength = ignorePathsArr.length;
    for (var i = 0; i < arrayLength; i++) {
        // console.log(location.pathname, "===", ignorePathsArr[i], " EQUALS ", location.pathname === ignorePathsArr[i]); // For debugging purposes only.
        if (location.pathname === ignorePathsArr[i]) {
            return (null);
        }
    }

    // console.log("TwoFactorAuthenticationRedirector | currentUser:", currentUser)

    if (currentUser === null) {
        console.log("No current user detected, redirecting back to login page.");
        return <Navigate to={`/login?unauthorized=true`}  />
    } else {
        if (currentUser.otpEnabled === true) {
            if (currentUser.otpVerified === false) {
                return <Navigate to={`/login/2fa/step-1`}  />
            } else if (currentUser.otpValidated === false) {
                return <Navigate to={`/login/2fa`}  />
            }
        }
        return (null);
    };
}

export default TwoFactorAuthenticationRedirector;
