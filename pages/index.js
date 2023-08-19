import { getFeaturedEvents } from '../dummy-data'
import EventList from '../components/events/event-list'
import dbConnect from '@lib/utils/dbConfig'
import Event from '../models/eventsModel'
import { getFeaturedEvents_helper, getAllEvents } from '../helpers/api-utils'
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

// export const getServerSideProps = async () => {
//   try {
//     console.log("CONNECTING TO MONGO");
//     await dbConnect();
//     console.log("CONNECTED TO MONGO");
//
//     console.log("FETCHING DOCUMENTS");
//     const events = await Event.find();
//     console.log("FETCHED DOCUMENTS");
//
//     return {
//       props: {
//         featuredEvents: JSON.parse(JSON.stringify(events)),
//       },
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       notFound: true,
//     };
//   }
// };

export const getStaticProps = async () => {
  try {
    // console.log('CONNECTING TO MONGO')
    // await dbConnect()
    // console.log('CONNECTED TO MONGO')
    // console.log('FETCHING DOCUMENTS')
    // const events = await Event.find()
    // console.log('events promise:', events)
    // console.log('FETCHED DOCUMENTS')
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
