import React from "react";
import { List, Container, Header, Segment, Loader } from "semantic-ui-react";
import { Link } from "react-router-dom";
import API from "../helpers/api";

class BoardList extends React.Component {
  state = {
    boards: [],
    isLoading: true
  };

  componentDidMount() {
    API.listBoards((boards, err) => {
      if (err) console.log(err);
      this.setState({
        boards: boards.sort((a, b) => {
          if (a > b) {
            return 1;
          } else return -1;
        }),
        isLoading: false
      });
    });
  }

  render() {
    return (
      <Container style={{ marginTop: "2rem" }}>
        <Segment>
          <Header as="h2">Select a board to begin</Header>
          <Loader inline="centered" active={this.state.isLoading}>
            Fetching Boards...
          </Loader>
          <List horizontal divided celled>
            {this.state.boards.map((board, i) => (
              <List.Item key={i}>
                <Link to={`/b/${board}`}>{board.toUpperCase()}</Link>
              </List.Item>
            ))}
          </List>
        </Segment>
      </Container>
    );
  }
}

export default BoardList;
