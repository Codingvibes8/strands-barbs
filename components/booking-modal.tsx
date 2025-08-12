"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Clock, User, Phone, Mail, Scissors, Loader2 } from "lucide-react"

interface BookingModalProps {
    isOpen: boolean
    onClose: () => void
    selectedService?: string
}

const services = [
    { id: "classic", name: "Classic Cut", price: "£20", duration: "30 min" },
    { id: "premium", name: "Premium Style", price: "£35", duration: "45 min" },
    { id: "executive", name: "Executive Package", price: "£60", duration: "90 min" },
    { id: "beard-trim", name: "Beard Trim", price: "£15", duration: "20 min" },
    { id: "hot-shave", name: "Hot Towel Shave", price: "£25", duration: "30 min" },
    { id: "styling", name: "Hair Styling", price: "£20", duration: "30 min" },
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
]

export function BookingModal({ isOpen, onClose, selectedService }: BookingModalProps) {
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        service: selectedService || "",
        date: "",
        time: "",
        name: "",
        email: "",
        phone: "",
        notes: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch("/api/appointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Failed to book appointment")
            }

            // Show success message
            toast({
                title: "Appointment Booked!",
                description: "We'll contact you shortly to confirm your appointment.",
                duration: 5000,
            })

            // Reset form and close modal
            setFormData({
                service: "",
                date: "",
                time: "",
                name: "",
                email: "",
                phone: "",
                notes: "",
            })
            onClose()
        } catch (error) {
            console.error("Error booking appointment:", error)
            toast({
                title: "Booking Failed",
                description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
                variant: "destructive",
                duration: 5000,
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const selectedServiceDetails = services.find((s) => s.id === formData.service)

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                        <Scissors className="h-6 w-6 text-amber-600" />
                        Book Your Appointment
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Service Selection */}
                    <div className="space-y-2">
                        <Label htmlFor="service" className="text-sm font-medium">
                            Select Service *
                        </Label>
                        <Select
                            value={formData.service}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, service: value }))}
                            required
                            disabled={isSubmitting}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Choose your service" />
                            </SelectTrigger>
                            <SelectContent>
                                {services.map((service) => (
                                    <SelectItem key={service.id} value={service.id}>
                                        <div className="flex justify-between items-center w-full">
                                            <span>{service.name}</span>
                                            <span className="text-amber-600 font-medium ml-4">
                        {service.price} • {service.duration}
                      </span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {selectedServiceDetails && (
                            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">{selectedServiceDetails.name}</span>
                                    <span className="text-amber-600 font-semibold">{selectedServiceDetails.price}</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">Duration: {selectedServiceDetails.duration}</p>
                            </div>
                        )}
                    </div>

                    {/* Date and Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="date" className="text-sm font-medium flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Preferred Date *
                            </Label>
                            <Input
                                id="date"
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                                min={new Date().toISOString().split("T")[0]}
                                required
                                disabled={isSubmitting}
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="time" className="text-sm font-medium flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Preferred Time *
                            </Label>
                            <Select
                                value={formData.time}
                                onValueChange={(value) => setFormData((prev) => ({ ...prev, time: value }))}
                                required
                                disabled={isSubmitting}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                                <SelectContent>
                                    {timeSlots.map((time) => (
                                        <SelectItem key={time} value={time}>
                                            {time}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Customer Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Your Information
                        </h3>

                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium">
                                Full Name *
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                                placeholder="Enter your full name"
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    Email *
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                    placeholder="your@email.com"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    Phone *
                                </Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                                    placeholder="07123 456789"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes" className="text-sm font-medium">
                                Special Requests (Optional)
                            </Label>
                            <Textarea
                                id="notes"
                                value={formData.notes}
                                onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                                placeholder="Any specific requirements or preferences..."
                                rows={3}
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="flex-1 bg-transparent"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1 bg-amber-600 hover:bg-amber-700 text-white" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Booking...
                                </>
                            ) : (
                                "Book Appointment"
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
