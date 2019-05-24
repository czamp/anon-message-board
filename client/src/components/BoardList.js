import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  Container,
  Divider,
  Header,
  List,
  Loader,
  Message,
  Segment
} from "semantic-ui-react";
import API from "../helpers/api";
import PublishThread from "./PublishThread";

class BoardList extends Component {
  state = {
    boards: [],
    isLoading: true,
    error: false
  };

  componentDidMount() {
    this.getBoards();
  }

  getBoards = () => {
    API.listBoards(
      boards => this.setState({
        error: false,
        isLoading: false,
        boards: boards
      }),
      error =>
        this.setState({
          error: true,
          isLoading: false
        })
    );
  };

  render() {
    if (this.state.error) {
      return (
        <Container style={{ paddingTop: "2rem" }}>
          <Breadcrumb>
            <Breadcrumb.Section>
              <Link to="/">BOARDS</Link>
            </Breadcrumb.Section>
          </Breadcrumb>
          <Message error>Error: Can not retrieve list of boards.</Message>
        </Container>
      );
    } else {
      return (
        <Container style={{ paddingTop: "2rem" }}>
          <Breadcrumb>
            <Breadcrumb.Section>
              <Link to="/">BOARDS</Link>
            </Breadcrumb.Section>
          </Breadcrumb>
          <Segment>
            <Header as="h2">Select a board to begin</Header>
            <Loader inline="centered" active={this.state.isLoading}>
              Fetching Boards
            </Loader>
            {!this.state.isLoading && !this.state.error && (
              <List horizontal divided celled>
                {this.state.boards.map((board, i) => (
                  <List.Item key={i}>
                    <Link to={`/b/${board}/`}>{board.toUpperCase()}</Link>
                  </List.Item>
                ))}
              </List>
            )}
          </Segment>
          <Divider horizontal>or</Divider>
          <Loader inline="centered" active={this.state.isLoading} />
          {!this.state.isLoading && !this.state.error && (
            <PublishThread
              allBoards={true}
              boards={this.state.boards}
            />
          )}
        </Container>
      );
    }
  }
}

export default BoardList;
