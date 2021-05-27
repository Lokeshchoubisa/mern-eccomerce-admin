import axios from "../helper/axios"

export const addProduct=(form)=>
{
    console.log(form);
    return async dispatch=>
    {
        
        try
        {
            const res=axios.post("/product/create",form);
        console.log(res);
        }
        catch(error)
        {
            console.log(error)
        }
    }
}