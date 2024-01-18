import React, { useState } from "react";
import SecurityService from "../services/SecurityService";
import { withSignIn } from "react-auth-kit";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate  } from 'react-router-dom';

function Login() {
  //hooks
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const signIn = useSignIn();
  const navigate  = useNavigate ();

  function HacerLogin() {
    var credenciales = {
      email: email,
      password: pass,
    };
    SecurityService.Autenticar(credenciales).then((res) => {
      if (res != null) {
        alert(res);

        if (
          signIn({
            auth: {
              token: res,
              type: "Bearer",
            },
          })
        ) {
          //esta logueado
          navigate ('/');

        } else {
          alert("Error al hacer login");
        }
      } else {
        alert("Credenciales invalidas");
      }
    });
  }

  return (
    <div className="container">
      <div className="row">
        <h2>Login</h2>
      </div>

      <div className="row">
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
            <label htmlFor="pass" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <div className="col-sm-6 offset-3">
          <button onClick={HacerLogin} className="btn btn-success">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
