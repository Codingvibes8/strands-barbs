"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell, Mail, MessageSquare, Clock, Check } from "lucide-react"

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

interface ReminderManagementProps {
  onPreferencesChange: (preferences: ReminderPreferences) => void
  initialPreferences?: ReminderPreferences
}

export function ReminderManagement({ onPreferencesChange, initialPreferences }: ReminderManagementProps) {
  const [preferences, setPreferences] = useState<ReminderPreferences>(
    initialPreferences || {
      emailReminders: true,
      smsReminders: true,
      confirmationEmail: true,
      confirmationSMS: true,
      twentyFourHourEmail: true,
      twentyFourHourSMS: true,
      oneHourEmail: true,
      oneHourSMS: false, // Default to off for 1-hour SMS to avoid spam
    },
  )

  const handlePreferenceChange = (key: keyof ReminderPreferences, value: boolean) => {
    const newPreferences = { ...preferences, [key]: value }
    setPreferences(newPreferences)
    onPreferencesChange(newPreferences)
  }

  const reminderTypes = [
    {
      id: "confirmation",
      title: "Booking Confirmation",
      description: "Immediate confirmation when you book",
      icon: Check,
      emailKey: "confirmationEmail" as keyof ReminderPreferences,
      smsKey: "confirmationSMS" as keyof ReminderPreferences,
    },
    {
      id: "24hour",
      title: "24-Hour Reminder",
      description: "Reminder the day before your appointment",
      icon: Clock,
      emailKey: "twentyFourHourEmail" as keyof ReminderPreferences,
      smsKey: "twentyFourHourSMS" as keyof ReminderPreferences,
    },
    {
      id: "1hour",
      title: "1-Hour Reminder",
      description: "Final reminder before your appointment",
      icon: Bell,
      emailKey: "oneHourEmail" as keyof ReminderPreferences,
      smsKey: "oneHourSMS" as keyof ReminderPreferences,
    },
  ]

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-primary" />
          <span>Reminder Preferences</span>
        </CardTitle>
        <p className="text-sm text-gray-600">Choose how you'd like to receive appointment reminders</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Global toggles */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Switch
              id="emailReminders"
              checked={preferences.emailReminders}
              onCheckedChange={(checked) => handlePreferenceChange("emailReminders", checked)}
            />
            <Label htmlFor="emailReminders" className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Email Reminders</span>
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="smsReminders"
              checked={preferences.smsReminders}
              onCheckedChange={(checked) => handlePreferenceChange("smsReminders", checked)}
            />
            <Label htmlFor="smsReminders" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>SMS Reminders</span>
            </Label>
          </div>
        </div>

        {/* Specific reminder types */}
        <div className="space-y-4">
          {reminderTypes.map((type) => (
            <div key={type.id} className="border rounded-lg p-4">
              <div className="flex items-start space-x-3 mb-3">
                <type.icon className="w-5 h-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold">{type.title}</h4>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 ml-8">
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`${type.id}-email`}
                    checked={preferences[type.emailKey] && preferences.emailReminders}
                    disabled={!preferences.emailReminders}
                    onCheckedChange={(checked) => handlePreferenceChange(type.emailKey, checked)}
                  />
                  <Label htmlFor={`${type.id}-email`} className="text-sm">
                    Email
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id={`${type.id}-sms`}
                    checked={preferences[type.smsKey] && preferences.smsReminders}
                    disabled={!preferences.smsReminders}
                    onCheckedChange={(checked) => handlePreferenceChange(type.smsKey, checked)}
                  />
                  <Label htmlFor={`${type.id}-sms`} className="text-sm">
                    SMS
                  </Label>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Reminder Information</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Confirmation messages are sent immediately after booking</li>
            <li>• 24-hour reminders are sent the day before your appointment</li>
            <li>• 1-hour reminders help ensure you don't miss your appointment</li>
            <li>• You can opt out of any reminder type at any time</li>
            <li>• Standard messaging rates may apply for SMS</li>
          </ul>
        </div>

        {/* Summary */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="flex items-center space-x-1">
            <Mail className="w-3 h-3" />
            <span>{preferences.emailReminders ? "Email ON" : "Email OFF"}</span>
          </Badge>
          <Badge variant="secondary" className="flex items-center space-x-1">
            <MessageSquare className="w-3 h-3" />
            <span>{preferences.smsReminders ? "SMS ON" : "SMS OFF"}</span>
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
