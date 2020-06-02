import React, { Component } from "react";
import { match, withRouter } from "react-router";
import * as H from "history";
import { Layout } from "@shared";
import TasksPage from "../Tasks/Tasks.page";

type Props = {
  history: H.History;
  location: H.Location;
  match: match;
};

class MainPage extends Component<Props> {
  render() {
    return (
      <Layout>
        <TasksPage />
      </Layout>
    );
  }
}

export default withRouter(MainPage);
