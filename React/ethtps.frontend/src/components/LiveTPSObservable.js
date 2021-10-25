class LiveTPSObservable {
    callbackList = [];

    registerOnTPSChanged(callback){
        this.callbackList.push(callback);
    }

    triggerCallbacks(value){
        for(let x of this.callbackList){
            x(value);
        }
    }

    tpsChanged(tpsData){
        this.triggerCallbacks(tpsData);
    }
}

export default LiveTPSObservable;