import React, { useState } from "react";

import UsuarioService from "../services/UsuarioService";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';

function AgregarUsuario() {
  //hooks
  // const [nombre, setNombre] = useState("");
  // const [email, setEmail] = useState("");
  // const [telefono, setTelefono] = useState("");
  const authHeader = useAuthHeader();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      nombre: "",
      email: "",
      telefono: "",
    },
    validationSchema:Yup.object({
      nombre: Yup.string().required('El nombre es obligatorio'),
      email: Yup.string().email('Email no es valido').required('El email es obligatorio'),
      telefono: Yup.string().required('El telefono es obligatorio'),
    })
    ,
    validateOnChange:true,
    onSubmit: (formData) => {
      console.log(formData);
      UsuarioService.AgregarUsuario(formData, authHeader);
    },
  });

  function agregarUsuario() {
    /*    var usuario = {
      nombre: nombre,
      email: email,
      telefono: telefono,
    };
    UsuarioService.AgregarUsuario(usuario, authHeader); */
  }

  function salir() {
    if (signOut()) {
      navigate("/login");
    }
  }

  return (
    <div className="container">
      <div className="row">
        <h2>Agregar usuario</h2>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-sm-6 offset-3">
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className={ formik.touched.nombre && formik.errors.nombre ? 'form-control error': 'form-control'}
                name="nombre"
                onChange={formik.handleChange}
                error={formik.errors.nombre }
                value={formik.values.nombre}
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
                name="email"
                onChange={formik.handleChange}
                error={formik.errors.email}
                value={formik.values.email}
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
                name="telefono"
                onChange={formik.handleChange}
                error={formik.errors.telefono}
                value={formik.values.telefono}
              ></input>
            </div>
            <button type="submit" className="btn btn-success">
              Guardar
            </button>
            <button type="button" onClick={formik.handleReset} className="btn btn-success">
              Limpiar
            </button>

            <button onClick={salir} className="btn btn-danger">
              Salir
            </button>
          </div>
        </div>
      </form>

      {/*    <div className="row">
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
      </div> */}
    </div>
  );
}

export default AgregarUsuario;
