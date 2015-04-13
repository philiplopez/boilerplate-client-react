import React from "react";
import {Link} from "react-router";

export default class CatalogPage extends React.Component {
    render() {
        return (<div>
            <heading>Catalog</heading>
            <ul>
                <li><Link to="product" params={{productId: 1}}>Product 1</Link></li>
                <li><Link to="product" params={{productId: 2}}>Product 2</Link></li>
                <li><Link to="product" params={{productId: 3}}>Product 3</Link></li>
            </ul>

        </div>);
    }
}
CatalogPage.propTypes = {};
