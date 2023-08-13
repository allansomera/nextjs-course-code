import { getAllEvents } from '../../dummy-data'
import EventsList from '../../components/events/event-list'
import EventsSearch from '../../components/events/events-search'
import { Fragment } from 'react'
import { useRouter } from 'next/router'

const EventsPage = () => {
  const router = useRouter()
  const events = getAllEvents()
  const findEventsHandler = (year, month) => {
    router.push(`/events/${year}/${month}`)
  }
  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventsList items={events} />
    </Fragment>
  )
}

export default EventsPage
