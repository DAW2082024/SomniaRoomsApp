import { Outlet } from 'react-router-dom'
import './Root.css'
import AppHeader from '../components/app-header'
import AppFooter from '../components/app-footer'

function Root() {

  return (
    <>
      <AppHeader />
      <div className='appPage'>
        <Outlet />
      </div>
      <AppFooter />
    </>
  )
}

export default Root
