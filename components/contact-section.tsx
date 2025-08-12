"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from "lucide-react"

export function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission
        console.log("Contact form submitted:", formData)
        // Reset form
        setFormData({ name: "", email: "", phone: "", message: "" })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <section className="py-16 px-4 bg-neutral-900 text-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-serif font-bold mb-4">Get In Touch</h2>
                    <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
                        Ready for your next cut? Contact us to book an appointment or ask any questions.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-serif font-semibold mb-6 text-amber-400">Contact Information</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold mb-1">Address</h4>
                                        <p className="text-neutral-300">
                                            123 High Street
                                            <br />
                                            London, SW1A 1AA
                                            <br />
                                            United Kingdom
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Phone className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold mb-1">Phone</h4>
                                        <p className="text-neutral-300">+44 20 7123 4567</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Mail className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold mb-1">Email</h4>
                                        <p className="text-neutral-300">info@premiumbarbers.co.uk</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Clock className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold mb-1">Opening Hours</h4>
                                        <div className="text-neutral-300 space-y-1">
                                            <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                                            <p>Saturday: 8:00 AM - 6:00 PM</p>
                                            <p>Sunday: 10:00 AM - 4:00 PM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div>
                            <h3 className="text-2xl font-serif font-semibold mb-6 text-amber-400">Follow Us</h3>
                            <div className="flex gap-4">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-neutral-900 bg-transparent"
                                >
                                    <Instagram className="w-5 h-5" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-neutral-900 bg-transparent"
                                >
                                    <Facebook className="w-5 h-5" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-neutral-900 bg-transparent"
                                >
                                    <Twitter className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <Card className="bg-neutral-800 border-neutral-700">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-serif font-semibold mb-6 text-amber-400">Send us a Message</h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                                            Full Name *
                                        </label>
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="bg-neutral-700 border-neutral-600 text-white placeholder:text-neutral-400 focus:border-amber-400"
                                            placeholder="Your full name"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                                            Phone Number
                                        </label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="bg-neutral-700 border-neutral-600 text-white placeholder:text-neutral-400 focus:border-amber-400"
                                            placeholder="Your phone number"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                                        Email Address *
                                    </label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="bg-neutral-700 border-neutral-600 text-white placeholder:text-neutral-400 focus:border-amber-400"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                                        Message *
                                    </label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        className="bg-neutral-700 border-neutral-600 text-white placeholder:text-neutral-400 focus:border-amber-400 resize-none"
                                        placeholder="Tell us about your preferred service, timing, or any questions you have..."
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-amber-400 hover:bg-amber-500 text-neutral-900 font-semibold py-3"
                                >
                                    Send Message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
