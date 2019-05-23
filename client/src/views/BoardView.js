import React from "react";
import { Container, Header, Breadcrumb } from "semantic-ui-react";
import { Link } from "react-router-dom";
import NewThreadForm from "../components/NewThreadForm";
import ThreadList from "../components/ThreadList";

class BoardView extends React.Component {
  render() {
    return (
      <Container text style={{ paddingTop: "2rem" }}>
        <Breadcrumb>
          <Breadcrumb.Section link>
            <Link to="/">Boards</Link>
          </Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section link>
            <Link to={`/b/${this.props.match.params.board}/`}>
              {this.props.match.params.board}
            </Link>
          </Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section link>
            <Link to={`/b/${this.props.match.params.board}/thread/${this.props.match.params.id}`}>
              {this.props.match.params.id}
            </Link>
          </Breadcrumb.Section>
        </Breadcrumb>
        <Header as="h1">
          <Link to={`/b/${this.props.match.params.board}/`}>
            /b/{this.props.match.params.board}/
          </Link>
        </Header>
        <NewThreadForm board={this.props.match.params.board} />
        <ThreadList board={this.props.match.params.board} />
      </Container>
    );
  }
}

export default BoardView;
