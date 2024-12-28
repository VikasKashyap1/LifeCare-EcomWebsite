import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'



import $ from "jquery"
import 'datatables.net'
import 'datatables.net-dt/css/dataTables.dataTables.css'
import { Link } from 'react-router-dom'

export default function AdminChackout() {
     let [data, setData] = useState([])




     async function DeleteData(id) {
          if (window.confirm("Are you sure you want to delete details?")) {
               let response = await fetch('http://localhost:8000/chackout/' + id, {
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
     let response = await fetch('http://localhost:8000/chackout', {
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
                                   <h5 className='bg-primary border-primary p-2 text-white text-center'>Contact</h5>
                                   <div className="table-responsive">
                                        <table className='table border-2 table-bordered Display' id='ShowTables' style={{ width: "100%" }}>
                                             <thead>
                                                  <tr>
                                                       <th>Id</th>
                                                       <th>OrderStatus</th>
                                                       <th>payStatus</th>
                                                       <th>payMode</th>   
                                                       <th>subTotal</th>
                                                       <th>shopping</th>
                                                       <th>total </th>
                                                       <th>RPPID </th>
                                                       <th>Date</th>
                                                       <th>Actions</th>
                                                       <th></th>

                                                      
                                                  </tr>
                                             </thead>
                                             <tbody>

                                                  {
                                                       data.map((item, index) => {
                                                            return <tr key={index}>

                                                                 <td>{item.id}</td>
                                                                 <td>{item.orderStatus}</td>

                                                                 <td style={{textAlign:'center'}}>{item.paymentStatus}</td>
                                                                 <td >{item.paymentMode}</td>
                                                                 <td>&#8377;{item.subTotal}</td>
                                                                 <td style={{textAlign:'center'}}>&#8377;{item.shopping}</td>
                                                                 <td>&#8377;{item.total}</td>
                                                                 <td>{item.rppid}</td>
                                                                 <td>{new Date(item.date).toLocaleString('ind-india', {
                                                                      day: '2-digit',
                                                                      month: '2-digit',
                                                                      year: 'numeric',
                                                                      hour: '2-digit',
                                                                      minute: '2-digit',
                                                                      second: '2-digit',
                                                                      hour12: true
                                                                 })}</td>
                                                                 <td><Link to={`/admin/chackouts/show/${item.id}`} className='btn'><i className='fa fa-eye text-success'></i></Link></td>
                                                                 <td>{item.active===false ? <button className='btn' onClick={() => DeleteData(item.id)}><i className='fa fa-trash text-danger'></i></button> : ''}</td>
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









