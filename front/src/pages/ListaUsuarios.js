import React, { useEffect, useState } from "react";
import UsuarioIndividual from "./UsuarioIndividual";
import UsuarioService from "../services/UsuarioService";
import BoostrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Button, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

function ListaUsuarios() {
  const [dataUsuarios, setDataUsuarios] = useState([]);
  const [dataUsrEditar, setUsuarioEditar] = useState({});
  const [numeroRegistros, setNumeroRegistros] = useState(0);
  const [numReg, setNunReg] = useState(3);
  const [page, SetPage] = useState(1);
  const authHeader = useAuthHeader();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const [dataUsrDelete, setUsuarioDelete] = useState("");

  const formik = useFormik({
    initialValues: dataUsrEditar,
    validationSchema: Yup.object({
      id: Yup.string().required(),
      nombre: Yup.string().required("El nombre es obligatorio"),
      email: Yup.string()
        .email("Email no es valido")
        .required("El email es obligatorio"),
      telefono: Yup.string().required("El telefono es obligatorio"),
    }),
    enableReinitialize: true,
    onSubmit: (formData) => {
      console.log(formData);
      UsuarioService.EditarUsuario(formData, authHeader).then((res) => {
        handleClose();
        obtenerUsuarios(numReg, page, "");
      });
    },
  });

  useEffect(() => {
    obtenerUsuarios(numReg, page, "");
  }, []);

  function obtenerUsuarios(numRegxPagina, pg, searchString) {
    var pagina = pg - 1; // esto es porque en el back inicia desde index 0

    //console.log("paginado: tamaño: " + numRegxPagina + " -- pagina: " + pagina);

    UsuarioService.Listadousuarios(
      {
        numReg: numRegxPagina,
        page: pagina,
        searchString: searchString,
      },
      authHeader
    ).then((res) => {
      if (res != null) {
        //  console.log("usuario", res[0]);
        setDataUsuarios(res[0]);
        // if(numeroRegistros==0){
        setNumeroRegistros(res[1]);
      } else {
        console.log("no econtro resultados de deportistas");
      }
      // }
    });
  }

  function editarUsuario(usuario) {
    console.log("el usuario a editar es: ", usuario);
    setUsuarioEditar(usuario);
    handleShow();
  }

  function eliminarUsuario(usuario) {
    console.log("el usuario a eliminar es: ", usuario);
    setUsuarioDelete(usuario.id);
    handleShowDelete();
  }

  function eliminarUsuarioConfirm() {
    console.log("usuario a eliminar");
    if (dataUsrDelete != "") {
      UsuarioService.EliminarUsuario(dataUsrDelete, authHeader).then((res) => {
        handleCloseDelete();
        obtenerUsuarios(numReg, page, "");
      });
      setUsuarioDelete("");
      handleShowDelete();
    }
  }

  const columns = [
    { dataField: "nombre", text: "Nombre" },
    { dataField: "email", text: "Email" },
    { dataField: "telefono", text: "Telefono" },
    {
      dataField: "id",
      text: "acciones",
      isDummyField: true,
      formatter: (cellContent, row) => {
        return (
          <div>
            <button
              type="button"
              className="btn btn-outline-warning"
              onClick={() => editarUsuario(row)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                classNames="bi bi-pencil-fill"
                viewBox="0 0 16 16"
              >
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
              </svg>
            </button>
            <button
              type="button"
              className="btn btn-outline-danger marging"
              onClick={() => eliminarUsuario(row)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                classNames="bi bi-trash-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
              </svg>
            </button>
          </div>
        );
      },
    },
  ];

  const pagination = paginationFactory({
    page: page,
    sizePerPage: numReg,
    totalSize: numeroRegistros,
    alwaysShowAllBtns: false,
    sizePerPageList: [
      {
        text: "3",
        value: 3,
      },
      {
        text: "5",
        value: 5,
      },
      {
        text: "10",
        value: 10,
      },
    ],
    onPageChange: (page, size) => {
      SetPage(page);
      // setNunReg(size);
      /*     console.log(
        "onPageChange cambia a : pagina: " + page + " y tamaño: " + size
      ); */
      obtenerUsuarios(numReg, page, "");
    },
    onSizePerPageChange: (size, page) => {
      SetPage(1);
      setNunReg(size);
      //   console.log("onSizePerPageChange cambia a : pagina: " + page);
      // console.log("onSizePerPageChange cambia a : tamaño: " + size);
      //console.log("onSizePerPageChange cambia a : pagina: " + size + " y tamaño: " + page);
      obtenerUsuarios(size, 1, "");
    },
  });

  const onTableChange = (type, newState) => {
    // handle any data change here
    //  console.log("onTableChange");
    //  console.log("type", type);
    //  console.log("newState", newState);
  };

  //mapeo de usuarios
  const lstUsuarios = dataUsuarios.map((usuario) => {
    return (
      <div>
        <UsuarioIndividual usuario={usuario} />
      </div>
    );
  });
  return (
    <div>
      <h2>Lista usuarios</h2>
      {/* {lstUsuarios} */}

      {numeroRegistros !== 0 ? (
        <BoostrapTable
          keyField="id"
          data={dataUsuarios}
          columns={columns}
          pagination={pagination}
          onTableChange={onTableChange}
          remote={{
            filter: false,
            pagination: true,
            sort: false,
            cellEdit: false,
          }}
          striped
          hover
          condensed
        />
      ) : (
        <div>Cargando datos</div>
      )}

      <Modal show={show} onHide={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/*    
          {dataUsrEditar.nombre}
        
         */}
            <input type="hidden" name="id" value={formik.values.id} />
            <div className="row">
              <div className="col-sm-6 offset-3">
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className={
                      formik.touched.nombre && formik.errors.nombre
                        ? "form-control error"
                        : "form-control"
                    }
                    name="nombre"
                    onChange={formik.handleChange}
                    error={formik.errors.nombre}
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
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>Confirma la eliminacion del usuario?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Cerrar
          </Button>
          <Button
            variant="primary"
            type="button"
            onClick={() => {
              eliminarUsuarioConfirm();
            }}
          >
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListaUsuarios;
