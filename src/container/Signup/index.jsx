import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Jumbotron } from "react-bootstrap"
import { Container, Form, Button, Row, Col } from "react-bootstrap"
import Input from "../../components/UI/input"
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { signup } from '../../actions'


function Signup(props) {

    const auth = useSelector(state => state.auth);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [firstName,setFirstName ]=useState("");
    const [lastName,setLastName ]=useState("");
    const dispatch = useDispatch();
    const user= useSelector(state => state.user)
    const userSignup=(e)=>
    {   e.preventDefault();
        const user={email,password,firstName,lastName};
        return dispatch(signup(user));
    }
    
    if (auth.authenticate) {
        return <Redirect to={"/"} />
    }
    if(user.loading)
    {
        return <p>loading...!</p>
    }

    return (
        <div>
            <Layout>
                <Container>
                    <p>{user.message} </p>
                    <Row style={{ marginTop: "50px" }}>
                        <Col md={{ span: 6, offset: 3 }}>

                            <Form onSubmit={userSignup}>
                                <Row>
                                    <Col md={6}>

                                        <Input
                                            placeholder="first name"
                                            label="First Name"
                                            value={firstName}
                                            onChange={(e) => {   setFirstName(e.target.value) }}
                                            type="text"
                                        ></Input>


                                    </Col>
                                    <Col md={6}>

                                        <Input placeholder="last name" label="Last Name" value={lastName}
                                            onChange={(e) => {setLastName(e.target.value) }}
                                            type="text"
                                        ></Input>

                                    </Col>
                                </Row>

                                <Input type="email" placeholder="Email" label="Email" value={email}
                                    onChange={(e) => {   setEmail(e.target.value) }}  ></Input>
                                <Input type="password" placeholder="Password" label="password" value={password}
                                    onChange={(e) => { setPassword(e.target.value)}}></Input>
                                
                                <Button variant="primary" type="submit">
                                    Submit
                            </Button>
                            </Form>
                        </Col>
                    </Row>

                </Container>

            </Layout>
        </div>
    )
}

export default Signup
