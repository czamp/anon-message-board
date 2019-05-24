import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Navbar from "./components/Navbar";
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
            background: "#f0e0d6"
          }}
        >
          <Navbar />
          <Container text style={{ paddingTop: "2rem" }}>
            <Switch>
              <Route path="/" exact component={BoardList} />
              <Route path="/b/:board/" exact component={Board} />
              <Route
                path="/b/:board/thread/:id"
                exact
                component={SingleThread}
              />
            </Switch>
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
