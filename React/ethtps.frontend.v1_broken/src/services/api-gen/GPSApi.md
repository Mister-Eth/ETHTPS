# .GPSApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**aPIGPSGeMonthlyDataByYearGet**](GPSApi.md#aPIGPSGeMonthlyDataByYearGet) | **GET** /API/GPS/GeMonthlyDataByYear | 
[**aPIGPSGetGet**](GPSApi.md#aPIGPSGetGet) | **GET** /API/GPS/Get | 
[**aPIGPSInstantGet**](GPSApi.md#aPIGPSInstantGet) | **GET** /API/GPS/Instant | 
[**aPIGPSMaxGet**](GPSApi.md#aPIGPSMaxGet) | **GET** /API/GPS/Max | 


# **aPIGPSGeMonthlyDataByYearGet**
> { [key: string]: Array<DataResponseModel>; } aPIGPSGeMonthlyDataByYearGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .GPSApi(configuration);

let body:.GPSApiAPIGPSGeMonthlyDataByYearGetRequest = {
  // string (optional)
  provider: "Provider_example",
  // string (optional)
  network: "Network_example",
  // boolean (optional)
  includeSidechains: true,
  // number (optional)
  year: 1,
};

apiInstance.aPIGPSGeMonthlyDataByYearGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **provider** | [**string**] |  | (optional) defaults to undefined
 **network** | [**string**] |  | (optional) defaults to undefined
 **includeSidechains** | [**boolean**] |  | (optional) defaults to undefined
 **year** | [**number**] |  | (optional) defaults to undefined


### Return type

**{ [key: string]: Array<DataResponseModel>; }**

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

# **aPIGPSGetGet**
> { [key: string]: Array<DataResponseModel>; } aPIGPSGetGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .GPSApi(configuration);

let body:.GPSApiAPIGPSGetGetRequest = {
  // string (optional)
  provider: "Provider_example",
  // string (optional)
  network: "Network_example",
  // boolean (optional)
  includeSidechains: true,
  // string (optional)
  interval: "interval_example",
};

apiInstance.aPIGPSGetGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **provider** | [**string**] |  | (optional) defaults to undefined
 **network** | [**string**] |  | (optional) defaults to undefined
 **includeSidechains** | [**boolean**] |  | (optional) defaults to undefined
 **interval** | [**string**] |  | (optional) defaults to undefined


### Return type

**{ [key: string]: Array<DataResponseModel>; }**

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

# **aPIGPSInstantGet**
> { [key: string]: Array<DataPoint>; } aPIGPSInstantGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .GPSApi(configuration);

let body:.GPSApiAPIGPSInstantGetRequest = {
  // string (optional)
  provider: "Provider_example",
  // string (optional)
  network: "Network_example",
  // boolean (optional)
  includeSidechains: true,
};

apiInstance.aPIGPSInstantGet(body).then((data:any) => {
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

**{ [key: string]: Array<DataPoint>; }**

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

# **aPIGPSMaxGet**
> { [key: string]: DataPoint; } aPIGPSMaxGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .GPSApi(configuration);

let body:.GPSApiAPIGPSMaxGetRequest = {
  // string (optional)
  provider: "Provider_example",
  // string (optional)
  network: "Network_example",
  // boolean (optional)
  includeSidechains: true,
};

apiInstance.aPIGPSMaxGet(body).then((data:any) => {
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

**{ [key: string]: DataPoint; }**

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


