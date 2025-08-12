"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIntegration } from "@/utils/calender-intergration"
import { Calendar, Download, ExternalLink } from "lucide-react"

interface CalendarIntegrationProps {
  bookingData: {
    service: { name: string; duration: string; price: number }
    barber: { name: string }
    date: Date
    time: string
    firstName: string
    lastName: string
    email: string
    phone: string
    notes?: string
  }
}

export function CalendarIntegrationComponent({ bookingData }: CalendarIntegrationProps) {
  const calendarEvent = CalendarIntegration.createCalendarEvent(bookingData)

  const handleGoogleCalendar = () => {
    const url = CalendarIntegration.generateGoogleCalendarUrl(calendarEvent)
    window.open(url, "_blank")
  }

  const handleOutlookCalendar = () => {
    const url = CalendarIntegration.generateOutlookCalendarUrl(calendarEvent)
    window.open(url, "_blank")
  }

  const handleDownloadICS = () => {
    const filename = `barberpro-appointment-${bookingData.date.toISOString().split("T")[0]}.ics`
    CalendarIntegration.downloadICSFile(calendarEvent, filename)
  }

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Calendar className="w-5 h-5 text-primary" />
          <span>Add to Calendar</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 mb-4">Add this appointment to your calendar so you don't forget!</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button onClick={handleGoogleCalendar} variant="outline" size="sm" className="w-full justify-center">
            <ExternalLink className="w-4 h-4 mr-2" />
            Google Calendar
          </Button>

          <Button onClick={handleOutlookCalendar} variant="outline" size="sm" className="w-full justify-center">
            <ExternalLink className="w-4 h-4 mr-2" />
            Outlook
          </Button>

          <Button onClick={handleDownloadICS} variant="outline" size="sm" className="w-full justify-center">
            <Download className="w-4 h-4 mr-2" />
            Download .ics
          </Button>
        </div>

        <div className="text-xs text-gray-500 mt-3">
          <p>• Google Calendar: Opens in a new tab</p>
          <p>• Outlook: Works with Outlook.com and Outlook app</p>
          <p>• Download .ics: Compatible with Apple Calendar, Thunderbird, and other calendar apps</p>
        </div>
      </CardContent>
    </Card>
  )
}
