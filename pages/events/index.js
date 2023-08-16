import { Fragment } from 'react'
import { useRouter } from 'next/router'

// import { getAllEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list'
import EventsSearch from '../../components/events/events-search'
import { getAllEvents } from '../../helpers/api-utils'

function AllEventsPage(props) {
  const router = useRouter()
  // const events = getAllEvents();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`

    router.push(fullPath)
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={props.events} />
    </Fragment>
  )
}

export const getStaticProps = async () => {
  try {
    const allEvents = await getAllEvents()
    console.log('allEvents:', allEvents)

    return {
      props: {
        events: allEvents,
      },
    }
  } catch (error) {
    console.log(error)
    return {
      notFound: true,
    }
  }
}
export default AllEventsPage
