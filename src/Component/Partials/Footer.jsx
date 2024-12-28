import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getNewsletter, createNewsletter } from '../../Redux/ActionCreators/NewsletterActioncreators '
import { useDispatch, useSelector } from 'react-redux'

export default function Footer() {
    let [email, setEmail] = useState("")
    let [massage, setMassage] = useState("")
    let dispatch = useDispatch()
    let NewsletterStateData = useSelector((state) => state.NewsletterStateData)




    function GetEmail(e) {
        e.preventDefault()
        let item = NewsletterStateData.find((x) => x.email === email)
        if (item) {
            setMassage('This Email is Already exists !')
        } else {
            dispatch(createNewsletter({ email: email, active: true }))
            const userName = email.split('@')[0]

            const maill = userName.slice(0, 10)
            setEmail("")
            // setMassage("Thank you for subscribing to Newsletter Service us: " + localStorage.getItem("name"))
            setMassage("Thank you for subscribing to Newsletter Service us: " + maill + "...")
        }


    }


    useEffect(() => {
        (() => {
            dispatch(getNewsletter())
        })()

    }, [NewsletterStateData.length])
    return (
        <>

            {/* <!-- Footer Start --> */}
            <div className="container-fluid footer py-5 wow fadeIn" data-wow-delay="0.2s">
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-xl-8">
                            <div className="mb-5">
                                <div className="row g-4">
                                    <div className="col-md-6 col-lg-6 col-xl-5">
                                        <div className="footer-item">
                                            <Link to="index.html" className="p-0">
                                                <h3 className="text-white"><i className="fab fa-shopping-bag  text-white me-3"></i> LifeCare</h3>
                                                {/* <!-- <img src="img/logo.png" alt="Logo"> --> */}
                                            </Link>
                                            <p className="text-white mb-4">Dolor amet sit justo amet elitr clita ipsum elitr est.Lorem ipsum dolor sit amet, consectetur adipiscing...</p>
                                            <div className="footer-btn d-flex">
                                                <Link className="btn btn-md-square rounded-circle me-3" to="#" target='_blank' rel='noreferrer'><i className="fab fa-facebook-f"></i></Link>
                                                <Link className="btn btn-md-square rounded-circle me-3" to="#" target='_blank' rel='noreferrer'><i className="fab fa-twitter"></i></Link>
                                                <Link className="btn btn-md-square rounded-circle me-3" to="#" target='_blank' rel='noreferrer'><i className="fab fa-instagram"></i></Link>
                                                <Link className="btn btn-md-square rounded-circle me-3" to="#" target='_blank' rel='noreferrer'><i className="fab fa-linkedin-in"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-xl-3">
                                        <div className="footer-item text-white">
                                            <h4 className="text-white mb-4">Useful Links</h4>
                                            <Link to="" target='_blank' rel='noreferrer'><i className="fas fa-angle-right me-2"></i>Home</Link>
                                            <Link to="/about" target='_blank' rel='noreferrer'><i className="fas fa-angle-right me-2"></i> About</Link>
                                            <Link to="/Shope" target='_blank' rel='noreferrer'><i className="fas fa-angle-right me-2"></i> Shope</Link>
                                            <Link to="/Contact" target='_blank' rel='noreferrer'><i className="fas fa-angle-right me-2"></i> Contact</Link>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-xl-3">
                                        <div className="footer-item text-white">
                                            <h4 className="text-white mb-4">Quick Links</h4>
                                            <Link to="#" target='_blank' rel='noreferrer'><i className="fas fa-angle-right  me-2"></i>Privarcy Policy</Link>
                                            <Link to="#" target='_blank' rel='noreferrer'><i className="fas fa-angle-right me-2"></i> Terma Policy</Link>
                                            <Link to="#" target='_blank' rel='noreferrer'><i className="fas fa-angle-right me-2"></i> Refund Policy</Link>
                                            <Link to="#" target='_blank' rel='noreferrer'><i className="fas fa-angle-right me-2"></i> Return Policy</Link>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="pt-5" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
                                <div className="row g-0">
                                    <div className="col-12">
                                        <div className="row g-4">
                                            <div className="col-lg-6 col-xl-4">
                                                <div className="d-flex">
                                                    <div className="btn-xl-square bg-primary text-white rounded p-3 me-2">
                                                        <i className="fas fa-map-marker-alt fa-2x"></i>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-white">Address</h4>
                                                        <Link className="mb-0"><span className='text-white'>29 Street Pilakhni.Muzaffarnager</span></Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-xl-4">
                                                <div className="d-flex">
                                                    <div className="btn-xl-square bg-primary text-white rounded p-3 me-2">
                                                        <i className="fas fa-envelope fa-2x"></i>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-white">Mail Us</h4>
                                                        <Link ><span className='text-white'>vikas621196@gmail.com</span></Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-xl-4">
                                                <div className="d-flex">
                                                    <div className="btn-xl-square bg-primary text-white rounded p-3 me-2">
                                                        <i className="fa fa-phone-alt fa-2x"></i>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-white">WhatApp</h4>
                                                        {/* <Link to='tell:+91 9045080163' target='_blank'rel='noreferrer' className="mb-0">Tell:(+91) 90450 80163</Link> */}
                                                        <Link to="tel:+91 90450 80163 " target='_blank' rel='noreferrer'><span className="text-white"> +91 90450 80163 </span></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="footer-item">
                                <h4 className="text-white mb-3">Newsletter</h4>
                                <p className="text-white mb-4">Dolor amet sit justo amet elitr clita ipsum elitr est.Lorem ipsum dolor sit amet.</p>
                                <p className="text-white mb-1 text-danger">{massage}</p>
                                <div className="position-relative rounded-pill mt-4">

                                    <input className="form-control rounded-pill w-100 py-3 ps-4 pe-5" onChange={(e) => setEmail(e.target.value)} type="email" name='email' value={email} placeholder="Enter your email" />

                                    <button type="button" onClick={GetEmail} className="btn btn-primary rounded-pill position-absolute top-0 end-0 py-2 mt-2 me-2">Subscribe</button>
                                </div>
                                <hr />
                                <div className="d-flex flex-shrink-0" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
                                    <div className="footer-btn">
                                        <Link to="tel:+91 90450 80153" target='_blank' rel='noreferrer' className="mt-5 btn btn-lg-square rounded-circle position-relative wow tada" data-wow-delay=".9s">
                                            <i className="fa fa-phone-alt fa-2x"></i>
                                            <div className="position-absolute" style={{ top: "2px", right: "12px" }}>
                                                <span><i className="fa fa-comment-dots text-secondary"></i></span>
                                            </div>

                                        </Link>
                                    </div>

                                    <div className="mt-5 d-flex flex-column ms-3 flex-shrink-0">
                                        <span className="text-white">Call to Our Experts</span>
                                        <Link to="tel:+91 90450 80153" target='_blank' rel='noreferrer'><span className="text-white">Free: +91 90450 80163 </span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Footer End --> */}
        </>
    )
}
