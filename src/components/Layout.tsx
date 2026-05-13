import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-black flex-1 flex flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      </div>
    </div>
  )
}