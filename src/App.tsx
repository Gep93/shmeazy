import "./App.css";
import Login from "./components/Login/index";
import {Route, Switch, Redirect} from "react-router-dom";
import NotFound from "./components/NotFound";

function App() {
  return( 
  <>
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
  </>);
}

export default App;
