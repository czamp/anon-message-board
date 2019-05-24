import React from 'react';
import PropTypes from 'prop-types';
import { Header, Segment, Form, Message } from 'semantic-ui-react';

const PublishReply = (props) => (
  <Segment secondary>
    <Header as="h5">Reply to Thread</Header>
    <Form error>
      <Form.Field required>
        <Form.TextArea
          name="text"
          onChange={props.onChange}
          placeholder="Please enter your reply here"
          value={props.text}
        />
        {props.textInputError && (
          <Message error>Please enter some text for your reply</Message>
        )}
      </Form.Field>
      <Form.Field required>
        <Form.Input
          name="delete_password"
          onChange={props.onChange}
          placeholder="Enter a password to delete reply"
          type="password"
          value={props.delete_password}
          width={8}
        />
        {props.passwordInputError && <Message error>Please enter a password to delete this reply.</Message>
        }
      </Form.Field>
      <Form.Field>
        <Form.Button
          content="Add Reply"
          icon="reply"
          labelPosition="left"
          onClick={props.onSubmit}
          primary
        />
      </Form.Field>
    </Form>
  </Segment>
)

PublishReply.propTypes = {
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string,
  delete_password: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  passwordInputError: PropTypes.bool,
  textInputError: PropTypes.bool
}

export default PublishReply;
