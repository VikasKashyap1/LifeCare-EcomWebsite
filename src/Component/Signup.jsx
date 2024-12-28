
import React, { useState } from 'react'
import Breadcrum from './Partials/Breadcrum'
import FormVlidator from './FormVlidator/FormVlidator'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
  let [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    cpassword: ""
  })

  let [errorMassage, setErrorMassage] = useState({
    name: "Empty field not allowed",
    username: "Empty field not allowed",
    email: "Empty field not allowed",
    phone: "Empty field not allowed",
    password: "Empty field not allowed",
  })

  let [show, setShow] = useState(false)
  let navigate = useNavigate()

  function InputData(e) {
    let { name, value } = e.target

    setErrorMassage((old) => {
      return {
        ...old,
        [name]: FormVlidator(e)
      }
    })

    setData((old) => {
      return {
        ...old,
        [name]: value,
      }
    })
  }

  async function PostData(e) {
    e.preventDefault()

    if (data.password === data.cpassword) {
      let error = Object.values(errorMassage).find((x) => x !== '')
      if (error) {
        setShow(true)
      } else {
        var response = await fetch('http://localhost:8000/user', {
          method: 'GET',
          headers: {
            'content-type': 'application/json'
          },
        })
        response = await response.json()

        let item = response.find((x) => x.username === data.username || x.email === data.email)
        if (item) {
          setShow(true)
          setErrorMassage((old) => {
            return {
              ...old,
              'username': item.username === data.username ? "This username already exists" : '',
              'email': item.email === data.email ? "This email already exists" : ''
            }
          })
        } else {
          const sendData = { ...data }
          delete sendData.cpassword // Manually delete confirm password from server

          let response = await fetch('http://localhost:8000/user', {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({ ...sendData, role: 'Buyer' })
          })
          response = await response.json()

          if (response)
            navigate('/login')
        }
      }
      
    } 
      else {
        setShow(true)
        setErrorMassage((old) => {
          return {
            ...old,
            'password': "Confirm password doesn't match, please try again"
          }
        })
      }
  }


  return (
    <div>
      <Breadcrum title='Signup Secion' />
      <div className="container my-3">
        <div className="row">
          <div className="col-lg-8 col-md-10 col-sm-11 m-auto">
            <h4 className='bg-primary text-light p-2 text-center'>Create A Free Acount </h4>


            <form onSubmit={PostData}>
              <div className="row  ">
                <div className="col-md-6 mb-3">
                  <input type="text" name='name' onChange={InputData} className={`form-control border-2 ${show && errorMassage.name ? 'border-danger' : 'border-primary'}`} placeholder='Fill Name' />
                  {show && errorMassage.name ? <p className='text-danger'>{errorMassage.name}</p> : ''}
                </div>
                <div className="col-md-6 mb-3">
                  <input type="text" name='username' onChange={InputData} className={`form-control border-2 ${show && errorMassage.username ? 'border-danger' : 'border-primary'}`} placeholder=' username' />
                  {show && errorMassage.username ? <p className='text-danger'>{errorMassage.username}</p> : ''}
                </div>
                <div className="col-md-6 mb-3">
                  <input type="text" name='email' onChange={InputData} className={`form-control border-2 ${show && errorMassage.email ? 'border-danger' : 'border-primary'}`} placeholder=' email address' />
                  {show && errorMassage.email ? <p className='text-danger'>{errorMassage.email}</p> : ''}
                </div>
                <div className="col-md-6 mb-3">
                  <input type="text" name='phone' onChange={InputData} className={`form-control border-2 ${show && errorMassage.phone ? 'border-danger' : 'border-primary'}`} placeholder=' phone number ' />
                  {show && errorMassage.phone ? <p className='text-danger'>{errorMassage.phone}</p> : ''}
                </div>
                <div className="col-md-6 mb-3">
                  <input type="text" name='password' onChange={InputData} className={`form-control border-2 ${show && errorMassage.password ? 'border-danger' : 'border-primary'}`} placeholder=' password' />
                  {show && errorMassage.password ? <p className='text-danger'>{errorMassage.password}</p> : ''}
                </div>
                <div className="col-md-6 mb-3">
                  <input type="text" name='cpassword' onChange={InputData} className='form-control border-primary border-2' placeholder='confirm  password' />
                  {/* {show && errorMassage.cpassword ? <p className='text-danger'>{errorMassage.cpassword}</p> : ''} */}
                </div>
                <div className="row mx-1">
                  <button type='submit' className='btn btn-primary w-100 fs-5 fa fa-signup'>Signup</button>
                </div>

              </div>
            </form>
            <div className="d-flex   justify-content-between mt-2">
              <Link to='/login'>Already have a account ?  login </Link>
            </div>


          </div>

        </div>
      </div>
    </div>
  )
}
