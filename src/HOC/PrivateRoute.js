import React from "react"
import { Redirect, Route } from "react-router"
import {useSelector} from "react-redux"
import Signin from "../container/Signin"
import Home from "../container/Home"
const PrivateRoute=({component:Component,...rest})=>
{   
    
    return <Route {...rest} exact component={(props)=>{
        const token=window.localStorage.getItem("token");
        if(token)
        {   
            console.log("token is present");
            return <Component {...props} /> 
        }
        else{
            return <Redirect to={'/signin'} />
        }
    }} />
}

 
export default PrivateRoute;