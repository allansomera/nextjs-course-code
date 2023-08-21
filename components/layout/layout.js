import { Fragment, useContext } from 'react'

import MainHeader from './main-header'
import Notification from '../ui/notification'
import NotificationContext from '../../store/notification-context'

function Layout(props) {
  const notificationCtx = useContext(NotificationContext)
  const activateNotification = notificationCtx.notification

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activateNotification && (
        <Notification
          title={activateNotification.title}
          message={activateNotification.message}
          status={activateNotification.status}
        />
      )}
    </Fragment>
  )
}

export default Layout
