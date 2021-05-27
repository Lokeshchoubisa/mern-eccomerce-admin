// import axios from 'axios'
import axios from "axios"
import { api } from '../urlConfig';
import store from "../store"
import { authConstants } from '../actions/constants';
const token=localStorage.getItem("token");
console.log("authorization for axios is called");


const axiosinstance=axios.create(
    {
        baseURL:api,
        headers:{
            "Authorization":token ? ('Bearer '+token) :"",
            
        }
    }
);

axiosinstance.interceptors.request.use(req=>
    {
        // console.log(req);
        const {auth}=store.getState(state=>state.auth);
        
        if(auth.token)
        {

            req.headers.Authorization=('Bearer '+auth.token);
        }
        return req;
    });

axiosinstance.interceptors.response.use(res=>
{
console.log("inside response");
console.log(res);
return res

},(error)=>
{   
    console.log(error)
    if(error.response.status==500)
    {
        localStorage.clear();
        store.dispatch({type:authConstants.LOGOUT_SUCCESS})
        
    }
    console.log(error);
})

export default axiosinstance;