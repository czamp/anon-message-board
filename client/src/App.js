import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Board from "./components/Board";
import BoardList from "./components/BoardList";
import SingleThread from "./components/SingleThread";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div
          style={{
            minHeight: "100vh",
            background: "#f0e0d6",
            paddingTop: "2rem"
          }}
        >
          {/* <Navbar /> */}
          <Switch>
            <Route path="/" exact component={BoardList} />
            <Route path="/b/:board/" exact component={Board} />
            <Route path="/b/:board/thread/:id" exact component={SingleThread} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
