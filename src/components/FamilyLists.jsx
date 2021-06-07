
import { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import ApiHandler from "../helpers/ApiHandler";
import FamilyDetail from '../components/FamilyDetail';



const FamilyList = ()=>{
    const token = sessionStorage.getItem("token");
    const [familyList,setFamilyList] = useState([]);
    const [list,setList] = useState(true)
    const [id,setId] = useState("");
    const cenetCss = {
        marginLeft: "25%",
        marginRight: " 25%",
        width: "50%",
        marginTop: "12.5%",
      };
    

    useEffect(async () => {
        const response = await ApiHandler("families/", "get", {}, token);
        if(response && response.status ===200){
            setFamilyList(response.data)
        }
      }, []);

      
      const handleClick = (e,id)=>{
        setList(false)
        setId(id)
      }

      return(
          <>
         {list ?
          <div style={cenetCss}>
          <b>Families</b>
               <ListGroup>
            {familyList.map((item,index)=>{
                return(
                     <ListGroup.Item onClick={(e)=>handleClick(e,item.id)}>{item.first_name}</ListGroup.Item>
                )
            })}
        </ListGroup>
          </div> : 
          <FamilyDetail id={id} /> 
          }
         
       </>
      )
}

export default FamilyList