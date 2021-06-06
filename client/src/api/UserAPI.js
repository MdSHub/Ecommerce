import React , { useEffect , useState} from 'react';
import axios from 'axios'
import { set } from 'mongoose';

function UserAPI(token){
     const [isLogged , setIsLogged] = useState(false)
     const [isAdmin , setIsdAdmin] = useState(false)
     const [cart , setCart]= useState([])
     const [history , setHistory] = useState([])

   
      useEffect(()=>{
            if(token){
                const getUser = async ()=> {
                    try{
                          const res= await axios.get('/user/infor' ,{
                              headers : {Authorization : token}
                          })
                          

                          setIsLogged(true)
                          res.data.role === 1 ? setIsdAdmin(true) : setIsdAdmin(false)
                          setCart(res.data.cart)
                    }
                    catch(err)
                    {
                        alert(err.response.data.msg)
                    }
                }
                getUser()
            }
      },[token])

      

      const addCart= async (product)=>{
          if(!isLogged) return alert("please login to continue buying")

          const check=cart.every(item => {
              return item._id !== product._id
          })
          if(check) {
              setCart([...cart , {...product , quantity:1}])
              await axios.patch('/user/addcart' , {cart :[...cart , {...product , quantity:1}]},{
                  headers: {Authorization:token}
              })
          }
          else{
              alert("this Product has been added to cart")
          }
      }


  return {

    isLogged :[isLogged , setIsLogged],
    isAdmin :  [isAdmin , setIsdAdmin],
    cart: [cart , setCart],
    addCart : addCart,
    history: [history , setHistory]

  }
}

export default UserAPI