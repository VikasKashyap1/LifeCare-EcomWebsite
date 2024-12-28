import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
     return (
          <>
               <div className="list-group">
                    <Link to="/admin" className="list-group-item list-group-item-action  mb-1 active " aria-current="true"><i className='fa fa-home  '></i><span className='ms-4  '>Home</span></Link>
                    <Link to="/admin/maincategory" className="list-group-item list-group-item-action  mb-1 active " aria-current="true"><i className='fa fa-list  '></i><span className='ms-4 '>Maincategory</span></Link>
                    <Link to="/admin/subcategory" className="list-group-item list-group-item-action  mb-1 active " aria-current="true"><i className='fa fa-list '></i><span className='ms-4 '>Subcategory</span></Link>
                    <Link to="/admin/brand" className="list-group-item list-group-item-action  mb-1 active " aria-current="true"><i className='fa fa-list '></i><span className='ms-4 '>Brand</span></Link>
                    <Link to="/admin/product" className="list-group-item list-group-item-action  mb-1 active " aria-current="true"><i className=' fa fa-list '></i><span className='ms-4 '>Product</span></Link>
                    <Link to="/admin/testimonial" className="list-group-item list-group-item-action  mb-1 active " aria-current="true"><i className='fa fa-star '></i><span className='ms-4 '>Testimonial</span></Link>
                    <Link to="/admin/user" className="list-group-item list-group-item-action  mb-1 active " aria-current="true"><i className='fa fa-users '></i><span className='ms-4 '>User</span></Link>
                    <Link to="/admin/newsletter" className="list-group-item list-group-item-action  mb-1 active " aria-current="true"><i className='fa fa-envelope '></i><span className='ms-4 '>Newsletter</span></Link>
                    <Link to="/admin/contactus" className="list-group-item list-group-item-action  mb-1 active " aria-current="true"><i className='fa fa-phone '></i><span className='ms-4 '>Contactus</span></Link>
                    <Link to="/admin/chackouts" className="list-group-item list-group-item-action  mb-1 active " aria-current="true"><i className='fa fa-shopping-bag '></i><span className='ms-4 '>Checkouts</span></Link>
                    <Link to="/admin/feedback" className="list-group-item list-group-item-action  mb-1 active " aria-current="true"><i className="fa fa-comment"></i><span className='ms-4 '>Feedback</span></Link>

               </div>
          </>
     )
}
