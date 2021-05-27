import React from 'react'
import axios from '../helper/axios'
import { orderConstant } from './constants';

export const fetchAllOrders= () => {
    return async dispatch => {
        
        try
        {
        const res =await axios.post("order/fetchallorder");
        console.log(res.data);
        if(res.status==201)
        {   console.log("orders  are")
            console.log(res.data);
            dispatch({
                type:orderConstant.GET_ORDER_DATA_SUCCESS,
                payload:res.data
            })
            // console.log(res.data);
        }
    }
    catch(error)
    {
        console.log(error);
    }
    }
}


export const changeOrderStatus=(form)=>
{
    return async dispatch =>
    {

        
        try
        {
            const res =await axios.post("order/changestatus",form);
        if(res.status==201)
        {   
            console.log("orders  are")
            console.log(res.data);
            return true;
            // console.log(res.data);
        }
        }
        catch(error)
        {
            console.log(error)
        }



    }
}