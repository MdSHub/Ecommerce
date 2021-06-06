import {useState, useEffect} from 'react'
import axios from 'axios'

function CategoriesAPI(token) {
    const [categories, setCategories] = useState([])
    const [callback, setCallback] = useState(false)
    

   
    
     
    useEffect(()=>{
        if(token){
            const getCategories = async ()=> {
                try{
                      const res= await axios.get('/api/category' ,{
                          headers : {Authorization : token}
                      })
                      

                     
                      setCategories(res.data)
                }
                catch(err)
                {
                    alert(err.response.data.msg)
                }
            }
            getCategories()
        }
  },[token , callback])






    return {
        categories: [categories, setCategories] , 
        callback: [callback, setCallback]
    }
}

export default CategoriesAPI

