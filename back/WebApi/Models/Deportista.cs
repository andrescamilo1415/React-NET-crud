using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace pruebaMsCloud.Models
{
    public class Deportista
    {
        public Guid Id { get; set; }
        public string Nombre { get; set; }
        public string Email { get; set; }
        public string Telefono { get; set; }
    }
}
