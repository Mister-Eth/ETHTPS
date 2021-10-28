# EthtpsApi.APIApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**aPIGetTPSGet**](APIApi.md#aPIGetTPSGet) | **GET** /API/GetTPS | 
[**aPIIntervalsGet**](APIApi.md#aPIIntervalsGet) | **GET** /API/Intervals | 
[**aPINetworksGet**](APIApi.md#aPINetworksGet) | **GET** /API/Networks | 
[**aPIProviderTypesGet**](APIApi.md#aPIProviderTypesGet) | **GET** /API/ProviderTypes | 
[**aPIProvidersGet**](APIApi.md#aPIProvidersGet) | **GET** /API/Providers | 



## aPIGetTPSGet

> [TPSDataPoint] aPIGetTPSGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.APIApi();
let opts = {
  'provider': "provider_example", // String | 
  'interval': "interval_example" // String | 
};
apiInstance.aPIGetTPSGet(opts, (error, data, response) => {
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

### Return type

[**[TPSDataPoint]**](TPSDataPoint.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## aPIIntervalsGet

> [String] aPIIntervalsGet()



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.APIApi();
apiInstance.aPIIntervalsGet((error, data, response) => {
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

**[String]**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## aPINetworksGet

> [Network] aPINetworksGet()



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.APIApi();
apiInstance.aPINetworksGet((error, data, response) => {
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

[**[Network]**](Network.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## aPIProviderTypesGet

> [ProviderType] aPIProviderTypesGet()



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.APIApi();
apiInstance.aPIProviderTypesGet((error, data, response) => {
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

[**[ProviderType]**](ProviderType.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## aPIProvidersGet

> [Provider] aPIProvidersGet()



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.APIApi();
apiInstance.aPIProvidersGet((error, data, response) => {
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

[**[Provider]**](Provider.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

