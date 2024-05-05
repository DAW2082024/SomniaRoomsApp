import { Outlet } from 'react-router-dom'
import './Root.css'
import AppHeader from '../components/app-header'
import AppFooter from '../components/app-footer'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

function Root() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppHeader />
        <div className='appPage bg-background text-foreground'>
          <Outlet />
        </div>
        <Toaster />
        <AppFooter />
      </ThemeProvider>
    </>
  )
}

export default Root
