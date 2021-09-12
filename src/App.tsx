import "./App.css";
import {useEffect} from "react";
import Login from "./components/Login/index";
import {Route, Switch, Redirect, useHistory} from "react-router-dom";
import NotFound from "./components/NotFound";
import FixCookies from "./components/FixCookies/index";
import ShoppingLists from "./components/ShoppingLists";
import ShoppingList from "./components/ShoppingList";
import {ShoppingListsProvider} from "./contexts/ShoppingListsContext/index";
import { ThemeProvider } from "./contexts/ThemeProvider";
import {useLocalStorage} from "./hooks/useLocalStorage";

function App() {
  const history = useHistory();
  const {localStorageHasJWT, localStorageAvailable} = useLocalStorage();
  useEffect(() => {
    if(!localStorageAvailable()) return history.push("/fix-cookies");
    if(!localStorageHasJWT()) return history.push("/");
  });

return( 
  <>
    <Switch>
      <ThemeProvider>
        <Route exact path="/" component={Login} />
        <ShoppingListsProvider>
          <Route exact path="/shopping-lists" component={ShoppingLists} />
          <Route exact path="/shopping-list/:id" component={ShoppingList} />
        </ShoppingListsProvider>
        <Route exact path="/fix-cookies" component={FixCookies} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </ThemeProvider>
    </Switch>
  </>
  );
}

export default App;
