


import React, { useEffect, useState } from 'react'
import Breadcrum from './Partials/Breadcrum'
import FormVlidator from './FormVlidator/FormVlidator'
import { useNavigate } from 'react-router-dom'

export default function UpdateProfile() {
  let [data, setData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pin: "",
    pic: ""
  })

  let [errorMassage, setErrorMassage] = useState({
    name: "",
    phone: "",
  })

  let [show, setShow] = useState(false)
  let navigate = useNavigate()

  function InputData(e) {
    let name = e.target.name
    let value = e.target.files ? `/product/${e.target.files[0].name}` : e.target.value


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

    let error = Object.values(errorMassage).find((x) => x !== '')
    if (error) {
      setShow(true)
    }
    else {

      let response = await fetch('http://localhost:8000/user/' + data.id, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ ...data })
      })
      response = await response.json()

      if (data.role === 'Buyer')
        navigate('/profile')
      else
        navigate('/admin')


    }

  }
  useEffect(() => {
    (async () => {
      let response = await fetch('http://localhost:8000/user', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        }
      })
      response = await response.json()
      let item = response.find((x) => x.id === localStorage.getItem('userid'))
      if (item) {
        setData((old) => {
          return {
            ...old,
            ...item,
          }
        })
      } else {
        navigate('/login')
      }

    })()
  }, [])



  return (
    <div>
      <Breadcrum title='Update Profile ' />
      <div className="container my-3">
        <div className="row">
          <div className="col-lg-8 col-md-10 col-sm-11 m-auto">
            <h4 className='bg-primary text-light p-2 text-center'>Update Acount </h4>


            <form onSubmit={PostData}>
              <div className="row  ">
                <div className="col-md-6 mb-3">
                  <input type="text" name='name' value={data.name} onChange={InputData} className={`form-control border-2 ${show && errorMassage.name ? 'border-danger' : 'border-primary'}`} placeholder='Fill Name' />
                  {show && errorMassage.name ? <p className='text-danger'>{errorMassage.name}</p> : ''}
                </div>

                <div className="col-md-6 mb-3">
                  <input type="text" name='phone' value={data.phone} onChange={InputData} className={`form-control border-2 ${show && errorMassage.phone ? 'border-danger' : 'border-primary'}`} placeholder=' phone number ' />
                  {show && errorMassage.phone ? <p className='text-danger'>{errorMassage.phone}</p> : ''}
                </div>
                <div className="col-md-6 mb-3">
                  <lable>Address</lable>
                  <textarea value={data.address} onChange={InputData} name='address' className='form-control  border-primary border-2' placeholder='Address' rows={2} ></textarea>
                </div>
                <div className="col-md-6 mb-3">
                  <lable>City</lable>
                  <input type="text" name='city' value={data.city} onChange={InputData} className='form-control border-2 border-primary' placeholder=' City name ' />

                </div>
                <div className="col-md-6 mb-3">
                  <lable>State</lable>
                  <input type="text" name='state' value={data.state} onChange={InputData} className='form-control border-2 border-primary' placeholder='State name ' />

                </div>
                <div className="col-md-6 mb-3">
                  <lable>Pin Code</lable>
                  <input type="text" name='pin' value={data.pin} onChange={InputData} className='form-control border-2 border-primary' placeholder=' Pin Code ' />

                </div>
                <div className="col-md-6 mb-3">
                  <lable>Pic</lable>
                  <input type="file" name="pic" onChange={InputData} className='form-control border-2 border-primary' ></input>

                </div>
                <div className="row mx-1">
                  <button type='submit' className='btn btn-primary w-100 fs-5 fa fa-Update Profile'>Update Profile</button>
                </div>

              </div>
            </form>


          </div>

        </div>
      </div>
    </div>
  )
}
