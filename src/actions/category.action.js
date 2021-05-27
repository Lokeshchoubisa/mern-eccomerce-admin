import axios from "../helper/axios"
import { categoryConstants } from "./constants"
export const getAllCategory = () => {
    return async dispatch => {
        console.log("category are loading...");
        dispatch({
            type: categoryConstants.GET_ALL_CATEGORY_REQUEST
        });
        

        try
        {
            const res = await axios.get("/category/getcategory");
        // console.log(res.data);
        const { categoryList } = res.data;
        console.log(categoryList)
        if (res.status === 200) {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
                payload: {
                    categories: categoryList
                }
            })
        }
        else {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORY_FAILURE
            })
        }
        }
        catch(error)
        {
            console.log(error)
        }


    }
}

export const addCategory = (form) => {
    return async dispatch => {

        dispatch({
            type: categoryConstants.ADD_NEW_CATEGORY_REQUEST
        });
     
        try
        {
            const res = await axios.post("/category/create", form);
        
            if(res.status===201)
            {   console.log(res.data.category);
                dispatch({
                    type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
                    payload:{category:res.data.category}
                });
            }
            else
            {
                dispatch({
                    type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
                    payload:res.data.error
                });
            }
    
        }
        catch(error)
        {
            console.log(error)
        }


    }
}
export const updateCategories = (form) => {
    return async dispatch => {

        // dispatch({
        //     type: categoryConstants.ADD_NEW_CATEGORY_REQUEST
        // });
       

        try
        {
            const res = await axios.post("/category/update", form);
        
            if(res.status===201)
            {   
                // console.log(res.data);
                return true;
                // dispatch({
                //     type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
                //     payload:{category:res.data.category}
                // });
            }
            else
            {
                // dispatch({
                //     type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
                //     payload:res.data.error
                // });
                return false;
    
            }
        }
        catch(error)
        {
            console.log(error)
        }
    }
}

export const deleteCategories = (form) => {
    return async dispatch => {

        // dispatch({
        //     type: categoryConstants.ADD_NEW_CATEGORY_REQUEST
        // });
        
        try
        {
            const res = await axios.post("/category/delete", form);
        
        if(res.status===201)
        {   
            console.log(res.data);
            return true;
            // dispatch({
            //     type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
            //     payload:{category:res.data.category}
            // });
        }
        else
        {
            // dispatch({
            //     type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
            //     payload:res.data.error
            // });
            return false;

        }
        }
        catch(error)
        {
            console.log(error)
        }

    }
}