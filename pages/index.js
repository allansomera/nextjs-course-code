import EventList from '../components/events/event-list'
import { getFeaturedEvents_helper } from '../helpers/api-utils'
import NewsletterRegistration from '../components/input/newsletter-registration'
import Head from 'next/head'

function HomePage(props) {
  // const featuredEvents = getFeaturedEvents();
  // console.log("events", props.events);
  const { events } = props
  // console.log('allEvents', getAllEvents())
  // console.log('featuredEvents', getFeaturedEvents_helper())
  // console.log(featuredEvents)
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={events} />
    </div>
  )
}

export const getStaticProps = async () => {
  try {
    const featuredEvents = await getFeaturedEvents_helper()

    return {
      props: {
        events: featuredEvents,
      },
      revalidate: 1800,
    }
  } catch (error) {
    console.log(error)
    return {
      notFound: true,
    }
  }
}

export default HomePage
