import { Fragment } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

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
      <Head>
        <title>All my events</title>
      </Head>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
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
      revalidate: 60,
    }
  } catch (error) {
    console.log(error)
    return {
      notFound: true,
    }
  }
}
export default AllEventsPage
