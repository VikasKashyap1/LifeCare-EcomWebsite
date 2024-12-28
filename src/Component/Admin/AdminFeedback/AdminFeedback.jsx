import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'


import { useDispatch } from 'react-redux'

import $ from "jquery"
import 'datatables.net'
import 'datatables.net-dt/css/dataTables.dataTables.css'

export default function AdminFeedback() {
     let [data, setData] = useState([])
     let [flag, setFlag] = useState(false)

     let dispetch = useDispatch()

     async function DeleteData(id) {
          if (window.confirm("Are you sure you want to delete details?")) {
               let response = await fetch('/feedback/' + id, {
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
          let response = await fetch('http://localhost:8000/feedback', {
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
               <div className="container-fluid my-3">
                    <div className="row">
                         <div className="col-xl-2 col-md-3">
                              <Sidebar />
                         </div>

                         <div className="col-xl-10 col-md-9">
                              <div className="row">
                                   <h5 className='bg-primary border-primary p-2 text-white text-center'>Feedback</h5>
                                   <div className="table-responsive">
                                        <table className='table border-2 table-bordered Display' id='ShowTables' style={{ width: "100%" }}>
                                             <thead>
                                                  <tr>
                                                       <th>Id</th>
                                                       <th>Feedback</th>
                                                       <th>Delete</th>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {data.map((item, index) => (
                                                       <tr key={index}>
                                                            <td>{item.id}</td>

                                                            <td>{item.feedback}</td>
                                                            
                                                            <td> <button className="btn"
                                                                 onClick={() => DeleteData(item.id)} ><i className="fa fa-trash text-danger"></i>
                                                            </button></td>
                                                       </tr>
                                                  ))}
                                             </tbody>


                                        </table>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div >
          </>
     )
}









