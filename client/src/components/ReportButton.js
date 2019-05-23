import React from "react";
import { Icon } from "semantic-ui-react";
import API from "../helpers/api";

class ReportButton extends React.Component {
  state = {
    success: false,
    error: false
  };
  reportThread = () => {
    API.reportThread(
      this.props.board,
      this.props.thread_id,
      res =>
        this.setState({
          success: true,
          error: false
        }),
      err => this.setState({ error: true, success: false, message: err.data })
    );
  };

  reportReply = () => {
    this.setState({ isLoading: true });
    API.reportReply(
      this.props.board,
      this.props.thread_id,
      this.props.reply_id,
      res =>
        this.setState({
          success: true,
          error: false,
          isLoading: false
        }),
      err => this.setState({ error: true, success: false, message: err.data })
    );
  };

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    const { type } = this.props;
    return (
      <span>
        {this.state.success ? (
          <Icon name="check" color="green" />
        ) : (
          <Icon
            color="red"
            disabled={this.state.success}
            link={!this.state.success}
            name="flag"
            onClick={type === "thread" ? this.reportThread : this.reportReply}
          />
        )}
      </span>
    );
  }
}

export default ReportButton;
