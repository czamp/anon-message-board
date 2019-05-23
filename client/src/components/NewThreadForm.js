import React from "react";
import { Form, Header, Segment, Message } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import API from "../helpers/api";

class NewThreadForm extends React.Component {
  state = {
    text: "",
    delete: "",
    success: false,
    postId: ""
  };
  handleChange = (e, { name, value }) => {
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    API.postThread(
      e,
      this.props.board,
      this.state.text,
      this.state.delete,
      res => this.setState({ success: true, postId: res.data }),
      error => console.log(error)
    );
  };

  render() {
    return (
      <Segment secondary>
        <Header>Submit a New Thread</Header>
        <Form>
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
        {this.state.success && (
          <div>
            <Message success>Your thread was successfully submitted</Message>
            <Redirect
              to={`/b/${this.props.board}/thread/${this.state.postId}`}
            />
          </div>
        )}
      </Segment>
    );
  }
}

export default NewThreadForm;
