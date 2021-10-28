import APIV2Api from './api-gen/api/APIV2Api'
import ProviderExclusionList from '../components/ProviderExclusionList';
import LiveTPSObservable from '../components/LiveTPSObservable';

const globalApi = new APIV2Api("http://localhost:10202/API/v2");
export {globalApi};

const providerExclusionList = new ProviderExclusionList();
export {providerExclusionList};

const liveTPSObservable = new LiveTPSObservable();
export {liveTPSObservable};