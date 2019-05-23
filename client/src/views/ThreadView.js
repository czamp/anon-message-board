import React from "react";
import { Container, Loader, Header, Breadcrumb } from "semantic-ui-react";
import ThreadComponent from "../components/ThreadComponent";
import API from "../helpers/api";
import { Link } from "react-router-dom";

class ThreadView extends React.Component {
  state = {
    thread: {},
    isLoading: true
  };
  componentDidMount() {
    API.getCompleteThread(
      this.props.match.params.board,
      this.props.match.params.id,
      res => this.setState({ thread: res.data, isLoading: false }),
      err => "err"
    );
  }

  render() {
    const board = this.props.match.params.board;
    return (
      <Container style={{ paddingTop: "2rem" }} text>
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
          <Link to={`/b/${board}/`}>/b/{board}/</Link>
        </Header>

        <Loader active={this.state.isLoading} />
        {!this.state.isLoading && (
          <ThreadComponent
            board={this.props.match.params.board}
            thread={this.state.thread}
          />
        )}
      </Container>
    );
  }
}

export default ThreadView;
