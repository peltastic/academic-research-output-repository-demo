import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { privateInstance } from "./api/variables";
import "./App.css";
import CreateRepo from "./pages/CreateRepo";
import Login from "./pages/Login";
import RepoFiles from "./pages/RepoFiles";
import SignUp from "./pages/SignUp";

function App() {
  useEffect(() => {
    privateInstance.interceptors.request.use(function (config) {
      const token = localStorage.getItem("token");
      config.headers.Authorization = "Bearer " + token;

      return config;
    });
  }, []);

  return (
    <div>
      <Router>
        <Switch>
          <Route path={"/login"}>
            <Login />
          </Route>
          <Route path={"/signup"}>
            <SignUp />
          </Route>
          <Route path={"/create"}>
            <CreateRepo />
          </Route>
          <Route path={"/repo/files/:id"}>
            <RepoFiles />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
