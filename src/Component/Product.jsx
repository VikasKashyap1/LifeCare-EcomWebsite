import React, { useEffect, useState } from 'react'
import Breadcrum from './Partials/Breadcrum'
import { getProduct } from '../Redux/ActionCreators/ProductActioncreators'

import { getCart, createCart } from '../Redux/ActionCreators/CartActioncreators'
import { getWishlist, createWishlist } from '../Redux/ActionCreators/WishlistActioncreators '

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import ProductContainer from './Partials/ProductContainer'


export default function Product() {
     let { id } = useParams()
     let [product, setProduct] = useState({ pic: [] })
     let [relProducts, setRelProducts] = useState([])
     let [qty, setQty] = useState(1)

     let [carts, setCarts] = useState([])
     let [wishlist, setWishlist] = useState([])

     let dispatch = useDispatch()
     let navigate = useNavigate()


     let ProductStateData = useSelector(state => state.ProductStateData)
     let CartStateData = useSelector(state => state.CartStateData)
     let WishlistStateData = useSelector(state => state.WishlistStateData)
     //  AddToCart
     // Function to handle adding to cart
     function AddToCart() {
          // let item = carts.find((x) => x.user === localStorage.getItem('userid') && x.product === id)

          let item = CartStateData.length && CartStateData.find((x) => x.user === localStorage.getItem('userid') && x.product === id)
          // console.log(item);

          if (!item) {
               item = {
                    user: localStorage.getItem('userid'),
                    product: id,
                    name: product.name,
                    quantity: product.quantity,
                    brand: product.brand,
                    color: product.color,
                    size: product.size,
                    price: product.finalPrice,
                    qty: qty,
                    total: product.finalPrice * qty,
                    pic: product.pic ? product.pic[0] : 'img/Noimage.png'
               }
               dispatch(createCart({ ...item }))

          }
          navigate('/cart')
     }

     //Wishlist 
     function AddToWishlist() {
          let item = wishlist.find((x) => x.user === localStorage.getItem('userid') && x.product === id)
          // let item = WishlistStateData.length && WishlistStateData.find((x) => x.user === localStorage.getItem('userid') && x.product === id)
          if (!item) {
               item = {
                    user: localStorage.getItem('userid'),
                    product: id,
                    name: product.name,
                    quantity: product.quantity,
                    brand: product.brand,
                    color: product.color,
                    size: product.size,
                    price: product.finalPrice,
                    qty: qty,
                    total: product.finalPrice * qty,
                    pic: product.pic ? product.pic[0] : 'img/Noimage.png'

               }

               dispatch(createWishlist({ ...item }))


          }
          navigate('/profile')

     }





     useEffect(() => {
          (() => {
               dispatch(getProduct())
               if (ProductStateData.length) {

                    let item = ProductStateData.find((x) => x.id === id)
                    setProduct(item)

                    setRelProducts(ProductStateData.filter((x) => x.maincategory === item.maincategory))
               }
          })()
     }, [ProductStateData.length, window.location.herf, id])


     useEffect(() => {
          (() => {
               dispatch(getCart())
               // if (CartStateData) {
               //      setCarts = CartStateData.filter((x) => x.user === localStorage.getItem('userid'))

               // }

          })()
     }, [CartStateData.length])

     useEffect(() => {
          (() => {
               dispatch(getWishlist())
               if (WishlistStateData.length) {
                    setWishlist(WishlistStateData.filter((x) => x.user === localStorage.getItem('userid')))

               } else
                    setWishlist([])

          })()
     }, [WishlistStateData.length])


     return (
          <div>
               <Breadcrum title='Product' />
               <div className="store my-3">
                    <div className="row">
                         <div className="col-md-6">
                              {product.pic === null ? <img src='img/Noimg.png' height={600} width='100%' className="d-block w-100" alt="..." /> :
                                   <div id="carouselExampleIndicators" className="carousel slide">
                                        <div className="carousel-indicators">
                                             <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                             {
                                                  product.pic?.length && product.pic?.slice(1).map((item, index) => {
                                                       return <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index + 1} aria-label={`Slide ${index + 2}`}></button>


                                                  })
                                             }


                                        </div>
                                        <div className="carousel-inner">
                                             <div className="carousel-item active">
                                                  <img src={product.pic[0]} height={600} width='100%' className="d-block w-100" alt="..." />
                                             </div>
                                             <div className="carousel-item">
                                                  {
                                                       product.pic?.slice(1).map((item, index) => {
                                                            return <img key={index} src={item} height={600} width='100%' className="d-block w-100" alt="..." />

                                                       })
                                                  }
                                             </div>
                                        </div>

                                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                             <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                             <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                             <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                             <span className="visually-hidden">Next</span>
                                        </button>
                                   </div>
                              }

                         </div>


                         <div className=" col-md-6 ">
                              <h1 className='bg-primary text-center text-light'>{product.name} </h1>
                              <div className="tables-responsive mb-2">
                                   <table className='table table-bordered '>
                                        <tbody className='mx-2'>
                                             <tr>
                                                  <th>Maincategory</th>
                                                  <td>{product.maincategory}</td>
                                             </tr>
                                             <tr>
                                                  <th>Subcategory</th>
                                                  <td>{product.subcategory}</td>
                                             </tr>
                                             <tr>
                                                  <th>Brand</th>
                                                  <td>{product.brand}</td>
                                             </tr>
                                             <tr>
                                                  <th>Color</th>
                                                  <td>{product.color}</td>
                                             </tr>
                                             <tr>
                                                  <th>Size</th>
                                                  <td>{product.size}</td>
                                             </tr>
                                             <tr>
                                                  <th>Stock</th>
                                                  <td>{product.stock ? <p className='text-success'>{product.quantity} Available</p> : <p className='text-danger'>Not Available</p>}</td>
                                             </tr>
                                             <tr>
                                                  <th>Price</th>
                                                  <td>&#8377;<del className='text-danger'>{product.basePrice}</del> &#8377;{product.finalPrice} <sup> {product.discount} %off </sup> </td>
                                             </tr>

                                             <tr >
                                                  <td colSpan={2}>

                                                       {product.stock ?
                                                            <div className="d-flex">
                                                                 <div className="d-flex ">
                                                                      <button className='btn btn-primary' onClick={() => qty > 1 ? setQty(qty - 1) : ''}> <i className='fa fa-minus  '></i></button>
                                                                      <p className='pt-1 mx-3 fs-5  '>{qty}</p>
                                                                      <button className='btn btn-primary' onClick={() => qty < product.quantity ? setQty(qty + 1) : ''}> <i className='fa fa-plus  '></i></button>

                                                                 </div>
                                                                 <div className="ms-1 btn-group w-100% ">
                                                                      <button className='btn btn-primary  px-5' onClick={AddToCart}><i className='px-2 fa fa-shopping-cart  '></i>Add to Cart</button>
                                                                      <button className='btn btn-success  px-5' onClick={AddToWishlist}><i className='px-2 fa fa-heart text-danger'></i>Add to Wishist</button>

                                                                 </div>
                                                            </div>

                                                            :

                                                            <div className="row d-flex" style={{ marginLeft: '18px', marginRight: '10px' }}>
                                                                 <button className='btn btn-success w-100 px-5' onClick={AddToWishlist}><i className='px-2 fa fa-heart text-danger'></i>Add to Wishist</button>

                                                            </div>

                                                       }
                                                  </td>

                                             </tr>
                                             <tr>
                                                  <th>Caption</th>
                                                  <td>

                                                       {/* {product.caption === undefined || null || '' ? ('Not Caption') : 
                                                       < p dangerouslySetInnerHTML={{ __html: product.caption}}/> } */}

                                                       < p dangerouslySetInnerHTML={{ __html: product.caption ? `${product.caption}` : 'Not caption' }} />

                                                  </td>

                                             </tr>
                                        </tbody>
                                   </table>

                              </div>

                         </div>
                         <ProductContainer title='Related product' data={relProducts.slice(0, 20)} />
                    </div>
               </div>
          </div >

     )

}