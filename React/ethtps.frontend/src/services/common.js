import API from '../services/api'
import ProviderExclusionList from '../components/ProviderExclusionList';
import LiveTPSObservable from '../components/LiveTPSObservable';

const globalApi = new API("https://api.ethtps.info/API/v2");
export {globalApi};

const providerExclusionList = new ProviderExclusionList();
export {providerExclusionList};

const liveTPSObservable = new LiveTPSObservable();
export {liveTPSObservable};