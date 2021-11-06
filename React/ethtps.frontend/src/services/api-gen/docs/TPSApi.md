# EthtpsApi.TPSApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**aPITPSGetGet**](TPSApi.md#aPITPSGetGet) | **GET** /API/TPS/Get | 
[**aPITPSInstantGet**](TPSApi.md#aPITPSInstantGet) | **GET** /API/TPS/Instant | 
[**aPITPSMaxGet**](TPSApi.md#aPITPSMaxGet) | **GET** /API/TPS/Max | 



## aPITPSGetGet

> {String: [TPSResponseModel]} aPITPSGetGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.TPSApi();
let opts = {
  'provider': "provider_example", // String | 
  'interval': "interval_example", // String | 
  'network': "'Mainnet'", // String | 
  'includeSidechains': true // Boolean | 
};
apiInstance.aPITPSGetGet(opts, (error, data, response) => {
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

**{String: [TPSResponseModel]}**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## aPITPSInstantGet

> {String: [TPSDataPoint]} aPITPSInstantGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.TPSApi();
let opts = {
  'includeSidechains': true // Boolean | 
};
apiInstance.aPITPSInstantGet(opts, (error, data, response) => {
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

**{String: [TPSDataPoint]}**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## aPITPSMaxGet

> {String: TPSDataPoint} aPITPSMaxGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.TPSApi();
let opts = {
  'provider': "provider_example", // String | 
  'network': "'Mainnet'" // String | 
};
apiInstance.aPITPSMaxGet(opts, (error, data, response) => {
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

[**{String: TPSDataPoint}**](TPSDataPoint.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

