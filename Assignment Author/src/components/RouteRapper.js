import React from "react";
import { ReactTitle } from "react-meta-tags";
import { Route } from "react-router-dom";

const RouteRapper = ({ component: Component, title, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <React.Fragment>
        <ReactTitle title={title} />

        <main
          id="content"
          className={
            "main-contain" +
            " " +
            (window.location.hash === "#/home" || window.location.hash === "#/"
              ? "main-contain-home"
              : "")
          }
        >
          <div className="main-contain-inner">
            <Component {...props} />
          </div>
        </main>
      </React.Fragment>
    )}
  />
);
export default RouteRapper;
