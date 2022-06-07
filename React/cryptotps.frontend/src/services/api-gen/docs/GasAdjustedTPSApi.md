# EthtpsApi.GasAdjustedTPSApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**aPIGasAdjustedTPSGeMonthlyDataByYearGet**](GasAdjustedTPSApi.md#aPIGasAdjustedTPSGeMonthlyDataByYearGet) | **GET** /API/GasAdjustedTPS/GeMonthlyDataByYear | 
[**aPIGasAdjustedTPSGetGet**](GasAdjustedTPSApi.md#aPIGasAdjustedTPSGetGet) | **GET** /API/GasAdjustedTPS/Get | 
[**aPIGasAdjustedTPSInstantGet**](GasAdjustedTPSApi.md#aPIGasAdjustedTPSInstantGet) | **GET** /API/GasAdjustedTPS/Instant | 
[**aPIGasAdjustedTPSMaxGet**](GasAdjustedTPSApi.md#aPIGasAdjustedTPSMaxGet) | **GET** /API/GasAdjustedTPS/Max | 



## aPIGasAdjustedTPSGeMonthlyDataByYearGet

> {String: [DataResponseModel]} aPIGasAdjustedTPSGeMonthlyDataByYearGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.GasAdjustedTPSApi();
let opts = {
  'provider': "provider_example", // String | 
  'network': "network_example", // String | 
  'includeSidechains': true, // Boolean | 
  'year': 56 // Number | 
};
apiInstance.aPIGasAdjustedTPSGeMonthlyDataByYearGet(opts, (error, data, response) => {
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


## aPIGasAdjustedTPSGetGet

> {String: [DataResponseModel]} aPIGasAdjustedTPSGetGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.GasAdjustedTPSApi();
let opts = {
  'provider': "provider_example", // String | 
  'network': "network_example", // String | 
  'includeSidechains': true, // Boolean | 
  'interval': "interval_example" // String | 
};
apiInstance.aPIGasAdjustedTPSGetGet(opts, (error, data, response) => {
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


## aPIGasAdjustedTPSInstantGet

> {String: [DataPoint]} aPIGasAdjustedTPSInstantGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.GasAdjustedTPSApi();
let opts = {
  'provider': "provider_example", // String | 
  'network': "network_example", // String | 
  'includeSidechains': true // Boolean | 
};
apiInstance.aPIGasAdjustedTPSInstantGet(opts, (error, data, response) => {
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


## aPIGasAdjustedTPSMaxGet

> {String: DataPoint} aPIGasAdjustedTPSMaxGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.GasAdjustedTPSApi();
let opts = {
  'provider': "provider_example", // String | 
  'network': "network_example", // String | 
  'includeSidechains': true // Boolean | 
};
apiInstance.aPIGasAdjustedTPSMaxGet(opts, (error, data, response) => {
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

