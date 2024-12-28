import React, { useEffect, useState } from 'react'
// import Breadcrum from '../../Partials/Breadcrum'
import Sidebar from '../Sidebar'
import { Link, useNavigate } from 'react-router-dom'

export default function AdminHome() {
     let [user, setUser] = useState({})
     let navigate = useNavigate()
     useEffect(() => {
          (async () => {
               let response = await fetch('http://localhost:8000/user', {
                    method: 'GET',
                    headers: {
                         'content-type': 'application/json',
                    }
               })
               response = await response.json()
               let item = response.find((x) => x.id === localStorage.getItem('userid'))
               if (item) {
                    setUser(item)
               } else {
                    navigate('/login')
               }

          })()
     }, [])


     return (
          <>
               {/* <Breadcrum title="AdminHome" /> */}
               <div className="container-fluid my-3">
                    {
                         user?.role === 'Admin' ?
                              <div className="row">
                                   <div className="col-xl-2 col-md-3">
                                        <Sidebar />
                                   </div>

                                   <div className="col-xl-10 col-md-9">
                                        <div className="row">
                                             <div className="col-md-5 ">
                                                  {user.pic ? <img src={user.pic} height={450} width={400} />
                                                       : <img src='img/Noimage.png' height={450} width={450} />}



                                             </div>
                                             <div className="col-md-7  ">
                                                  <h5 className=' text-center bg-primary text-white p-2 '>Admin Details</h5>
                                                  <table className='table table-bordered '>
                                                       <tbody>
                                                            <tr>
                                                                 <th>Name</th>
                                                                 <td>{user.name}</td>
                                                            </tr>
                                                            <tr>
                                                                 <th>Email</th>
                                                                 <td>{user.email}</td>
                                                            </tr>
                                                            <tr>
                                                                 <th>User</th>
                                                                 <td>{user.username}</td>
                                                            </tr>
                                                            <tr>
                                                                 <th>Phone</th>
                                                                 <td>{user.phone}</td>
                                                            </tr>
                                                            <tr>

                                                                 <td colSpan={2}><Link to="/update-profile" className='btn btn-primary w-100'>Update Profile</Link></td>

                                                            </tr>

                                                       </tbody>

                                                  </table>

                                             </div>
                                        </div>

                                   </div>

                              </div>

                              : navigate('/profile')
                    }
               </div>
          </>
     )
}
