import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Star, Phone } from "lucide-react"
import Image from "next/image"

export const Hero = () => {
    return (
        <section className="relative overflow-hidden min-h-screen flex items-center">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/images/gallery-1.jpeg')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/95" />

            <div className="relative w-full mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8 lg:py-24 xl:py-32">
                <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 md:gap-8 lg:gap-16 xl:gap-20">
                    {/* Left Column - Text Content */}
                    <div className="flex-1 space-y-6 sm:space-y-8 md:pr-4 lg:pr-6 xl:pr-8 text-center md:text-left">
                        <div className="space-y-4 sm:space-y-6">
                            <Badge
                                variant="outline"
                                className="border-amber-500/50 text-amber-400 bg-amber-500/10 text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2"
                            >
                                <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 fill-current" />
                                Premium Barbershop Experience
                            </Badge>

                            <h1 className="font-bold text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-white leading-tight">
                                Master Your
                                <span className="block text-amber-400 mt-1 sm:mt-2">Style & Confidence</span>
                            </h1>

                            <p className="text-base sm:text-lg md:text-base lg:text-lg xl:text-xl text-slate-300 leading-relaxed max-w-2xl md:max-w-none mx-auto md:mx-0">
                                Experience the art of traditional barbering with modern precision. Where craftsmanship meets style, and
                                every cut tells a story.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 text-sm sm:text-base">
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
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
                            <Button
                                size="lg"
                                className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base w-full sm:w-auto"
                            >
                                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                Book Appointment
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-slate-600 text-white hover:bg-slate-800 px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base bg-transparent w-full sm:w-auto"
                            >
                                View Services
                            </Button>
                        </div>

                        {/* Quick Info */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 pt-4 sm:pt-6 border-t border-slate-700 justify-center md:justify-start">
                            <div className="flex items-center gap-2 text-slate-300 justify-center md:justify-start">
                                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                                <a href="tel:+1234567890" className="text-sm sm:text-base hover:text-amber-400 transition-colors">
                                    (123) 456-7890
                                </a>
                            </div>
                            <div className="flex items-center gap-2 text-slate-300 justify-center md:justify-start">
                                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                                <span className="text-sm sm:text-base">Mon-Sat: 9AM-8PM</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-300 justify-center md:justify-start">
                                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                                <span className="text-sm sm:text-base">123 Main St, Downtown</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Image */}
                    <div className="flex-1 relative w-full max-w-sm sm:max-w-md md:max-w-none md:pl-4 lg:pl-6 xl:pl-8">
                        <div className="relative aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4] xl:aspect-[4/5] overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-800 shadow-2xl mx-auto md:mx-0">
                            <Image
                                src="/images/gallery-3.jpeg"
                                alt="Professional barber at work"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                                priority
                            />
                        </div>

                        {/* Floating Card */}
                        <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 md:-bottom-4 md:-left-4 lg:-bottom-6 lg:-left-6 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl max-w-[200px] sm:max-w-xs">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 fill-current" />
                                </div>
                                <div className="min-w-0">
                                    <p className="font-semibold text-slate-900 text-sm sm:text-base truncate">Next Available</p>
                                    <p className="text-xs sm:text-sm text-slate-600">Today at 3:30 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
