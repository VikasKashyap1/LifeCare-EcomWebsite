import React, { useEffect, useState } from 'react'
import Breadcrum from './Partials/Breadcrum'
import { Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteWishlist, getWishlist } from '../Redux/ActionCreators/WishlistActioncreators '
import { getChackout } from '../Redux/ActionCreators/ChackoutActioncreators'
import BuyerProfile from './Partials/BuyerProfile'

export default function Profile() {
  // let [user, setUser] = useState({})
  let [wishlist, setWishlist] = useState([])
  let [orders, setOrders] = useState([])

  let dispatch = useDispatch()
  let WishlistStaeData = useSelector((state) => state.WishlistStateData)

  let ChackoutStateData = useSelector((state) => state.ChackoutStateData)

  function deleteWishlistData(id) {
    if (window.confirm('I are sure you want to delete  this item from Wishlist ?')) {
      dispatch(deleteWishlist({ id: id }))
    }
  }
  useEffect(() => {
    (() => {
      dispatch(getWishlist())
      if (WishlistStaeData) {
        setWishlist(WishlistStaeData.filter((x) => x.user === localStorage.getItem('userid')))

      } else
        setWishlist([])

    })()
  }, [WishlistStaeData.length])

  useEffect(() => {
    (() => {
      dispatch(getChackout())
      if (ChackoutStateData.length) {
        setOrders(ChackoutStateData.filter((x) => x.user === localStorage.getItem("userid")))
        // console.log(ChackoutStateData);

      } else {
        setOrders([])
      }
    })()
  }, [ChackoutStateData.length])


  return (
    <>
      <Breadcrum title='Buyer Profile' />
      <div className="container my-3">

        <BuyerProfile title='' />


        <div className="container my-3">
          <h4 className='text-center text-light bg-primary '> Wishlist Section</h4>
          {wishlist.length ?
            (
              <div className="table-responsive">
                <table className="table table-bordered ">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name /Quantity</th>
                      <th>Brand</th>
                      <th>Color</th>
                      <th>Size</th>
                      <th>Price</th>
                      <th>Cart</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <thead>
                    {wishlist.map((item, index) => {

                      return (<tr key={index}>
                        <td>
                          <a href={item.pic} target="_blank" rel="noreferrer">
                            <img src={item.pic} height={40} width={82} className="rounded" alt="img" />
                          </a>
                        </td>
                        <td>
                          {item.name} (
                          {item.quantity ? (
                            <h className="text-success">
                              Only Item {item.quantity}
                            </h>
                          ) : (
                            <h className="text-danger">Not Available Item'</h>
                          )}
                          )
                        </td>
                        <td>{item.brand}</td>
                        <td>{item.color}</td>
                        <td>{item.size}</td>
                        <td>{item.price}</td>

                        <td>

                          <Link to={`/product/${item.product}`} className="btn btn-primary" ><i className="  fa fa-shopping-cart"></i> </Link>

                        </td>

                        <td>

                          <button className="btn btn-danger" onClick={() => deleteWishlistData(item.id)}><i className="  fa fa-trash"></i> </button>

                        </td>
                      </tr>
                      );
                    })}
                  </thead>
                </table>

              </div>)
            :
            (<div className=" text-center ">
              <h5>Not item in Wishlist</h5>
              <Link to="/shop" className="btn btn-primary">
                Add Now
              </Link>
            </div>
            )
          }
        </div>

        {/* CHACHOUT SECTION */}
        <h4 className='text-center text-light bg-primary p-2 my-3 '> Orders History Section</h4>

        <div className="container my-3">
          {
            orders.length ?
              orders.map((odr, ind) => {
                return <div className="row border-bottom border-primary" key={ind}>
                  <div className="col-md-4 table-responsive">
                    <table className='table table-bordered border-3 border-primary'>
                      <thead>
                        <tr>
                          <th>Order Id </th>
                          <td>{odr.id}</td>
                        </tr>
                        <tr>
                          <th>Order Status </th>
                          <td>{odr.orderStatus}</td>
                        </tr>
                        <tr>
                          <th>Payment Status </th>
                          <td>{odr.paymentStatus}</td>
                        </tr>
                        <tr>
                          <th>Payment Mode </th>
                          <td>{odr.paymentMode}</td>
                        </tr>
                        <tr>
                          <th>Subtotal</th>
                          <td>&#8377;{odr.subTotal}</td>
                        </tr>
                        <tr>
                          <th>Shipping </th>
                          <td>&#8377;{odr.shopping}</td>
                        </tr>
                        <tr>
                          <th>Total </th>
                          <td>&#8377;{odr.total}</td>
                        </tr>
                        <tr>
                          <th>Date </th>
                          {/* <td>{new Date(odr.date).toLocaleString()}</td> */}
                          <td>{new Date(odr.date).toLocaleString('ind-india', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: true
                          })}</td>
                        </tr>
                      </thead>

                    </table>

                  </div>
                  <div className="col-md-8">
                    <div className="table-responsive">
                      <table className="table table-bordered ">
                        <thead>
                          <tr>
                            <th></th>
                            <th>Name </th>
                            <th>Brand</th>
                            <th>Color</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th>item</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <thead>
                          {
                            odr.product.map((item, index) => {
                              // console.log(orders);
                              return <tr key={index}>
                                <td>
                                  <a href={item.pic} target="_blank" rel="noreferrer">
                                    <img src={item.pic} height={40} width={82} className="rounded" alt="img" />
                                  </a>
                                </td>
                                <td>{item.name.slice(0, 15)}...</td>
                                <td>{item.brand}</td>
                                <td>{item.color}</td>
                                <td>{item.size}</td>
                                <td>&#8377;{item.price}</td>

                                <td style={{ text: "center" }}>{item.qty}</td>

                                <td> &#8377; {item.total}</td>

                              </tr>

                            })}
                        </thead>
                      </table>

                    </div>


                  </div>

                </div>
              })
              // ELSE State
              : <div className=" text-center ">
                <h5>Not item in Chackout</h5>
                <Link to="/shop" className="btn btn-primary">
                  Add Now
                </Link>
              </div>
          }
        </div>

      </div>
    </>
  )
}
