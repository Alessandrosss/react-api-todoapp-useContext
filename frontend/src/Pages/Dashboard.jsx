import React, { useState, useEffect, useContext} from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Container,
  Header,
  Button,
  Icon,
  Input,
  FormField,
  Message,
} from "semantic-ui-react";
import { todos } from "../lib/todos";

const Dashboard = () => {

  /* NAVIGATE HOOK */
  const navigate = useNavigate();

  /* CONTEXT HOOK */
  const { isLIn, errors, setErrors } = useContext(AppContext);
  
  /* STATE HOOK */
  const [inputValue, setInputValue] = useState("");

  /* ON RENDER... */
  useEffect(() => {
    /* CHECK IF USER IS LOGGED IN */
    if (!isLIn) navigate("/login");

    console.log("State are not defined!");
    /* useStore READ TODOS */
  }, []);

  const postList = []
  
  return (

    <Container>
      <Header as="h1">Dashboard</Header>
      <FormField>{errors && <Message negative>{errors}</Message>}</FormField>
      <Input
        onChange={(e) => setInputValue(e.target.value)}
        name="title"
        placeholder="New Todo"
      />

      <Button icon>
        <Icon name="plus" />
      </Button>

      {postList &&
        postList.map(({ content, _id }) => {
          return (
            <Card key={_id}>
              <Card.Content>
                <Card.Description as="h5">{content}</Card.Description>
              </Card.Content>
              <Button.Group>
                <Button icon>
                  <Icon name="trash" />
                </Button>
                <Button icon>
                  <Icon name="undo" />
                </Button>
              </Button.Group>
            </Card>
          );
        })}
    </Container>
  );
};

export default Dashboard;
