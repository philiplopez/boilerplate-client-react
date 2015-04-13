import React from "react";
import {Link} from "react-router";

export default class ProductPage extends React.Component {
    render() {
        const productId = this.context.router.getCurrentParams().productId;
        return (<div>
            <p><Link to="catalog">back to Catalog</Link></p>
            <heading>Product: {productId}</heading>
        </div>);
    }
}
ProductPage.propTypes = {};
ProductPage.contextTypes = {
    router: React.PropTypes.func
};
