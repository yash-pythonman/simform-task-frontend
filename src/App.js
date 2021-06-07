import './App.css';
import Login from './components/Login'
import FamilyList from "./components/FamilyLists"
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  const [isDashboardActive, setDashboadActive] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("token") !== null) {
      setDashboadActive(true);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {isDashboardActive === true ? (
              <FamilyList />
            ) : (
              <Login setDashboadActive={setDashboadActive} />
            )}
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
