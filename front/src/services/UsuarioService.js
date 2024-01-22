import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
const UsuarioService = {
  AgregarUsuario: function (usuario, auth) {
    const config = {
      headers: { Authorization: `${auth}` },
    };
    axios
      .post("/api/Deportista/AddDeportista", usuario, config)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  EditarUsuario: function (usuario, auth) {
    const config = {
      headers: { Authorization: `${auth}` },
    };
    return axios
      .post("/api/Deportista/EditDeportista", usuario, config)
      .then((res) => {
        alert(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  },

  Listadousuarios: function (paginado, auth) {
    //     console.log('auth',auth);
    const config = {
      headers: { Authorization: `${auth}` },
    };
    //console.log('config',config);
    return axios
      .post("/api/Deportista/GetDeportistas", paginado, config)
      .then((res) => {
        //    console.log(res.data);
        return res.data;
        // alert(res.data);
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },

  EliminarUsuario: function (id, auth) {
    const config = {
      headers: { Authorization: `${auth}` },
    };
    return axios
      .post("/api/Deportista/DeleteDeportista", { id }, config)
      .then((res) => {
        alert(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  },
};

export default UsuarioService;
