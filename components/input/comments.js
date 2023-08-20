import { useEffect, useState } from 'react'

import CommentList from './comment-list'
import NewComment from './new-comment'
import classes from './comments.module.css'
import axios from 'axios'

function Comments(props) {
  const { eventId } = props

  const [showComments, setShowComments] = useState(false)
  const [comments_by_event_id, set_comments_by_event_id] = useState([])
  const [comment, setComment] = useState({})

  useEffect(() => {
    const comment_data = async () => {
      let { data } = await axios.get(`/api/comment/add/${eventId}`)
      console.log('data', data)
      set_comments_by_event_id(data)
    }
    // if (Object.keys(comment).length === 0 || showComments) {
    comment_data()
  }, [showComments, comment])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus)
  }

  function addCommentHandler(commentData) {
    axios.post(`/api/comment/add/${eventId}`, {
      data: { ...commentData },
    })
    setComment((prev) => ({ ...prev, ...commentData }))
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && (
        <CommentList comments_by_event_id={comments_by_event_id} />
      )}
    </section>
  )
}

export default Comments
