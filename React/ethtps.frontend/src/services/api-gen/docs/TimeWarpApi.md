# EthtpsApi.TimeWarpApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**aPITimeWarpGetEarliestDateGet**](TimeWarpApi.md#aPITimeWarpGetEarliestDateGet) | **GET** /API/TimeWarp/GetEarliestDate | 
[**aPITimeWarpGetGPSAtGet**](TimeWarpApi.md#aPITimeWarpGetGPSAtGet) | **GET** /API/TimeWarp/GetGPSAt | 
[**aPITimeWarpGetGasAdjustedTPSAtGet**](TimeWarpApi.md#aPITimeWarpGetGasAdjustedTPSAtGet) | **GET** /API/TimeWarp/GetGasAdjustedTPSAt | 
[**aPITimeWarpGetSyncProgressGet**](TimeWarpApi.md#aPITimeWarpGetSyncProgressGet) | **GET** /API/TimeWarp/GetSyncProgress | 
[**aPITimeWarpGetTPSAtGet**](TimeWarpApi.md#aPITimeWarpGetTPSAtGet) | **GET** /API/TimeWarp/GetTPSAt | 



## aPITimeWarpGetEarliestDateGet

> Date aPITimeWarpGetEarliestDateGet()



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.TimeWarpApi();
apiInstance.aPITimeWarpGetEarliestDateGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

**Date**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## aPITimeWarpGetGPSAtGet

> [DataPoint] aPITimeWarpGetGPSAtGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.TimeWarpApi();
let opts = {
  'timestamp': 789, // Number | 
  'network': "'Mainnet'", // String | 
  'smoothing': "'Instant'", // String | 
  'count': 30 // Number | 
};
apiInstance.aPITimeWarpGetGPSAtGet(opts, (error, data, response) => {
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
 **timestamp** | **Number**|  | [optional] 
 **network** | **String**|  | [optional] [default to &#39;Mainnet&#39;]
 **smoothing** | **String**|  | [optional] [default to &#39;Instant&#39;]
 **count** | **Number**|  | [optional] [default to 30]

### Return type

[**[DataPoint]**](DataPoint.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## aPITimeWarpGetGasAdjustedTPSAtGet

> [DataPoint] aPITimeWarpGetGasAdjustedTPSAtGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.TimeWarpApi();
let opts = {
  'timestamp': 789, // Number | 
  'network': "'Mainnet'", // String | 
  'smoothing': "'Instant'", // String | 
  'count': 30 // Number | 
};
apiInstance.aPITimeWarpGetGasAdjustedTPSAtGet(opts, (error, data, response) => {
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
 **timestamp** | **Number**|  | [optional] 
 **network** | **String**|  | [optional] [default to &#39;Mainnet&#39;]
 **smoothing** | **String**|  | [optional] [default to &#39;Instant&#39;]
 **count** | **Number**|  | [optional] [default to 30]

### Return type

[**[DataPoint]**](DataPoint.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## aPITimeWarpGetSyncProgressGet

> TimeWarpSyncProgressModel aPITimeWarpGetSyncProgressGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.TimeWarpApi();
let opts = {
  'provider': "provider_example", // String | 
  'network': "network_example" // String | 
};
apiInstance.aPITimeWarpGetSyncProgressGet(opts, (error, data, response) => {
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

### Return type

[**TimeWarpSyncProgressModel**](TimeWarpSyncProgressModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## aPITimeWarpGetTPSAtGet

> [DataPoint] aPITimeWarpGetTPSAtGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.TimeWarpApi();
let opts = {
  'timestamp': 789, // Number | 
  'network': "'Mainnet'", // String | 
  'smoothing': "'Instant'", // String | 
  'count': 30 // Number | 
};
apiInstance.aPITimeWarpGetTPSAtGet(opts, (error, data, response) => {
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
 **timestamp** | **Number**|  | [optional] 
 **network** | **String**|  | [optional] [default to &#39;Mainnet&#39;]
 **smoothing** | **String**|  | [optional] [default to &#39;Instant&#39;]
 **count** | **Number**|  | [optional] [default to 30]

### Return type

[**[DataPoint]**](DataPoint.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

