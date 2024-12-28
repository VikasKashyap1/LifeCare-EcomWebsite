import React, { useEffect, useState } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import Testimonial from './Partials/Testimonial'
import Faqs from './Partials/Faqs'
import ProductContainer from './Partials/ProductContainer'
import Contact from './Partials/Contact'
import AboutContaint from './Partials/AboutContaint'
import Feature from './Partials/Feature'
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { getProduct } from '../Redux/ActionCreators/ProductActioncreators'
import { getMaincategory } from '../Redux/ActionCreators/MaincategoryActioncreators'
import BrandSlider from './Partials/BrandSlider';
export default function Home() {
  let [products, setProducts] = useState([])
  let [maincategory, setMaincategory] = useState([])
  let style = {
    items: 1,
    height: "10px",
    navClass: ['owl-prev', 'owl-next'],
    loop: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    // fluidSpeed: 5000,

  }
  let dispatch = useDispatch()
  let ProductStateData = useSelector(state => state.ProductStateData)
  let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
  useEffect(() => {
    (
      () => {
        dispatch(getProduct())
        if (ProductStateData.length)
          setProducts(ProductStateData)


      })()

  }, [ProductStateData.length])


  useEffect(() => {
    (() => {
      dispatch(getMaincategory())
      if (MaincategoryStateData.length)
        setMaincategory(MaincategoryStateData)

    })()
  }, [MaincategoryStateData.length])

  return (
    <>
      {/* <!-- Carousel Start --> */}
      <div className="header-carousel">
        <OwlCarousel className='owl-theme'{...style} >

          {/* carousel 1 */}
          <div className="header-carousel-item bg-primary">
            <div className="carousel-caption">
              <div className="container">
                <div className="row g-4 align-items-center">
                  <div className="col-lg-7 animated fadeInLeft">
                    <div className="text-sm-center text-md-start">
                      <h4 className="text-white text-uppercase fw-bold mb-4">Welcome To Ecom</h4>
                      <h1 className="display-1 text-white mb-4">latest and Top Brand Products </h1>
                      <p className="mb-5 fs-5">Lorem Ipsum is mens simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy...
                      </p>
                      <div className="d-flex justify-content-center justify-content-md-start flex-shrink-0 mb-4">
                        {/* <a className="btn btn-light rounded-pill py-3 px-4 px-md-5 me-2" href="#"><i className="fas fa-play-circle me-2"></i> Watch Video</a> */}
                        <Link to='/shop?mc=Male'className="btn btn-dark rounded-pill py-3 px-4 px-md-5 ms-2" >Shop Now</Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5 animated fadeInRight mb-4">
                    <div className="calrousel-img" style={{ objectFit: "cover", marginBottom: "200px" }}>
                      <img src="img/carousel-1.png" className="img-fluid mx-5" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* carousel 2 */}

          <div className="header-carousel-item bg-primary">
            <div className="carousel-caption">
              <div className="container">
                <div className="row g-4 align-items-center">
                  <div className="col-lg-7 animated fadeInLeft">
                    <div className="text-sm-center text-md-start">
                      <h4 className="text-white text-uppercase fw-bold mb-4">Welcome To Ecom</h4>
                      <h1 className="display-1 text-white mb-4">latest and Top Brand Products </h1>
                      <p className="mb-5 fs-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy...
                      </p>
                      <div className="d-flex justify-content-center justify-content-md-start flex-shrink-0 mb-4">
                        {/* <a className="btn btn-light rounded-pill py-3 px-4 px-md-5 me-2" href="#"><i className="fas fa-play-circle me-2"></i> Watch Video</a> */}
                        <Link to='/shop?mc=Female' className="btn btn-dark rounded-pill py-3 px-4 px-md-5 ms-2" >Shop Now</Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5 animated fadeInRight mb-4">
                    <div className="calrousel-img" style={{ objectFit: "cover", marginBottom: "200px" }}>
                      <img src="img/carousel-2.png" className="img-fluid mx-5" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* carousel 3 */}
          <div className="header-carousel-item bg-primary">
            <div className="carousel-caption">
              <div className="container">
                <div className="row gy-4 gy-lg-0 gx-0 gx-lg-5 align-items-center">
                  <div className="col-lg-5 animated fadeInLeft">
                    <div className="calrousel-img w-100" style={{ marginBottom: '20px' }}>
                      <img src="img/carousel-3.png" className="img-fluid" alt="" />
                    </div>
                  </div>
                  <div className="col-lg-7 animated fadeInRight">
                    <div className="text-sm-center text-md-end">
                      <h4 className="text-white text-uppercase fw-bold mb-4">Welcome To ecom</h4>
                      <h1 className="display-1 text-white mb-4">Best and Branded Products for Kids</h1>
                      <p className="mb-5 fs-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy...
                      </p>
                      <div className="d-flex justify-content-center justify-content-md-end flex-shrink-0 mb-4">
                        <Link to='/shop?mc=Kids' className="btn btn-dark rounded-pill py-3 px-4 px-md-5 ms-2" >Shop Now</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </OwlCarousel >
      </div>
      {/* <!-- Carousel End --> */}
      <ProductContainer title='Letast Products' data={products.slice(0, 12)} />
      <BrandSlider/>

      <Feature />

      <AboutContaint />

      {
        maincategory.map((item, index) => {
          if (item.active)
            return <ProductContainer key={index} title={item.name} data={products.filter((x) => x.maincategory === item.name).slice(0, 12)} />

        })
      }
      
      <Faqs />
      
      <Testimonial />
      {/* <Contact /> */}

    </>
  )
}
