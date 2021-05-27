import axios from "../helper/axios"
import { userConstants } from "./constants";

export const signup = (user) => {
    console.log("signup is called");
    console.log(user);

    return async (dispatch) => {
        dispatch({
            type:userConstants.USER_REGISTER_REQUEST
        });
        const res = await axios.post("/admin/signup", {
            ...user
        });
        if (res.status === 201) {
            // const { firstName } = res.data;
            

            dispatch({
                type: userConstants.USER_REGISTER_SUCCESS,
                payload: { message:"Admin created successfully...!"}
            });
        }
        else {
            console.log("400 status called");
            if (res.status === 400) {
                dispatch({
                    type: userConstants.USER_REGISTER_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        }
        // console.log("after dispatch")
    }
}
