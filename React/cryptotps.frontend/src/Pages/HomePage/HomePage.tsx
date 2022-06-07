import React, { Component } from "react";
import { HomePageModel } from "./HomePageModel";
import { Routes, Route } from 'react-router-dom';

export default class HomePage extends Component<HomePageModel> {
    constructor(props: HomePageModel) {
        super(props);
    }

    render() {
        return <>
            {"Homepage" + JSON.stringify(this.props)}
        </>;
    }
}