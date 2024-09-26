import { useNavigate } from 'react-router-dom'
import { userContext } from '../../context/UserContext'
import { API } from '../../utils/Api/Api'
import './PanelAdmin.css'

import React, { useContext, useEffect } from 'react'



const PanelAdmin = () => {

  const navigate = useNavigate()

  const getUsers = async () => {
try {
 const res = await API.get('/users')
 console.log(res.data)

} catch (error) {
  navigate('/profile')
  console.log(error.response.data);
  
}  }

  useEffect(() => {
    getUsers()
  },[])
  
  const { user } = useContext(userContext)
  return (
    <div className='mainadmin'>
        {user && user.rol === 'admin' ? <h2>Administrador</h2> : ''}
    </div>
  )
}

export default PanelAdmin