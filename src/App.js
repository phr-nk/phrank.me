// App.js

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Root from "./components/Root/Root";
import ProjectPage from "./components/Project/ProjectPage";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
const App = () => {
  return (
    <section className="App">
      <Router>
        <Route exact path="/" component={Root} />
        <Route
          exact
          path="/projects/:id"
          children={<ProjectPage></ProjectPage>}
        ></Route>
      </Router>
    </section>
  );
};

export default App;
