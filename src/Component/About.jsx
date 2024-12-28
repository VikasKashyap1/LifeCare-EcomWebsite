import React from 'react'
import Breadcrum from './Partials/Breadcrum'
import AboutContaint from './Partials/AboutContaint'
import Feature from './Partials/Feature'
import Faqs from './Partials/Faqs'
import Shop from './Shop'
import Contact from './Partials/Contact'
export default function About() {
  return (
    <div>
     <Breadcrum title=" About Us"/>
     <AboutContaint/>
     <Feature/>
     <Faqs/>
      <Shop/> 
     <Contact/> 
    </div>
  )
}
