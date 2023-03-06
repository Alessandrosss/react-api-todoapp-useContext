import React, { useContext } from "react";
import {
  Container,
  Header,
  Placeholder,
  PlaceholderLine,
  PlaceholderParagraph,
} from "semantic-ui-react";

const Home = () => {

  return (
    <Container>
      <Header as="h2">Homepage</Header>
      <Placeholder>
        <PlaceholderParagraph/>
      </Placeholder>
    </Container>
  );
};

export default Home;
