import { Check, Scissors, Crown, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const pricingTiers = [
    {
        name: "Classic Cut",
        price: 20,
        description: "Perfect for the everyday gentleman",
        icon: Scissors,
        features: ["Professional haircut", "Wash & style", "Basic beard trim", "Hot towel finish", "30-minute service"],
        popular: false,
        buttonText: "Book Classic",
        buttonVariant: "outline" as const,
    },
    {
        name: "Premium Style",
        price: 35,
        description: "Complete grooming experience",
        icon: Crown,
        features: [
            "Precision cut & style",
            "Deluxe wash & conditioning",
            "Full beard sculpting",
            "Hot towel treatment",
            "Scalp massage",
            "Styling products included",
            "60-minute service",
        ],
        popular: true,
        buttonText: "Book Premium",
        buttonVariant: "default" as const,
    },
    {
        name: "Executive Package",
        price: 60,
        description: "The ultimate gentleman's experience",
        icon: Star,
        features: [
            "Master barber service",
            "Luxury wash & treatment",
            "Precision cut & styling",
            "Full beard & mustache grooming",
            "Hot towel & face treatment",
            "Scalp & shoulder massage",
            "Premium styling products",
            "Complimentary beverage",
            "90-minute service",
        ],
        popular: false,
        buttonText: "Book Executive",
        buttonVariant: "outline" as const,
    },
]

const additionalServices = [
    { name: "Beard Trim Only", price: 12 },
    { name: "Hot Towel Shave", price: 25 },
    { name: "Eyebrow Trim", price: 8 },
    { name: "Hair Wash & Style", price: 15 },
    { name: "Scalp Treatment", price: 20 },
]

export function PricingSection() {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-neutral-900 mb-4 font-serif">Premium Barbering Services</h2>
                <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                    Experience the finest in traditional barbering with modern techniques. Every service includes our signature
                    attention to detail.
                </p>
            </div>

            {/* Main Pricing Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {pricingTiers.map((tier) => {
                    const IconComponent = tier.icon
                    return (
                        <Card
                            key={tier.name}
                            className={`relative transition-all duration-300 hover:shadow-xl ${
                                tier.popular ? "border-amber-500 shadow-lg scale-105" : "border-neutral-200 hover:border-neutral-300"
                            }`}
                        >
                            {tier.popular && (
                                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white px-4 py-1">
                                    Most Popular
                                </Badge>
                            )}

                            <CardHeader className="text-center pb-4">
                                <div
                                    className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                                        tier.popular ? "bg-amber-100" : "bg-neutral-100"
                                    }`}
                                >
                                    <IconComponent className={`w-8 h-8 ${tier.popular ? "text-amber-600" : "text-neutral-600"}`} />
                                </div>
                                <CardTitle className="text-2xl font-bold text-neutral-900 font-serif">{tier.name}</CardTitle>
                                <CardDescription className="text-neutral-600 mt-2">{tier.description}</CardDescription>
                                <div className="mt-4">
                                    <span className="text-4xl font-bold text-neutral-900">£{tier.price}</span>
                                    <span className="text-neutral-500 ml-1">per service</span>
                                </div>
                            </CardHeader>

                            <CardContent className="pt-0">
                                <ul className="space-y-3">
                                    {tier.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-neutral-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>

                            <CardFooter className="pt-6">
                                <Button
                                    variant={tier.buttonVariant}
                                    size="lg"
                                    className={`w-full font-semibold ${tier.popular ? "bg-amber-600 hover:bg-amber-700 text-white" : ""}`}
                                >
                                    {tier.buttonText}
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>

            {/* Additional Services */}
            <div className="bg-white rounded-2xl p-8 border border-neutral-200">
                <h3 className="text-2xl font-bold text-neutral-900 mb-6 text-center font-serif">Additional Services</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {additionalServices.map((service, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
                        >
                            <span className="font-medium text-neutral-900">{service.name}</span>
                            <span className="font-bold text-amber-600">£{service.price}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4 font-serif">Ready to Look Your Best?</h3>
                <p className="text-neutral-600 mb-8 max-w-xl mx-auto">
                    Book your appointment today and experience the difference of professional barbering.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8">
                        Book Appointment
                    </Button>
                    <Button variant="outline" size="lg" className="px-8 bg-transparent">
                        Call (555) 123-4567
                    </Button>
                </div>
            </div>
        </section>
    )
}
