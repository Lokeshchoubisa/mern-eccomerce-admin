import React, { useEffect } from 'react'
import { Col, Container, Jumbotron, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import Layout from '../../components/Layout'
import {useDispatch} from "react-redux"
import { isUserLoggedIn } from '../../actions';

import {NavLink} from "react-router-dom"
import Orders from '../orders/orders';
import { fetchAllOrders } from '../../actions/order.action';
 function Home() {
     const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(fetchAllOrders());
    // }, [])

    return (
        <div>
            <Layout sidebar>
                <Orders home />
                {/* <Jumbotron style={{margin:"3rem",background:"white"}} className="text-center">
                    <h1>Welcome to admin Dashboard</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. In pariatur provident eum corrupti. Molestiae ea soluta aliquam tempora ex? Aliquid provident eligendi nisi hic quasi necessitatibus officiis delectus, facere quia qui nihil, consequatur nostrum?</p>
                </Jumbotron> */}
            </Layout>
        </div>
    )
}


export default Home