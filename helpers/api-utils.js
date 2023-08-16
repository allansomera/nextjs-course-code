import dbConnect from '@lib/utils/dbConfig'
import Event from '../models/eventsModel'

export const getAllEvents = async () => {
  try {
    console.log('CONNECTING TO MONGO')
    await dbConnect()
    console.log('CONNECTED TO MONGO')
    console.log('FETCHING DOCUMENTS')
    const events = await Event.find()
    // console.log('events promise:', events)
    console.log('FETCHED DOCUMENTS')
    // console.log('getAllEvents() events: ', events)
    const allEvents = JSON.parse(JSON.stringify(events))

    return allEvents
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export const getFeaturedEvents_helper = async () => {
  try {
    const allEvents = await getAllEvents()
    return allEvents.filter((event) => event.isFeatured)
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export const getEventById = async (id) => {
  try {
    const allEvents = await getAllEvents()
    return allEvents.find((event) => event.id === id)
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
