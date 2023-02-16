namespace ETHTPS.API.Core.Controllers.CRUD
{
    public interface ICRUDController<T>
    {
        IEnumerable<T> GetAll();
        T GetById(int id);
        void Update(T entity);
        void DeleteById(int id);
        void Create(T entity);
    }
}
