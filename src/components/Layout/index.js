import React from 'react'
import { Container, Jumbotron } from 'react-bootstrap'
import Header from "../Header/index"
import { Col,Row } from 'react-bootstrap';
import {NavLink} from "react-router-dom"
import "./style.css"

function Layout(props) {
    return (
        <>
            <Header/>
            
            {
                props.sidebar? <Container  fluid>
            <Row >
                <Col  className="sidebar" md={2}>

                <ul>
                    <li><NavLink to={"/"}>Home</NavLink></li>
                    <li><NavLink to={"/products"}>products</NavLink></li>
                    <li><NavLink to={"/orders"}>orders</NavLink></li>
                    <li><NavLink to={"/category"}>category</NavLink></li>
                    
                </ul>
                </Col>
                <Col md={10} style={{marginLeft:"auto" ,paddingTop:"60px"}}>{props.children}</Col>
            </Row>
            </Container>:
            props.children
            }
            

           
            
            
        </>
    )
}

export default Layout
