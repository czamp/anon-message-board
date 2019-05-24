import React from "react";
import { Breadcrumb } from "semantic-ui-react";
import { Link } from "react-router-dom";

const BreadcrumbNav = props => (
  <Breadcrumb>
    <Breadcrumb.Section>
      <Link to="/">BOARDS</Link>
    </Breadcrumb.Section>
    {props.board && (
      <React.Fragment>
        <Breadcrumb.Divider />
        <Breadcrumb.Section>
          <Link to={`/b/${props.board}/`}>{props.board.toUpperCase()}</Link>
        </Breadcrumb.Section>
      </React.Fragment>
    )}
    {props.thread_id && (
      <React.Fragment>
        <Breadcrumb.Divider />
        <Breadcrumb.Section>
          <Link to={`/b/${props.board}/thread/${props.thread_id}`}>
            {props.thread_id}
          </Link>
        </Breadcrumb.Section>
      </React.Fragment>
    )}
  </Breadcrumb>
);

export default BreadcrumbNav;
