# EthtpsApi.TPSApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**aPITPSGeMonthlyDataByYearGet**](TPSApi.md#aPITPSGeMonthlyDataByYearGet) | **GET** /API/TPS/GeMonthlyDataByYear | 
[**aPITPSGetGet**](TPSApi.md#aPITPSGetGet) | **GET** /API/TPS/Get | 
[**aPITPSInstantGet**](TPSApi.md#aPITPSInstantGet) | **GET** /API/TPS/Instant | 
[**aPITPSMaxGet**](TPSApi.md#aPITPSMaxGet) | **GET** /API/TPS/Max | 



## aPITPSGeMonthlyDataByYearGet

> {String: [DataResponseModel]} aPITPSGeMonthlyDataByYearGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.TPSApi();
let opts = {
  'provider': "provider_example", // String | 
  'network': "network_example", // String | 
  'includeSidechains': true, // Boolean | 
  'year': 56 // Number | 
};
apiInstance.aPITPSGeMonthlyDataByYearGet(opts, (error, data, response) => {
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
 **network** | **String**|  | [optional] 
 **includeSidechains** | **Boolean**|  | [optional] 
 **year** | **Number**|  | [optional] 

### Return type

**{String: [DataResponseModel]}**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## aPITPSGetGet

> {String: [DataResponseModel]} aPITPSGetGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.TPSApi();
let opts = {
  'provider': "provider_example", // String | 
  'network': "network_example", // String | 
  'includeSidechains': true, // Boolean | 
  'interval': "interval_example" // String | 
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
 **network** | **String**|  | [optional] 
 **includeSidechains** | **Boolean**|  | [optional] 
 **interval** | **String**|  | [optional] 

### Return type

**{String: [DataResponseModel]}**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## aPITPSInstantGet

> {String: [DataPoint]} aPITPSInstantGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.TPSApi();
let opts = {
  'provider': "provider_example", // String | 
  'network': "network_example", // String | 
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
 **provider** | **String**|  | [optional] 
 **network** | **String**|  | [optional] 
 **includeSidechains** | **Boolean**|  | [optional] 

### Return type

**{String: [DataPoint]}**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## aPITPSMaxGet

> {String: DataPoint} aPITPSMaxGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.TPSApi();
let opts = {
  'provider': "provider_example", // String | 
  'network': "network_example", // String | 
  'includeSidechains': true // Boolean | 
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
 **network** | **String**|  | [optional] 
 **includeSidechains** | **Boolean**|  | [optional] 

### Return type

[**{String: DataPoint}**](DataPoint.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

