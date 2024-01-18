
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
using System.Net.WebSockets;

namespace pruebaMsCloud.Services.Implements
{
    public class SeguridadService : ISeguridadService
    {

        private readonly DbContextTest _contexto;

        public SeguridadService(DbContextTest contexto)
        {

            // this.appSettings = appSettings.Value;
            this._contexto = contexto;
        }

        public async Task<string> Autenticar(AutenticarRqst obj)
        {
            var usrTmp = await _contexto.Usuarios.FirstOrDefaultAsync(x => x.Email == obj.email);

            if (usrTmp != null)
            {
                if (usrTmp.Password.Equals(obj.password)){
                    var token = GetToken(usrTmp);
                    return token;
                }
            }
            return string.Empty;
        }

        private string GetToken(Usuario usr)
        {


            var tokenHandler = new JwtSecurityTokenHandler();
            var llave = Encoding.ASCII.GetBytes("estaEsLaLlavePrivadaDelServidorDebeSerMuyLargaYEstarSeguraEnTodoMomento");// esta llave es la misma que esta en el program.cs, por tiempo se quema en codigo

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new System.Security.Claims.ClaimsIdentity(
                new System.Security.Claims.Claim[]
                {
                  new Claim(ClaimTypes.NameIdentifier, usr.Id.ToString()),   // este es el Id del usuario
                  new Claim(ClaimTypes.Email, usr.Email),
                  new Claim(ClaimTypes.Name, usr.Nombre),
                }
                ),
                Expires = DateTime.UtcNow.AddDays(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(llave), SecurityAlgorithms.HmacSha256Signature)

            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}