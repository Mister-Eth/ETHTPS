using System.Collections.Generic;

namespace ETHTPS.API.BIL.Infrastructure.Services
{
    public interface ICRUDService<T>
    {
        IEnumerable<T> GetAll();
        T GetById(int id);
        void Update(T entity);
        void DeleteById(int id);
        void Create(T entity);
    }
}
