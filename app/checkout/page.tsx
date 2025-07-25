"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"
import { CreditCard, Truck, Shield, MapPin } from "lucide-react"

// City and Area data structure
const cityAreaData = {
  "Karachi": [
    "Clifton", "Defence", "Gulshan-e-Iqbal", "North Nazimabad", "Gulberg", 
    "Malir", "Korangi", "Landhi", "Orangi Town", "Saddar", "Lyari", 
    "Kemari", "Bin Qasim", "Gadap", "Shah Faisal", "Jamshed Town", 
    "Liaquatabad", "New Karachi", "Federal B Area", "PECHS"
  ],
  "Lahore": [
    "Gulberg", "Defence", "Model Town", "Johar Town", "Bahria Town", 
    "DHA", "Cantt", "Anarkali", "Shadman", "Garden Town", "Allama Iqbal Town",
    "Samnabad", "Faisal Town", "Iqbal Town", "Wapda Town", "Valencia",
    "Green Town", "Muslim Town", "Mozang", "Ichhra"
  ],
  "Islamabad": [
    "F-6", "F-7", "F-8", "F-10", "F-11", "G-6", "G-7", "G-8", "G-9", "G-10",
    "G-11", "G-13", "G-14", "G-15", "G-16", "H-8", "H-9", "H-10", "H-11", "H-12",
    "I-8", "I-9", "I-10", "I-11", "I-12", "I-14", "I-15", "I-16", "E-7", "E-8"
  ],
  "Rawalpindi": [
    "Cantt", "Saddar", "Raja Bazar", "Moti Bazar", "Bhabra Bazar", 
    "Lalkurti", "Westridge", "Adiala", "Chaklala", "Gulberg", 
    "Satellite Town", "Bahria Town", "DHA", "Askari", "Peshawar Road",
    "Murree Road", "IJP Road", "Soan", "Koral", "Kahuta"
  ],
  "Faisalabad": [
    "D Ground", "Gulberg", "Jinnah Colony", "Madina Town", "Samundri Road",
    "Sargodha Road", "Jaranwala Road", "Lyallpur Town", "Peoples Colony",
    "Civil Lines", "Canal Road", "Satiana Road", "Batala Colony", "Muhammadabad",
    "Raza Abad", "Ghulam Muhammad Abad", "Nishatabad", "Millat Town", "Jhang Road"
  ],
  "Multan": [
    "Cantt", "Gulgasht", "Shah Rukn-e-Alam", "Bosan Road", "Vehari Road",
    "Khanewal Road", "Lodhran Road", "Shujabad Road", "Mailsi Road",
    "Jalalpur Pirwala", "Lal Sohanra", "Qasim Bela", "Shah Shams",
    "Sikandarabad", "Shah Yousaf", "Shah Gardez", "Mumtazabad", "Shah Rukn-e-Alam"
  ],
  "Peshawar": [
    "Cantt", "University Town", "Hayatabad", "Gulbahar", "Saddar",
    "Charsadda Road", "Kohat Road", "Jamrud Road", "Ring Road",
    "Warsak Road", "Khyber Road", "Grand Trunk Road", "Peshawar Road",
    "Chitral Road", "Malakand Road", "Swat Road", "Dir Road", "Bannu Road"
  ],
  "Quetta": [
    "Cantt", "Jinnah Town", "Samungli", "Kuchlak", "Hanna Valley",
    "Spinny Road", "Sariab Road", "Brewery Road", "Prince Road",
    "Joint Road", "Mastung Road", "Kalat Road", "Chaman Road", "Loralai Road"
  ],
  "Sialkot": [
    "Cantt", "Daska Road", "Gujranwala Road", "Lahore Road", "Wazirabad Road",
    "Pasrur Road", "Narowal Road", "Zafarwal Road", "Sambrial Road",
    "Chawinda Road", "Badiana Road", "Begowala Road", "Kotli Loharan Road"
  ],
  "Gujranwala": [
    "Cantt", "Civil Lines", "Model Town", "Peoples Colony", "Satellite Town",
    "Gulberg", "Nishat Colony", "Shalimar Colony", "Alipur Chatha Road",
    "Wazirabad Road", "Sialkot Road", "Lahore Road", "Sheikhupura Road",
    "Hafizabad Road", "Mandi Bahauddin Road", "Gujrat Road"
  ]
}

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    area: "",
    postalCode: "",
    paymentMethod: "cod",
  })

  const [selectedCity, setSelectedCity] = useState("")
  const [selectedArea, setSelectedArea] = useState("")
  const [availableAreas, setAvailableAreas] = useState<string[]>([])

  const cities = Object.keys(cityAreaData)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name === "city") {
      setSelectedCity(value)
      setSelectedArea("")
      setFormData(prev => ({ ...prev, city: value, area: "" }))
      
      if (value) {
        setAvailableAreas(cityAreaData[value as keyof typeof cityAreaData] || [])
      } else {
        setAvailableAreas([])
      }
    } else if (name === "area") {
      setSelectedArea(value)
      setFormData(prev => ({ ...prev, area: value }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle order submission
    alert("Order placed successfully! You will receive a confirmation email shortly.")
    clearCart()
  }

  const subtotal = getTotalPrice()
  const shipping = 150
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding">
        <div className="container-max">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Checkout Form */}
            <div className="space-y-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                    Shipping Address
                  </h2>
                  <div className="space-y-4">
                    {/* City Dropdown */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                      <select
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      >
                        <option value="">Select a city</option>
                        {cities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Area Dropdown */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Area *</label>
                      <select
                        name="area"
                        required
                        value={formData.area}
                        onChange={handleInputChange}
                        disabled={!selectedCity}
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          !selectedCity ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                        }`}
                      >
                        <option value="">
                          {selectedCity ? 'Select an area' : 'Please select a city first'}
                        </option>
                        {availableAreas.map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Address Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Address *</label>
                      <textarea
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter your complete address (house number, street, landmark, etc.)"
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>

                    {/* Postal Code */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code *</label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="Enter postal code"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === "cod"}
                        onChange={handleInputChange}
                        className="text-blue-600"
                      />
                      <Truck className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">Cash on Delivery</span>
                    </label>
                    <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === "card"}
                        onChange={handleInputChange}
                        className="text-blue-600"
                      />
                      <CreditCard className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">Credit/Debit Card</span>
                    </label>
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full">
                  Place Order
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={60}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.grade}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Rs. {shipping}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total</span>
                    <span className="text-blue-900">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Security Features */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                  <h3 className="font-bold text-gray-900">Secure Checkout</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• SSL encrypted secure payment</li>
                  <li>• 30-day money-back guarantee</li>
                  <li>• Free shipping on orders over Rs. 2,000</li>
                  <li>• Customer support available 24/7</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
