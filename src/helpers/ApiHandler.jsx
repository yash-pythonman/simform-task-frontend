import axios from "axios"
const ApiHandler = (apiLink,method,apiData,token)=>{
    const baseUrl ='http://127.0.0.1:8000/';
    return axios({
        method: method,
        url: `${baseUrl}${apiLink}`,
        data: apiData,
        headers:{         
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    .then(response => {
        return response;
    })
    .catch(error => {        
   console.log(error) 
} );
}

export default ApiHandler