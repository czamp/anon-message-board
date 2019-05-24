import React from 'react';
import {Loader, Message, Segment, Grid, Icon } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import TimeStamp from './TimeStamp';
import PublishReply from './PublishReply';
import DeletePost from './DeletePost';
import Reply from './Reply';
import API from '../helpers/api';

class Thread extends React.Component {
  state = {
    delete_password: '',
    delete_post_password: '',
    deleteErrorMessage: '',
    isLoading: true,
    modalOpen: false,
    passwordInputError: false,
    postDeleted: false,
    requestingDelete: false,
    text: '',
    textInputError: false,
    thread: {},
    redirect: false,
    reported: false
  }


  componentDidMount() {
    if (this.props.preview) {
      this.setState({
        thread: this.props.thread,
        isLoading: false
      })
    }
    else {
      this.getCompleteThread()
    }
  }

  getCompleteThread = () => {
    API.getCompleteThread(
      this.props.board,
      this.props.id,
      res => this.setState({thread: res.data, isLoading: false}),
      err => console.log(err)
    )
  }

  onInputChange = (e, {name, value}) => {
    this.setState({
      [name]: value
    });
    if (name === 'delete_password') {
      this.setState({ passwordInputError: false})
    }
    if (name === 'text') {
      this.setState({ textInputError: false})
    }
  }

  onReplySubmit = (e) => {
    if (this.state.text === '') {
      this.setState({
        textInputError: true
      })
    }
    if (this.state.delete_password === '') {
      this.setState({
        passwordInputError: true
      })
    }
    else if (!this.state.textInputError && !this.state.passwordInputError){
      API.postReply(
        e,
        this.props.board,
        this.state.text,
        this.state.delete_password,
        this.state.thread._id,
        () => this.setState({
          success: true,
          text: '',
          delete_password: '',
          redirect: this.props.preview && true,
        }, () =>this.checkUpdatedRender()),
        error => console.log(error)
      )
    }
  }

  reportThread = () => {
    API.reportThread(
      this.props.board,
      this.state.thread._id,
      res => this.setState({ reported: true }),
      err => this.setState({ reportError: true})
    )
  }

  deleteThread = (e) => {
    this.setState({
      requestingDelete: true
    })
    if (this.state.delete_post_password === '') {
      this.setState({
        deleteErrorMessage: 'Please enter your password',
        requestingDelete: false,
      })
    } else {
    API.deleteThread(
      e,
      this.props.board,
      this.state.thread._id,
      this.state.delete_post_password,
      data =>
        data.data !== 'incorrect password'
          ? this.setState({
            deleteErrorMessage: '',
            requestingDelete: false,
            postDeleted: true,
            modalOpen: false
          }, () => this.onDeleteSuccess())
          : this.setState({
            deleteErrorMessage: data.data,
            requestingDelete: false,
            delete_post_password: ''
          }),
      err =>
        this.setState({
          deleteErrorMessage: 'Something went wrong, please try again.',
          requestingDelete: false
        })
    )}
  }

  onDeleteSuccess = () => {
    if (this.props.preview) {
      this.props.onThreadDelete()
    }
    else {
      this.setState({currentThreadDeleted: true})
    }
  }

  openModal = () => this.setState({modalOpen: true})

  closeModal = () => this.setState({modalOpen: false, delete_post_password: ''})

  // Should re-render thread component if not preview
  checkUpdatedRender = () => {
    if (!this.state.redirect) {
      this.getCompleteThread()
    }
  }

  render(){
    // NOTE: Swapping thread from props to state;
    const { thread } = this.state;
    const { board } = this.props;
    if (this.state.isLoading) {
      return (<Segment><Loader active={this.state.isLoading} /></Segment>)
    }
    if (this.state.redirect){
      return <Redirect to={`/b/${board}/thread/${thread._id}`} />
    }
    if (this.state.currentThreadDeleted) {
      return(
        <React.Fragment>
          <Message success>Your thread has been successfully deleted.
            <Link to={`/b/${board}/`}>Click here to return to /b/{board}</Link>
          </Message>
        </React.Fragment>
      )
    }
    return(
      <Segment.Group>
        <Segment secondary>
          <Grid columns={2}>
            <Grid.Column width={14}>
              <Link to={`/b/${board}/thread/${thread._id}`}>#{thread._id}</Link>
              {' '}|{' '}
              <TimeStamp time={thread.created_on} loading={this.state.isLoading}/>
            </Grid.Column>
            <Grid.Column width={2}>
              {this.state.reported
                ? <Icon name="check" color="green" />
                : <Icon
                    color="red"
                    link
                    name="flag"
                    onClick={this.reportThread}
                  />
              }
              <DeletePost
                closeModal={this.closeModal}
                delete_post_password={this.state.delete_post_password}
                deleteErrorMessage={this.state.deleteErrorMessage}
                handleChange={this.onInputChange}
                isLoading={this.state.requestingDelete}
                modalOpen={this.state.modalOpen}
                onDelete={this.deleteThread}
                openModal={this.openModal}
                postDeleted={this.state.postDeleted}
              />
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment>{thread.text}</Segment>
        {thread.replies.length > 0 && (
          <Segment secondary>
            {thread.replies.map(reply => (
              <Reply
                reply={reply}
                key={reply._id}
                board={board}
                thread_id={this.props.id}
              />
            ))}
          </Segment>
        )}
        {thread.replycount > 3 && thread.replycount > thread.replies.length && (
          <Segment tertiary>
            <p>
              {thread.replycount - 3} replies omitted.{' '}
              <Link to={`/b/${board}/thread/${thread._id}`}>Click to Expand.</Link>
            </p>
          </Segment>
        )}
        <PublishReply
          onChange={this.onInputChange}
          onSubmit={this.onReplySubmit}
          text={this.state.text}
          delete_password={this.state.delete_password}
          textInputError={this.state.textInputError}
          passwordInputError={this.state.passwordInputError}
        />

      </Segment.Group>
    )
  }
}

export default Thread;
