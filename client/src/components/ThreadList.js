import React from "react";
import { Segment, Loader, Header } from "semantic-ui-react";
import API from "../helpers/api";
import ThreadPreview from "./ThreadPreview";

class ThreadList extends React.Component {
  state = {
    threads: [],
    isLoading: true
  };

  componentDidMount() {
    API.listThreads(
      this.props.board,
      res =>
        this.setState({
          threads: res,
          isLoading: false,
          error: false
        }),
      err =>
        this.setState({
          isLoading: false,
          error: true
        })
    );
  }

  render() {
    const { threads } = this.state;

    return (
      <Segment vertical>
        <Loader active={this.state.isLoading} />
        {!this.state.isLoading && (
          <div>
            {this.state.error && (
              <div>
                <Header as="h2">Sorry, there seems to be a problem.</Header>
                <Header as="h4">Please try again.</Header>
              </div>
            )}
            {this.state.threads.length === 0 && (
              <div>
                <Header as="h2">
                  Sorry, there don't appear to be any threads here right now.
                </Header>
                <Header as="h4"> Why don't you create a new one?</Header>
              </div>
            )}
          </div>
        )}

        {threads.map(thread => (
          <ThreadPreview
            key={thread._id}
            thread={thread}
            board={this.props.board}
          />
        ))}
      </Segment>
    );
  }
}

export default ThreadList;
