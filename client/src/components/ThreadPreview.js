import React from "react";
import { Segment, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import DeleteForm from "./DeleteForm";
import ReplyComponent from "./ReplyComponent";
import NewReplyForm from "./NewReplyForm";
import ReportButton from "./ReportButton";

const ThreadPreview = ({ board, thread }) => (
  <Segment.Group>
    <Segment secondary>
      <Grid columns={2}>
        <Grid.Column width={14}>
          <Link to={`/b/${board}/thread/${thread._id}`}>#{thread._id}</Link> |{" "}
          <time dateTime={new Date(thread.created_on)}>
            {new Date(thread.created_on).toLocaleString("en-US")}
          </time>
        </Grid.Column>
        <Grid.Column width={2}>
          <ReportButton board={board} thread_id={thread._id} />
          <DeleteForm board={board} thread_id={thread._id} type="thread" />
        </Grid.Column>
      </Grid>
    </Segment>
    <Segment>{thread.text}</Segment>
    {thread.replycount > 0 && (
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
    )}
    {thread.replycount > 3 && (
      <Segment tertiary>
        <p>
          {thread.replycount - 3} replies omitted.{" "}
          <Link to={`/b/${board}/thread/${thread._id}`}>Click to Expand.</Link>
        </p>
      </Segment>
    )}
    <NewReplyForm board={board} thread_id={thread._id} />
  </Segment.Group>
);

export default ThreadPreview;
