import React, { useEffect, useState } from "react";
import UsuarioIndividual from "./UsuarioIndividual";
import UsuarioService from "../services/UsuarioService";
import BoostrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function ListaUsuarios() {
  const [dataUsuarios, setDataUsuarios] = useState([]);
  const [numeroRegistros, setNumeroRegistros] = useState(0);
  const [numReg, setNunReg] = useState(3);
  const [page, SetPage] = useState(1);
  const authHeader = useAuthHeader();

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

  const columns = [
    { dataField: "nombre", text: "Nombre" },
    { dataField: "email", text: "Email" },
    { dataField: "telefono", text: "Telefono" },
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
    </div>
  );
}

export default ListaUsuarios;
