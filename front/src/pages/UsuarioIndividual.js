import React from "react";

function UsuarioIndividual({ usuario }) {
  return (
    <div className="container">
      <div className="row">
        <ul className="list-group">
          <li className="list-group-item">{usuario.id}</li>
          <li className="list-group-item">{usuario.nombre}</li>
          <li className="list-group-item">{usuario.email}</li>
          <li className="list-group-item">{usuario.telefono}</li>
        </ul>
        <button className="btn btn-success">
            Editar
          </button>
          <button  className="btn btn-danger">
            Borrar
          </button>
      </div>
    </div>
  );
}

export default UsuarioIndividual;
