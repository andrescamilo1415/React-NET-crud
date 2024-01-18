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
};

export default UsuarioService;
