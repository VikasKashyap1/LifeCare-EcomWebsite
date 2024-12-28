import React, { useState } from 'react'
import {  createContactUs } from '../Redux/ActionCreators/ContactUsActioncreators'

import FormVlidator from './FormVlidator/FormVlidator'
import Breadcrum from './Partials/Breadcrum'
import { useDispatch } from 'react-redux'


const Defaultconst = {
     name: "",
     email: "",
     phone: "",
     subjact: "",
     massage: "",
     active:'',
     date:''


}
export default function ContactUs() {
     let [show, setShow] = useState(false)
     let [massage, setMassage] = useState("")
     let [name, setName] = useState()

     let dispacth = useDispatch()

     let [errorMassage, setErrorMassage] = useState({
          name: "Name is Mandotry",
          email: "Email is Mandotry",
          phone: "Phone number is Mandotry",
          subjact: "Subjact is Mandotry",
          massage: "Massage is Mandotry",

     })
     let [data, setData] = useState(Defaultconst)


     function getInputData(e) {
          let { name, value } = e.target
          setErrorMassage((old) => {
               return {
                    ...old,
                    [name]: FormVlidator(e)
               }
          })
          setData((old) => {
               return {
                    ...old,
                    [name]: value,
               }
          })
     }



     function PostData(e) {
          e.preventDefault()
          let item = Object.values(errorMassage).find((x) => x !== '')
          if (item) {
               setShow(true)
          } else {
               const name = data.name
               setName(name)
               setMassage("Thanks to Share Quary With Us Our Team Will Contact You Soon       :")
               dispacth(createContactUs({ ...data, active: true, date: new Date() }))
               
               setData(Defaultconst)
          }
     }


     return (
          <>
               <Breadcrum title="Contact Us" />
               {/* <!-- Contact Start --> */}
               <div className="container-fluid contact bg-light py-5">
                    <div className="container py-5">
                         <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: "800px" }}>
                              <h4 className="text-primary">Contact Us</h4>
                              <h1 className="display-4 mb-4">If you have any quary please contact us</h1>
                         </div>
                         <div className="row g-5">
                              <div className="col-xl-6 wow fadeInRight" data-wow-delay="0.4s">
                                   <div>
                                        <h4 className="text-primary">Send Your Message</h4>
                                        {setMassage ? <p className='text-success'>{massage}        {name}</p> : ''}

                                        {/* <h6 className="text-primary">Send Your Message</h6> */}
                                        {/* <p className="mb-4">The contact form is currently inactive. Get a functional and working contact form with Ajax & PHP in a few minutes. Just copy and paste the files, add a little code and you're done. <a className="text-primary fw-bold" href="https://htmlcodex.com/contact-form">Download Now</a>.</p> */}
                                        <form onSubmit={PostData}>
                                             <div className="row g-3">
                                                  <div className="col-lg-12 ">
                                                       <div className="form-floating">
                                                            <input type="text" onChange={getInputData} className={`form-control border-2 ${show && errorMassage.name ? "border-danger" : "border-primary"}`} name='name' value={data.name} id="name" placeholder="Your Name" />
                                                            <label htmlFor="name">{show && errorMassage ? errorMassage.name : 'Your Name'} </label>
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-12 col-xl-6">
                                                       <div className="form-floating">
                                                            <input type="email" onChange={getInputData} className={`form-control border-2 ${show && errorMassage.email ? "border-danger" : "border-primary"}`} name='email' value={data.email} id="email" placeholder="Your Email" />
                                                            <label htmlFor="email">{show && errorMassage ? errorMassage.email : 'Your Email'} </label>
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-12 col-xl-6">
                                                       <div className="form-floating">
                                                            <input type="phone" onChange={getInputData} className={`form-control border-2 ${show && errorMassage.phone ? "border-danger" : "border-primary"}`} name='phone' value={data.phone} id="phone" placeholder="Phone" />
                                                            <label htmlFor="phone">{show && errorMassage ? errorMassage.phone : 'Your Phone'} </label>
                                                       </div>
                                                  </div>
                                                  <div className="col-12">
                                                       <div className="form-floating">
                                                            <input type="text" onChange={getInputData} className={`form-control border-2 ${show && errorMassage.subjact ? "border-danger" : "border-primary"}`} name='subjact' value={data.subjact} id="subject" placeholder="Subject" />
                                                            <label htmlFor="subject">{show && errorMassage ? errorMassage.subjact : 'Subject'} </label>
                                                       </div>
                                                  </div>
                                                  <div className="col-12">
                                                       <div className="form-floating">
                                                            <textarea onChange={getInputData} className={`form-control border-2 ${show && errorMassage.massage ? "border-danger" : "border-primary"}`} placeholder="Leave a message here" name='massage' value={data.massage} id="message" style={{ height: "120px" }}>
                                                            </textarea><label htmlFor="message">{show && errorMassage ? errorMassage.massage : 'Message'} </label>  </div>

                                                  </div>
                                                  <div className="col-12"><button className="btn btn-primary w-100 py-3">Send Message</button></div>
                                             </div>
                                        </form>
                                   </div>
                              </div>
                              <div className="col-xl-6 wow fadeInLeft" data-wow-delay="0.2s">
                                   <div className="contact-img d-flex justify-content-center" >
                                        <div className="contact-img-inner">
                                             <img src="img/contactus2.png" style={{ width: "60px" }} className="img-fluid h-100 w-100" alt="Image" />
                                        </div>
                                   </div>
                              </div>
                              <div className="col-12">
                                   <div>
                                        <div className="row g-4">
                                             <div className="col-md-6 col-lg-3 wow fadeInUp" data-wow-delay="0.2s">
                                                  <div className="contact-add-item">
                                                       <div className="contact-icon text-primary mb-4">
                                                            <i className="fas fa-map-marker-alt fa-2x"></i>
                                                       </div>
                                                       <div>
                                                            <h4>Address</h4>
                                                            <p className="mb-0">29 Pilkhani M,nager.Uttar Pardesh</p>
                                                       </div>
                                                  </div>
                                             </div>
                                             <div className="col-md-6 col-lg-3 wow fadeInUp" data-wow-delay="0.4s">
                                                  <div className="contact-add-item">
                                                       <div className="contact-icon text-primary mb-4">
                                                            <i className="fas fa-envelope fa-2x"></i>
                                                       </div>
                                                       <div>
                                                            <h4>Mail Us</h4>
                                                            <p className="mb-0" ><a href='mailto:vikas621196@gmail.com'>vikas621196@gmail.com</a></p>
                                                       </div>
                                                  </div>
                                             </div>
                                             <div className="col-md-6 col-lg-3 wow fadeInUp" data-wow-delay="0.6s">
                                                  <div className="contact-add-item">
                                                       <div className="contact-icon text-primary mb-4">
                                                            <i className="fa fa-phone-alt fa-2x"></i>
                                                       </div>
                                                       <div>
                                                            <h4>Telephone</h4>
                                                            <p className="mb-0"><a href='tel: 90450 80163'>(+91) 90450 80163</a> </p>
                                                       </div>
                                                  </div>
                                             </div>
                                             <div className="col-md-6 col-lg-3 wow fadeInUp" data-wow-delay="0.8s">
                                                  <div className="contact-add-item">
                                                       <div className="contact-icon text-primary mb-4">
                                                            <i className="fab fa-whatsapp fa-3x"></i>
                                                       </div>
                                                       <div>
                                                            <h4>Whatsapp</h4>
                                                            <p className="mb-0"><a href='http://wa.me/90450 80163'>(+91) 90450 80163</a></p>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                              {/* <div className="col-12 wow fadeInUp" data-wow-delay="0.2s">
                                   <div className="rounded">
                                        <iframe className="rounded w-100"
                                             // style={{ height: "400px" }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.33750346623!2d-73.97968099999999!3d40.6974881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1694259649153!5m2!1sen!2sbd"
                                             loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                   </div>
                              </div> */}
                              <div className="col-12 wow fadeInUp" data-wow-delay="0.2s">
                                   <div className="rounded">
                                        <iframe className="rounded w-100"
                                             style={{ height: "400px", width: "100%" }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3469.228768841601!2d77.50829011115694!3d29.5970352750484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e9fc75293c02f%3A0xd30390755a86b192!2z4KS24KS_4KS1IOCkruCkguCkpuCkv-CksCDgpKrgpL_gpLLgpJbgpKjgpYA!5e0!3m2!1shi!2sin!4v1721276132536!5m2!1shi!2sin"
                                             loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
               {/* <!-- Contact End --> */}
          </>
     )
}
