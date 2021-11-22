# EthtpsApi.OCLHApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**aPIOCLHOCLHGet**](OCLHApi.md#aPIOCLHOCLHGet) | **GET** /API/OCLH/OCLH | 



## aPIOCLHOCLHGet

> [TPSGPSOCLH] aPIOCLHOCLHGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.OCLHApi();
let opts = {
  'interval': "interval_example", // String | 
  'provider': "provider_example", // String | 
  'network': "network_example" // String | 
};
apiInstance.aPIOCLHOCLHGet(opts, (error, data, response) => {
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
 **interval** | **String**|  | [optional] 
 **provider** | **String**|  | [optional] 
 **network** | **String**|  | [optional] 

### Return type

[**[TPSGPSOCLH]**](TPSGPSOCLH.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

