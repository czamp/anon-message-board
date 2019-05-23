import React from "react";
import { Form, Header, Segment, Dropdown } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import API from "../helpers/api";

class PublishThread extends React.Component {
  state = {
    text: "",
    delete: "",
    board: "",
    boards: [],
    success: false,
    isLoading: true
  };

  componentDidMount() {
    API.listBoards((boards, err) => {
      if (err) console.log(err);
      boards = boards.map((b, i) => {
        return { key: i, text: b, value: b };
      });
      this.setState({
        isLoading: false,
        boards: boards.sort((a, b) => {
          if (a.text > b.text) {
            return 1;
          } else return -1;
        })
      });
    });
  }
  handleAddition = (e, { value }) => {
    this.setState(prevState => ({
      boards: [{ text: value, value }, ...prevState.boards]
    }));
  };
  handleChange = (e, { name, value }) => {
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    API.postThread(
      e,
      this.state.board,
      this.state.text,
      this.state.delete,
      () =>
        this.setState({
          success: true,
          text: "",
          delete: ""
        }),
      error => console.log(error)
    );
  };

  render() {
    return (
      <Segment>
        <Header>Submit a New Thread</Header>
        <Form>
          <Form.Field>
            <label>Board</label>
            <Dropdown
              allowAdditions
              disabled={this.state.isLoading}
              fluid
              loading={this.state.isLoading}
              name="board"
              onAddItem={this.handleAddition}
              onChange={this.handleChange}
              options={this.state.boards}
              placeholder="Choose a board, or create your own"
              search
              selection
              value={this.state.board}
            />
          </Form.Field>
          <Form.Field>
            <label>Thread Text</label>
            <Form.TextArea
              name="text"
              onChange={this.handleChange}
              placeholder="Thread text..."
              value={this.state.text}
            />
          </Form.Field>
          <Form.Field>
            <Form.Group>
              <Form.Input
                name="delete"
                onChange={this.handleChange}
                placeholder="Password to delete..."
                size="mini"
                type="password"
                value={this.state.delete}
                width={4}
              />
              <Form.Button
                content="Submit Thread"
                icon="edit"
                labelPosition="left"
                onClick={this.handleSubmit}
                primary
                size="mini"
              />
            </Form.Group>
          </Form.Field>
        </Form>
        {this.state.success && <Redirect to={`/b/${this.state.board}/`} />}
      </Segment>
    );
  }
}

export default PublishThread;
