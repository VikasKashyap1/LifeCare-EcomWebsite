import React, { useState, useEffect } from 'react'
import { getBrand } from '../../Redux/ActionCreators/BrandActioncreators'
import { useDispatch, useSelector } from 'react-redux'

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link } from 'react-router-dom';

export default function BrandSlider() {
     let [brand, setBrand] = useState([])

     let dispatch = useDispatch([])

     let BrandStateData = useSelector((state) => state.BrandStateData)
     const style = {
          responsive: {
               0: {
                    items: 2.8
               },
               576: {
                    items: 4.8
               },
               768: {
                    items: 6.8
               },
               992: {
                    items: 8.8
               },
               1200: {
                    items: 10.8
               },
               1400: {
                    items: 13
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
          (
               () => {
                    dispatch(getBrand())
                    if (BrandStateData.length)
                         setBrand(BrandStateData)

               })()
     }, [BrandStateData.lngth])
     return (
          <div className="div  ">
               <div className="container mb-3 ">
                    <h4 className='bg-primary text-light text-center mb-3'>Top Brands </h4>
                    <OwlCarousel className='owl-theme '{...style} >
                         {
                              brand.map((item, index) => {
                                   return <div key={index} className="card  p-1 mx-2 ">
                                        <Link to={`/shop? /mc=All&br=${item.name}`}>
                                             <img src={item.pic} height={100} width={50} alt='brand logo' />

                                        </Link>
                                   </div>
                              })
                         }
                    </OwlCarousel>


               </div>

          </div>
     )
}
