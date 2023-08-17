import { useRef, useState } from 'react'
import axios from 'axios'

function HomePage() {
  const [feedbackData, setFeedbackData] = useState([])
  const emailInputRef = useRef()
  const feedbackInput = useRef()

  const submitHandler = (event) => {
    event.preventDefault()

    const enteredEmail = emailInputRef.current.value
    const enteredFeedback = feedbackInput.current.value
    axios.post('http://localhost:3000/api/feedback', {
      email: enteredEmail,
      feedback: enteredFeedback,
    })
  }

  const loadFeedbackHandler = async () => {
    let {
      data: { feedbacks },
    } = await axios.get('http://localhost:3000/api/feedback')
    console.log('feedback', feedbacks)
    setFeedbackData((prev) => {
      return feedbacks
    })
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form action="" method="post" onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Your email address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="message">Your feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInput}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load feedbacks</button>
      {feedbackData &&
        feedbackData.map((x) => {
          return (
            <div key={x._id}>
              <div>{x.email}</div>
              <div>{x.feedback}</div>
            </div>
          )
        })}
    </div>
  )
}

export default HomePage
