import { useEffect, useState, useContext } from 'react'

import CommentList from './comment-list'
import NewComment from './new-comment'
import classes from './comments.module.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import NotificationContext from '../../store/notification-context'

function Comments(props) {
  const { eventId } = props

  const [showComments, setShowComments] = useState(false)
  const [comments_by_event_id, set_comments_by_event_id] = useState([])
  const [comment, setComment] = useState({})
  const [isFetchingComments, setIsFetchingComments] = useState(false)
  const commentCtx = useContext(NotificationContext)

  useEffect(() => {
    const comment_data = async () => {
      setIsFetchingComments(true)
      let { data } = await axios.get(`/api/comment/add/${eventId}`)
      console.log('fetching data', data)
      set_comments_by_event_id(data)
      setIsFetchingComments(false)
    }
    // if (Object.keys(comment).length === 0 || showComments) {
    comment_data()
  }, [showComments, comment])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus)
  }

  function addCommentHandler(commentData) {
    // axios.post(`/api/comment/add/${eventId}`, {
    //   data: { ...commentData },
    // })

    toast.promise(
      axios.post(`/api/comment/add/${eventId}`, {
        data: { ...commentData },
      }),
      {
        pending: {
          render() {
            commentCtx.showNotification({
              title: 'posting comment...',
              message: 'Posted comment',
              status: 'pending',
            })
            return 'Posting comment...'
          },
          icon: false,
          position: 'bottom-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        },
        success: {
          render() {
            commentCtx.showNotification({
              title: 'Comment posted',
              message: 'Successfully posted comment!',
              status: 'success',
            })
            return 'Comment Posted!'
          },
          // other options
          icon: false,
          position: 'bottom-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        },
      }
    )
    setComment((prev) => ({ ...prev, ...commentData }))
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && (
        <CommentList comments_by_event_id={comments_by_event_id} />
      )}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  )
}

export default Comments
