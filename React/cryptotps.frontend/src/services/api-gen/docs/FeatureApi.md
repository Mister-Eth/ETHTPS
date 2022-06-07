# EthtpsApi.FeatureApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiStatusGetFeaturesGet**](FeatureApi.md#apiStatusGetFeaturesGet) | **GET** /api/Status/GetFeatures | 
[**apiStatusIsFeatureEnabledGet**](FeatureApi.md#apiStatusIsFeatureEnabledGet) | **GET** /api/Status/IsFeatureEnabled | 



## apiStatusGetFeaturesGet

> apiStatusGetFeaturesGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.FeatureApi();
let opts = {
  'featureId': 56, // Number | 
  'featureName': "featureName_example", // String | 
  'project': "project_example" // String | 
};
apiInstance.apiStatusGetFeaturesGet(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **featureId** | **Number**|  | [optional] 
 **featureName** | **String**|  | [optional] 
 **project** | **String**|  | [optional] 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## apiStatusIsFeatureEnabledGet

> apiStatusIsFeatureEnabledGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.FeatureApi();
let opts = {
  'featureId': 56, // Number | 
  'featureName': "featureName_example", // String | 
  'project': "project_example" // String | 
};
apiInstance.apiStatusIsFeatureEnabledGet(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **featureId** | **Number**|  | [optional] 
 **featureName** | **String**|  | [optional] 
 **project** | **String**|  | [optional] 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

