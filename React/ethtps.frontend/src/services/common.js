import API from '../services/api'
import ProviderExclusionList from '../components/ProviderExclusionList';

const globalApi = new API("https://api.ethtps.info/API/v2");
export {globalApi};

const providerExclusionList = new ProviderExclusionList();
export {providerExclusionList};