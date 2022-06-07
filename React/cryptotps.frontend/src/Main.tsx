import React, { Component, Fragment } from "react";
import { ApplicationConfiguration } from "./Models/ApplicationConfiguration";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";

export default class Main extends Component<ApplicationConfiguration> {
    constructor(props: ApplicationConfiguration) {
        super(props);
    }

    render() {
        return <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<HomePage {...this.props} />} />
                </Routes>
            </BrowserRouter>
        </>;
    }
}