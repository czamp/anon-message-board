import React from "react";
import { Container, Divider, Breadcrumb } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import BoardList from "../components/BoardList";
import PublishThread from "../components/PublishThread";

const Home = () => (
  <Container
    text
    style={{
      paddingTop: "2rem",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column"
    }}
  >
    <Breadcrumb>
      <Breadcrumb.Section link>
        <Link to="/">Boards</Link>
      </Breadcrumb.Section>
    </Breadcrumb>
    <BoardList />
    <Divider horizontal>or</Divider>
    <PublishThread />
  </Container>
);

export default Home;
