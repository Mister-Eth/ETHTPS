import MainPage from "./components/pages/MainPage/MainPage";
import NetworkPage from "./components/pages/networks/NetworkPage";
import TimeWarpPage from "./components/pages/TimeWarpPage";
import StatusPage from "./components/pages/Status/StatusPage";
import RegisterL2Page from "./components/pages/RegisterL2Page";
import React from "react";
import { Routes, Route, Router, Switch } from "react-router-dom";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={MainPage}></Route>
          <Route path="/Network/" component={NetworkPage}></Route>
          <Route path="/TimeWarp/" component={TimeWarpPage}></Route>
          <Route path="/Status/" component={StatusPage}></Route>
          <Route path="/register-l2/" component={RegisterL2Page}></Route>
        </Switch>
      </>
    );
  }
}
