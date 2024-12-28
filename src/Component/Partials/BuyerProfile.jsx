import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'



 function TableShow(user) {
     return<table className='table table-bordered '>
               <thead>
                    <tr>
                         <th>name</th>
                         <td>{user.name}</td>
                    </tr>
                    <tr>
                         <th>Username</th>
                         <td>{user.username}</td>
                    </tr>
                    <tr>
                         <th>Email</th>
                         <td>{user.email}</td>
                    </tr>
                    <tr>
                         <th>Phone</th>
                         <td>{user.phone}</td>
                    </tr>
                    <tr>
                         <th>Address</th>
                         <td>{user.address}</td>
                    </tr>
                    <tr>
                         <th>City</th>
                         <td>{user.city}</td>
                    </tr>
                    <tr>
                         <th>State</th>
                         <td>{user.state}</td>
                    </tr>
                    <tr>
                         <th>Pin Code</th>
                         <td>{user.pin}</td>
                    </tr>
                    <tr><td colSpan={2}><Link to={'/update-profile'}>  <button className='btn btn-primary w-100'>Update Profile</button>  </Link> </td></tr>


               </thead>

          </table>


    
}
export default function BuyerProfile(props) {
     let [user, setUser] = useState([])
     let navigate = useNavigate()



     useEffect(() => {
          (async () => {
               let response = await fetch('http://localhost:8000/user', {
                    method: 'GET',
                    headers: {
                         'content-type': 'application/json'
                    },
               })
               response = await response.json()
               const item = response.find((x) => x.id === localStorage.getItem('userid'))
               if (item)
                    setUser(item)
               else {
                    navigate('/login')
               }

          })()
     }, [])



     return (
          props.title ?
               <>
                         <h5 className='bg-primary p-2 text-center text-light'> Billing Details</h5>
                                       {TableShow(user)}

               </> :
               <div className="row">
                    <div className="col-md-6">
                         {user?.pic === null || user?.pic === undefined ?
                              < img height={400} width={500} src='img/Noimg.png' alt='image'></img>
                              : < img height={400} width={500} src={`${user.pic}`} alt='image'></img>
                         }
                    </div>
                    <div className="col-md-6">
                         {TableShow(user)}
                    </div>
               </div>

     )
}
