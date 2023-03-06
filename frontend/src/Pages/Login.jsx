import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Header,
  Container,
  Form,
  Button,
  FormField,
  Input,
  Message,
} from "semantic-ui-react";

import { auth } from "../lib/auth";
import { AppContext } from "../App";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { token, isLIn, setToken, setIsLIn, errors, setErrors } =
    useContext(AppContext);

    //check if user is logged in and redirect him to dashboard
  if (isLIn && token) return navigate("/dashboard");

  // on "state" Change of <Input...> whatch the selected value
  // and set instead the new one.

  const handleChange = (event, props) => {
    const { name, value } = props;

    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  };

  // on click of <Button...> run login function

  const handleClick = () => {
    auth
      .login(email, password)
      .then((res) => {
        setErrors(res.message);
        if (res.data) {
          setToken(res.data.token);
          setIsLIn(res.success);
          navigate("/dashboard");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container text>
      <Header as="h2">Login Section</Header>
      <Form>
        <FormField>
          <label htmlFor="email">E-Mail</label>
          <Input
            type="email"
            name="email"
            value={email}
            id="email"
            placeholder="E-Mail"
            onChange={handleChange}
          />
        </FormField>
        <FormField>
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            name="password"
            value={password}
            id="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </FormField>
        <FormField>{errors && <Message negative>{errors}</Message>}</FormField>
        <FormField>
          <Button onClick={handleClick}>Login</Button>
          <Link to="/register">Register</Link>
        </FormField>
      </Form>
    </Container>
  );
};

export default Login;
