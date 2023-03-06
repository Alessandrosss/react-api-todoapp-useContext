import React from "react";
import {
  Container,
  Header,
  Placeholder,
  PlaceholderLine,
  PlaceholderParagraph,
} from "semantic-ui-react";

const About = () => {
  return (
    <Container>
      <Header as="h2">About Page</Header>
      <Placeholder>
        <PlaceholderParagraph>
          <PlaceholderLine />
          <PlaceholderLine />
          <PlaceholderLine />
          <PlaceholderLine />
        </PlaceholderParagraph>
      </Placeholder>
    </Container>
  );
};

export default About;
