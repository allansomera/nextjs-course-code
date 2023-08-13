import EventList from '../components/events/event-list'
import { getFeaturedEvents } from '../dummy-data'

const StartPage = () => {
  const featuredEvents = getFeaturedEvents()
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  )
}

export default StartPage
