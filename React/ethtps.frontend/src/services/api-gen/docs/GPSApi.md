# EthtpsApi.GPSApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**aPIGPSGetGet**](GPSApi.md#aPIGPSGetGet) | **GET** /API/GPS/Get | 
[**aPIGPSInstantGet**](GPSApi.md#aPIGPSInstantGet) | **GET** /API/GPS/Instant | 
[**aPIGPSMaxGet**](GPSApi.md#aPIGPSMaxGet) | **GET** /API/GPS/Max | 



## aPIGPSGetGet

> [GPSResponseModel] aPIGPSGetGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.GPSApi();
let opts = {
  'provider': "provider_example", // String | 
  'interval': "interval_example", // String | 
  'network': "'Mainnet'", // String | 
  'includeSidechains': true // Boolean | 
};
apiInstance.aPIGPSGetGet(opts, (error, data, response) => {
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
 **provider** | **String**|  | [optional] 
 **interval** | **String**|  | [optional] 
 **network** | **String**|  | [optional] [default to &#39;Mainnet&#39;]
 **includeSidechains** | **Boolean**|  | [optional] [default to true]

### Return type

[**[GPSResponseModel]**](GPSResponseModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## aPIGPSInstantGet

> {String: [GPSDataPoint]} aPIGPSInstantGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.GPSApi();
let opts = {
  'includeSidechains': true // Boolean | 
};
apiInstance.aPIGPSInstantGet(opts, (error, data, response) => {
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
 **includeSidechains** | **Boolean**|  | [optional] [default to true]

### Return type

**{String: [GPSDataPoint]}**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## aPIGPSMaxGet

> [GPSResponseModel] aPIGPSMaxGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.GPSApi();
let opts = {
  'provider': "provider_example", // String | 
  'network': "'Mainnet'" // String | 
};
apiInstance.aPIGPSMaxGet(opts, (error, data, response) => {
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
 **provider** | **String**|  | [optional] 
 **network** | **String**|  | [optional] [default to &#39;Mainnet&#39;]

### Return type

[**[GPSResponseModel]**](GPSResponseModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

