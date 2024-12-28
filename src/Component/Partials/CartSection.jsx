import React, { useEffect, useState } from "react";

import { getCart, deleteCart, updateCart, } from "../../Redux/ActionCreators/CartActioncreators";
import { getProduct, updateProduct, } from "../../Redux/ActionCreators/ProductActioncreators";
import { createChackout, } from "../../Redux/ActionCreators/ChackoutActioncreators";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

export default function CartSection(props) {
     let [cart, setCart] = useState([]);
     let dispatch = useDispatch();
     // let [fast, setFast] = useState(false);
     let [subtotal, setSubtotal] = useState(0);
     let [shopping, setShopping] = useState(0);
     let [total, setTotal] = useState(0);
     let [mode, setMode] = useState('COD')
     let navigate = useNavigate()

     let CartStateData = useSelector((state) => state.CartStateData);
     let ProductStateData = useSelector((state) => state.ProductStateData);



     function PlaceOder() {
          let item = {
               user: localStorage.getItem('userid'),
               orderStatus: "Order is placed",
               paymentStatus: "Panding",
               paymentMode: mode,
               subTotal: subtotal,
               shopping: shopping,
               total: total,
               date: new Date(),
               product: cart,
          }
          dispatch(createChackout({ ...item }))
          console.log(item);


          for (let item of cart) {
               let product = ProductStateData.find((x => x.id === item.product))

               product.quantity = product.quantity - item.qty
               product.stock = product.quantity === 0 ? false : true
               dispatch(updateProduct({ ...product }))
               dispatch(deleteCart({ id: item.id }))
          }
          navigate('/cornfirmation')

     }

     function deleteItem(id) {
          if (window.confirm("Are you sure you want to delete this item")) {
               dispatch(deleteCart({ id: id }));
               FromApiData();
          }
     }


     function UpdateQuantity(id, option) {
          let item = cart.find((x) => x.id === id);
          let index = cart.findIndex((x) => x.id === id);
          if (item) {
               if (option === "Dec" && item.qty === 1)
                    return;
               else if (option === "Dec") {
                    item.qty = item.qty - 1;
                    item.total = item.total - item.price;
               } else {
                    if (item.qty < item.quantity) {
                         item.qty = item.qty + 1;
                         item.total = item.total + item.price;
                    } else {
                         if (item.quantity === 0) {
                              return;
                         }
                    }
               }
               dispatch(updateCart({ ...item }));
               cart[index].qty = item.qty;
               cart[index].total = item.total;
               // setFast(!fast);
               Calculate(cart)
          }
     }
     function Calculate(data) {
          let sum = 0
          for (let item of data) {
               sum += item.total
          }
          setSubtotal(sum)
          setShopping(sum > 0 && sum < 1000 ? 150 : 0)
          setTotal(sum > 0 && sum < 1000 ? sum + 150 : sum)
     }

     // for getCart
     function FromApiData() {
          dispatch(getCart());
          if (CartStateData.length) {
               let data = CartStateData.filter((x) => x.user === localStorage.getItem("userid"));
               setCart(data);
               Calculate(data)
          } else setCart([]);
     }

     useEffect(() => {
          if (CartStateData.length) {
               const userCarts = CartStateData.filter((x) => x.user === localStorage.getItem("userid"))
               setCart(userCarts)
          }
     }, [CartStateData.length])

     useEffect(() => {
          FromApiData()
     }, [CartStateData])

     useEffect(() => {
          (() => {
               dispatch(getProduct())
          })()
     }, [ProductStateData.length])

     return (
          <>
               {/* <Breadcrum title="Cart Section" /> */}
               <div className="container-fluid my-3">
                    {cart.length ? (
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
                                             <th></th>

                                             <th>Qty</th>
                                             <th></th>
                                             <th>Total</th>
                                             {props.title === "Cart" ? <th></th> : ""}


                                        </tr>
                                   </thead>
                                   <thead>
                                        {cart.map((item, index) => {
                                             return (
                                                  <tr key={index}>
                                                       <td>
                                                            <a href={item.pic} target="_blank" rel="noreferrer">
                                                                 <img
                                                                      src={item.pic}
                                                                      height={40}
                                                                      width={82}
                                                                      className="rounded"
                                                                      alt="img"
                                                                 />
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
                                                       <td>&#8377;{item.price}</td>
                                                       <td>

                                                            {props.title === 'Cart' ? <button className="btn btn-primary" onClick={() => UpdateQuantity(item.id, "Inc")}><i className="  fa fa-plus"></i> </button> : ''}

                                                       </td>
                                                       <td>{item.qty}</td>
                                                       <td>

                                                            {props.title === 'Cart' ? <button className="btn btn-primary" onClick={() => UpdateQuantity(item.id, "Dec")}><i className="  fa fa-minus"></i> </button> : ''}

                                                       </td>
                                                       <td>{item.total}</td>
                                                       <td>

                                                            {props.title === 'Cart' ? <button className="btn btn-danger" onClick={() => deleteItem(item.id)}><i className="  fa fa-trash"></i> </button> : ''}

                                                       </td>
                                                  </tr>
                                             );
                                        })}
                                   </thead>
                              </table>
                              <div className="row">
                                   <div className="col-md-6"></div>

                                   <div className={`${props.title === "Cart" ? "col-md-6" : "col-12"}`}>
                                        <table className="table table-bordered table-responsive">
                                             <thead>
                                                  <tr>
                                                       <th>SubTotal</th>
                                                       <td>{subtotal}</td>
                                                  </tr>
                                                  <tr>
                                                       <th>Shopping</th>
                                                       <td>{shopping}</td>
                                                  </tr>
                                                  <tr>
                                                       <th>Total</th>
                                                       <td>{total}</td>
                                                  </tr>

                                                  {
                                                       props.title === "Chackout" ?
                                                            <tr>
                                                                 <th>Payment Mode</th>
                                                                 <td>
                                                                      <select name='mode' onClick={(e) => setMode(e.target.value)} className='form-control border-2 border-primary'>
                                                                           <option value="COD">Cash on Delevry</option>
                                                                           <option value="Net Banking">Net Banking/Card/UPI</option>
                                                                      </select>
                                                                 </td>
                                                            </tr>

                                                            : ""
                                                  }
                                                  <tr>
                                                       {props.title === "Cart" ?
                                                            <td colSpan={2}><Link to="/chackout" className="btn btn-primary w-100">proceed to chackout</Link></td>
                                                            : <td colSpan={2}><Link to="#" onClick={PlaceOder} className="btn btn-primary w-100">Place order</Link></td>

                                                       }
                                                  </tr>

                                             </thead>
                                        </table>
                                   </div>
                              </div>

                         </div>)


                         :

                         (<div className=" text-center ">
                              <h5>Not item in Cart</h5>
                              <Link to="/shop" className="btn btn-primary">
                                   Shop Now
                              </Link>
                         </div>)}


               </div>
          </>
     );
}

