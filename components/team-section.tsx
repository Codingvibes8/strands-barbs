import Image from "next/image"

const teamMembers = [
    {
        name: "Marcus Thompson",
        title: "Master Barber & Owner",
        experience: "15+ Years",
        specialties: ["Classic Cuts", "Beard Styling", "Hot Towel Shaves"],
        bio: "Marcus founded our shop with a vision to bring traditional barbering excellence to the modern gentleman. Trained in London's finest establishments.",
        image: "/team/marcus-thompson.jpg",
    },
    {
        name: "James Rodriguez",
        title: "Senior Barber",
        experience: "8+ Years",
        specialties: ["Modern Fades", "Scissor Cuts", "Hair Styling"],
        bio: "James specializes in contemporary cuts and precision fades. His attention to detail and creative flair make him a client favorite.",
        image: "/team/james-rodriguez.jpg",
    },
    {
        name: "David Chen",
        title: "Barber & Stylist",
        experience: "5+ Years",
        specialties: ["Textured Cuts", "Pompadours", "Grooming"],
        bio: "David brings a fresh perspective to classic techniques. Known for his expertise in textured styles and modern gentleman's grooming.",
        image: "/team/david-chen.jpg",
    },
    {
        name: "Antonio Silva",
        title: "Traditional Barber",
        experience: "12+ Years",
        specialties: ["Straight Razor", "Traditional Shaves", "Mustache Styling"],
        bio: "Antonio is our master of traditional techniques. His straight razor skills and old-school approach deliver an authentic barbering experience.",
        image: "/team/antonio-silva.jpg",
    },
]

export function TeamSection() {
    return (
        <section className="py-20 bg-neutral-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Meet Our <span className="text-amber-600">Master Barbers</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Our skilled team of professionals brings decades of combined experience and passion for the craft
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="relative h-80">
                                <Image
                                    src={`/abstract-geometric-shapes.png?height=320&width=280&query=${member.name} professional barber headshot`}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                <p className="text-amber-600 font-semibold mb-2">{member.title}</p>
                                <p className="text-sm text-gray-600 mb-3">{member.experience} Experience</p>

                                <div className="mb-4">
                                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Specialties:</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {member.specialties.map((specialty, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                        {specialty}
                      </span>
                                        ))}
                                    </div>
                                </div>

                                <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Book with Your Preferred Barber</h3>
                        <p className="text-gray-600 mb-6">
                            Each of our barbers brings their unique style and expertise. Request your preferred barber when booking
                            your appointment.
                        </p>
                        <button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                            Schedule Appointment
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
