import React from "react";
import API from "../helpers/api";
import { Header, Form, Message, Icon, Modal } from "semantic-ui-react";

class DeleteForm extends React.Component {
  state = {
    delete_password: "",
    error: false,
    isLoading: false,
    message: "",
    success: false
  };

  handleChange = (e, { name, value }) => {
    this.setState({
      [name]: value
    });
  };

  deleteThread = e => {
    this.setState({ isLoading: true });
    API.deleteThread(
      e,
      this.props.board,
      this.props.thread_id,
      this.state.delete_password,
      data =>
        data.data !== "incorrect password"
          ? this.setState({
              error: false,
              isLoading: false,
              message: "",
              success: true
            })
          : this.setState({
              error: true,
              isLoading: false,
              message: data.data,
              success: false,
              modalOpen: false
            }),
      err =>
        this.setState({
          error: true,
          isLoading: false,
          message: err,
          success: false
        })
    );
  };

  deleteReply = e => {
    API.deleteReply(
      e,
      this.props.board,
      this.props.thread_id,
      this.props.reply_id,
      this.state.delete_password,
      data =>
        data.data !== "incorrect password"
          ? this.setState({ success: true, error: false, message: "", modalOpen: false })
          : this.setState({ success: false, error: true, message: data.data }),
      err => console.log(err)
    );
  };

  onSuccess = () => this.props.onSuccess();

  openModal = () => this.setState({ modalOpen: true });

  closeModal = () => this.setState({ modalOpen: false });

  render() {
    return (
      <Modal
        onClose={this.closeModal}
        open={this.state.modalOpen}
        size="small"
        trigger={<Icon onClick={this.openModal} link name="trash" />}
      >
        <Modal.Content>
          <Header>Delete this post?</Header>
          <Form>
            <Form.Field>
              <label>Enter your delete password to delete this post.</label>
              <Form.Input
                name="delete_password"
                onChange={this.handleChange}
                placeholder="Password to delete..."
                type="password"
                value={this.state.delete_password}
              />
            </Form.Field>
            <Form.Group>
              <Form.Button
                basic
                color="red"
                loading={this.state.isLoading}
                onClick={
                  this.props.type === "reply"
                    ? this.deleteReply
                    : this.deleteThread
                }
                size="mini"
              >
                Delete
              </Form.Button>
              <Form.Button size="mini" onClick={this.closeModal} color="blue">
                Cancel
              </Form.Button>
            </Form.Group>
          </Form>
          {this.state.success && (
            <Message success>
              <Message.Header>Success</Message.Header>
              {this.props.type === "thread" ? "Thread" : "Reply "}#
              {this.props.type === "thread"
                ? this.props.thread_id
                : this.props.reply_id}{" "}
              successfully deleted.
            </Message>
          )}
          {this.state.error && (
            <Message error>
              <Message.Header>Error: {this.state.message} </Message.Header>
              <p>
                {this.props.type === "thread" ? "Thread " : "Reply "}#
                {this.props.type === "thread"
                  ? this.props.thread_id
                  : this.props.reply_id}{" "}
                could not be deleted.
              </p>
            </Message>
          )}
        </Modal.Content>
      </Modal>
    );
  }
}

export default DeleteForm;
