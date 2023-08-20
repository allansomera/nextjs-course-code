import dbConnect from '@lib/utils/dbConfig'
import Event from '../models/eventsModel'
import Comment from '../models/commentsModel'

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

export const getFilteredEvents = async (dateFilter) => {
  const allEvents = await getAllEvents()
  const { year, month } = dateFilter

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date)
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    )
  })

  return filteredEvents
}

export const getCommentsById = async (eventid) => {
  try {
    await dbConnect()
    const comments = await Comment.find({ event_id: eventid })
    const allComments_by_id = JSON.parse(JSON.stringify(comments))

    return allComments_by_id
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
