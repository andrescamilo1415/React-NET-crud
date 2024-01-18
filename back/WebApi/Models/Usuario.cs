using System.ComponentModel.DataAnnotations;

namespace pruebaMsCloud.Models
{
    public class Usuario
    {
        public Guid Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Nombre { get; set; }

        [Required]
        public DateTime FechaCreacion { get; set; }

        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        [StringLength(100)]
        public string Password { get; set; }

    }
}
