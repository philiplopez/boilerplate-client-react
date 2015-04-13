import React from "react";

import {Route, DefaultRoute} from "react-router";

import AppTemplate from "./ui/AppTemplate";
import CatalogPage from "./ui/CatalogPage";
import ProductPage from "./ui/ProductPage";


const routes = (
    <Route name="app" path="/" handler={AppTemplate}>
        <DefaultRoute name="catalog" handler={CatalogPage} />
        <Route name="product" path="product/:productId" handler={ProductPage} />
    </Route>
);

export default routes;