import { Routes, Route } from 'react-router-dom'
import { DashboardPage } from './pages/DashboardPage'
import { Homepage } from './pages/Homepage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SIgnupPage'
import { BookingPage } from './pages/BookingPage'
import { NotificationPage } from './pages/NotificationPage'
import { PaymentPage } from './pages/PaymentPage'
import { ForgotPassword } from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword';
import ForRent from './pages/ForRent'
import ForSale from './pages/ForSale'
import AboutPage from './pages/AboutUs'
import ContactPage from './pages/ContactUs'
import Footer from './pages/Footer'
import PropertyDetails from './pages/PropertyDetails'
import './App.css'

function App() {
  return (      
      <div>
      {<DashboardPage />}
      <Routes>                      
      <Route path="/" element={<Homepage />} />      
      <Route path="/login" element={<LoginPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/notifications" element={<NotificationPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/for-rent" element={<ForRent />} />  
      <Route path="/for-sale" element={<ForSale />} />  
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} /> 
      <Route path="/property/:id" element={<PropertyDetails />} />           
      </Routes>
      <Footer />        
      </div>            
  )
}

export default App