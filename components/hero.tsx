import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Star, Phone } from "lucide-react"
import Image from "next/image"

export const Hero = () => {
    return (
        <section className="relative overflow-hidden min-h-screen flex items-center pt-16">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/images/gallery-1.jpeg')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-600/95 via-slate-700/80 to-slate-800/95" />

            <div className="relative w-full mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
                    {/* Left Column - Text Content */}
                    <div className="flex-1 space-y-4 sm:space-y-6 text-center lg:text-left">
                        <div className="space-y-3 sm:space-y-4">
                            <Badge
                                variant="outline"
                                className="border-amber-500/50 text-amber-400 bg-amber-500/10 text-xs sm:text-sm px-3 py-1.5"
                            >
                                <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 fill-current" />
                                Premium Barbershop Experience
                            </Badge>

                            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white leading-tight">
                                Master Your
                                <span className="block text-amber-400 mt-1">Style & Confidence</span>
                            </h1>

                            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                                Experience the art of traditional barbering with modern precision. Where craftsmanship meets style, and
                                every cut tells a story.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 text-xs sm:text-sm">
                            <div className="flex items-center gap-2 text-slate-300">
                                <div className="w-2 h-2 bg-amber-400 rounded-full" />
                                <span className="font-semibold text-white">15+</span> Years Experience
                            </div>
                            <div className="flex items-center gap-2 text-slate-300">
                                <div className="w-2 h-2 bg-amber-400 rounded-full" />
                                <span className="font-semibold text-white">5000+</span> Happy Clients
                            </div>
                            <div className="flex items-center gap-2 text-slate-300">
                                <div className="w-2 h-2 bg-amber-400 rounded-full" />
                                <span className="font-semibold text-white">4.9★</span> Rating
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                            <Button
                                size="lg"
                                className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-6 py-3 text-sm sm:text-base"
                            >
                                <Calendar className="w-4 h-4 mr-2" />
                                Book Appointment
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-slate-600 text-white hover:bg-slate-800 px-6 py-3 text-sm sm:text-base bg-transparent"
                            >
                                View Services
                            </Button>
                        </div>

                        {/* Quick Info - Compact layout for mobile */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 pt-3 sm:pt-4 border-t border-slate-700">
                            <div className="flex items-center gap-2 text-slate-300 justify-center lg:justify-start">
                                <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0" />
                                <a href="tel:+1234567890" className="text-xs sm:text-sm hover:text-amber-400 transition-colors">
                                    (123) 456-7890
                                </a>
                            </div>
                            <div className="flex items-center gap-2 text-slate-300 justify-center lg:justify-start">
                                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0" />
                                <span className="text-xs sm:text-sm">Mon-Sat: 9AM-8PM</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-300 justify-center lg:justify-start">
                                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0" />
                                <span className="text-xs sm:text-sm">123 Main St, Downtown</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Image - Hidden on small screens to save space */}
                    <div className="hidden lg:flex flex-1 relative max-w-md">
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-slate-800 shadow-2xl">
                            <Image
                                src="/images/gallery-3.jpeg"
                                alt="Professional barber at work"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 0vw, 40vw"
                                priority
                            />
                        </div>

                        {/* Floating Card - Smaller and repositioned */}
                        <div className="absolute -bottom-3 -left-3 bg-white rounded-xl p-3 shadow-xl max-w-[180px]">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Star className="w-4 h-4 text-amber-500 fill-current" />
                                </div>
                                <div className="min-w-0">
                                    <p className="font-semibold text-slate-900 text-sm truncate">Next Available</p>
                                    <p className="text-xs text-slate-600">Today at 3:30 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
