import './App.css';
import Login from './components/Login'
import FamilyList from "./components/FamilyList"
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from "react"


function App() {
const  [page, setPage]=useState({"component":Login}) 
useEffect(()=>{
  if(sessionStorage.getItem("token")){ 
    setPage({"component":FamilyList})
   }
}, [setPage]);
  return (
    <div className="App">
     { <page.component/>}
    </div>
  );
}

export default App;
