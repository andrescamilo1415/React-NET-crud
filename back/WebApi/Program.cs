using CoreBaseTemplate.Services;
using Microsoft.EntityFrameworkCore;
using pruebaMsCloud.Services.Implements;
using test4.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
string MiCors = "miCors";
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MiCors, builder =>
    {
        builder.WithOrigins("*")
         .AllowAnyHeader()
            .AllowAnyMethod();
        //builder.AllowAnyOrigin();
    });
});

var llave = Encoding.ASCII.GetBytes("estaEsLaLlavePrivadaDelServidorDebeSerMuyLargaYEstarSeguraEnTodoMomento");//esta llave debe estar asegurada enlas variables de entorno
builder.Services.AddAuthentication(d =>
{
    d.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    d.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(d =>
{
    d.RequireHttpsMetadata = false;
    d.SaveToken = true;
    d.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(llave),
        ValidateIssuer = false,
        ValidateAudience = false,
    };
});



builder.Services.AddScoped<IDeportistaService,DeportistaService>();
if (true)
{
//builder.Services.AddScoped<ILogsService, LogService>();
}
else
{
//builder.Services.AddScoped<ILogsService, LogArchivoService>();

}
builder.Services.AddScoped<ISeguridadService, SeguridadService>();


builder.Services.AddDbContext<DbContextTest>(options => options.UseSqlServer(
   builder.Configuration.GetConnectionString("TestConectionString")
    ));

var app = builder.Build();
app.UseCors(MiCors);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
