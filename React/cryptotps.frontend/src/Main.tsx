import React, { Component, Fragment } from "react";
import { ApplicationConfiguration } from "./Models/ApplicationConfiguration";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import { HomePageModel } from "./Pages/HomePage/HomePageModel";
import Header from "./Components/Header/Header";
import { HeaderModel } from "./Components/Header/HeaderModel";
import Footer from "./Components/Footer/Footer";
import DiscordBanner from "./Components/DiscordBanner";

export default class Main extends Component<ApplicationConfiguration> {
    homePageModel: HomePageModel;

    constructor(props: ApplicationConfiguration) {
        super(props);

        this.homePageModel = new HomePageModel(props);
    }

    render() {
        return <>
            <BrowserRouter>
                <DiscordBanner/>
                <Header {...new HeaderModel(this.homePageModel.configuration.name)} />
                <hr />
                <Routes>
                    <Route index element={<HomePage {...this.homePageModel} />} />
                </Routes>
                <hr />
                <Footer />
            </BrowserRouter>
        </>;
    }
}