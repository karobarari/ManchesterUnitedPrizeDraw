import { Routes, Route } from 'react-router-dom'
import Layout        from './components/Layout'
import Home          from './pages/Home'
import Account       from './pages/account/Account'
import Profile from './pages/account/Profile'
import Subscriptions from './pages/account/Subscriptions'
import Payments      from './pages/account/Payments'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        {/* Profile section */}
        <Route path="/profile" element={<Account />}>
          <Route index                element={<Profile />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="payments"      element={<Payments />} />
        </Route>
      </Route>
    </Routes>
  )
}