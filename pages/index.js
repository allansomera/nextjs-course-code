import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/events/event-list";
import dbConnect from "@lib/utils/dbConfig";
import Event from "../models/eventsModel";

function HomePage(props) {
  // const featuredEvents = getFeaturedEvents();
  // console.log("events", props.events);

  const { featuredEvents } = props;
  console.log(featuredEvents);
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
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
    console.log("CONNECTING TO MONGO");
    await dbConnect();
    console.log("CONNECTED TO MONGO");

    console.log("FETCHING DOCUMENTS");
    const events = await Event.find();
    console.log("FETCHED DOCUMENTS");

    return {
      props: {
        featuredEvents: JSON.parse(JSON.stringify(events)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default HomePage;
