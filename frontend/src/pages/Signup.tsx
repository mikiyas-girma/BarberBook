import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import useAuth from '@/hooks/useAuth'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { userActions } from '@/redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

export default function RegistrationPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [accountType, setAccountType] = useState<'barber' | 'customer'>('barber')
  const [termsAccepted, setTermsAccepted] = useState(false)

  // Merchant (Barber) fields
  const [barberName, setBarberName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [companyLocation, setCompanyLocation] = useState('')
  const [businessEmail, setBusinessEmail] = useState('')
  const [barberPhone, setBarberPhone] = useState('')
  const [barberPassword, setBarberPassword] = useState('')

  // Customer (Agent) fields
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerPassword, setCustomerPassword] = useState('')

  const { signUp } = useAuth()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!termsAccepted) {
      alert('Please accept the terms and conditions')
      return
    }

    const userData = accountType === 'barber' 
      ? {
          isBarber: true,
          name: barberName,
          businessName,
          companyLocation,
          email: businessEmail,
          phoneNumber: barberPhone,
          password: barberPassword,
        }
      : {
          name: customerName,
          email: customerEmail,
          phoneNumber: customerPhone,
          password: customerPassword,
        }

    try {
      dispatch(userActions.signUpStart())
      await signUp(userData)
      dispatch(userActions.signUpSuccess())
    if (accountType === 'barber') {
      navigate('/dashboard')
    } else {
      navigate('/barbers')
    }
    } catch (error) {
      dispatch(userActions.signUpFailure(error))
      alert('Signup failed. Please try again.')
    }
  }

  const renderForm = () => {
    if (accountType === 'barber') {
      return (
        <>
          <div>
            <Label htmlFor="fullName">Your Full Name</Label>
            <Input 
              className="bg-white rounded-none border-amber-700" 
              id="fullName" 
              placeholder="eg. Abebe Balcha" 
              value={barberName}
              onChange={(e) => setBarberName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="businessName">Your Business Name</Label>
            <Input 
              className="bg-white rounded-none border-amber-700" 
              id="businessName" 
              placeholder="Your business name" 
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="companyLocation">Where is your company?</Label>
            <Input 
              className="bg-white rounded-none border-amber-700" 
              id="companyLocation" 
              placeholder="Complete location to your barber shop" 
              value={companyLocation}
              onChange={(e) => setCompanyLocation(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="businessEmail">Business E-mail</Label>
            <Input 
              className="bg-white rounded-none border-amber-700" 
              id="businessEmail" 
              type="email" 
              placeholder="Enter your email" 
              value={businessEmail}
              onChange={(e) => setBusinessEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="phoneNumber">Phone number</Label>
            <Input 
              className="bg-white rounded-none border-amber-700" 
              id="phoneNumber" 
              type="tel" 
              placeholder="Enter your phone number" 
              value={barberPhone}
              onChange={(e) => setBarberPhone(e.target.value)}
              required
            />
          </div>
        </>
      )
    } else {
      return (
        <>
          <div>
            <Label htmlFor="customerName">Your Full Name</Label>
            <Input 
              className="bg-white rounded-none border-amber-700" 
              id="customerName" 
              placeholder="eg. Abebe Balcha" 
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="customerEmail">E-mail</Label>
            <Input 
              className="bg-white rounded-none border-amber-700" 
              id="customerEmail" 
              type="email" 
              placeholder="Enter your email" 
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="customerPhone">Phone number</Label>
            <Input 
              className="bg-white rounded-none border-amber-700" 
              id="customerPhone" 
              type="tel" 
              placeholder="Enter your phone number" 
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              required
            />
          </div>
        </>
      )
    }
  }

  return (
    <div className="mt-2 font-space_grotesk bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white mx-auto">
        <div className="flex flex-col md:flex-row ">
          {/* Left side - Dark section */}
          <div className="bg-gray-900 text-white p-12 md:w-1/2 space-y-8">
            <h2 className="text-4xl font-bold mb-2">BarberBook</h2>
            <div className="bg-gray-800 rounded-xl p-6 mb-8">
              <h3 className="text-2xl font-semibold mb-4">Welcome to BarberBook</h3>
              <p className="text-gray-400 mb-4">
                BarberBook is your ultimate solution for managing and growing your barber business. 
                Track appointments, manage clients, and analyze your business performance all in one place.
              </p>
              <div className="flex items-center">
                <img src="/api/placeholder/40/40" alt="User" className="w-10 h-10 rounded-full mr-4" />
                <div>
                  <p className="font-semibold">Mikiyas Girma</p>
                  <p className="text-sm text-gray-400">Founder [BarberBook plc]</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-gray-700"></div>
            </div>
          </div>

          {/* Right side - Registration form */}
          <div className="p-12 md:w-1/2 bg-gray-50 text-gray-800">
            <h2 className="text-3xl font-bold mb-8">Create an account</h2>
            <div className="flex space-x-4 mb-6">
              <Button 
                className={`w-1/2 border-2 ${accountType === 'barber' ? 'border-amber-500' : 'border-gray-300'}`}
                onClick={() => setAccountType('barber')}
              >
                Barber
              </Button>
              <Button 
                className={`w-1/2 border-2  ${accountType === 'customer' ? 'border-amber-500' : 'border-gray-300'}`}
                onClick={() => setAccountType('customer')}
              >
                Customer
              </Button>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {renderForm()}
              <div className="relative">
                <Label htmlFor="password">Password</Label>
                <Input 
                  className="bg-white rounded-none border-amber-700" 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter your password" 
                  value={accountType === 'barber' ? barberPassword : customerPassword}
                  onChange={(e) => accountType === 'barber' ? setBarberPassword(e.target.value) : setCustomerPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="flex items-center space-x-4 mb-2">
                <Checkbox 
                  id="terms" 
                  className='border border-blue'
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I accept the <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                </label>
              </div>
              <Button type="submit" className="w-full rounded-none border-amber-700 bg-amber-500 hover:bg-orange-600">
                Create an Account
              </Button>
            </form>
            <p className="text-center mt-4 text-sm text-gray-600">
              Already have an account? <a href="#" className="text-blue-600 hover:underline">Log In</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
