import EventItem from './event-item'
import classes from './event-list.module.scss'

const EventsList = ({ items }) => {
  // console.log(items)
  items.forEach((event) => {
    console.log(event)
  })
  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem key={event.id} event_items={event} />
      ))}
    </ul>
  )
}

export default EventsList
