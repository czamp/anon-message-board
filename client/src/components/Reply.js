import React, { Component } from "react";
import { Segment, Grid, Icon } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import TimeStamp from "./TimeStamp";
import DeletePost from "./DeletePost";
import API from "../helpers/api";

class Reply extends Component {
  state = {
    delete_post_password: '',
    replyDeleted: false,
    reported: false,
    reportError: false,
    modalOpen: false
  };

  onInputChange = (e, {name, value}) => {
    this.setState({
      [name]: value
    })
  }

  reportReply = () => {
    API.reportReply(
      this.props.board,
      this.props.thread_id,
      this.props.reply._id,
      res => this.setState({reported: true}),
      error => this.setState({reportError: true})
    )
  }

  deleteReply = (e) => {
    this.setState({
      requestingDelete: true,
    })
    if (this.state.delete_post_password === '') {
      this.setState({
        deleteErrorMessage: 'Please enter your password',
        requestingDelete: false,
      })
    } else {
      API.deleteReply(
        e,
        this.props.board,
        this.props.thread_id,
        this.props.reply._id,
        this.state.delete_post_password,
        data =>
          data.data !== 'incorrect password'
            ? this.setState({
              deleteErrorMessage: '',
              requestingDelete: false,
              replyDeleted: true,
              modalOpen: false
            })
            : this.setState({
              deleteErrorMessage: data.data,
              requestingDelete: false,
              delete_post_password: ''
            }),
        err =>
          this.setState({
            deleteErrorMessage: 'Something went wrong, please try again',
            requestingDelete: false
          })
      )
    }
  }

  openModal = () => {
    this.setState({ modalOpen: true });
  };
  closeModal = () => {
    this.setState({ modalOpen: false, delete_post_password: '' });
  }

  render() {
    const { reply, board, thread_id } = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Grid>
            <Grid.Column width={14}>
              <Link to={`/b/${board}/thread/${thread_id}`}>#{reply._id}</Link>
              {' '}|{' '}
              <TimeStamp time={reply.created_on} loading={this.state.isLoading}/>
            </Grid.Column>
            <Grid.Column width={2}>
              {this.state.reported ? (
                <Icon name="check" color="green" />
              ) : (
                <Icon color="red" link name="flag" onClick={this.reportReply} />
              )}
              <DeletePost
                closeModal={this.closeModal}
                delete_post_password={this.state.delete_post_password}
                deleteErrorMessage={this.state.deleteErrorMessage}
                handleChange={this.onInputChange}
                isLoading={this.state.requestingDelete}
                modalOpen={this.state.modalOpen}
                onDelete={this.deleteReply}
                openModal={this.openModal}
                postDeleted={this.state.postDeleted}
              />
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment>{this.state.replyDeleted ? '[deleted]' : reply.text}</Segment>
      </Segment.Group>
    );
  }
}

export default Reply;
