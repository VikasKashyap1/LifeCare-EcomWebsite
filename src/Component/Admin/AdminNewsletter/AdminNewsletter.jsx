import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'

import { getNewsletter, deleteNewsletter, updateNewsletter } from '../../../Redux/ActionCreators/NewsletterActioncreators '

import { useDispatch, useSelector } from 'react-redux'

import $ from "jquery"
import 'datatables.net'
import 'datatables.net-dt/css/dataTables.dataTables.css'

export default function AdminNewsletter() {
     let [data, setData] = useState([])
     let [flag, setFlag] = useState(false)

     let dispetch = useDispatch()

     let NewsletterStateData = useSelector(state => state.NewsletterStateData)


     function DeleteData(id) {
          if (window.confirm("Are you sure you want to delete details?")) {
               dispetch(deleteNewsletter({ id: id }))
               GetAPIData()

          }
     }

     function updateStatus(id) {
          if (window.confirm("Are You sure you want to change the item stutas ?")) {
               let item = NewsletterStateData.find((x) => x.id === id)
               let index = NewsletterStateData.findIndex((x) => x.id === id)
               dispetch(updateNewsletter({ ...item, active: !item.active }))
               setFlag(!flag)
               data[index].active = !item.active
          }
     }
     
     function GetAPIData() {
          dispetch(getNewsletter())
          if (NewsletterStateData.length) {
               setData(NewsletterStateData)
               setTimeout(() => {
                    $("#ShowTables").DataTable()
               }, 500)
          }

          else
               setData([])
     }
     useEffect(() => {
          GetAPIData()
     }, [NewsletterStateData.length])

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
                                   <h5 className='bg-primary border-primary p-2 text-white text-center'>Newsletter</h5>
                                   <div className="table-responsive">
                                        <table className='table border-2 table-bordered Display' id='ShowTables' style={{ width: "100%" }}>
                                             <thead>
                                                  <tr>
                                                       <th>Id</th>
                                                       <th>Email</th>
                                                       <th>Active</th>
                                                       <th></th>
                                                       <th>Delete</th>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  
                                                  {
                                                       data.map((item, index) => {
                                                            return <tr key={index}>

                                                                 <td>{item.id}</td>
                                                                 <td>{item.email}</td>
                                                                 <td onClick={() => updateStatus(item.id)} title='click to change status' className={`active-stutas ${item.active ? "text-success" : "text-danger"}`} >{item.active ? "Yes" : "No"}</td>
                                                                 <td></td>
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









