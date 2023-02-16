﻿using ETHTPS.Data.Core.Models.DataPoints;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;

namespace ETHTPS.API.BIL.Infrastructure.Services.DataServices.TPS
{
    public interface ITPSProvider
    {
        DataResponseModel GetTPS(DataRequestModel requestModel);
    }
}
