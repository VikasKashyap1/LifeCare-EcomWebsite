import React, { useState } from 'react';
import Breadcrum from './Partials/Breadcrum';
import { Link } from 'react-router-dom';

export default function Confirmation() {
     const [feedback, setFeedback] = useState('')
     const [submitted, setSubmitted] = useState(false)
     const [loading, setLoading] = useState(false)
     const [error, setError] = useState(null)

     const handleFeedbackChange = (e) => {
          setFeedback(e.target.value)
     };

     const handleFeedbackSubmit = async (e) => {
          e.preventDefault()
          setLoading(true)
          setError(null)

          try {
               const response = await fetch('http://localhost:8000/feedback', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ feedback }),
               })

               if (!response.ok) {
                    throw new Error('Network response was not ok.')
               }

               const data = await response.json()
               console.log('Success:', data)
               setSubmitted(true)
          } catch (error) {
               console.error('Error:', error)
               setError('There was an error submitting your feedback. Please try again later.')
          } finally {
               setLoading(false)
          }
     }

     return (
          <>
               <Breadcrum title="Order is Placed" />
               <div className="container-fluid my-2 text-center text-success">
                    <h2>Thank You!!!</h2>
                    <h4 className='text-success fs-1'>__________</h4>
                    <h4>{localStorage.getItem('name')}</h4>
                    <h4 className='text-success fs-1'>______________</h4>
                    <h4>Now You Can Track Your Order and Shopping Details in Profile Section</h4>
                    <h4>Your Order is Placed Successfully</h4>
                    <Link to="/shop" className='btn btn-primary mt-3 '>Shop Now</Link>

                    {/* Feedback Form */}
                    {!submitted ? (
                         <div className="feedback-form my-3  ">
                              <div className="row ">
                                   <h3>How did you feel after ordering? Would you like to give some suggestions to improve our website?</h3>
                                   <form onSubmit={handleFeedbackSubmit}>
                                        <div className="form-group">
                                             <label htmlFor="feedback">Your Feedback:</label>
                                             <textarea
                                                  id="feedback"
                                                  className="form-control border-2 border-primary"
                                                  rows="4"
                                                  value={feedback}
                                                  onChange={handleFeedbackChange}
                                                  required
                                                  placeholder='Feedback...'
                                             ></textarea>
                                        </div>
                                        <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
                                             {loading ? 'Submitting...' : 'Submit Feedback'}
                                        </button>
                                        {error && <p className="text-danger mt-2">{error}</p>}
                                   </form>
                              </div>
                         </div>
                    ) : (
                         <div className="thank-you-message my-3">
                              <h3>Thank you for your feedback!</h3>
                              <p>We appreciate you taking the time to help us improve.</p>
                         </div>
                    )}
               </div>
          </>
     )
}
