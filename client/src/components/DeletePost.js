import React from "react";
import PropTypes from "prop-types";
import { Form, Header, Icon, Message, Modal } from "semantic-ui-react";

const DeletePost = props => (
  <Modal
    onClose={props.closeModal}
    open={props.modalOpen}
    size="small"
    trigger={<Icon onClick={props.openModal} link name="trash" />}
  >
    <Modal.Content>
      <Header>Delete this post?</Header>
      <Form>
        <Form.Field>
          <label>Enter your password to delete</label>
          <Form.Input
            name="delete_post_password"
            onChange={props.handleChange}
            placeholder="Password to delete post"
            type="password"
            value={props.delete_post_password}
          />
        </Form.Field>
        <Form.Group>
          <Form.Button
            basic
            color="red"
            loading={props.isLoading}
            onClick={props.onDelete}
            size="mini"
          >
            Delete
          </Form.Button>
          <Form.Button size="mini" onClick={props.closeModal} color="blue">
            Cancel
          </Form.Button>
        </Form.Group>
      </Form>
      {props.postDeleted && (
        <Message success>
          <Message.Header>Success</Message.Header>
          Your post was successfully deleted.
        </Message>
      )}
      {props.deleteErrorMessage && (
        <Message error>
          <Message.Header>Error: {props.deleteErrorMessage}</Message.Header>
          Your post could not be deleted. Please try again.
        </Message>
      )}
    </Modal.Content>
  </Modal>
);

DeletePost.propTypes = {
  closeModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  postDeleted: PropTypes.bool,
  deleteErrorMessage: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  delete_password: PropTypes.string
};

export default DeletePost;
