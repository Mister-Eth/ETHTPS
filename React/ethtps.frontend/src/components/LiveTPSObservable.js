class LiveTPSObservable {
    callbackList = [];
    latestData = {};
    registerOnTPSChanged(callback){
        this.callbackList.push(callback);
    }

    triggerCallbacks(value){
        for(let x of this.callbackList){
            x(value);
        }
    }

    tpsChanged(tpsData){
        this.latestData = tpsData;
        this.triggerCallbacks(tpsData);
    }
}

export default LiveTPSObservable;