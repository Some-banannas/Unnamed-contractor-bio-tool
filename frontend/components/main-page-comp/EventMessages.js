import React, { Component } from "react";

import eventBus from "../EventBus";


class Message extends Component {

    constructor (props) {
        super(props);
        this.state = {
            message: "",
        };
    }


    componentDidMount() {
        eventBus.on("logout", (data) => {
            console.log('made it here')
            this.setState({ message: data.message })
        }
        );
    }
    componentWillUnmount() {
        eventBus.remove("logout");
    }
    render() {
        return <div>{this.state.message}</div>;
    }
}

export default Message;