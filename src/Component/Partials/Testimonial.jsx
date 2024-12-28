import React, { useEffect, useState } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useDispatch, useSelector } from 'react-redux';
import { getTestimonial } from '../../Redux/ActionCreators/TestimonialActioncreators';


export default function Testimonial() {
    let [testimonial, setTestimonial] = useState([])
    let dispatch = useDispatch()

    let TestimonialStateData = useSelector((state) => state.TestimonialStateData)
    const style = {
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
        },

        height: "10px",
        navClass: ['owl-prev', 'owl-next'],
        loop: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 6000,
        nav: true,
        navText: ['<button class="btn btn-primary" style="width:60px; height:30px; border-radius:25px"><i class="fa fa-arrow-left"></i></buttin>', '<button class="btn btn-primary" style="width:60px; height:30px; border-radius:25px"><i class="fa fa-arrow-right"></i></buttin>']

    }
    useEffect(() => {
        (() => {
            dispatch(getTestimonial())
            if (TestimonialStateData)
                setTestimonial(TestimonialStateData)
        })()
    }, [TestimonialStateData.length])
    return (
        <>
            {/* <!-- Testimonial Start --> */}
            <div className="container-fluid testimonial pb-5">
                <div className="container pb-5">
                    <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: "800px" }}>
                        <h4 className="text-primary">Testimonial</h4>
                        <h1 className="display-4 mb-4">What Our Customers Are Saying</h1>
                        <p className="mb-0">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur adipisci facilis cupiditate recusandae aperiam temporibus corporis itaque quis facere, numquam, ad culpa deserunt sint dolorem autem obcaecati, ipsam mollitia hic.
                        </p>
                    </div>

                    <div className=" testimonial-carousel wow fadeInUp" data-wow-delay="0.2s">
                        <OwlCarousel className='owl-theme'{...style} >
                            {
                                testimonial.map((item, index) => {

                                    return <div key={index} className="testimonial-item bg-light rounded mx-2">
                                        <div className="row g-0 ">
                                            <div className="col-4  col-lg-4 col-xl-3">
                                                <div className="h-100">
                                                    <img src={item.pic} className="img-fluid h-100 rounded p-1" style={{ objectFit: "cover" }} alt="" />
                                                </div>
                                            </div>
                                            <div className="col-8 col-lg-8 col-xl-9">
                                                <div className="d-flex flex-column my-auto text-start p-4">
                                                    <h4 className="text-dark mb-0 text-capitalize">{item.name}</h4>
                                                    <p className="mb-3">Profession</p>
                                                    <div className="d-flex text-primary mb-3">
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                    </div>
                                                    <p className="mb-0" >{`${item.caption?.slice(0, 171) + '...'}:''`}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }

                        </OwlCarousel>
                    </div>
                </div>
            </div >
            {/* <!-- Testimonial End --> */}

        </>
    )
}
