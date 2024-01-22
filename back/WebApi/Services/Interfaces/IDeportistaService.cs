using pruebaMsCloud.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreBaseTemplate.Services
{
    public interface IDeportistaService
    {
        Task<bool> AddDeportista(DeportistaAddDto obj);
        Task<bool> DeleteDeportista(Guid id);
        Task<bool> EditDeportista(DeportistaDto obj);
        Task<object[]> GetDeportistas(PaginadoDto data);
    }
}
