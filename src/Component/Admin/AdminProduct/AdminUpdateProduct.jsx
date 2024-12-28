
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import formValidator from '../../FormVlidator/FormVlidator';
import ImageVlidator from '../../FormVlidator/ImageVlidator'

import Sidebar from '../Sidebar';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { updateProduct, getProduct } from '../../../Redux/ActionCreators/ProductActioncreators';
import { getMaincategory } from '../../../Redux/ActionCreators/MaincategoryActioncreators'
import { getSubcategory } from '../../../Redux/ActionCreators/SubcategoryActioncreators'
import { getBrand } from '../../../Redux/ActionCreators/BrandActioncreators'


var rte;


export default function AdminUpdateProduct() {
    var refdiv = useRef(null);
    let [maincategory, setMaincategory] = useState([])
    let [subcategory, setSubcategory] = useState([])
    let [products, setProducts] = useState([])
    let [brand, setBrand] = useState([])
    let [align, setAlign] = useState(false)
    let [data, setData] = useState({
        name: "",
        maincategory: "",
        subcategory: "",
        brand: "",
        color: '',
        size: '',
        basePrice: '',
        discount: '',
        finalPrice: '',
        stock: true,
        quantity: '',
        pic: [],
        caption: [],
        active: true,
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        color: "",
        size: "",
        basePrice: "",
        discount: "",
        quantity: "",
        pic: ""
    })

    let [show, setShow] = useState(false)
    let navigate = useNavigate();
    let { id } = useParams()

    let dispatch = useDispatch()

    let ProductStateData = useSelector(state => state.ProductStateData);
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)


    function getInputData(e) {
        var name = e.target.name
        var value = e.target.files ? data.pic.concat(Array.from(e.target.files).map((item) => '/product/' + item?.name)) : e.target.value
        if (name !== "active") {
            setErrorMessage((old) => {
                return {
                    ...old,
                    [name]: name === 'pic' ? ImageVlidator(e) : formValidator(e)
                }
            })
        }
        setData((old) => {
            return {
                ...old,
                [name]: name === "active" || name === "stock" ? (value === "1" ? true : false) : value
            }
        })
    }

    function postdata(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find((x) => x !== "")
        if (error)
            setShow(true)

        else {
            let basePrice = parseInt(data.basePrice)
            let discount = parseInt(data.discount)
            let finalPrice = parseInt(basePrice - basePrice * discount / 100)
            dispatch(updateProduct({
                ...data,
                id: id,
                maincategory: data.maincategory === "" ? maincategory[0].name : data.maincategory,
                subcategory: data.subcategory === "" ? subcategory[0].name : data.subcategory,
                brand: data.brand === "" ? brand[0].name : data.brand,
                basePrice: basePrice,
                discount: discount,
                finalPrice: finalPrice,
                caption: rte.getHTMLCode()
            }))
            navigate("/admin/product")
            // }
        }
    }

    // useEffect(() => {
    //     dispatch(getProduct());
    // }, [dispatch]);

    useEffect(() => {
        (() => {
            dispatch(getProduct())
            if (ProductStateData.length) {
                setProducts(ProductStateData)


                let item = ProductStateData.find((x) => x.id === id)
                setData(item)
                rte = new window.RichTextEditor(refdiv.current)

                rte?.setHTMLCode(item.caption)

            }
        })()
    }, [ProductStateData.length])

    // Maincategory
    useEffect(() => {
        (() => {
            dispatch(getMaincategory())
            if (MaincategoryStateData.length)
                setMaincategory(MaincategoryStateData.filter((x) => x.active === true))

        })();

    }, [MaincategoryStateData.length, id])
    // Subcategory
    useEffect(() => {
        (() => {
            dispatch(getSubcategory())
            if (SubcategoryStateData.length)
                setSubcategory(SubcategoryStateData.filter((x) => x.active === true))

        })();

    }, [SubcategoryStateData.length])
    //Brand 
    useEffect(() => {
        (() => {
            dispatch(getBrand())
            if (BrandStateData.length)
                setBrand(BrandStateData.filter((x) => x.active === true))

        })();

    }, [BrandStateData.length])


    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-xl-2 col-md-3">
                        <Sidebar />
                    </div>

                    <div className="col-xl-10 col-md-9">
                        <div className="row">
                            <h5 className='bg-primary border-primary p-2 text-white text-center'>
                                Update
                                <Link to='/admin/product'>
                                    <i className='fa fa-arrow-left float-end text-white'></i>
                                </Link>
                            </h5>
                        </div>
                        <form onSubmit={postdata}>
                            <div className="row ">

                                {/* Name Field */}
                                <div className="col-md-6 mb-2">
                                    <label htmlFor="username">name*</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={getInputData}
                                        placeholder='Product Name'
                                        className={`form-control text-capitalize ${show && errorMessage.name ? "border-danger" : "border-primary"} border-2`}
                                    />
                                    {show && errorMessage.name ? <p className='text-danger text-capitalize'>{errorMessage.name}</p> : ""}
                                </div>
                                {/* Maicategory */}
                                <div className="row">
                                    <div className="col-md-3 col-sm-6 mb-3">
                                        <label>Maincategory*</label>
                                        <select name='maincategory' value={data.maincategory} onChange={getInputData} className='form-control border-primary border-2' >
                                            {
                                                maincategory.map((item, index) => {
                                                    return <option key={index} >{item.name}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    {/* Subcategory */}
                                    <div className="col-md-3 col-sm-6 mb-3">
                                        <label>Subcategory*</label>
                                        <select name='subcategory' onChange={getInputData} className='form-control border-primary border-2' >
                                            {
                                                subcategory.map((item, index) => {
                                                    return <option key={index} >{item.name}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    {/* Brand */}
                                    <div className="col-md-3 col-sm-6 mb-3">
                                        <label>Brand*</label>
                                        <select name='brand' onChange={getInputData} className='form-control border-primary border-2' >
                                            {
                                                brand.map((item, index) => {
                                                    return <option key={index} >{item.name}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-md-3 col-sm-6 mb-3">
                                        <label>Stock*</label>
                                        <select name='stock' onChange={getInputData} className='form-control border-primary border-2' >
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row">
                                    {/* color */}
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="username"> Product color*</label>
                                        <input type="text" name="color" value={data.color} onChange={getInputData} placeholder='Product color' className={`form-control text-capitalize ${show && errorMessage.color ? "border-danger" : "border-primary"} border-2`} />
                                        {show && errorMessage.color ? <p className='text-danger text-capitalize'>{errorMessage.color}</p> : ""}
                                    </div>
                                    {/* size* */}
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="username"> Product size*</label>
                                        <input type="text" name="size" value={data.size} onChange={getInputData} placeholder='Product size' className={`form-control text-capitalize ${show && errorMessage.size ? "border-danger" : "border-primary"} border-2`} />
                                        {show && errorMessage.size ? <p className='text-danger text-capitalize'>{errorMessage.size}</p> : ""}
                                    </div>
                                    {/* BasePrice */}
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="username"> Product BasePrice*</label>
                                        <input type="text" name="basePrice" value={data.basePrice} onChange={getInputData} placeholder='Product BasePrice' className={`form-control text-capitalize ${show && errorMessage.basePrice ? "border-danger" : "border-primary"} border-2`} />
                                        {show && errorMessage.basePrice ? <p className='text-danger text-capitalize'>{errorMessage.basePrice}</p> : ""}
                                    </div>
                                    {/* Discount */}
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="username"> Product Discount*</label>
                                        <input type="text" name="discount" value={data.discount} onChange={getInputData} placeholder='Product discount' className={`form-control text-capitalize ${show && errorMessage.discount ? "border-danger" : "border-primary"} border-2`} />
                                        {show && errorMessage.discount ? <p className='text-danger text-capitalize'>{errorMessage.discount}</p> : ""}
                                    </div>

                                </div>
                                {/* Discription */}
                                <div className="mb-3  ">
                                    <label>Discription*</label>
                                    {/* <textarea onChange={getInputData} name='caption' className={`form-control  ${show && errorMessage.caption ? "border-danger" : "border-primary"} border-2`} placeholder='write a caption' rows={5} /> */}
                                    <div ref={refdiv}></div>

                                    {/* {show && errorMessage.caption ? <p className='text-danger'>{errorMessage.caption}</p> : ""} */}

                                </div>
                                {/* quantity */}
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="username">Quantity*</label>
                                        <input type="text" name="quantity" value={data.quantity} onChange={getInputData} placeholder='Product quantity' className={`form-control text-capitalize ${show && errorMessage.quantity ? "border-danger" : "border-primary"} border-2`} />
                                        {show && errorMessage.quantity ? <p className='text-danger text-capitalize'>{errorMessage.quantity}</p> : ""}
                                    </div>

                                    {/*  Pic Field */}

                                    <div className="col-md-6 mb-3">
                                        <label>pic*</label>
                                        <input type='file' name='pic' multiple onChange={getInputData} className={`form-control text-capitalize ${show && errorMessage.pic ? "border-primary" : "border-primary"} border-2`} ></input>
                                        {show && errorMessage.pic ? errorMessage.pic.join('|').split('|').map((item, index) => {
                                            return <p className='text-danger ' key={index}>{item}
                                            </p>
                                        }) : ""}


                                        {/* {show && errorMessage.pic ? <p className='text-danger'>{errorMessage.pic}</p> : ""} */}
                                    </div>
                                </div>


                                {/* Active Field */}
                                <div className="col-md-6 mb-2">
                                    <label>Active*</label>
                                    <select
                                        name='active'
                                        value={data.active ? "1" : "0"}
                                        onChange={getInputData}
                                        className='form-control border-primary border-2'
                                    >
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <label className='text-bold '>old pic, you can update  </label>
                                    <div>
                                        {
                                            data.pic.map((item, index) => {
                                                return <img key={index} src={item}
                                                    onClick={() => {
                                                        data.pic.splice(index,1)
                                                       setAlign(item)
                                                    }}

                                                    className='show mx-1 text-cord' height={60} width={70} alt='product img' />

                                            })
                                        }
                                    </div>

                                </div>
                                <div className="mb-3">
                                    <button type='submit' className='btn btn-primary border-2 mt-3 w-100'>Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
































