import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Partials/Navbar'
import Footer from './Partials/Footer'
import Home from './Home'
import About from './About'
import Shop from './Shop'
import Error404 from './Error404'
import ContactUs from './ContactUs'
import AdminHome from './Admin/AdminHome/AdminHome'

import Product from './Product'
import Signup from './Signup'
import Login from './Login'

//User Route >
import BuyerProfile from './Partials/BuyerProfile'
import UpdateProfile from './UpdateProfile'
import Profile from './Profile'
import Cart from './Cart'
import Chackout from './Chackout'



// Maincateory
import AdminMaincategory from './Admin/AdminMaincategory/AdminMaincategory'
import AdminCreateMaincategory from './Admin/AdminMaincategory/AdminCreateMaincategory '
import AdminUpdateMaincategory from './Admin/AdminMaincategory/AdminUpdateMaincategory '

// Subcateory
import AdminSubcategory from './Admin/AdminSubcategory/AdminSubcategory'
import AdminCreateSubcategory from './Admin/AdminSubcategory/AdminCreateSubcategory '
import AdminUpdateSubcategory from './Admin/AdminSubcategory/AdminUpdateSubcategory '

// Brand
import AdminBrand from './Admin/AdminBrand/AdminBrand'
import AdminCreateBrand from './Admin/AdminBrand/AdminCreateBrand'
import AdminUpdateBrand from './Admin/AdminBrand/AdminUpdateBrand'


// Testimonial
import AdminTestimonial from './Admin/AdminTestimonial/AdminTestimonial'
import AdminCreateTestimonial from './Admin/AdminTestimonial/AdminCreateTestimonial'
import AdminUpdateTestimonial from './Admin/AdminTestimonial/AdminUpdateTestimonial'

// Product
import AdminProduct from './Admin/AdminProduct/AdminProduct'
import AdminCreateProduct from './Admin/AdminProduct/AdminCreateProduct'
import AdminUpdateProduct from './Admin/AdminProduct/AdminUpdateProduct'
import Cornfimation from './Cornfimation'
import AdminNewsletter from './Admin/AdminNewsletter/AdminNewsletter'
import AdminUser from './Admin/AdminUser/AdminUser'
import AdminContactUs from './Admin/AdminContactUs/AdminContactUs'
import AdminContactUsShow from './Admin/AdminContactUs/AdminContactUsShow'
import AdminFeedback from './Admin/AdminFeedback/AdminFeedback'
import AdminChackout from './Admin/AdminChackout/AdminChackout'
import AdminChackoutShow from './Admin/AdminChackout/AdminChackoutShow'

export default function App() {
     return (
          <>
               <BrowserRouter>
                    <Navbar />
                    <Routes>
                         {/* public route */}
                         <Route path='' element={<Home />} />
                         <Route path='/about' element={<About />} />
                         <Route path='/shop' element={<Shop />} />
                         <Route path='/product/:id' element={<Product />} />
                         <Route path='/contactus' element={<ContactUs />} />
                         <Route path='/signup' element={<Signup />} />
                         <Route path='/login' element={<Login />} />

                         {
                              localStorage.getItem('login') && localStorage.getItem('role') === 'Buyer' ?
                                   <>
                                        <Route path='/update-profile' element={<UpdateProfile />} />
                                        <Route path='/profile' element={<Profile />} />
                                        <Route path='/cart' element={<Cart />} />
                                        <Route path='/chackout' element={<Chackout />} />
                                        <Route path='/buyerProfile' element={<BuyerProfile />} />
                                        <Route path='/cornfirmation' element={<Cornfimation />} />

                                   </> : ""
                         }


                         {/* Admin route */}
                         {
                              localStorage.getItem('role') === 'Admin' ?

                                   <>

                                        <Route path='/admin' element={<AdminHome />} />

                                        <Route path='/admin/maincategory' element={<AdminMaincategory />} />
                                        <Route path='/admin/maincategory/create' element={<AdminCreateMaincategory />} />
                                        <Route path='/admin/maincategory/update/:id' element={<AdminUpdateMaincategory />} />


                                        <Route path='/admin/subcategory' element={<AdminSubcategory />} />
                                        <Route path='/admin/subcategory/create' element={<AdminCreateSubcategory />} />
                                        <Route path='/admin/subcategory/update/:id' element={<AdminUpdateSubcategory />} />


                                        <Route path='/admin/brand' element={<AdminBrand />} />
                                        <Route path='/admin/brand/create' element={<AdminCreateBrand />} />
                                        <Route path='/admin/brand/update/:id' element={<AdminUpdateBrand />} />


                                        <Route path='/admin/testimonial' element={<AdminTestimonial />} />
                                        <Route path='/admin/testimonial/create' element={<AdminCreateTestimonial />} />
                                        <Route path='/admin/testimonial/update/:id' element={<AdminUpdateTestimonial />} />

                                        <Route path='/admin/product' element={<AdminProduct />} />
                                        <Route path='/admin/product/create' element={<AdminCreateProduct />} />
                                        <Route path='/admin/product/update/:id' element={<AdminUpdateProduct />} />


                                        <Route path='/admin/newsletter' element={<AdminNewsletter />} />
                                        <Route path='/admin/user' element={<AdminUser />} />
                                        <Route path='/admin/contactus' element={<AdminContactUs />} />
                                        <Route path='/admin/contactus/show/:id' element={<AdminContactUsShow />} />

                                        <Route path='/admin/chackouts' element={<AdminChackout />} />
                                        <Route path='/admin/chackouts/show/:id' element={<AdminChackoutShow />} />

                                        <Route path='/admin/feedback' element={<AdminFeedback />} />
                                   </> : ""
                         }


                         <Route path='/*' element={<Error404 />} />
                    </Routes>
                    <Footer />
               </BrowserRouter>
          </>
     )
}
