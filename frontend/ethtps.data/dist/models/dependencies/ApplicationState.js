"use strict";
exports.__esModule = true;
exports.ApplicationState = void 0;
var ApplicationState = /** @class */ (function () {
    function ApplicationState(websockets, colorDictionaries, dataLoading, dataMode, liveData, mainPage, maxData, experiments, intervals, networks, providers, pages) {
        if (pages === void 0) { pages = {
            mainPage: {
                sidechainsIncluded: false
            }
        }; }
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
    return ApplicationState;
}());
exports.ApplicationState = ApplicationState;
//# sourceMappingURL=ApplicationState.js.map