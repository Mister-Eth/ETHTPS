import React, { Component } from "react";
import { ApplicationConfiguration } from "../../Models/ApplicationConfiguration";
import { Routes, Route } from 'react-router-dom';

export default class HomePage extends Component<ApplicationConfiguration> {
    constructor(props: ApplicationConfiguration) {
        super(props);
    }

    render() {
        return <>
            {"Homepage" + JSON.stringify(this.props)}
        </>;
    }
}