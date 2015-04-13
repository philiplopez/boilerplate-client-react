"use strict";

require("../static/static-resources");

import React from "react";
import Router from "react-router";
import routes from "./routes";

// Use Router.HistoryLocation for better URLs, but needs server-side support
Router.run(routes, Router.HashLocation, (Handler) => {
    React.render(<Handler />, document.getElementById("app"));
});
