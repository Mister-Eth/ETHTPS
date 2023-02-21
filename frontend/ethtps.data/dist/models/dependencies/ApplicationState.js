"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationState = void 0;
class ApplicationState {
    constructor(websockets, colorDictionaries, dataLoading, dataMode, liveData, mainPage, maxData, experiments, intervals, networks, providers, pages = {
        mainPage: {
            sidechainsIncluded: false,
        },
    }) {
        this.websockets = websockets;
        this.colorDictionaries = colorDictionaries;
        this.dataLoading = dataLoading;
        this.dataMode = dataMode;
        this.liveData = liveData;
        this.mainPage = mainPage;
        this.maxData = maxData;
        this.experiments = experiments;
        this.intervals = intervals;
        this.networks = networks;
        this.providers = providers;
        this.pages = pages;
    }
}
exports.ApplicationState = ApplicationState;
