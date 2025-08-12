"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { BookingSystem } from "@/components/booking-system"




interface BookingButtonProps {
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "default" | "lg"
  className?: string
  children?: React.ReactNode
}

export function BookingButton({ variant = "default", size = "default", className = "", children }: BookingButtonProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  return (
    <>
      <Button variant={variant} size={size} className={className} onClick={() => setIsBookingOpen(true)}>
        <Calendar className="w-4 h-4 mr-2" />
        {children || "Book Appointment"}
      </Button>

      <BookingSystem isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  )
}
