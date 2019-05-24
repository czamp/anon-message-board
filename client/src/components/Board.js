import React, { Component } from "react";
import { Container, Header, Loader, Message, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import PublishThread from "./PublishThread";
import BreadcrumbNav from "./BreadcrumbNav";
import Thread from "./Thread";
import API from "../helpers/api";

class Board extends Component {
  state = {
    threads: [],
    isLoading: true
  };

  componentDidMount() {
    API.listThreads(
      this.props.match.params.board,
      res =>
        this.setState({
          threads: res,
          isLoading: false,
          error: false
        }),
      err =>
        this.setState({
          isLoading: false,
          error: true
        })
    );
  }

  render() {
    const board = this.props.match.params.board;
    const { threads } = this.state;
    return (
      <Container text style={{ paddingTop: "2rem" }}>
        <BreadcrumbNav board={board} />
        <Header as="h1" textAlign="center">
          <Link to={`/b/${board}/`}>/b/{board}/</Link>
        </Header>
        <PublishThread board={board} />
        <Segment vertical>
          <Loader active={this.state.isLoading} />

          {/* Handle errors and no threads on board */}
          {!this.state.isLoading && (
            <React.Fragment>
              {this.state.error && (
                <React.Fragment>
                  <Header as="h2">Sorry, there seems to be a problem.</Header>
                  <Message error>
                    Error: Cannot get threads for /b/{board}/{" "}
                  </Message>
                </React.Fragment>
              )}
              {this.state.threads.length === 0 && (
                <React.Fragment>
                  <Header as="h2">
                    {" "}
                    Sorry, there don't appear to be any threads on /b/{board}/.
                  </Header>
                  <Header as="h4">Why don't you create a new one?</Header>
                </React.Fragment>
              )}
            </React.Fragment>
          )}

          {threads.map(thread => (
            <Thread
              board={board}
              key={thread._id}
              preview
              thread={thread}
            />
          ))}
        </Segment>
      </Container>
    );
  }
}

export default Board;
