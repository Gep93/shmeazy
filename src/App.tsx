import "./App.css";
import {useEffect} from "react";
import Login from "./components/Login/index";
import {Route, Switch, Redirect, useHistory} from "react-router-dom";
import NotFound from "./components/NotFound";
import FixCookies from "./components/FixCookies/index";
import localStorageAvailable, {localStorageHasJWT} from "./helpers/localstorage";

function App() {
  const history = useHistory();
  useEffect(() => {
    if(!localStorageAvailable()) return history.push("/fix-cookies");
    if(!localStorageHasJWT()) return history.push("/");
});

  return( 
  <>
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/not-found" component={NotFound} />
    <Route exact path="/fix-cookies" component={FixCookies} />
    <Redirect to="/not-found" />
  </Switch>
  </>);
}

export default App;
