﻿using ETHTPS.API.BIL.Infrastructure.Services;
using ETHTPS.API.Core.Controllers;
using ETHTPS.API.Core.Controllers.CRUD;
using ETHTPS.Data.Core.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ETHTPS.API.Core.Integrations.MSSQL.Controllers.CRUD
{
    public class CRUDServiceControllerBase<T> : APIControllerBase, ICRUDController<T> where T : class
    {
        private readonly ICRUDService<T> _serviceImplementation;
        public CRUDServiceControllerBase(ICRUDService<T> serviceImplementation)
        {
            _serviceImplementation = serviceImplementation;
        }

        [Route("[action]")]
        [HttpPut]
        [Authorize(Policy = "EditorsOnly")]
        public void Create([FromBody] T entity, [FromQuery] APIKeyRequestModel requestModel)
        {
            _serviceImplementation.Create(entity);
        }

        [Route("[action]")]
        [HttpPut]
        [Authorize(Policy = "EditorsOnly")]
        public void DeleteById(int id, [FromQuery] APIKeyRequestModel requestModel)
        {
            _serviceImplementation.DeleteById(id);
        }

        [Route("[action]")]
        [HttpGet]
        public IEnumerable<T> GetAll([FromQuery] APIKeyRequestModel requestModel)
        {
            return _serviceImplementation.GetAll();
        }

        [HttpGet]
        [Route("[action]")]
        public T GetById(int id, [FromQuery] APIKeyRequestModel requestModel)
        {
            return _serviceImplementation.GetById(id);
        }

        [Route("[action]")]
        [Authorize(Policy = "EditorsOnly")]
        [HttpPut]
        public void Update([FromBody] T entity, [FromQuery] APIKeyRequestModel requestModel)
        {
            _serviceImplementation.Update(entity);
        }
    }
}
