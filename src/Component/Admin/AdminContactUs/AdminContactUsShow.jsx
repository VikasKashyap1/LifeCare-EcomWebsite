import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'


import { useDispatch, useSelector } from 'react-redux'

import $ from "jquery"
import 'datatables.net'
import 'datatables.net-dt/css/dataTables.dataTables.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteContactUs, getContactUs, updateContactUs } from '../../../Redux/ActionCreators/ContactUsActioncreators'

export default function AdminContactUsShow() {
     let [data, setData] = useState({})
     let [flag, setFlag] = useState(false)
     let { id } = useParams()
     let dispatch = useDispatch()
     let navigate = useNavigate()

     let ContactUsStateData = useSelector((state) => state.ContactUsStateData)

     function updateStatus() {
          if (window.confirm("Did you really want to change the status ")) {
              let item = ContactUsStateData.find((x) => x.id === id)
              console.log(item);
              
              dispatch(updateContactUs({ ...item, active: !item.active }))
              setFlag(!flag)
              setData((old) => {
                  return {
                      ...old,
                      active: false
                  }
              })
          }
      }
       function deleteStatus() {
          if (window.confirm("Are you sure you want to delete details?")) {
               dispatch(deleteContactUs({ id: id }))
               navigate("/admin/contactus")

          }
     }


     function GetAPIData() {
          dispatch(getContactUs())
          if (ContactUsStateData.length) {
               let item = ContactUsStateData.find((x) => x.id === id)
               if (item) {

                    setData(item)
                    setTimeout(() => {
                         $("#ShowTables").DataTable()
                    }, 500)
               } else {
                    setData([])
               }
          }
     }


     // async function GetAPIData() {
     //      let response = await fetch('http://localhost:8000/contactus', {
     //           method: "GET",
     //           headers: {
     //                'content-type': 'appliction/json'
     //           }
     //      })
     //      response = await response.json()
     //      if (response) {
     //           let item = response.find((x) => x.id === id)
     //           setData(item)
     //           setTimeout(() => {
     //                $("#ShowTables").DataTable()
     //           }, 500)
     //      }

     //      else
     //           setData([])
     // }


     useEffect(() => {
          GetAPIData()
     }, [ContactUsStateData.length])

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
                                   <h5 className='bg-primary border-primary p-2 text-white text-center'>Contact Quary</h5>
                                   <div className="table-responsive">
                                        <table className='table table-bordered'>
                                             <tbody>
                                                  <tr>
                                                       <th>Id</th>
                                                       <td>{data.id}</td>
                                                  </tr>
                                                  <tr>
                                                       <th>Name</th>
                                                       <td>{data.name}</td>
                                                  </tr>
                                                  <tr>
                                                       <th>Email</th>
                                                       <td>{data.email}</td>
                                                  </tr>
                                                  <tr>
                                                       <th>Phone</th>
                                                       <td>{data.phone}</td>
                                                  </tr>
                                                  <tr>
                                                       <th>Subject</th>
                                                       <td>{data.subjact}</td>
                                                  </tr>
                                                  <tr>
                                                       <th>Massage</th>
                                                       <td>{data.massage}</td>
                                                  </tr>
                                                  <tr>
                                                       <th>Acitve</th>
                                                       <td>{data.active ? <p className='text-success'>Yes</p> : <p className='text-danger'>No</p>}</td>
                                                  </tr>
                                                  <tr>
                                                       <th>Date</th>
                                                       <td>{new Date(data.date).toLocaleString('ind-india', {
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            second: '2-digit',
                                                            hour12: true,
                                                       }
                                                       )}</td>
                                                  </tr>
                                                  <tr>
                                                       <td colSpan={2}>
                                                            {
                                                                 data.active ? <button onClick={updateStatus} className='btn btn-primary w-100 '  >Change the Active Status</button>
                                                                      : <button onClick={deleteStatus} className='btn btn-danger w-100 ' >Delete</button>
                                                            }
                                                       </td>
                                                  </tr>
                                                  {/* <tr>
                                                       <td colSpan={2}>
                                                            {
                                                                 data.active ? <button onClick={updateStatus} className='btn btn-primary w-100'>Update Status to Done</button> :
                                                                      <button onClick={deleteStatus} className='btn btn-danger w-100'>Delete</button>
                                                            }
                                                       </td>
                                                  </tr> */}

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









