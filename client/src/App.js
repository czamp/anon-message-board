import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Board from './components/Board';
import BoardList from './components/BoardList';
// import Thread from './components/Thread';
// import Navbar from './components/Navbar';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div
          style={{
            minHeight: '100vh',
            background: '#f0e0d6'
          }}
        >
          {/* <Navbar /> */}
          <Switch>
            <Route path="/" exact component={BoardList} />
            <Route path="/b/:board/" exact component={Board} />
            {/* <Route path="/b/:board/thread/:id" exact component={Thread} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
