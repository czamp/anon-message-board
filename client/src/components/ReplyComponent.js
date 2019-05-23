import React from "react";
import { Segment, Grid } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import DeleteForm from "./DeleteForm";
import ReportButton from "./ReportButton";

const ReplyComponent = ({ board, reply, thread_id }) => (
  <Segment.Group>
    <Segment>
      <Grid>
        <Grid.Column width={14}>
          <Link to={`/b/${board}/thread/${thread_id}`}>#{reply._id}</Link> |{" "}
          <time dateTime={new Date(reply.created_on)}>
            {new Date(reply.created_on).toLocaleString("en-US")}
          </time>
        </Grid.Column>
        <Grid.Column width={2}>
          <ReportButton
            board={board}
            reply_id={reply._id}
            thread_id={thread_id}
            type="reply"
          />
          <DeleteForm
            board={board}
            reply_id={reply._id}
            thread_id={thread_id}
            type="reply"
          />
        </Grid.Column>
      </Grid>
    </Segment>
    <Segment>{reply.text}</Segment>
  </Segment.Group>
);

export default ReplyComponent;
