import React from "react";
import { Container, Header, Segment, Loader } from "semantic-ui-react";
import API from "../helpers/api";
import BoardList from "../components/BoardList";

class BoardListView extends React.Component {
  state = {
    boards: [],
    isLoading: true
  };

  componentDidMount() {
    API.listBoards((boards, err) => {
      if (err) console.log(err);
      this.setState({
        boards: boards,
        isLoading: false
      });
    });
  }

  render() {
    return (
      <Container style={{ marginTop: "2rem" }}>
        <Segment>
          <Header as="h2">Select a board to begin</Header>
          <Loader active={this.state.isLoading}>Fetching Boards</Loader>
          <BoardList boards={this.state.boards} />
        </Segment>
      </Container>
    );
  }
}

export default BoardListView;
