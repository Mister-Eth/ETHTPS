import { globalGeneralApi } from "./common";

/*
* A class for providing a way to register single instant data callbacks for pages.
*/
export default class InstantDataService {
    instantDataForPageCallbackDictionary = {};
    instantDataForPageIntervalRef = 0;
    
    periodicallyGetInstantDataForPage(pageName, callback){
        this.instantDataForPageCallbackDictionary[pageName] = callback;
        if (this.instantDataForPageIntervalRef === 0){
            this.instantDataForPageIntervalRef = setInterval((() => { this.getAndCallbackInstantData() } ).bind(this), 5000);
        }
    }

    getAndCallbackInstantData(){
        globalGeneralApi.aPIV2InstantDataGet({includeSidechains: true}, (err, data, res) => {
            Object.entries(this.instantDataForPageCallbackDictionary).forEach(([key, value]) => {
                value(data);
             });
        });
    }
}