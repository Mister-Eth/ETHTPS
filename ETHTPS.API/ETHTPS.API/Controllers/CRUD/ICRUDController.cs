using ETHTPS.Data.Models;

using System.Collections.Generic;

namespace ETHTPS.API.Controllers.CRUD
{
    public interface ICRUDController<T>
    {
        IEnumerable<T> GetAll(APIKeyRequestModel requestModel);
        T GetById(int id, APIKeyRequestModel requestModel);
        void Update(T entity, APIKeyRequestModel requestModel);
        void DeleteById(int id, APIKeyRequestModel requestModel);
        void Create(T entity, APIKeyRequestModel requestModel);
    }
}
