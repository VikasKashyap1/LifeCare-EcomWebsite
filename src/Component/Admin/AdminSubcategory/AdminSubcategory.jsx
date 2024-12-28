import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'

import { Link } from 'react-router-dom'
import { getSubcategory, deleteSubcategory } from '../../../Redux/ActionCreators/SubcategoryActioncreators'

import { useDispatch, useSelector } from 'react-redux'

import $ from "jquery"
import 'datatables.net'
import 'datatables.net-dt/css/dataTables.dataTables.css'

export default function AdminSubcategory() {
     let [data, setData] = useState([])

     let dispetch = useDispatch()

     let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)


     function DeleteData(id) {
          if (window.confirm("Are you sure you want to delete details?")) {
               dispetch(deleteSubcategory({ id: id }))
               GetAPIData()

          }
     }
     function GetAPIData() {
          dispetch(getSubcategory())
          if (SubcategoryStateData.length) {
               setData(SubcategoryStateData)
               setTimeout(() => {
                    $("#ShowTables").DataTable()
               }, 500)
          }

          else
               setData([])
     }
     // useEffect(() => {
     //      setTimeout(() => {
     //           $('#ShowTables').DataTable()
     //      }, 1000)
     // }, [])
     useEffect(() => {
          GetAPIData()
     }, [SubcategoryStateData.length])

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
                                   <h5 className='bg-primary border-primary p-2 text-white text-center'>Subcategory<Link to='/admin/subcategory/create'><i className='fa fa-plus float-end text-white'></i></Link ></h5>
                                   <div className="table-responsive">
                                        <table className='table table-bordered Display' id='ShowTables' style={{ width: "100%" }}>
                                             <thead>
                                                  <tr>
                                                       <th>Id</th>
                                                       <th>Name</th>
                                                       <th>Active</th>
                                                       <th>Edit</th>
                                                       <th>Delete</th>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {
                                                       data.map((item, index) => {
                                                            return <tr key={index}>

                                                                 <td>{item.id}</td>
                                                                 <td>{item.name}</td>
                                                                 <td className={`${item.active ? "text-success" : "text-danger"}`}>{item.active ? "Yes" : "No"}</td>
                                                                 <td > <Link to={`/admin/subcategory/update/${item.id}`}> <i className='fa fa-edit text-primary'></i></Link></td>
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









