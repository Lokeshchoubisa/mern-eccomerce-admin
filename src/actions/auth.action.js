import { authConstants } from "./constants"
import axios from "../helper/axios"

export const login = (user) => {
    console.log(user);

    return async (dispatch) => {
        dispatch({
            type: authConstants.LOGIN_REQUEST
        });



        try {
            const res = await axios.post("/admin/signin", {
                ...user
            });
            if (res.status === 200) {
                const { token, users } = res.data;
                localStorage.setItem("token", token);
                localStorage.setItem("users", JSON.stringify(users));

                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: { token, users }
                });
            }
            else {
                console.log("400 status called");
                if (res.status === 400) {
                    dispatch({
                        type: authConstants.LOGIN_FAILURE,
                        payload: { error: res.data.error }
                    })
                }
            }
        }
        catch (error) {
            console.log(error)
        }
        // console.log("after dispatch")
    }
}


export const isUserLoggedIn = () => {
    console.log("is userloggin is called");
    return (dispatch) => {
        const token = localStorage.getItem("token");
        console.log(token);
        // const users=localStorage.getItem("token");
        if (token) {
            const users = JSON.parse(localStorage.getItem("users"));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: { token, users }
            });
        }
        else {
            console.log("not token available");
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: "failed to login" }
            });

        }
    }
}


export const signout = () => {
    return async (dispatch) => {
        dispatch({
            type: authConstants.LOGOUT_REQUEST
        });



        try {
            const res = await axios.post("/admin/signout");

            if (res.status === 200) {
                localStorage.clear();
                dispatch({
                    type: authConstants.LOGOUT_SUCCESS
                })

            }
            else {
                dispatch({
                    type: authConstants.LOGOUT_FAILURE
                })
            }
        }
        catch (error) {
            console.log(error)
        }

    }
}