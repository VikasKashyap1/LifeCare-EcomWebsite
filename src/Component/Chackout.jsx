import React from 'react'
import BuyerProfile from './Partials/BuyerProfile'
import Breadcrum from './Partials/Breadcrum'
import CartSection from './Partials/CartSection'

export default function Chackout() {
     return (
          <>
               <Breadcrum title='Chackout' />
               <div className="container my-3">
                    <div className="row">
                         <div className="col-md-5">
                              <BuyerProfile title='Chackout' />

                         </div>
                    <div className="col-md-7">
                         <CartSection title='Chackout' />
                    </div>
                    </div>
               </div>
          </>
     )
}
