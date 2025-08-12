interface CalendarEvent {
  title: string
  description: string
  startDate: Date
  endDate: Date
  location: string
  attendees?: string[]
}

export class CalendarIntegration {
  // Generate Google Calendar URL
  static generateGoogleCalendarUrl(event: CalendarEvent): string {
    const formatDate = (date: Date): string => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    }

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: event.title,
      dates: `${formatDate(event.startDate)}/${formatDate(event.endDate)}`,
      details: event.description,
      location: event.location,
      trp: "false",
      sprop: "website:barberpro.com",
    })

    return `https://calendar.google.com/calendar/render?${params.toString()}`
  }

  // Generate Outlook Calendar URL
  static generateOutlookCalendarUrl(event: CalendarEvent): string {
    const formatDate = (date: Date): string => {
      return date.toISOString()
    }

    const params = new URLSearchParams({
      subject: event.title,
      startdt: formatDate(event.startDate),
      enddt: formatDate(event.endDate),
      body: event.description,
      location: event.location,
      allday: "false",
      uid: `barberpro-${Date.now()}@barberpro.com`,
    })

    return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`
  }

  // Generate ICS file content for download
  static generateICSFile(event: CalendarEvent): string {
    const formatDate = (date: Date): string => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    }

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//BarberPro//Appointment//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:barberpro-${Date.now()}@barberpro.com`,
      `DTSTART:${formatDate(event.startDate)}`,
      `DTEND:${formatDate(event.endDate)}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description.replace(/\n/g, "\\n")}`,
      `LOCATION:${event.location}`,
      "STATUS:CONFIRMED",
      "SEQUENCE:0",
      "BEGIN:VALARM",
      "TRIGGER:-PT15M",
      "ACTION:DISPLAY",
      "DESCRIPTION:Appointment reminder",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n")

    return icsContent
  }

  // Download ICS file
  static downloadICSFile(event: CalendarEvent, filename = "appointment.ics"): void {
    const icsContent = this.generateICSFile(event)
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(link.href)
  }

  // Calculate service duration in minutes
  static parseDuration(duration: string): number {
    const match = duration.match(/(\d+)\s*(min|hour|hr)/)
    if (!match) return 60 // default 1 hour

    const value = Number.parseInt(match[1])
    const unit = match[2]

    if (unit === "hour" || unit === "hr") {
      return value * 60
    }
    return value
  }

  // Create calendar event from booking data
  static createCalendarEvent(bookingData: {
    service: { name: string; duration: string; price: number }
    barber: { name: string }
    date: Date
    time: string
    firstName: string
    lastName: string
    email: string
    phone: string
    notes?: string
  }): CalendarEvent {
    // Parse time and create start date
    const [timeStr, period] = bookingData.time.split(" ")
    const [hours, minutes] = timeStr.split(":").map(Number)
    let hour24 = hours

    if (period === "PM" && hours !== 12) {
      hour24 += 12
    } else if (period === "AM" && hours === 12) {
      hour24 = 0
    }

    const startDate = new Date(bookingData.date)
    startDate.setHours(hour24, minutes, 0, 0)

    // Calculate end date based on service duration
    const durationMinutes = this.parseDuration(bookingData.service.duration)
    const endDate = new Date(startDate.getTime() + durationMinutes * 60000)

    const title = `${bookingData.service.name} - BarberPro`
    const description = [
      `Service: ${bookingData.service.name}`,
      `Barber: ${bookingData.barber.name}`,
      `Client: ${bookingData.firstName} ${bookingData.lastName}`,
      `Phone: ${bookingData.phone}`,
      `Email: ${bookingData.email}`,
      `Duration: ${bookingData.service.duration}`,
      `Price: $${bookingData.service.price}`,
      bookingData.notes ? `Notes: ${bookingData.notes}` : "",
      "",
      "Please arrive 10 minutes early for your appointment.",
      "",
      "To reschedule or cancel, please call (208) 123-4567 at least 24 hours in advance.",
    ]
      .filter(Boolean)
      .join("\n")

    const location = "BarberPro, 123 Main Street, Downtown"

    return {
      title,
      description,
      startDate,
      endDate,
      location,
      attendees: [bookingData.email],
    }
  }
}
