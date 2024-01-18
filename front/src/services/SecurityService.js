import axios from 'axios';
const SecurityService={

  Autenticar: function (credenciales) {
      console.log(credenciales);
  return    axios
        .post("/api/Security/Autenticar", credenciales)
        .then((res) => {
         // alert(res.data);
         return res.data;
        })
        .catch((err) => {
          console.log(err);
          return null;
        });
    },
}

export default SecurityService;