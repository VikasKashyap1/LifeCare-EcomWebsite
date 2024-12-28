import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormVlidator from './FormVlidator/FormVlidator'
import Breadcrum from './Partials/Breadcrum'
export default function Login() {
  let [data, setData] = useState({
    username: "",
    password: "",
  })
  let [errorMassage, setErrorMassage] = useState({
    username: "Empty field not allowed",
    password: "Empty field not allowed",
  })
  let [show, setShow] = useState(false)
  let navigate = useNavigate()



  function InputData(e) {
    let { name, value } = e.target
    // if (name !== 'cpassword') {
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



    // }
  }


  async function PostData(e) {
    e.preventDefault()
    let error = Object.values(errorMassage).find((x) => x !== '')
    if (error)
      setShow(true)
    else {
      let response = await fetch('http://localhost:8000/user', {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        },

      })
      response = await response.json()
      let item = response.find((x) => (x.username === data.username || x.email === data.email) && x.password === data.password)
      if (item) {
        localStorage.setItem('login', true)
        localStorage.setItem('name', item.name)
        localStorage.setItem('username', item.username)
        localStorage.setItem('role', item.role)
        localStorage.setItem('userid', item.id)
        if (item.role === 'Buyer') {
          navigate('/profile')
        } else {

          navigate('/admin')
        }




      } else {
        setShow(true)
        setErrorMassage((old) => {
          return {
            ...old,
            'username': 'invalid username or password try again',
          }
        })


      }


    }



  }
  return (
    <div>
      <Breadcrum title='Login Secion' />
      <div className="container my-3">
        <div className="row">
          <div className="col-lg-8 col-md-10 col-sm-11 m-auto">
            <h4 className='bg-primary text-light p-2 text-center'>Create A Free Acount </h4>


            <form onSubmit={PostData}>

              <div className="  mb-3">
                <input type="text" name='username' onChange={InputData} className={`form-control border-2 ${show && errorMassage.username ? 'border-danger' : 'border-primary'}`} placeholder='fill username' />
                {show && errorMassage.username ? <p className='text-danger'>{errorMassage.username}</p> : ''}
              </div>


              <div className="  mb-3">
                <input type="text" name='password' onChange={InputData} className={`form-control border-2 ${show && errorMassage.name ? 'border-danger' : 'border-primary'}`} placeholder='password' />
                {show && errorMassage.password ? <p className='text-danger'>{errorMassage.password}</p> : ''}
              </div>

              <div className="row mx-1">
                <button className='btn btn-primary w-100 fs-5 fa fa-Login' type='submit'>Login</button>
              </div>


            </form>
            <div className="d-flex   justify-content-between mt-2">
              <Link to='/signup'> Create a new account </Link>
              <Link to='#'>Forget password</Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
