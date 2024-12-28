import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductContainer({ title, data, }) {
     return (
          <>
               {/* <!-- Service Start --> */}
               <div className="container-fluid service py-5">
                    <div className="container ">
                         {title ?
                              <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: "800px" }}>
                                   <h2 className="">{title}</h2>
                                   <h1 className="display-4 mb-4">We Provide Best Services</h1>
                                   <p className="mb-0">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur adipisci facilis cupiditate recusandae aperiam temporibus corporis itaque quis facere, numquam, ad culpa deserunt sint dolorem autem obcaecati, ipsam mollitia hic.
                                   </p>
                              </div> : ""}
                         <div className="row g-4 justify-content-center">
                              {
                                   data?.map((item, index) => {


                                        return <div key={index} className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.8s">
                                             <div className="service-item">
                                                  <div className="service-img">
                                                       <img src={item.pic[0]} style={{ height: 220, width: 250 }} className="img-fluid rounded-top w-100" alt="" />
                                                       <div className="service-icon p-3">
                                                            <i className="">{item.brand}</i>
                                                       </div>
                                                  </div>
                                                  <div className="service-content p-3 mt-1">
                                                       <div className="service-content-inner">
                                                            <Link to={`/product/${item.id}`} className="d-inline-block h4 mb-2" style={{ height: 30 }}>{item.name}</Link>
                                                            {
                                                                 item.quantity > 0 ? <p className="mb-1 mt-1 p-1">{item.stock ? <a className='text-success' >Available</a> : <a className='text-danger'> Not Available</a>}{item.stock ? ` ${item.quantity} Left in stock` : ''}</p>
                                                                 : <a className='text-danger'> Not Available</a>
                                                            }
                                                            {/* <p className="mb-1 mt-1 p-1">{item.stock ? <a className='text-success' >Available</a> : <a className='text-danger'> Not Available</a>}{item.stock ? ` ${item.quantity} Left in stock` : ''}</p> */}

                                                            <p className="mb-4 p-1"><del className='text-danger'>&#8377;{item.basePrice}</del> &#8377;{item.finalPrice}  <sup className='text-succces'> {item.discount}% off</sup></p>
                                                            <Link className="btn btn-primary rounded-pill py-2 px-4" to={`/product/${item.id}`}>Add to Cart</Link>
                                                       </div>
                                                  </div>
                                             </div>

                                        </div>
                                   })
                              }

                              {
                                   title ?
                                        <div className="col-12 text-center wow fadeInUp" data-wow-delay="0.2s">
                                             <Link className="btn btn-primary rounded-pill py-3 px-5" to="/shop">More Products</Link>
                                        </div> : ''
                              }
                         </div>
                    </div>
               </div >
               {/* <!-- Service End --> */}

          </>
     )
}
