import { globalApi } from '../services/common';

class ProviderExclusionList {
    excludedProviders = [];
    providerExcludedCallbackList = [];
    providerIncludedCallbackList = [];
    
    registerOnProviderExcluded(callback){
        this.providerExcludedCallbackList.push(callback);
    }

    registerOnProviderIncluded(callback){
        this.providerIncludedCallbackList.push(callback);
    }

    triggerProviderExcludedCallbacks(provider){
        for (let e of this.providerExcludedCallbackList){
            e(provider);
        }
    }

    triggerProviderIncludedCallbacks(provider){
        for (let e of this.providerIncludedCallbackList){
            e(provider);
        }
    }

    addExcludedProvider(provider){
        if (!this.excludedProviders.includes(provider)){
            this.excludedProviders.push(provider);
            this.triggerProviderExcludedCallbacks(provider);
        }
    }

    removeExcludedProvider(provider){
        if (this.excludedProviders.includes(provider)){
            this.excludedProviders.splice(this.excludedProviders.indexOf(provider), 1);
            this.triggerProviderIncludedCallbacks(provider);
        }
    }

    async excludeSidechains(){
        for(let provider of await globalApi.getProviders()){
            if (provider.type === "Sidechain"){
                this.addExcludedProvider(provider.name);
            }
        }
    }

    async includeSidechains(){
        for(let provider of await globalApi.getProviders()){
            if (provider.type === "Sidechain"){
                this.removeExcludedProvider(provider.name);
            }
        }
    }
}

export default ProviderExclusionList;