# EthtpsApi.PageModelApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**aPIPagesHomeGet**](PageModelApi.md#aPIPagesHomeGet) | **GET** /API/Pages/Home | 
[**aPIPagesProviderGet**](PageModelApi.md#aPIPagesProviderGet) | **GET** /API/Pages/Provider | 



## aPIPagesHomeGet

> HomePageResponseModel aPIPagesHomeGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.PageModelApi();
let opts = {
  'subchainsOf': "subchainsOf_example", // String | 
  'interval': new EthtpsApi.TimeInterval(), // TimeInterval | 
  'dataType': new EthtpsApi.DataType(), // DataType | 
  'provider': "provider_example", // String | 
  'network': "network_example", // String | 
  'includeSidechains': true // Boolean | 
};
apiInstance.aPIPagesHomeGet(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **subchainsOf** | **String**|  | [optional] 
 **interval** | [**TimeInterval**](.md)|  | [optional] 
 **dataType** | [**DataType**](.md)|  | [optional] 
 **provider** | **String**|  | [optional] 
 **network** | **String**|  | [optional] 
 **includeSidechains** | **Boolean**|  | [optional] 

### Return type

[**HomePageResponseModel**](HomePageResponseModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## aPIPagesProviderGet

> aPIPagesProviderGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.PageModelApi();
let opts = {
  'interval': new EthtpsApi.TimeInterval(), // TimeInterval | 
  'dataType': new EthtpsApi.DataType(), // DataType | 
  'provider': "provider_example", // String | 
  'network': "network_example", // String | 
  'includeSidechains': true // Boolean | 
};
apiInstance.aPIPagesProviderGet(opts, (error, data, response) => {
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
 **interval** | [**TimeInterval**](.md)|  | [optional] 
 **dataType** | [**DataType**](.md)|  | [optional] 
 **provider** | **String**|  | [optional] 
 **network** | **String**|  | [optional] 
 **includeSidechains** | **Boolean**|  | [optional] 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

