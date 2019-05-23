import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./views/Home";
import BoardView from "./views/BoardView";
import ThreadView from "./views/ThreadView";
import Navbar from './components/Navbar';

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
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/b/:board/" exact component={BoardView} />
            <Route path="/b/:board/thread/:id" exact component={ThreadView} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
