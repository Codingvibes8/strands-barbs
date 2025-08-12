import { Card, CardContent } from "@/components/ui/card"
import {RadarIcon as Razor, BeakerIcon as Beard, Scissors} from "lucide-react"



import {Button} from "@/components/ui/button";
export function Services() {
    const services = [
        {
            icon: Scissors,
            title: "Premium Haircuts",
            description: "Precision cuts tailored to your style and face shape",
            price: "From $45",
            duration: "45 min",
        },
        {
            icon: Razor,
            title: "Traditional Shaves",
            description: "Hot towel shaves with premium products",
            price: "From $35",
            duration: "30 min",
        },
        {
            icon: Beard,
            title: "Beard Grooming",
            description: "Beard trims, shaping, and conditioning treatments",
            price: "From $25",
            duration: "20 min",
        },
    ]

    return (
        <section id="services" className="py-20 bg-cream">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
                        Our <span className="text-primary">Services</span>
                    </h2>
                    <p className="text-xl text-black/70 max-w-2xl mx-auto">
                        Professional grooming services crafted with precision and care
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Card key={index} className="bg-white border-primary/20 hover:shadow-xl transition-all duration-300 group">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                                    <service.icon className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold text-black mb-4">{service.title}</h3>
                                <p className="text-black/70 mb-6">{service.description}</p>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-primary font-semibold text-lg">{service.price}</span>
                                    <span className="text-black/60">{service.duration}</span>
                                </div>
                                <Button className="w-full bg-primary/20 hover:bg-primary hover:text-black text-primary border border-primary/30">
                                    Book Now
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
