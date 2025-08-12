"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { CalendarIntegration } from "@/utils/calender-intergration"
import { ReminderManagement } from "@/components/reminder-management"
import { ReminderService } from "@/utils/reminder-service"
import { X, Clock, User, CalendarIcon, Check } from "lucide-react"

interface BookingData {
  service: string
  barber: string
  date: Date | undefined
  time: string
  firstName: string
  lastName: string
  email: string
  phone: string
  notes: string
}

interface ReminderPreferences {
  emailReminders: boolean
  smsReminders: boolean
  confirmationEmail: boolean
  confirmationSMS: boolean
  twentyFourHourEmail: boolean
  twentyFourHourSMS: boolean
  oneHourEmail: boolean
  oneHourSMS: boolean
}

interface BookingSystemProps {
  isOpen: boolean
  onClose: () => void
}

export function BookingSystem({ isOpen, onClose }: BookingSystemProps) {
  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState<BookingData>({
    service: "",
    barber: "",
    date: undefined,
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  })
  const [reminderPreferences, setReminderPreferences] = useState<ReminderPreferences>({
    emailReminders: true,
    smsReminders: true,
    confirmationEmail: true,
    confirmationSMS: true,
    twentyFourHourEmail: true,
    twentyFourHourSMS: true,
    oneHourEmail: true,
    oneHourSMS: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [appointmentId, setAppointmentId] = useState<string>("")

  const services = [
    { id: "classic-cut", name: "Classic Cut", duration: "45 min", price: 45 },
    { id: "premium-cut", name: "Premium Cut & Style", duration: "60 min", price: 65 },
    { id: "buzz-cut", name: "Buzz Cut", duration: "20 min", price: 25 },
    { id: "hot-towel-shave", name: "Hot Towel Shave", duration: "45 min", price: 45 },
    { id: "beard-trim", name: "Beard Trim & Shape", duration: "30 min", price: 35 },
    { id: "full-service", name: "The Gentleman Package", duration: "2 hours", price: 120 },
  ]

  const barbers = [
    { id: "marcus", name: "Marc Johnson", specialty: "Master Barber", avatar: "/images/gallery-2.jpeg" },
    { id: "alex", name: "Alex Rodriz", specialty: "Modern Styles", avatar: "/images/gallery-1.jpeg" },
    { id: "david", name: "David Jhen", specialty: "Traditional Cuts", avatar: "/images/gallery-3.jpeg" },
  ]

  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
  ]

  const validateStep = (stepNumber: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (stepNumber === 1) {
      if (!bookingData.service) newErrors.service = "Please select a service"
      if (!bookingData.barber) newErrors.barber = "Please select a barber"
    }

    if (stepNumber === 2) {
      if (!bookingData.date) newErrors.date = "Please select a date"
      if (!bookingData.time) newErrors.time = "Please select a time"
    }

    if (stepNumber === 3) {
      if (!bookingData.firstName.trim()) newErrors.firstName = "First name is required"
      if (!bookingData.lastName.trim()) newErrors.lastName = "Last name is required"
      if (!bookingData.email.trim()) {
        newErrors.email = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(bookingData.email)) {
        newErrors.email = "Please enter a valid email"
      }
      if (!bookingData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^(\+\d{1,3}\s?)?(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/.test(bookingData.phone.trim())) {
        newErrors.phone = "Please enter a valid phone number";
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) return

    setIsSubmitting(true)

    try {
      // Generate appointment ID
      const newAppointmentId = ReminderService.generateAppointmentId()
      setAppointmentId(newAppointmentId)

      // Simulate API call to save booking
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Schedule reminders if enabled
      if (reminderPreferences.emailReminders || reminderPreferences.smsReminders) {
        const selectedService = services.find((s) => s.id === bookingData.service)!
        const selectedBarber = barbers.find((b) => b.id === bookingData.barber)!

        const reminderData = {
          appointmentId: newAppointmentId,
          customerName: `${bookingData.firstName} ${bookingData.lastName}`,
          customerEmail: bookingData.email,
          customerPhone: bookingData.phone,
          serviceName: selectedService.name,
          barberName: selectedBarber.name,
          appointmentDate: bookingData.date!,
          appointmentTime: bookingData.time,
          duration: selectedService.duration,
          price: selectedService.price,
          notes: bookingData.notes,
        }

        await ReminderService.scheduleReminders(reminderData)
      }

      setStep(4)
    } catch (error) {
      console.error("Error submitting booking:", error)
      // Handle error (show error message to user)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetBooking = () => {
    setStep(1)
    setBookingData({
      service: "",
      barber: "",
      date: undefined,
      time: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      notes: "",
    })
    setReminderPreferences({
      emailReminders: true,
      smsReminders: true,
      confirmationEmail: true,
      confirmationSMS: true,
      twentyFourHourEmail: true,
      twentyFourHourSMS: true,
      oneHourEmail: true,
      oneHourSMS: false,
    })
    setErrors({})
    setAppointmentId("")
    onClose()
  }

  const selectedService = services.find((s) => s.id === bookingData.service)
  const selectedBarber = barbers.find((b) => b.id === bookingData.barber)

  // Prepare data for calendar integration
  const calendarBookingData =
    selectedService && selectedBarber && bookingData.date
      ? {
          service: selectedService,
          barber: selectedBarber,
          date: bookingData.date,
          time: bookingData.time,
          firstName: bookingData.firstName,
          lastName: bookingData.lastName,
          email: bookingData.email,
          phone: bookingData.phone,
          notes: bookingData.notes,
        }
      : null

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">Book Appointment</CardTitle>
          <Button variant="ghost" size="sm" onClick={resetBooking}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    stepNum <= step ? "bg-primary text-black" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {stepNum < step ? <Check className="w-4 h-4" /> : stepNum}
                </div>
                {stepNum < 4 && <div className={`w-12 h-0.5 mx-2 ${stepNum < step ? "bg-primary" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Service & Barber Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <Label className="text-lg font-semibold mb-4 block">Select Service</Label>
                <div className="grid gap-3">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        bookingData.service === service.id
                          ? "border-primary bg-primary/10"
                          : "border-gray-200 hover:border-primary/50"
                      }`}
                      onClick={() => setBookingData({ ...bookingData, service: service.id })}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{service.name}</h3>
                          <p className="text-sm text-gray-600">{service.duration}</p>
                        </div>
                        <Badge variant="secondary">${service.price}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
              </div>

              <div>
                <Label className="text-lg font-semibold mb-4 block">Select Barber</Label>
                <div className="grid gap-3">
                  {barbers.map((barber) => (
                    <div
                      key={barber.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        bookingData.barber === barber.id
                          ? "border-primary bg-primary/10"
                          : "border-gray-200 hover:border-primary/50"
                      }`}
                      onClick={() => setBookingData({ ...bookingData, barber: barber.id })}
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={barber.avatar || "/placeholder.svg"}
                          alt={barber.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold">{barber.name}</h3>
                          <p className="text-sm text-gray-600">{barber.specialty}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.barber && <p className="text-red-500 text-sm mt-1">{errors.barber}</p>}
              </div>

              <Button onClick={handleNext} className="w-full bg-primary hover:bg-primary/90 text-black">
                Next: Select Date & Time
              </Button>
            </div>
          )}

          {/* Step 2: Date & Time Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-lg font-semibold mb-4 block">Select Date</Label>
                  <Calendar
                    mode="single"
                    selected={bookingData.date}
                    onSelect={(date) => setBookingData({ ...bookingData, date })}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    className="rounded-md border"
                  />
                  {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                </div>

                <div>
                  <Label className="text-lg font-semibold mb-4 block">Select Time</Label>
                  <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={bookingData.time === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setBookingData({ ...bookingData, time })}
                        className={bookingData.time === time ? "bg-primary text-black" : ""}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                  {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                </div>
              </div>

              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleNext} className="flex-1 bg-primary hover:bg-primary/90 text-black">
                  Next: Your Details
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Customer Information & Reminders */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={bookingData.firstName}
                    onChange={(e) => setBookingData({ ...bookingData, firstName: e.target.value })}
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={bookingData.lastName}
                    onChange={(e) => setBookingData({ ...bookingData, lastName: e.target.value })}
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={bookingData.email}
                  onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <Label htmlFor="notes">Special Requests (Optional)</Label>
                <Textarea
                  id="notes"
                  value={bookingData.notes}
                  onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                  placeholder="Any special requests or notes for your barber..."
                  rows={3}
                />
              </div>

              {/* Reminder Preferences */}
              <ReminderManagement
                onPreferencesChange={setReminderPreferences}
                initialPreferences={reminderPreferences}
              />

              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-primary hover:bg-primary/90 text-black"
                >
                  {isSubmitting ? "Booking..." : "Confirm Booking"}
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-green-600" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-green-600 mb-2">Booking Confirmed!</h2>
                <p className="text-gray-600">Your appointment has been successfully booked.</p>
                {appointmentId && <p className="text-sm text-gray-500 mt-2">Appointment ID: {appointmentId}</p>}
              </div>

              <Card className="bg-gray-50">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-primary" />
                    <span>
                      {selectedService?.name} with {selectedBarber?.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    <span>
                      {bookingData.date?.toLocaleDateString()} at {bookingData.time}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>{selectedService?.duration}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold">Total: ${selectedService?.price}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Calendar Integration */}
              {calendarBookingData && <CalendarIntegration bookingData={calendarBookingData} />}

              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  {reminderPreferences.confirmationEmail && "A confirmation email has been sent to your inbox."}
                </p>
                <p className="text-sm text-gray-600">
                  {reminderPreferences.confirmationSMS && "A confirmation SMS has been sent to your phone."}
                </p>
                <p className="text-sm text-gray-600">Please arrive 10 minutes early for your appointment.</p>
              </div>

              <Button onClick={resetBooking} className="w-full bg-primary hover:bg-primary/90 text-black">
                Book Another Appointment
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}