import { createContext, useEffect, useState} from 'react'
import { API } from '../utils/Api/Api'

export const userContext = createContext()



const UserProvider = ({children}) => {

  const [user, setUser] = useState(null)
  const [updated, setUpdated] = useState(false);
  const [viewEdit, setViewEdit] = useState(false)

  
  useEffect(() => {
    if(localStorage.getItem('token')){
      API.post('/users/checksession').then((res) =>{
        setUser(res.data)
        
        
      })
    }
  }, [updated])

  



  return (
    <userContext.Provider value={{user, setUser, setUpdated, updated, viewEdit, setViewEdit}}>
      {children}
    </userContext.Provider>
  )
}

export default UserProvider

