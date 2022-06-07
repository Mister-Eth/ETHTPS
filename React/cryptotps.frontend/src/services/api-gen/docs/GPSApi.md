# EthtpsApi.GPSApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**aPIGPSGeMonthlyDataByYearGet**](GPSApi.md#aPIGPSGeMonthlyDataByYearGet) | **GET** /API/GPS/GeMonthlyDataByYear | 
[**aPIGPSGetGet**](GPSApi.md#aPIGPSGetGet) | **GET** /API/GPS/Get | 
[**aPIGPSInstantGet**](GPSApi.md#aPIGPSInstantGet) | **GET** /API/GPS/Instant | 
[**aPIGPSMaxGet**](GPSApi.md#aPIGPSMaxGet) | **GET** /API/GPS/Max | 



## aPIGPSGeMonthlyDataByYearGet

> {String: [DataResponseModel]} aPIGPSGeMonthlyDataByYearGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.GPSApi();
let opts = {
  'provider': "provider_example", // String | 
  'network': "network_example", // String | 
  'includeSidechains': true, // Boolean | 
  'year': 56 // Number | 
};
apiInstance.aPIGPSGeMonthlyDataByYearGet(opts, (error, data, response) => {
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


## aPIGPSGetGet

> {String: [DataResponseModel]} aPIGPSGetGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.GPSApi();
let opts = {
  'provider': "provider_example", // String | 
  'network': "network_example", // String | 
  'includeSidechains': true, // Boolean | 
  'interval': "interval_example" // String | 
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


## aPIGPSInstantGet

> {String: [DataPoint]} aPIGPSInstantGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.GPSApi();
let opts = {
  'provider': "provider_example", // String | 
  'network': "network_example", // String | 
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


## aPIGPSMaxGet

> {String: DataPoint} aPIGPSMaxGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.GPSApi();
let opts = {
  'provider': "provider_example", // String | 
  'network': "network_example", // String | 
  'includeSidechains': true // Boolean | 
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
 **network** | **String**|  | [optional] 
 **includeSidechains** | **Boolean**|  | [optional] 

### Return type

[**{String: DataPoint}**](DataPoint.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

