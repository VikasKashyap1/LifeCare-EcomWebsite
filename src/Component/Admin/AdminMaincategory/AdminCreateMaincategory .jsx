import React, { useEffect, useState } from 'react'
// import Breadcrum from '../../Partials/Breadcrum'
import formValidator from '../../FormVlidator/FormVlidator'
import Sidebar from '../Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { creatMaincategory, getMaincategory} from '../../../Redux/ActionCreators/MaincategoryActioncreators'

export default function AdminCreateMaincategory() {
     let [alldata, setAlldata] = useState([])
     let [data, setData] = useState({
          name: "",
          active: true,
     })
     let [errorMessage, setErrorMessage] = useState({
          name: "Name is maindetry"
     })
     let [show, setShow] = useState(false)
     let navigate = useNavigate()
     
     let dispetch = useDispatch()
     
     let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)


     function getInputData(e) {
          var { name, value } = e.target
          if (name !== "active") {
               setErrorMessage((old) => {
                    return {
                         ...old,
                         [name]: formValidator(e)
                    }
               })
          }
          setData((old) => {
               return {
                    ...old,
                    [name]: name === "active" ? (value === "1" ? true : false) : value
               }
          })
     }
     async function postdata(e) {
          e.preventDefault()
          let error = Object.values(errorMessage).find((x) => x !== "")
          if (error)
               setShow(true)

          else {
               let items = alldata.find((x) => x.name?.toLowerCase() === data.name.toLowerCase())
               if (items) {
                    setShow(true)
                    setErrorMessage((old) => {
                         return {
                              ...old,
                              "name": "This name is already Exits"
                         }


                    })
               }
               else {
                    dispetch(creatMaincategory({ ...data }))
                    navigate("/admin/maincategory")
               }
          }
     }
     useEffect(() => {
          (() => {
               dispetch(getMaincategory())
               if (MaincategoryStateData.length)
                    setAlldata(MaincategoryStateData)

               else
                    setAlldata([])

          })();

     }, [MaincategoryStateData.length])

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
                                   <h5 className='bg-primary border-primary p-2 text-white text-center'>Create<Link to='/admin/maincategory'><i className='fa fa-arrow-left float-end text-white'></i></Link ></h5>
                              </div>
                              <form onSubmit={postdata}>
                                   <div className="row ">
                                        <div className="col-md-6 mb-2">
                                             <label htmlFor="username">name*</label>
                                             <input type="text" name="name" onChange={getInputData} placeholder='Maincategory Name' className={`form-control text-capitalize ${show && errorMessage.name ? "border-danger" : "border-primary"} border-2`} />
                                             {show && errorMessage.name ? <p className='text-danger text-capitalize'>{errorMessage.name}</p> : ""}
                                        </div>
                                        <div className="col-md-6 mb-2">
                                             <label>Active*</label>
                                             <select onChange={getInputData} className='form-control border-primary border-2' name='active' >
                                                  <option value="1">Yes</option>
                                                  <option value="0">No</option>
                                             </select>
                                        </div>
                                        <div className="mb-3">
                                             <button type='submit' className='btn btn-primary border-2 mt-3 w-100'>Submit</button>

                                        </div>

                                   </div>
                              </form>


                         </div>
                    </div>
               </div>
          </>
     )
}
