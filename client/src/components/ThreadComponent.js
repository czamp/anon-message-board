import React from "react";
import { Segment, Grid } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import ReportButton from "./ReportButton";
import NewReplyForm from "./NewReplyForm";
import DeleteForm from "./DeleteForm";
import ReplyComponent from "./ReplyComponent";

const ThreadComponent = ({ board, thread, value }) => (
  <Segment.Group>
    <Segment secondary>
      <Grid columns={2}>
        <Grid.Column width={14}>
          <Link to={`/b/${board}/thread/${thread._id}`}>#{thread._id}</Link>
        </Grid.Column>
        <Grid.Column width={2}>
          <ReportButton board={board} type="thread" thread_id={thread._id} />
          <DeleteForm board={board} type="thread" thread_id={thread._id} />
        </Grid.Column>
      </Grid>
    </Segment>
    <Segment>{thread.text}</Segment>
    <Segment secondary>
      {thread.replies.map(reply => (
        <ReplyComponent
          board={board}
          key={reply._id}
          reply={reply}
          thread_id={thread._id}
        />
      ))}
    </Segment>
    <NewReplyForm board={board} thread_id={thread._id} />
  </Segment.Group>
);

export default ThreadComponent;
