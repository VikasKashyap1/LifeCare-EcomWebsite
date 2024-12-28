import React, { useState } from 'react'
import Breadcrum from './Partials/Breadcrum'
import { Link, useNavigate } from 'react-router-dom'
export default function Error404() {
     let navigate = useNavigate()
     // let [flag, setFlag] = useState(false)
     // let [fun, setFun] = useState(false)



     setTimeout(() => {
          if (window.location.pathname === '/admin' && window.location.pathname === '/profile') {
               if (localStorage.getItem('login') && localStorage.getItem('role') === 'Admin') {
                    navigate('/admin')
                    // setFlag(!flag)
               } else if (localStorage.getItem('login')) {
                    navigate('/profile')
                    // setFun(!fun)
               }
          }

     }, 500)

     return (
          <>
               <Breadcrum title="404!! Page Not Found" />

               {/* <!-- 404 Start --> */}
               <div className="container-fluid bg-light py-5">
                    <div className="container py-5 text-center">
                         <div className="row justify-content-center">
                              <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
                                   <i className="far fa-frown-open display-1 text-primary mb-4" style={{ width: "80px; height: 80px" }}></i>
                                   <h1 className="display-1">404</h1>
                                   <h1 className="mb-4">Page Not Found</h1>
                                   <p className="mb-4">We’re sorry, the page you have looked for does not exist in our website! Maybe go to our home page or try to use a search?</p>
                                   <Link className="btn btn-primary rounded-pill py-3 px-5" to="/">Go Back To Home</Link>
                              </div>
                         </div>
                    </div>
               </div>
               {/* <!-- 404 End --> */}
          </>
     )
}
