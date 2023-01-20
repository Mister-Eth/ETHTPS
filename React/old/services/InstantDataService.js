import { globalGeneralApi, isEmpty } from "./common";

/*
* A class for providing a way to register single instant data callbacks for pages.
*/
export default class InstantDataService {
    instantDataForPageCallbackDictionary = {};
    instantDataForPageIntervalRef = 0;
    smoothing = "";
    includeSidechains = true;
    
    periodicallyGetInstantDataForPage(pageName, callback, includeSidechains = true, smoothing = "Instant"){
        this.instantDataForPageCallbackDictionary[pageName] = callback;
        this.smoothing = smoothing;
        this.includeSidechains = includeSidechains;
        if (this.instantDataForPageIntervalRef === 0){
            this.instantDataForPageIntervalRef = setInterval((() => { this.getAndCallbackInstantData() } ).bind(this), 5000);
        }
    }

    getAndCallbackInstantData(){
        globalGeneralApi.aPIV2InstantDataGet({includeSidechains: this.includeSidechains, smoothing: this.smoothing}, (err, data, res) => {
            if (data !== null && !isEmpty(data) && Object.entries(data).length === 3 && Object.entries(this.instantDataForPageCallbackDictionary).length > 0){
                Object.entries(this.instantDataForPageCallbackDictionary).forEach(([key, value]) => {
                    value(data);
                 });
            }
        });
    }
}