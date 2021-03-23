import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Inicio from "./components/Inicio";
import Admin from "./components/Admin";
import Login from "./components/Login";

function App() {
  return (
    <div className="cotnainer">
      <Router>
        <Switch>
          <Route exact path="/" component={Inicio} />
          <Route path="/admin" component={Admin} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
