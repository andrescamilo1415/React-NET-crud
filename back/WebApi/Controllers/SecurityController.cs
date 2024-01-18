using CoreBaseTemplate.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using pruebaMsCloud.Models.DTO;

namespace pruebaMsCloud.Controllers
{
  //  [Route("api/[controller]")]
    [ApiController]
    public class SecurityController : ControllerBase
    {

        private ISeguridadService _seguridadService;

        public SecurityController(ISeguridadService seguridadService)
        {
            _seguridadService = seguridadService;
 
        }
        [AllowAnonymous]
        [Route("api/[controller]/[action]")]
        [HttpPost]
        public async Task<IActionResult> Autenticar([FromBody] AutenticarRqst usrPass)
        {
            var q = await _seguridadService.Autenticar(usrPass);
            if (q == string.Empty)
            {
                return BadRequest("Usuario o pass incorrectos");
            }
            return Ok(q);
        }
    }
}
