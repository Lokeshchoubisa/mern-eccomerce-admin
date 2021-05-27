import React, { useState,useEffect} from 'react'
import Layout from '../../components/Layout'
import { Jumbotron } from "react-bootstrap"
import { Container, Form,Button ,Row,Col} from "react-bootstrap"
import Input from "../../components/UI/input"
import {isUserLoggedIn, login} from "../../actions"
import {useDispatch, useSelector} from "react-redux"
import { Redirect } from 'react-router'

// const auth= useSelectostate.state




function Signin() {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const auth=useSelector(state=>state.auth);
    const [Error,setError]=useState("");

   
  


    const dispatch = useDispatch();
    const userLogin=(e)=>
    {   e.preventDefault();
        const user={email,password};
        dispatch(login(user));
    }

    if(auth.authenticate)
    {
        return <Redirect to={"/"} />
    }

    return (
        <>
            <Layout>

                <Container>
                    <Row style={{marginTop:"50px"}}>
                        <Col md={{span:6,offset:3}}>

                            <Form onSubmit={userLogin}>

                                <Input  type="email" placeholder="Email" label="Email" value={email}
                                 onChange={(e)=>{setEmail(e.target.value)}}></Input>
                                <Input  type="password" placeholder="Password" label="password" value={password}
                                 onChange={(e)=>{setPassword(e.target.value)}}></Input>
                                
                               
                                <Button variant="primary" type="submit">
                                    Submit
                            </Button>
                            </Form>
                    </Col>
                    </Row>

                </Container>


            </Layout>







        </>

    )
}

export default Signin
