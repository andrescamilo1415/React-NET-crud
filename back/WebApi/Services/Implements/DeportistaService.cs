
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Linq.Expressions;
using CoreBaseTemplate.Services;
using test4.Models;
using pruebaMsCloud.Models;
using pruebaMsCloud.Models.DTO;

namespace pruebaMsCloud.Services.Implements
{
    public class DeportistaService : IDeportistaService
    {

        private readonly DbContextTest _contexto;

        public DeportistaService(DbContextTest contexto)
        {

            // this.appSettings = appSettings.Value;
            this._contexto = contexto;
        }

        public async Task<bool> AddDeportista(DeportistaAddDto obj)
        {
            try
            {
                var deportista = new Deportista() { Id=Guid.NewGuid(), Nombre = obj.nombre, Email = obj.email, Telefono=obj.telefono };
                _contexto.Deportistas.Add(deportista);
                await _contexto.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }

        public async Task<object[]> GetDeportistas(PaginadoDto data)
        {
            var obj = new object[2];

            var lst = await _contexto.Deportistas.Where(x => (x.Nombre.Contains(data.searchString))).OrderBy(x => x.Nombre).Skip(data.numReg * data.page).Take(data.numReg).Select(x => new DeportistaDto() { id = x.Id, nombre = x.Nombre, email=x.Email, telefono=x.Telefono }).ToListAsync();
            obj[0] = lst;
            obj[1] = _contexto.Deportistas.Count();

            return obj;
        }

    }
}