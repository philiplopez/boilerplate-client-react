import React from "react";

//noinspection JSUnusedGlobalSymbols
export default class App extends React.Component {
    //noinspection JSUnusedGlobalSymbols
    render() {
        const items = [];
        for (let i = 0; i < 100; i++) {
            items[i] = <div>Hello {this.props.name}! The square of {i + 1} is {(i + 1) * (i + 1)}</div>;
        }
        return <div>{items}</div>;
    }
}
