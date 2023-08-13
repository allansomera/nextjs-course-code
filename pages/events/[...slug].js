import { useRouter } from 'next/router'
import { getFilteredEvents } from '../../dummy-data'
import EventsList from '../../components/events/event-list'
import ResultsTitle from '../../components/events/results-title'
import { Fragment } from 'react'
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'

const FilteredEventsPage = () => {
  const router = useRouter()

  if (!router.query.slug) {
    return <p className="center">Loading...</p>
  }
  console.log(router.query)
  // console.log(router.query.slug)
  // const filteredData = router.query.slug
  const filteredYear = router.query.slug[0]
  // console.log(filteredYear)
  const filteredMonth = router.query.slug[1]
  // const filteredYear = filteredData[0]
  // const filteredMonth = filteredData[1]
  //
  const numYear = +filteredYear
  const numMonth = +filteredMonth
  // router.push(`/events/${q_year}/${q_month}`)
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    )
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  })

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    )
  }

  const date = new Date(numYear, numMonth)
  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventsList items={filteredEvents} />
    </Fragment>
  )
}
export default FilteredEventsPage
