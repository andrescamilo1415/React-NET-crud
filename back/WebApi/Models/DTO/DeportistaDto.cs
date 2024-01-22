using System;

namespace pruebaMsCloud.Models.DTO
{
    public class DeportistaDto
    {

        public Guid id { get; set; }
        public string nombre { get; set; }
        public string email { get; set; }
        public string telefono { get; set; }
    }

    public class DeportistaAddDto
    {
        public string nombre { get; set; }
        public string email { get; set; }
        public string telefono { get; set; }

    }

    public class DeportistaIdDto
    {
        public Guid id { get; set; }

    }
}
