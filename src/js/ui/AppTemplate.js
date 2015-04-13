import React from "react";
import {RouteHandler} from "react-router";

export default class AppTemplate extends React.Component {
    render() {
        return (
            <div>
                <header>Site Header</header>
                <main>
                    <RouteHandler />{/* This instructs react-router to render out the appropriate child handler */}
                </main>
                <footer>Site Footer</footer>
            </div>
        );
    }
}
AppTemplate.propTypes = {};
