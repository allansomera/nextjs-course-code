import { createContext, useEffect, useState } from 'react'

const NotificationContext = createContext({
  notification: null,
  showNotification: (notificationData) => {},
  hideNotification: () => {},
})

export const NotificationContextProvider = (props) => {
  const [activateNotification, setActivateNotification] = useState()

  useEffect(() => {
    if (
      activateNotification &&
      (activateNotification.status === 'success' ||
        activateNotification.status === 'error')
    ) {
      const timer = setTimeout(() => {
        setActivateNotification(null)
      }, 1600)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [activateNotification])

  const showNotificationHandler = (notificationData) => {
    setActivateNotification(notificationData)
  }
  const hideNotificationHandler = () => {
    setActivateNotification(null)
  }

  const context = {
    notification: activateNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  }

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
