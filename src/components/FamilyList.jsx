import { Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import ApiHandler from "../helpers/ApiHandler"
const filterData=(data, id)=>{
    for (let i=0; i<data.length; i++){
        if(data[i].id==id){
            return data[i];
        }
        else{
            continue;
        }
    }
}
const FamilyList = ()=>{
    const token =  sessionStorage.getItem("token")
    const [familyListData, setFamilyListData] = useState([])
    const [familyDetailData, setFamilyDetailData] = useState([])
    const [error, setError] = useState({display:"none"})
    const [comp, setComp] = useState({"current":""})
    const [cenetCss, setCenterCss]=useState({marginLeft: "25%", marginRight:" 25%",width: "50%", marginTop:"12.5%"})

    const handelOnClick =(e, data)=>{
        let value = ""
        if (data){
            value = data[e.target.value]
        }
        let x =  `NO ${e.target.value} found for the user.`
        if (Array.isArray(value)){
           x= value.map((v,i)=>{
                return v.first_name+"<br/>"
            })
        }
        else if (value) {
            x=value.first_name
        }
        document.getElementById("demo").innerHTML = x;
    }
    useEffect( async ()=>{  
          const response = await ApiHandler("families/", "get", {}, token)
          if (response && response.status ===200){
            setFamilyListData(response.data)
            setComp({"current":<div style={cenetCss}>
            <p style={error}> Went something wrong in calling the API.</p>
           <b>All families are:</b>
           {response.data.map((v,i)=>{
               return <li key={i}>
                   <span onClick={FamilyDetail} id={v.id}> {v.first_name+"'s"} </span>
               </li>})}
           </div>})
          }
          else{
            setError({color:"red"})
          }
}, []);


const FamilyDetail = async (e)=>{
    e.preventDefault();
    const response = await ApiHandler(`person/${e.target.id}/`, "get", {}, token)
    if (response && response.status===200 && response.data){
        setFamilyDetailData(response.data);
        const temp = familyDetailData
        let tempData = {}
        setComp({"current":<div  style={cenetCss}> 
        <p>
            <b> Please Select Person </b> 
        </p>
        
        <select onChange={(e)=>{tempData=filterData(temp, e.target.value)}}><option> --select persion--</option> {response.data.map( (v,i)=>{
            return <option  key={v.id} value={v.id} >{v.first_name} </option>}) }
        </select>
        <p><br/>
            <Button onClick={(e)=>{handelOnClick(e,tempData)}} value="children"> Children </Button>
            <Button className="btn-success" onClick={(e)=>{handelOnClick(e,tempData)}} value="parent"> Parent </Button>
            <Button className="btn-info" onClick={(e)=>{handelOnClick(e,tempData)}} value="grand_father"> Grand Parents </Button>
            <Button className="btn-danger" onClick={(e)=>{handelOnClick(e,tempData)}} value="sibling"> Siblings </Button>
            <Button className="btn-warning" onClick={(e)=>{handelOnClick(e,tempData)}} value="cousins"> Cousins </Button>
        </p>
        <div id="demo">  </div>
         </div>});
}}
return <div>{comp.current}</div>
}
export default FamilyList