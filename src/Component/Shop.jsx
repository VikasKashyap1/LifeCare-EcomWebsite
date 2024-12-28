import React, { useEffect, useState } from 'react'
import Breadcrum from './Partials/Breadcrum'
import { Link, useLocation } from 'react-router-dom'


import { getProduct } from '../Redux/ActionCreators/ProductActioncreators'
import { getMaincategory } from '../Redux/ActionCreators/MaincategoryActioncreators'
import { getSubcategory } from '../Redux/ActionCreators/SubcategoryActioncreators'
import { getBrand } from '../Redux/ActionCreators/BrandActioncreators'
import { useDispatch, useSelector } from 'react-redux'
import ProductContainer from './Partials/ProductContainer'

export default function Shop() {
     let [products, setProducts] = useState([])
     let [maincategory, setMaincategory] = useState([])
     let [subcategory, setSubcategory] = useState([])
     let [brand, setBrand] = useState([])
     let [mc, setMc] = useState('All')
     let [sb, setSb] = useState('All')
     let [br, setBr] = useState('All')

     let [align, setAlign] = useState(!true)

     let [min, setMin] = useState(0)
     let [max, setMax] = useState(0)
     let [search, setSearch] = useState("")

     let location = useLocation()

     let dispatch = useDispatch()
     let ProductStateData = useSelector(state => state.ProductStateData)
     let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
     let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
     let BrandStateData = useSelector(state => state.BrandStateData)

     function FilterData(mc, sb, br, min = -1, max = -1) {
          let data = []

          // Maincategory
          if (mc === 'All' && sb === 'All' && br === 'All')
               data = ProductStateData
          else if (mc !== 'All' && sb === 'All' && br === 'All')
               data = ProductStateData.filter(x => x.maincategory === mc)

          // Subcategory
          else if (mc === 'All' && sb !== 'All' && br === 'All')
               data = ProductStateData.filter(x => x.subcategory === sb)

          // Brand
          else if (mc === 'All' && sb === 'All' && br !== 'All')
               data = ProductStateData.filter(x => x.brand === br)

          // CombineFilter
          else if (mc !== 'All' && sb !== 'All' && br === 'All')
               data = ProductStateData.filter(x => x.maincategory === mc && x.subcategory === sb)

          else if (mc !== 'All' && sb === 'All' && br !== 'All')
               data = ProductStateData.filter(x => x.maincategory === mc && x.brand === br)

          else if (mc === 'All' && sb !== 'All' && br !== 'All')
               data = ProductStateData.filter(x => x.subcategory === sb && x.brand === br)
          else
               data = ProductStateData.filter(x => x.subcategory === sb && x.maincategory === mc && x.brand === br)
          if (min !== -1 && max !== -1)
               data = data.filter((x) => x.finalPrice >= min && x.finalPrice <= max)

          setProducts(data)

     }
     function SortFilter(option) {
          if (option === '1')
               setProducts(products.sort((x, y) => y.id.localCampare(x.id)))
          else if (option === '2')
               setProducts(products.sort((x, y) => x.finalPrice - y.finalPrice))
          else
               setProducts(products.sort((x, y) => y.finalPrice - x.finalPrice))
          setAlign(!align)
     }

     function PriceFilter(e) {
          e.preventDefault()
          // e.preventDefault()
          FilterData(mc, sb, br, min, max)
     }

     function DataSearch(e) {
          e.preventDefault()
          let ch = search.toLowerCase()

          ch = setProducts(ProductStateData.filter((x) => x.name.toLowerCase().includes(ch)
               || x.maincategory.toLowerCase() === ch
               || x.subcategory.toLowerCase() === ch
               || x.brand.toLowerCase() === ch
               || x.color.toLowerCase() === ch
               || x.caption?.toLowerCase().includes(ch)
          ))
     }
     function SearchNavbar(search) {
          let ch = search.toLowerCase()

          ch = setProducts(ProductStateData.filter((x) => x.name.toLowerCase().includes(ch)
               || x.maincategory.toLowerCase() === ch
               || x.subcategory.toLowerCase() === ch
               || x.brand.toLowerCase() === ch
               || x.color.toLowerCase() === ch
               || x.caption?.toLowerCase().includes(ch)
          ))
     }

     useEffect(() => {
          (
               () => {
                    dispatch(getProduct())

               }
          )()
     }, [ProductStateData])

     useEffect(() => {
          (
               () => {
                    dispatch(getMaincategory())
                    if (MaincategoryStateData.length)
                         setMaincategory(MaincategoryStateData)
               }
          )()
     }, [MaincategoryStateData.length])

     useEffect(() => {
          (
               () => {
                    dispatch(getSubcategory())
                    if (SubcategoryStateData.length)
                         setSubcategory(SubcategoryStateData)
               }
          )()
     }, [SubcategoryStateData.length])

     useEffect(() => {
          (
               () => {
                    dispatch(getBrand())
                    if (BrandStateData.length)
                         setBrand(BrandStateData)
               }
          )()
     }, [BrandStateData.length])

     useEffect(() => {
          const query = new URLSearchParams(location.search)
          setMc(query.get('mc') ?? 'All')

          setSb(query.get('sb') ?? 'All')

          setBr(query.get('br') ?? 'All')
          if (query.get("search"))
               SearchNavbar(query.get("search"))
          else
               FilterData(query.get('mc') ?? 'All', query.get('sb') ?? 'All', query.get('br') ?? 'All')
     }, [location, ProductStateData.length])
     return (
          <>
               <Breadcrum title="Shop" />
               <div className="container-fluid my-3">
                    <div className="row">
                         <div className="col-md-2">
                              <div className="list-group mb-2">
                                   <p className="list-group-item list-group-item-action active" aria-current="true">  Maincategory </p>
                                   <Link to={`/shop?mc=All&sb=${sb}&br=${br}`} className="list-group-item list-group-item-action">All </Link>
                                   {
                                        maincategory.map((item, index) => {
                                             if (item.active)
                                                  return <Link key={index} to={`/shop?mc=${item.name}&sb=${sb}&br=${br}`} className="list-group-item list-group-item-action">{item.name}</Link>

                                        })
                                   }
                              </div>
                              <div className="list-group mb-2">
                                   <p className="list-group-item list-group-item-action active" aria-current="true">  Subcategory </p>
                                   <Link to={`/shop?mc=${mc}&sb=All&br=${br}`} className="list-group-item list-group-item-action">All </Link>
                                   {
                                        subcategory.map((item, index) => {
                                             if (item.active)
                                                  return <Link key={index} to={`/shop?mc=${mc}&sb=${item.name}&br=${br}`} className="list-group-item list-group-item-action">{item.name}</Link>

                                        })

                                   }
                              </div>
                              <div className="list-group mb-2">
                                   <p className="list-group-item list-group-item-action active" aria-current="true"> Brands </p>
                                   <Link to={`/shop?mc=${mc}&sb=${sb}&br=All`} className='list-group-item list-group-item-action'>All</Link>
                                   {
                                        brand.map((item, index) => {
                                             if (item.active)
                                                  return <Link key={index} to={`/shop?ms=${mc}&sb=${sb}&br=${item.name}`} className="list-group-item list-group-item-action">{item.name}</Link>

                                        })
                                   }
                              </div>
                              <div className="list-group mb-3">
                                   <h5 className="list-group-item list-group-item-action active" aria-current="true">Price filter</h5>
                                   {/* <h5 className='border-2 bg-primary text-center p-2 text-light'>Price filter</h5> */}
                                   <form onSubmit={PriceFilter}>
                                        <div className=" mb-3">
                                             <label> Min Price</label>
                                             <input type="number" name="min" onChange={(e) => setMin(e.target.value)} className='form-control p-2 border-2 border-primary ' placeholder='Min Amount' />
                                        </div>
                                        <div className=" mb-3">
                                             <label> Max Price</label>
                                             <input type="number" name="max" onChange={(e) => setMax(e.target.value)} className='form-control p-2 border-2 border-primary ' placeholder='Max Amount' />
                                        </div>
                                        <button type="submit" className='btn btn-primary  w-100'> Apply Filter</button>

                                   </form>
                              </div>
                         </div>

                         <div className="col-md-10">
                              <div className="row">
                                   <div className="col-md-8 ">
                                        <form onSubmit={DataSearch}>
                                             <div className="btn-group w-100" >
                                                  <input name="search" onChange={(e) => setSearch(e.target.value)} className='form-control search-input  p- border-primary border-2 w-90  ' placeholder=' Enter Name ,Colore, Brand,Category to Search Products ...' />
                                                  <button className='btn  btn-primary ' type='submit'> Search</button>

                                             </div>
                                        </form>
                                   </div>
                                   <div className="col-md-4 ">
                                        <select name='sort' onChange={(e) => SortFilter(e.target.value)} className='form-select border-2 border-primary'>
                                             <option value={'1'}>Latest Mall</option>
                                             <option value={'2'}>Price : low to high</option>
                                             <option value={'3'}>Price : high to low</option>
                                        </select>
                                   </div>
                              </div>

                              <ProductContainer data={products} />

                         </div>
                    </div>
               </div >


          </>
     )
}
