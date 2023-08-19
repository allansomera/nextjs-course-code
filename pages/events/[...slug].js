import { Fragment } from 'react'
import { useRouter } from 'next/router'

import EventList from '../../components/events/event-list'
import { getFilteredEvents } from '../../helpers/api-utils'
import ResultsTitle from '../../components/events/results-title'
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'
import Head from 'next/head'

function FilteredEventsPage(props) {
  const [loadedEvents, setLoadedEvents] = useState()
  const router = useRouter()

  const filterData = router.query.slug

  const filteredYear = filterData[0]
  const filteredMonth = filterData[1]

  const numYear = +filteredYear
  const numMonth = +filteredMonth

  const pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="discription"
        content={`All events for ${numMonth}/${numYear}.`}
      />
    </Head>
  )

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`A list of filtered events.`} />
    </Head>
  )

  if (!filterData) {
    return (
      <Fragment>
        {pageHeadData}
        <p className="center">Loading...</p>
      </Fragment>
    )
  }

  if (props.hasError) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    )
  }

  const filteredEvents = props.events

  const date = new Date(props.date.year, props.date.month - 1)
  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  )
}

export const getServerSideProps = async (context) => {
  const { params } = context

  const filterData = params.slug

  const filteredYear = filterData[0]
  const filteredMonth = filterData[1]

  const numYear = +filteredYear
  const numMonth = +filteredMonth

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${numMonth}/${numYear}.`}
      />
    </Head>
  )

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return {
      props: { hasError: true },
      // notFound: true
    }
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  })

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  }
}

export default FilteredEventsPage
