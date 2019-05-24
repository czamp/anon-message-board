import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Form, Header, Message, Segment, Dropdown } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import API from "../helpers/api";

class PublishThread extends Component {
  state = {
    text: "",
    delete_password: "",
    success: false,
    redirect: false,
  };

  static propTypes = {
    allBoards: PropTypes.bool,
    board: PropTypes.string,
    boards: PropTypes.array,
  }

  static defaultProps = {
    allBoards: false
  }

  componentDidMount() {
    if (this.props.allBoards) {
      var boards = this.props.boards.map((b, i) => {
        return { key: i, text: b, value: b };
      });
      this.setState({
        boards: boards.sort((a, b) => {
          if (a.text > b.text) {
            return 1;
          } else return -1;
        })
      });
    }
  }

  handleAddition = (e, { value }) => {
    this.setState(prevState => ({
      boards: [{ text: value, value }, ...prevState.boards]
    }));
  };

  handleChange = (e, { name, value }) => {
    this.setState({
      [name]: value,
    });
    if (name === 'board') {
      this.setState({boardInputError: false})
    }
    if (name === 'delete_password') {
      this.setState({ passwordInputError: false })
    }
    if (name === 'text') {
      this.setState({ textInputError: false })
    }
  };

  handleSubmit = e => {
    if (this.props.allBoards && this.state.board === "") {
      this.setState({
        boardInputError: true
      });
    }
    if (this.state.text === "") {
      this.setState({
        textInputError: true
      });
    }
    if (this.state.delete_password === "") {
      this.setState({
        passwordInputError: true
      });
    } else {
      API.postThread(
        e,
        this.state.board ? this.state.board : this.props.board,
        this.state.text,
        this.state.delete_password,
        (res) =>
          this.setState({
            success: true,
            text: "",
            delete_password: "",
            redirect: true,
            thread_id: res.data
          }),
        error => console.log(error)
      );
    }
  };

  render() {
    if (this.state.redirect && this.props.allBoards) {
      return(
        // TODO: Make sure that this correctly redirects based on this.props.board if used in the context of a board or a thread
        <Redirect to={`/b/${this.state.board}/`} />
      )
    }
    if (this.state.redirect && !this.props.allBoards) {
      return(
        <Redirect to={`/b/${this.props.board}/${this.state.thread_id}`} />
      )
    }
    return (
      <Segment>
        <Header>Submit a new Thread</Header>
        <Form error>
          {this.props.allBoards && (
            <Form.Field>
              <label>Board</label>
              <Dropdown
                allowAdditions
                fluid
                name="board"
                onAddItem={this.handleAddition}
                onChange={this.handleChange}
                options={this.state.boards ? this.state.boards : []}
                placeholder="Choose a board, or create your own"
                search
                selection
                value={this.state.board}
              />
              {this.state.boardInputError && (
                <Message error>
                  Please select a board to post this thread to.
                </Message>
              )}
            </Form.Field>
          )}
          <Form.Field required>
            <label>Thread Text</label>
            <Form.TextArea
              name="text"
              onChange={this.handleChange}
              placeholder="Thread text..."
              value={this.state.text}
            />
            {this.state.textInputError && <Message error>Please enter some text for your new thread</Message>}
          </Form.Field>
          <Form.Field required>
            <label>Delete Password</label>
            <Form.Input
              name="delete_password"
              onChange={this.handleChange}
              placeholder="Enter a password to delete post"
              type="password"
              value={this.state.delete_password}
              width={8}
            />
            {this.state.passwordInputError && <Message error>Please enter a password to delete this thread</Message>}
          </Form.Field>
          <Form.Field>
            <Form.Button
              content="Submit Thread"
              icon="edit"
              labelPosition="left"
              onClick={this.handleSubmit}
              primary
            />
          </Form.Field>
        </Form>
      </Segment>
    );
  }
}

export default PublishThread;
