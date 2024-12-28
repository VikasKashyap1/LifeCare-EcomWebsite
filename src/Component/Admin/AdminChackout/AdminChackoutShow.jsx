import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'


import { useDispatch, useSelector } from 'react-redux'

import $ from "jquery"
import 'datatables.net'
import 'datatables.net-dt/css/dataTables.dataTables.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteChackout, getChackout, updateChackout } from '../../../Redux/ActionCreators/ChackoutActioncreators'

export default function AdminChackoutShow() {
    let [data, setData] = useState({})
    let [user, setUser] = useState({})
    let [orderStatus, setOrderStatus] = useState("")
    let [paymentStatus, setPaymentStatus] = useState("")
    let [flag, setFlag] = useState(false)
    let { id } = useParams()
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let ChackoutStateData = useSelector((state) => state.ChackoutStateData)

    function updateStatus() {
        if (window.confirm("Did you really want to change the status ")) {
            let item = ChackoutStateData.find((x) => x.id === id)
            console.log(item);

            dispatch(updateChackout({ ...item, orderStatus: orderStatus, paymentStatus: paymentStatus }))
            setFlag(!flag)
            setData((old) => {
                return {
                    ...old,
                    orderStatus: orderStatus,
                    paymentStatus: paymentStatus
                }
            })
        }
    }
    function deleteStatus() {
        if (window.confirm("Are you sure you want to delete details?")) {
            dispatch(deleteChackout({ id: id }))
            navigate("/admin/chackout")

        }
    }



    async function getUserData() {
        dispatch(getChackout())
        if (ChackoutStateData.length) {
            let item = ChackoutStateData.find((x) => x.id === id)
            setData(item)
            setOrderStatus(item.orderStatus)
            setPaymentStatus(item.paymentStatus)


            let response = await fetch(`http://localhost:8000/user/${item.user}`, {
                method: "GET",
                headers: {
                    'content-type': 'application/json'
                }
            })


            response = await response.json()
            if (response) {
                setUser(response)
                console.log('user data', response)
                setTimeout(() => {
                    $("#ShowTables").DataTable()
                }, 500)

            }
        } else
            setData([])



    }

    useEffect(() => {
        console.log('User data', user.name);


        getUserData()
    }, [ChackoutStateData.length])

    console.log(user.name);

    return (
        <>
            {/* <Breadcrum title="Admin"/> */}

            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-xl-2 col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-xl-10 col-md-9">
                        <h5 className='bg-primary text-center p-2 text-light'>Chackout Query</h5>

                        <div className="table-responsive">
                            <table className='table table-bordered'>
                                <tbody>
                                    <tr>
                                        <th>Id</th>
                                        <td>{data.id}</td>
                                    </tr>
                                    <tr>
                                        <th>User</th>
                                        <td>
                                            {user.name}<br />
                                            {user.phone},{user.email}<br />
                                            {user.address}<br />
                                            {user.pin},{user.city},{user.state}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Order Status</th>
                                        <td>{data.orderStatus}
                                            {
                                                data.orderStatus !== "Delivered" ?
                                                    <>
                                                        <br />
                                                        <select name="orderStatus" value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)} className='form-control border-2 border-primary'>
                                                            <option>Order is Placed</option>
                                                            <option>Order is Packed</option>
                                                            <option>Ready to Ship</option>
                                                            <option>In Transit</option>
                                                            <option>Order Reached to the final Delivery Station</option>
                                                            <option>Out For Delivery</option>
                                                            <option>Delivered</option>
                                                        </select>
                                                    </> : ""
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Payment Mode</th>
                                        <td>{data.paymentMode}</td>
                                    </tr>
                                    <tr>
                                        <th>Payment Status</th>
                                        <td>{data.paymentStatus}
                                            {
                                                data.paymentStatus !== "Done" ?
                                                    <>
                                                        <br />
                                                        <select name="paymentStatus" value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)} className='form-control border-2 border-primary'>
                                                            <option>Pending</option>
                                                            <option>Done</option>
                                                        </select>
                                                    </> : ""
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Subtotal</th>
                                        <td>&#8377;{data.subTotal}</td>
                                    </tr>
                                    <tr>
                                        <th>Shipping</th>
                                        <td>&#8377;{data.shopping}</td>
                                    </tr>
                                    <tr>
                                        <th>total</th>
                                        <td>&#8377;{data.total}</td>
                                    </tr>
                                    <tr>
                                        <th>RPPID</th>
                                        <td>{data.rppid}</td>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <td>{new Date(data.date).toLocaleString('ind-india', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                            hour12: true
                                        })}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            {
                                                data.orderStatus !== "Delivered" || data.paymentStatus !== "Done" ? <button onClick={updateStatus} className='btn btn-primary w-100'>Update Status to Done</button> :
                                                    ""
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h5 className='bg-primary text-center text-light p-2'>Order Products</h5>
                        <div className="table-responsive">
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Brand</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <thead>
                                    {
                                        data.product?.map((p, ind) => {
                                            return <tr key={ind}>
                                                <td>
                                                    <a href={p.pic} target='_blank' rel='noreferrer'>
                                                        <img src={p.pic} height={50} width={80} className='rounded' alt="" />
                                                    </a>
                                                </td>
                                                <td>{p.name}</td>
                                                <td>{p.brand}</td>
                                                <td>{p.color}</td>
                                                <td>{p.size}</td>
                                                <td>&#8377;{p.price}</td>
                                                <td>{p.qty}</td>
                                                <td>{p.total}</td>
                                            </tr>
                                        })
                                    }
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
// <tr>
//      <td colSpan={2}>
//           {
//                data.active ? <button onClick={updateStatus} className='btn btn-primary w-100 '  >Change the Active Status</button>
//                     : <button onClick={deleteStatus} className='btn btn-danger w-100 ' >Delete</button>
//           }
//      </td>
// </tr>









