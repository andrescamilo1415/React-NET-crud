﻿using pruebaMsCloud.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreBaseTemplate.Services
{
    public interface ISeguridadService
    {
        Task<string> Autenticar(AutenticarRqst obj);

    }
}
