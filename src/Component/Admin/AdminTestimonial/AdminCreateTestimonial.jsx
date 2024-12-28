import React, { useEffect, useState } from 'react'
// import Breadcrum from '../../Partials/Breadcrum'

import formValidator from '../../FormVlidator/FormVlidator'
import Sidebar from '../Sidebar'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { createTestimonial, getTestimonial } from '../../../Redux/ActionCreators/TestimonialActioncreators'
import ImageVlidator from '../../FormVlidator/ImageVlidator'

export default function AdminCreateTestimonial() {
     let [alldata, setAlldata] = useState([])
     let [data, setData] = useState({
          name: "",
          caption: "",
          pic: '',
          active: true,
     })
     let [errorMessage, setErrorMessage] = useState({
          name: "Name is maindetry",
          caption: "Caption is maindetry",
          pic: 'Image is maindetry'
     })
     let [show, setShow] = useState(false)
     let navigate = useNavigate()

     let dispetch = useDispatch()

     let TestimonialStateData = useSelector(state => state.TestimonialStateData)


     function getInputData(e) {
          var name = e.target.name
          var value = e.target.files ? '/testimonial/' + e.target.files[0].name : e.target.value
          if (name !== "active") {
               setErrorMessage((old) => {
                    return {
                         ...old,
                         [name]: name === 'pic' ? ImageVlidator(e) : formValidator(e)
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
                    dispetch(createTestimonial({ ...data }))
                    navigate("/admin/testimonial")
               }
          }
     }
     useEffect(() => {
          (() => {
               dispetch(getTestimonial())
               if (TestimonialStateData.length)
                    setAlldata(TestimonialStateData)

               else
                    setAlldata([])

          })();

     }, [TestimonialStateData.length])

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
                                   <h5 className='bg-primary border-primary p-2 text-white text-center'>Create<Link to='/admin/testimonial'><i className='fa fa-arrow-left float-end text-white'></i></Link ></h5>
                              </div>
                              <form onSubmit={postdata}>
                                   <div className="row ">
                                        <div className="col-md-6 mb-2">
                                             <label htmlFor="username">name*</label>
                                             <input type="text" name="name" onChange={getInputData} placeholder='Testimonial Name' className={`form-control text-capitalize ${show && errorMessage.name ? "border-danger" : "border-primary"} border-2`} />
                                             {show && errorMessage.name ? <p className='text-danger text-capitalize'>{errorMessage.name}</p> : ""}
                                        </div>

                                        <div className="row">
                                             <div className="col-md-6 mb-3">
                                                  <label>pic*</label>
                                                  <input type='file' name='pic' onChange={getInputData} className={`form-control text-capitalize ${show && errorMessage.pic ? "border-danger" : "border-primary"} border-2`} ></input>
                                                  {show && errorMessage.pic ? <p className='text-danger'>{errorMessage.pic}</p> : ""}
                                             </div>

                                        </div>
                                        <div className="mb-3 col-md-6 ">
                                             <label>Caption*</label>
                                             <textarea onChange={getInputData} name='caption'className={`form-control  ${show && errorMessage.caption ? "border-danger" : "border-primary"} border-2`}  placeholder='write a caption' rows={5}/>
                                             {show && errorMessage.caption ? <p className='text-danger'>{errorMessage.caption}</p> : ""}

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
