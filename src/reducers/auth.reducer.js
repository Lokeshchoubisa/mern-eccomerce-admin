// import { fetchAllOrders } from "../../../back-end/src/controller/order";
import { authConstants } from "../actions/constants";

const initState={
    token:null,
    user:
    {
        firstName:"",
        lastName:"",
        email:"",
        picture:""
    },
    authenticate:false,
    authenticating:false,
    loading:false,

    error:null,
    message:""

}
export default (state=initState,action)=>
{   console.log(action);
    switch(action.type)
    {
        case authConstants.LOGIN_REQUEST:
            state={
                ...state,
                authenticating:true
            };
            break;
        case authConstants.LOGIN_SUCCESS:
            console.log("login sucess reducer is called");
            state={
            
                user:action.payload.users,
                token:action.payload.token,
                authenticate:true,
                authenticating:false
            }
            break;
        case authConstants.LOGIN_FAILURE:
            console.log("login fail is called");
            state={
                error:action.payload.error,
                authenticate:false,
                authenticating:false
            }
            break
        case authConstants.LOGOUT_REQUEST:
            state={
                ...state,loading:true
            }
            break
        case authConstants.LOGOUT_SUCCESS:
            state={
                ...initState
                
            }
            break;
        case authConstants.LOGOUT_FAILURE:
            state={
                ...state,error:action.payload.error,
                loading:false
            }
        

    }
    return  state;

}