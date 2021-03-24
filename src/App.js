import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Inicio from "./components/Inicio";
import Admin from "./components/Admin";
import Login from "./components/Login";
import Menu from "./components/Menu";
import Firestore from "./components/Firestore";

function App() {
  return (
    <div className="cotnainer">
      <Router>
        <Menu />
        <Switch>
          <Route exact path="/" component={Inicio} />
          <Route path="/admin" component={Admin} />
          <Route path="/login" component={Login} />
          <Route path="/firestore" component={Firestore} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
