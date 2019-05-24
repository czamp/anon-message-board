import React from "react";
import { Header, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Thread from "./Thread";
import BreadcrumbNav from "./BreadcrumbNav";

const SingleThread = props => (
  <React.Fragment>
    <BreadcrumbNav
      board={props.match.params.board}
      thread_id={props.match.params.id}
    />
    <Thread board={props.match.params.board} id={props.match.params.id} />
    <Segment vertical>
      <Header as="h4">
        <Link to={`/b/${props.match.params.board}`}>
          Click here to return to /b/{props.match.params.board}/
        </Link>
      </Header>
    </Segment>
  </React.Fragment>
);

export default SingleThread;
