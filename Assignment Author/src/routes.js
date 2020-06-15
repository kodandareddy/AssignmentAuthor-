import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NewsDetail from './components/data/NewsDetail';
import RouteRapper from "./components/RouteRapper";
import ScrollToTop from "./components/ScrollTop";
import UrlConstants from "./config/UrlConstants";
import Home from './Continer/Home'

export class Routes extends Component {
 
 
  render() {
    return (
      <ScrollToTop>
       <Switch>
          <RouteRapper path="/home" exact component={Home} />
          <Route path="/newsDetail" exact component={NewsDetail}  />

          <Redirect from="/" to="/home" />
        </Switch>
      </ScrollToTop>
    );
  }
}
export default Routes;
