import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import FormContainer from "../components/FormContainer";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const [justNameOfFunctionToCall, {isLoading}] = useLoginMutation();
    // {isLoading} is there by default
    const [login, { isLoading }] = useLoginMutation();

    // To get user data
    // 'userInfo' comes from 'authSlice.js'
    // 'auth' from '(state) => state.auth' also comes from 'authSlice.js'
    const { userInfo } = useSelector((state) => state.auth);

    // If user is logged in
    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            // calling 'login'
            // 'unwrap()' will return 'promise'
            const res = await login({ email, password }).unwrap();
            // setting user to 'state' and 'local storage'
            dispatch(setCredentials({ ...res }));
            // navigate to home screen
            navigate("/");
        } catch (error) {
            toast.error(error?.data?.message || error.error);
            console.error(error?.data?.message || error.error);
        }
    };

    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="my-2" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="your.email@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId="password">
                    <Form.Label>password Address</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {isLoading && <Loader />}

                <Button type="submit" variant="primary" className="mt-3">
                    Sign In
                </Button>

                <Row className="py-3">
                    <Col>
                        Need to register? <Link to="/register">Register</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    );
};

export default LoginScreen;
