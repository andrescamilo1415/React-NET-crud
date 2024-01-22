using CoreBaseTemplate.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using pruebaMsCloud.Models.DTO;
using System.Security.Claims;

namespace pruebaMsCloud.Controllers
{
    [ApiController]
    public class DeportistaController : ControllerBase
    {

        private IDeportistaService _deportistaService;

        public DeportistaController(IDeportistaService deportistaService)
        {
            _deportistaService = deportistaService;
            //  this.appSettings = appSettings.Value;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("api/[controller]/[action]")]
        [HttpPost]
        public async Task<IActionResult> GetDeportistas([FromBody] PaginadoDto data)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                if (identity != null)
                {
                    var usrId = new Guid(identity.FindFirst(ClaimTypes.NameIdentifier).Value);
                    var result = await _deportistaService.GetDeportistas(data);
                    return Ok(result);
                }
                return BadRequest("Credenciales invalidas");
            }
            catch
            {
                return ValidationProblem("Error");
            }
        }



        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("api/[controller]/[action]")]
        [HttpPost]
        public async Task<IActionResult> AddDeportista([FromBody] DeportistaAddDto obj)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                if (identity != null)
                {

                    var usrId = new Guid(identity.FindFirst(ClaimTypes.NameIdentifier).Value);
                    bool result = await _deportistaService.AddDeportista(obj);
                    return Ok(result);

                }
                return BadRequest("Credenciales invalidas");
            }
            catch
            {
                return ValidationProblem("Error");
            }
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("api/[controller]/[action]")]
        [HttpPost]
        public async Task<IActionResult> EditDeportista([FromBody] DeportistaDto obj)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                if (identity != null)
                {

                    var usrId = new Guid(identity.FindFirst(ClaimTypes.NameIdentifier).Value);
                    bool result = await _deportistaService.EditDeportista(obj);
                    return Ok(result);

                }
                return BadRequest("Credenciales invalidas");
            }
            catch
            {
                return ValidationProblem("Error");
            }
        }


        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("api/[controller]/[action]")]
        [HttpPost]
        public async Task<IActionResult> DeleteDeportista([FromBody] DeportistaIdDto obj)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                if (identity != null)
                {

                    var usrId = new Guid(identity.FindFirst(ClaimTypes.NameIdentifier).Value);
                    bool result = await _deportistaService.DeleteDeportista(obj.id);
                    return Ok(result);

                }
                return BadRequest("Credenciales invalidas");
            }
            catch
            {
                return ValidationProblem("Error");
            }
        }


    }
}
