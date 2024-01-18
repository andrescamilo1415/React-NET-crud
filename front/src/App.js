import logo from "./logo.svg";
import "./App.css";
import ListaUsuarios from "./pages/ListaUsuarios";
import AgregarUsuario from "./pages/AgregarUsuario";
import EditarUsuario from "./pages/EditarUsuario";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import Login from "./pages/Login";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import RequireAuth from "@auth-kit/react-router/RequireAuth";

function App() {
  const store = createStore({
    authName: "_auth",
    authType: "cookie",
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === "https:",
  });

  return (
    <div className="App">
      <AuthProvider store={store}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            CRUD DEMO
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Listado
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="agregarusuario">
                  Agregar usuario
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} exact>
              {" "}
            </Route>
            <Route
              path="/"
              element={
                <RequireAuth fallbackPath={"/login"}>
                  <ListaUsuarios />
                </RequireAuth>
              }
              exact
            >
              {" "}
            </Route>
            <Route
              path="/agregarusuario"
              element={
                <RequireAuth fallbackPath={"/login"}>
                  <AgregarUsuario />
                </RequireAuth>
              }
              exact
            >
              {" "}
            </Route>
            <Route path="/editarusuario" element={<EditarUsuario />} exact>
              {" "}
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
