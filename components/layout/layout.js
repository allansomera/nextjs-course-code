import { Fragment, useContext } from 'react'
import MainNavigation from './main-navigation'

// import MainHeader from './main-header'

function Layout(props) {
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
  )
}

export default Layout
