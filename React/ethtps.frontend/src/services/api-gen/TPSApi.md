# .TPSApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**aPITPSGeMonthlyDataByYearGet**](TPSApi.md#aPITPSGeMonthlyDataByYearGet) | **GET** /API/TPS/GeMonthlyDataByYear | 
[**aPITPSGetGet**](TPSApi.md#aPITPSGetGet) | **GET** /API/TPS/Get | 
[**aPITPSInstantGet**](TPSApi.md#aPITPSInstantGet) | **GET** /API/TPS/Instant | 
[**aPITPSMaxGet**](TPSApi.md#aPITPSMaxGet) | **GET** /API/TPS/Max | 


# **aPITPSGeMonthlyDataByYearGet**
> { [key: string]: Array<DataResponseModel>; } aPITPSGeMonthlyDataByYearGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .TPSApi(configuration);

let body:.TPSApiAPITPSGeMonthlyDataByYearGetRequest = {
  // string (optional)
  provider: "Provider_example",
  // string (optional)
  network: "Network_example",
  // boolean (optional)
  includeSidechains: true,
  // number (optional)
  year: 1,
};

apiInstance.aPITPSGeMonthlyDataByYearGet(body).then((data:any) => {
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

# **aPITPSGetGet**
> { [key: string]: Array<DataResponseModel>; } aPITPSGetGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .TPSApi(configuration);

let body:.TPSApiAPITPSGetGetRequest = {
  // string (optional)
  provider: "Provider_example",
  // string (optional)
  network: "Network_example",
  // boolean (optional)
  includeSidechains: true,
  // string (optional)
  interval: "interval_example",
};

apiInstance.aPITPSGetGet(body).then((data:any) => {
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

# **aPITPSInstantGet**
> { [key: string]: Array<DataPoint>; } aPITPSInstantGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .TPSApi(configuration);

let body:.TPSApiAPITPSInstantGetRequest = {
  // string (optional)
  provider: "Provider_example",
  // string (optional)
  network: "Network_example",
  // boolean (optional)
  includeSidechains: true,
};

apiInstance.aPITPSInstantGet(body).then((data:any) => {
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

# **aPITPSMaxGet**
> { [key: string]: DataPoint; } aPITPSMaxGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .TPSApi(configuration);

let body:.TPSApiAPITPSMaxGetRequest = {
  // string (optional)
  provider: "Provider_example",
  // string (optional)
  network: "Network_example",
  // boolean (optional)
  includeSidechains: true,
};

apiInstance.aPITPSMaxGet(body).then((data:any) => {
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


