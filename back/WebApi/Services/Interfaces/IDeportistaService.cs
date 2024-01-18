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
        Task<object[]> GetDeportistas(PaginadoDto data);
    }
}
