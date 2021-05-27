import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/Layout'
import {Table,Row,Col,Container} from "react-bootstrap"
import { useState } from 'react'
import { changeOrderStatus, fetchAllOrders } from '../../actions/order.action'
// import { propfind } from '../../../../back-end/src/routes/admin/initialData'

export default function Orders(props) {
    

    const [status,setStatus]=useState("");

    const order=useSelector(state=>state.order);
    const dispatch = useDispatch()
    // useEffect(()=>
    // {
    //     setState()
    // },[])

    // useEffect(() => {
    //     dispatch(fetchAllOrders());
    // }, [])

    const clickChangeStatus=(userId,orderId,statusDup)=>
    {

        // const form={
        //     "userId":"609bf5337040154024fb586b",
        //     "orderId":"60ac6595a3250c5fdc48432b",
        //     "status":"loading"
        // }
        if(status!="")
        {
           
           const form={
               userId,
               orderId,
               status
           }
           console.log(form)
           dispatch(changeOrderStatus(form)).then(dispatch(fetchAllOrders()));
          
        }
        else
        {
            alert("No value change")
        }



    }

    const renderOrders=()=>
    {
        return (
            <Table style={{fontSize:12 }} responsive="sm">
                <thead>
                <tr>
                        <th>#</th>
                        <th>Name</th>
                        {/* <th>Price</th> */}
                        <th>Address</th>
                        {/* <th>Description</th> */}
                        <th>Payment mode</th>
                        <th>Order status</th>
                        <th>Change</th>
                    </tr>
                </thead>
                <tbody>
               
                        {order.orders ? order.orders.map((product,index)=>
                         {
                        return (
                        
                        

                            <tr key={product._id}>
                                    <td>{index + 1}</td>
                                    <td>{product.productId.name}</td>
                                    {/* <td>{product.price}</td> */}
                                    <td>{product.deliveryAddress}</td>
                                    <td>{product.paymentMode}</td>
                                    <td>{product.status}</td>
                                    <td>
                                        <select key={product._id}  onChange={(e)=>setStatus(e.target.value)}>
                                            <option>None</option>
                                            <option>Pending</option>
                                            <option>Out for delivery</option>
                                        </select>
                                    </td>
                                    <td><button onClick={()=>clickChangeStatus(product.user,product._id,product.status)}>Change</button></td>

                            </tr>

                     )} ): <p>empty</p> }

                        


                </tbody>
            </Table>
        );

    }
    return (
        <>
           <Layout sidebar={props.home ? null :"sidebar"}>
            
           <Container>
                    <Row>
                        <Col md={12}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                {props.home ? <h3>Recent Orders</h3>:<h3>Orders</h3>}
                                
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>


                            {renderOrders()}

                        </Col>
                    </Row>
                </Container>


           </Layout>
         
           
        
        </>
    )
}
