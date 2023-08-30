import React, { useState } from "react";
import AuthContext from "./authContext";

const AuthState = (props) => {
    const host = "http://localhost:5000"
    const initalProfile = []
    const [profile, setprofile] = useState(initalProfile);

    //Fetch Data
    const fetchProfile = async () => {
        //API CALL
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },

        });
        const json = await response.json();
        setprofile(json);
    }

    return (
        <AuthContext.Provider value={{ profile, fetchProfile }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;