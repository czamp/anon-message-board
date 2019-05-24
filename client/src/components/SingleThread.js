import React from 'react';
import Thread from './Thread';
import BreadcrumbNav from './BreadcrumbNav';


const SingleThread = (props) => (
  <React.Fragment>
    <BreadcrumbNav board={props.match.params.board} thread_id={props.match.params.id} />
    <Thread board={props.match.params.board} id={props.match.params.id}/>
  </React.Fragment>
)

export default SingleThread
