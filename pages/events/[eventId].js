import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Head from 'next/head'
import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'
import ErrorAlert from '../../components/ui/error-alert'
import Comments from '../../components/input/comments'
import {
  getEventById,
  getAllEvents,
  getFeaturedEvents_helper,
} from '../../helpers/api-utils'

function EventDetailPage(props) {
  const event = props.selectedEvent
  const comments = props.comments_by_eventId
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  )
}

export const getStaticProps = async (context) => {
  try {
    const { params } = context
    const id = params.eventId
    const event = await getEventById(id)
    // const comments = await commentsById(id)

    return {
      props: {
        selectedEvent: event,
      },
      revalidate: 30,
    }
  } catch (error) {
    console.log(error)
    return {
      notFound: true,
    }
    /* handle error */
  }
}

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents_helper()

  const id_paths = events.map((event) => ({ params: { eventId: event.id } }))
  console.log('id_paths', id_paths)
  return {
    paths: id_paths,
    fallback: true,
  }
}

export default EventDetailPage
