import React, { useState } from "react";

import UsuarioService from "../services/UsuarioService";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate  } from 'react-router-dom';

function AgregarUsuario() {
  //hooks
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const authHeader = useAuthHeader();
  const signOut = useSignOut();
  const navigate  = useNavigate ();

  function agregarUsuario() {
    var usuario = {
      nombre: nombre,
      email: email,
      telefono: telefono,
    };
    UsuarioService.AgregarUsuario(usuario, authHeader);
  }

  function salir() {
    if (signOut()) {
      navigate ('/login');

    }
  }

  return (
    <div className="container">
      <div className="row">
        <h2>Agregar usuario</h2>
    
      </div>

      <div className="row">
        <div className="col-sm-6 offset-3">
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <div className="col-sm-6 offset-3">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <div className="col-sm-6 offset-3">
          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">
              Teléfono
            </label>
            <input
              type="text"
              className="form-control"
              value={telefono}
              onChange={(e) => {
                setTelefono(e.target.value);
              }}
            ></input>
          </div>
          <button onClick={agregarUsuario} className="btn btn-success">
            Guardar
          </button>

          <button onClick={salir} className="btn btn-danger">Salir</button>
        </div>
      </div>
    </div>
  );
}

export default AgregarUsuario;
