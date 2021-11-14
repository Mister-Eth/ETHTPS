# EthtpsApi.TestApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**aPITestGetBlockInfoGet**](TestApi.md#aPITestGetBlockInfoGet) | **GET** /API/Test/GetBlockInfo | 



## aPITestGetBlockInfoGet

> BlockInfo aPITestGetBlockInfoGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.TestApi();
let opts = {
  'blockNumber': 56 // Number | 
};
apiInstance.aPITestGetBlockInfoGet(opts, (error, data, response) => {
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
 **blockNumber** | **Number**|  | [optional] 

### Return type

[**BlockInfo**](BlockInfo.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

