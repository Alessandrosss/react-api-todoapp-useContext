import React, { useContext, useState } from "react";
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
import { AppContext } from "../App";

import { auth } from "../lib/auth";

const Register = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  
  const navigate = useNavigate();
  const { setIsLIn, setToken, setErrors, errors } = useContext(AppContext);
  

  // on "state" Change of <Input...> whatch the selected value
  // and set instead the new one.

  const handleChange = (e, params) => {
    const { name, value } = params;

    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "repeatPassword":
        setRepeatPassword(value);
        break;
    }
  };

  // on click of <Button...> run register function

  const handleClick = () => {
    auth
      .register(email, password, repeatPassword)
      .then((res) => {
        setErrors(res.error);
        if (res.data) {
          setToken(res.data.token);
          setIsLIn(res.success);
          navigate("/");
        }
      })
      .catch((err) => console.error(err));
    //.then(()=>{navigate("/")})
  };

  return (
    <Container text>
      <Header as="h2">Register Section</Header>
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
        <FormField>
          <label htmlFor="repeatPassword">Confirm Password</label>
          <Input
            type="password"
            name="repeatPassword"
            value={repeatPassword}
            id="repeatPassword"
            placeholder="Repeat Password"
            onChange={handleChange}
          />
        </FormField>
        <FormField>
          {errors && (<Message negative>{errors}</Message>)}
        </FormField>
        <FormField>
          <Button onClick={handleClick}>Register</Button>
          <Link to="/login">Login</Link>
        </FormField>
      </Form>
    </Container>
  );
};

export default Register;
