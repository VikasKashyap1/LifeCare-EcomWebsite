import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'

import { Link } from 'react-router-dom'
import { getProduct, deleteProduct } from '../../../Redux/ActionCreators/ProductActioncreators'

import { useDispatch, useSelector } from 'react-redux'

import $ from "jquery"
import 'datatables.net'
import 'datatables.net-dt/css/dataTables.dataTables.css'

export default function AdminProduct() {
     let [data, setData] = useState([])

     let dispetch = useDispatch()

     let ProductStateData = useSelector(state => state.ProductStateData)


     function DeleteData(id) {
          if (window.confirm("Are you sure you want to delete details?")) {
               dispetch(deleteProduct({ id: id }))
               GetAPIData()

          }
     }
     function GetAPIData() {
          dispetch(getProduct())
          if (ProductStateData.length) {
               setData(ProductStateData)
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
     }, [ProductStateData.length])

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
                                   <h5 className='bg-primary border-primary p-2 text-white text-center'>Product<Link to='/admin/product/create'><i className='fa fa-plus float-end text-white'></i></Link ></h5>
                                   <div className="table-responsive">
                                        <table className='table table-bordered Display' id='ShowTables' style={{ width: "100%" }}>
                                             <thead>
                                                  <tr>
                                                       <th>Id</th>
                                                       <th>Name</th>
                                                       <th>Maincategory</th>
                                                       <th>Subcategory</th>
                                                       <th>Brand</th>
                                                       <th>Color</th>
                                                       <th>Size</th>
                                                       <th>BasePrice</th>
                                                       <th>Discount</th>
                                                       <th>FinalPrice</th>
                                                       <th>Stock</th>
                                                       <th >Quantity</th>
                                                       <th>Pic</th>
                                                       <th>Active</th>
                                                       <th>Edit</th>
                                                       <th>Delete</th>
                                                  </tr>
                                             </thead>
                                             <tbody className="text-primary text-capitalize" >
                                                  {
                                                       data.map((item, index) => {
                                                            return <tr key={index} style={{ paddingLeft: '40px' }}>

                                                                 <td>{item.id}</td>

                                                                 <td>{item.name}</td>

                                                                 <td style={{ paddingLeft: '40px' }}>{item.maincategory}</td>

                                                                 <td>{item.subcategory}</td>

                                                                 <td>{item.brand}</td>

                                                                 <td>{item.color}</td>

                                                                 <td style={{ paddingRight: '40px' }}>{item.size}</td>

                                                                 <td>&#8377;{item.basePrice}</td>

                                                                 <td style={{ paddingRight: '50px', textColor: 'text-danger' }}>{item.discount}%</td>

                                                                 <td>&#8377;{item.finalPrice}</td>

                                                                 {/* <td className={`${item.stock ? 'text-primary' : 'text:danger'}`} >{item.stock ? 'Yes' : 'No'}</td> */}
                                                                 <td className={`${item.stock ? "text-success" : "text-danger"}`}>{item.stock ? "Yes" : "No"}</td>

                                                                 {/* {
                                                                      item.quantity>0?<td style={{ paddingRight: '55px' }}>{item.quantity}</td> :<p className='text-danger'>Not Available item</p>
                                                                 } */}
                                                                 <td style={{ paddingRight: '55px' }}>{item.quantity}</td>


                                                                 <td>
                                                                      <div style={{width:400}}>

                                                                      {
                                                                           item.pic.map((img, index) => {
                                                                                return <Link key={index} to={`${img}`} target='_blank' rel='noreferrer'>
                                                                                     <img src={`${img}`} height={60} width={70} alt='Product Logo' />
                                                                                </Link>

                                                                           })
                                                                      }

                                                                 </div> 
                                                                 </td>

                                                                 <td className={`${item.active ? "text-success" : "text-danger"}`}>{item.active ? "Yes" : "No"}</td>
                                                                 <td > <Link to={`/admin/product/update/${item.id}`}> <i className='fa fa-edit text-primary'></i></Link></td>
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









