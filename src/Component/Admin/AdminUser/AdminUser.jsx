import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'



import $ from "jquery"
import 'datatables.net'
import 'datatables.net-dt/css/dataTables.dataTables.css'

export default function AdminNewsletter() {
     let [data, setData] = useState([])




     async function DeleteData(id) {
          if (window.confirm("Are you sure you want to delete details?")) {
               let response = await fetch('http://localhost:8000/user/' + id, {
                    method: 'DELETE',
                    headers: {
                         'content-type': 'appliction/json'
                    }
               })
               response = await response.json()
               GetAPIData()

          }
     }

     async function GetAPIData() {
          let response = await fetch('http://localhost:8000/user', {
               method: "GET",
               headers: {
                    'content-type': 'appliction/json'
               }

          })
          response = await response.json()
          if (response) {
               setData(response)
               setTimeout(() => {
                    $("#ShowTables").DataTable()
               }, 500)
          }

          else
               setData([])
     }


     useEffect(() => {
          GetAPIData()
     }, [])

     return (
          <>
               {/* <Breadcrum title="AdminHome" /> */}
               <div className="container-fluid my-3">
                    <div className="row">
                         <div className="col-xl-2 col-md-3">
                              <Sidebar />
                         </div>

                         <div className="col-xl-10 col-md-9">
                              <div className="row">
                                   <h5 className='bg-primary border-primary p-2 text-white text-center'>Users</h5>
                                   <div className="table-responsive">
                                        <table className='table border-2 table-bordered Display' id='ShowTables' style={{ width: "100%" }}>
                                             <thead>
                                                  <tr>
                                                       <th>Id</th>
                                                       <th>Name</th>
                                                       <th>Username</th>
                                                       <th>Email</th>
                                                       <th>Phone</th>
                                                       <th>City</th>
                                                       <th>State</th>
                                                       <th>Role</th>
                                                       <th>Delete</th>
                                                  </tr>
                                             </thead>
                                             <tbody>

                                                  {
                                                       data.map((item, index) => {
                                                            return <tr key={index}>

                                                                 <td>{item.id}</td>
                                                                 <td>{item.name}</td>
                                                                 <td>{item.username}</td>
                                                                 <td>{item.email.split('gmail')[0]+'...'}</td>
                                                                 <td>{item.phone}</td>
                                                                 <td>{item.city}</td>
                                                                 <td>{item.state}</td>
                                                                 <td>{item.role}</td>
                                                               
                                                                 <td><button className='btn' onClick={() => DeleteData(item.id)}><i className='fa fa-trash text-danger'></i></button></td>
                                                            </tr>
                                                       })
                                                  }

                                             </tbody>
                                        </table>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </>
     )
}









