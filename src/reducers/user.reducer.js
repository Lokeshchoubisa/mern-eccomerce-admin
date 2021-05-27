import { userConstants } from "../actions/constants";

const initState={
    error:null,
    message:"",
    loading:false
};


export default (state=initState,action)=>
{
    switch(action.type)
    {
        case userConstants.USER_REGISTER_REQUEST:
            state={
                loading:true,
                ...state
            };
            break;
        case userConstants.USER_REGISTER_SUCCESS:
            console.log("user is registeed");
            state={
                loading:false,
                ...state,
                message:action.payload.message
            };
            break;
        case userConstants.USER_REGISTER_FAILURE:
            state={
                loading:false,
                ...state,
                message:action.payload.error
            };
            break;
        
    }
    return state
}