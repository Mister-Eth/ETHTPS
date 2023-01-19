# .TimeWarpApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**aPITimeWarpGetEarliestDateGet**](TimeWarpApi.md#aPITimeWarpGetEarliestDateGet) | **GET** /API/TimeWarp/GetEarliestDate | 
[**aPITimeWarpGetGPSAtGet**](TimeWarpApi.md#aPITimeWarpGetGPSAtGet) | **GET** /API/TimeWarp/GetGPSAt | 
[**aPITimeWarpGetGasAdjustedTPSAtGet**](TimeWarpApi.md#aPITimeWarpGetGasAdjustedTPSAtGet) | **GET** /API/TimeWarp/GetGasAdjustedTPSAt | 
[**aPITimeWarpGetSyncProgressGet**](TimeWarpApi.md#aPITimeWarpGetSyncProgressGet) | **GET** /API/TimeWarp/GetSyncProgress | 
[**aPITimeWarpGetTPSAtGet**](TimeWarpApi.md#aPITimeWarpGetTPSAtGet) | **GET** /API/TimeWarp/GetTPSAt | 


# **aPITimeWarpGetEarliestDateGet**
> Date aPITimeWarpGetEarliestDateGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .TimeWarpApi(configuration);

let body:any = {};

apiInstance.aPITimeWarpGetEarliestDateGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
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


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **aPITimeWarpGetGPSAtGet**
> Array<DataPoint> aPITimeWarpGetGPSAtGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .TimeWarpApi(configuration);

let body:.TimeWarpApiAPITimeWarpGetGPSAtGetRequest = {
  // string (optional)
  provider: "Provider_example",
  // string (optional)
  network: "Network_example",
  // boolean (optional)
  includeSidechains: true,
  // number (optional)
  timestamp: 1,
  // string (optional)
  smoothing: "Instant",
  // number (optional)
  count: 30,
};

apiInstance.aPITimeWarpGetGPSAtGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **provider** | [**string**] |  | (optional) defaults to undefined
 **network** | [**string**] |  | (optional) defaults to undefined
 **includeSidechains** | [**boolean**] |  | (optional) defaults to undefined
 **timestamp** | [**number**] |  | (optional) defaults to undefined
 **smoothing** | [**string**] |  | (optional) defaults to 'Instant'
 **count** | [**number**] |  | (optional) defaults to 30


### Return type

**Array<DataPoint>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **aPITimeWarpGetGasAdjustedTPSAtGet**
> Array<DataPoint> aPITimeWarpGetGasAdjustedTPSAtGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .TimeWarpApi(configuration);

let body:.TimeWarpApiAPITimeWarpGetGasAdjustedTPSAtGetRequest = {
  // string (optional)
  provider: "Provider_example",
  // string (optional)
  network: "Network_example",
  // boolean (optional)
  includeSidechains: true,
  // number (optional)
  timestamp: 1,
  // string (optional)
  smoothing: "Instant",
  // number (optional)
  count: 30,
};

apiInstance.aPITimeWarpGetGasAdjustedTPSAtGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **provider** | [**string**] |  | (optional) defaults to undefined
 **network** | [**string**] |  | (optional) defaults to undefined
 **includeSidechains** | [**boolean**] |  | (optional) defaults to undefined
 **timestamp** | [**number**] |  | (optional) defaults to undefined
 **smoothing** | [**string**] |  | (optional) defaults to 'Instant'
 **count** | [**number**] |  | (optional) defaults to 30


### Return type

**Array<DataPoint>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **aPITimeWarpGetSyncProgressGet**
> TimeWarpSyncProgressModel aPITimeWarpGetSyncProgressGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .TimeWarpApi(configuration);

let body:.TimeWarpApiAPITimeWarpGetSyncProgressGetRequest = {
  // string (optional)
  provider: "Provider_example",
  // string (optional)
  network: "Network_example",
  // boolean (optional)
  includeSidechains: true,
};

apiInstance.aPITimeWarpGetSyncProgressGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **provider** | [**string**] |  | (optional) defaults to undefined
 **network** | [**string**] |  | (optional) defaults to undefined
 **includeSidechains** | [**boolean**] |  | (optional) defaults to undefined


### Return type

**TimeWarpSyncProgressModel**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **aPITimeWarpGetTPSAtGet**
> Array<DataPoint> aPITimeWarpGetTPSAtGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .TimeWarpApi(configuration);

let body:.TimeWarpApiAPITimeWarpGetTPSAtGetRequest = {
  // string (optional)
  provider: "Provider_example",
  // string (optional)
  network: "Network_example",
  // boolean (optional)
  includeSidechains: true,
  // number (optional)
  timestamp: 1,
  // string (optional)
  smoothing: "Instant",
  // number (optional)
  count: 30,
};

apiInstance.aPITimeWarpGetTPSAtGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **provider** | [**string**] |  | (optional) defaults to undefined
 **network** | [**string**] |  | (optional) defaults to undefined
 **includeSidechains** | [**boolean**] |  | (optional) defaults to undefined
 **timestamp** | [**number**] |  | (optional) defaults to undefined
 **smoothing** | [**string**] |  | (optional) defaults to 'Instant'
 **count** | [**number**] |  | (optional) defaults to 30


### Return type

**Array<DataPoint>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


