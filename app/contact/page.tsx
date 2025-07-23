"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert("Thank you for your message! We will get back to you within 24 hours.")
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-blue-900 text-white section-padding">
        <div className="container-max text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Get in touch with our team for inquiries about our educational materials, partnerships, or support.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-blue-900" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Address</h3>
              <p className="text-gray-700 leading-relaxed">
                Office No. 7, Shan Plaza
                <br />
                Gawali Lane #2, New Urdu Bazar
                <br />
                Karachi, Pakistan
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-900" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-700">
                +92 313 3849727
                <br />
                +92 314 2353805
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-900" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-700">
                info@ibceducational.com
                <br />
                support@ibceducational.com
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-900" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Business Hours</h3>
              <p className="text-gray-700">
                Mon - Fri: 9:00 AM - 6:00 PM
                <br />
                Sat: 9:00 AM - 2:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+92 XXX XXXXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                    <select
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="books">Book Information</option>
                      <option value="partnership">Partnership</option>
                      <option value="support">Technical Support</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Please describe your inquiry in detail..."
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary w-full flex items-center justify-center">
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Map */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Us</h2>

              <div className="bg-gray-200 rounded-lg h-64 mb-6 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p>Interactive Map</p>
                  <p className="text-sm">Office No. 7, Shan Plaza, Gawali Lane #2</p>
                  <p className="text-sm">New Urdu Bazar, Karachi, Pakistan</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-900 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Head Office</h3>
                    <p className="text-gray-700">
                      Office No. 7, Shan Plaza, Gawali Lane #2,
                      <br />
                      New Urdu Bazar, Karachi, Pakistan
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-blue-900 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone Numbers</h3>
                    <p className="text-gray-700">
                      +92 313 3849727
                      <br />
                      +92 314 2353805
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-blue-900 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email Addresses</h3>
                    <p className="text-gray-700">
                      info@ibceducational.com
                      <br />
                      support@ibceducational.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-700">Quick answers to common questions about our services and products</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">How can I order books in bulk?</h3>
                <p className="text-gray-700">
                  For bulk orders, please contact our sales team directly at +92 313 3849727 or email us at
                  info@ibceducational.com with your requirements.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Do you offer teacher training?</h3>
                <p className="text-gray-700">
                  Yes, we provide comprehensive teacher training programs and workshops. Contact us to learn about
                  upcoming sessions and customized training options.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">What is your return policy?</h3>
                <p className="text-gray-700">
                  We offer a 30-day return policy for unused books in original condition. Please refer to our return
                  policy page for detailed terms and conditions.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Do you ship internationally?</h3>
                <p className="text-gray-700">
                  Currently, we ship within Pakistan and select international locations. Contact us for specific
                  shipping information to your location.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">How can I become a distributor?</h3>
                <p className="text-gray-700">
                  We welcome partnership inquiries from educational distributors. Please email us your business details
                  and we'll get back to you with partnership information.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Are digital versions available?</h3>
                <p className="text-gray-700">
                  Yes, many of our titles are available in digital format. Please check individual book pages or contact
                  us for digital licensing options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
