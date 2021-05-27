import axios from "../helper/axios";
import { categoryConstants, initialDataConstants,productConstants } from "./constants";


export const getInitialData=()=>
{   console.log("get initial data is called");
    return async (dispatch) =>
    {
        // dispatch({
        //     type:initialDataConstants.GET_ALL_INITIAL_DATA_REQUEST
        // })
        const res=await axios.post("/initialdata");
        // console.log(res.data);
        // return ;
        if(res.status==200)
        {
            const {categories,products}=res.data;
            // console.log(res);
            // console.log(categories);
            dispatch({
                type:categoryConstants.GET_ALL_CATEGORY_SUCCESS,
                payload:{categories}    
            });
            dispatch({
                type:productConstants.GET_ALL_PRODUCT_SUCCESS,
                payload:{products}
            })
        }
       
        
    }
}