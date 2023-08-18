import axios from 'axios'
import { Fragment, useState } from 'react'
import { getAllFeedbacks } from '../api/feedback'

const FeedbackPage = (props) => {
  const [loadedFeedback, setLoadedFeedback] = useState()
  const loadFeedbackHandler = async (id) => {
    const { data } = await axios.get(`/api/feedback/${id}`)
    // console.log('feedback handler: ', data)
    console.log('feedback handler: ', data.feedbackIdData.feedback)
    setLoadedFeedback((prev) => {
      return (prev = data.feedbackIdData.email)
    })
    // console.log('fedd')
  }

  return (
    <Fragment>
      {loadedFeedback && <Fragment>{loadedFeedback}</Fragment>}
      <ul>
        {props.feedbacks.map((item) => {
          return (
            <Fragment key={item._id}>
              <li>{item.feedback}</li>
              <button onClick={loadFeedbackHandler.bind(null, item._id)}>
                Show Details
              </button>
            </Fragment>
          )
        })}
      </ul>
    </Fragment>
  )
  // return <div>hello</div>
}

export const getStaticProps = async () => {
  const feedback_items = await getAllFeedbacks()
  return {
    props: {
      feedbacks: JSON.parse(JSON.stringify(feedback_items)),
    },
  }
}

export default FeedbackPage
