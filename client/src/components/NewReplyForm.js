import React from "react";
import { Form, Segment, Header, Message } from "semantic-ui-react";
import { Redirect } from 'react-router-dom'
import API from "../helpers/api";

class NewReplyForm extends React.Component {
  state = {
    text: "",
    delete: "",
    success: false
  };
  handleChange = (e, { name, value }) => {
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    API.postReply(
      e,
      this.props.board,
      this.state.text,
      this.state.delete,
      this.props.thread_id,
      () => this.setState({ success: true }),
      error => console.log(error)
    );
  };

  render() {
    return (
      <Segment secondary>
        <Header as="h5">Reply to Thread</Header>
        <Form reply>
          <Form.Field>
            <Form.TextArea
              name="text"
              onChange={this.handleChange}
              placeholder="Reply text..."
              value={this.state.text}
            />
          </Form.Field>
          <Form.Field>
            <Form.Group>
              <Form.Button
                content="Add Reply"
                icon="reply"
                labelPosition="left"
                onClick={this.handleSubmit}
                primary
                size="mini"
              />
              <Form.Input
                name="delete"
                onChange={this.handleChange}
                placeholder="Password to delete..."
                size="mini"
                type="password"
                value={this.state.delete}
                width={4}
              />
            </Form.Group>
          </Form.Field>
        </Form>
        {this.state.success && (
          <Message success>Your reply was successfully submitted</Message>
        )}
      </Segment>
    );
  }
}

export default NewReplyForm;
