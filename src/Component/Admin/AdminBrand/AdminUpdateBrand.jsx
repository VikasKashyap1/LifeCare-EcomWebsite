
import React, { useEffect, useState } from 'react';
import formValidator from '../../FormVlidator/FormVlidator';
import ImageVlidator from '../../FormVlidator/ImageVlidator'

import Sidebar from '../Sidebar';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { updateBrand, getBrand } from '../../../Redux/ActionCreators/BrandActioncreators';

export default function AdminUpdateBrand() {
    let [alldata, setAlldata] = useState([]);
    let [data, setData] = useState({
        name: "",
        pic:"",
        active: true,
    });
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        pic:""
    });
    let [show, setShow] = useState(false);

    let navigate = useNavigate();
    let { id } = useParams();

    let dispatch = useDispatch();

    let BrandStateData = useSelector(state => state.BrandStateData);

    function getInputData(e) {
        // var { name, value } = e.target;
        // if (name !== "active") {
        //     setErrorMessage((old) => {
        //         return {
        //             ...old,
        //             [name]: formValidator(e)
        //         };
        //     });
        // }
        var name = e.target.name
        var value = e.target.files ? '/brand/' + e.target.files[0].name : e.target.value
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
                [name]: name === "active" ? (value === "1" ? true : false) : value
            };
        });
    }

    function postdata(e) {
        e.preventDefault();
        let error = Object.values(errorMessage).find((x) => x !== "");
        if (error)
            setShow(true);
        else {
            let item = alldata.find((x) => x.name?.toLowerCase() === data.name.toLowerCase() && x.id !== id);
            if (item) {
                setShow(true);
                setErrorMessage((old) => {
                    return {
                        ...old,
                        "name": "This name is already exists"
                    };
                });
            }
            else {
                dispatch(updateBrand({ ...data }));
                navigate("/admin/brand");
            }
        }
    }

    useEffect(() => {
        dispatch(getBrand());
    }, [dispatch]);
    useEffect(() => {
        ( () => {
             dispatch(getBrand());
            if (BrandStateData.length) {
                setAlldata(BrandStateData);
                const category = BrandStateData.find((x) => x.id === id);
                if (category) {
                    setData(category);
                }
            } else {
                setAlldata([]);
            }
        })();
    }, [BrandStateData.length, id]);

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
                                <Link to='/admin/brand/create'>
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
                                        value={data.name || ""}
                                        onChange={getInputData}
                                        placeholder='Brand Name'
                                        className={`form-control text-capitalize ${show && errorMessage.name ? "border-danger" : "border-primary"} border-2`}
                                    />
                                    {show && errorMessage.name ? <p className='text-danger text-capitalize'>{errorMessage.name}</p> : ""}
                                </div>
                                
                                {/* Image Field */}
                                <div className="row">
                                <div className="col-md-6 mb-3">
                                          <label>pic</label>
                                         <input type='file' name='pic' onChange={getInputData} className={`form-control text-capitalize ${show && errorMessage.name ? "border-danger" : "border-primary"} border-2`} ></input>
                                        {show && errorMessage.pic ? <p className='text-danger'>{errorMessage.pic}</p>:""}
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

































