"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
const galleryImages = [
    {
        id: 1,
        src: "/beard-trim-before-after.png",
        alt: "Professional beard trim transformation",
        category: "Beard Work",
        title: "Classic Beard Sculpt",
    },
    {
        id: 2,
        src: "/modern-fade-haircut-styling.png",
        alt: "Modern fade haircut",
        category: "Haircuts",
        title: "Precision Fade",
    },
    {
        id: 3,
        src: "/luxury-barber-shop.png",
        alt: "Luxury barber shop interior",
        category: "Shop",
        title: "Our Premium Space",
    },
    {
        id: 4,
        src: "/classic-pompadour.png",
        alt: "Classic pompadour styling",
        category: "Styling",
        title: "Executive Pompadour",
    },
    {
        id: 5,
        src: "/hot-towel-shave.png",
        alt: "Traditional hot towel shave",
        category: "Shaving",
        title: "Traditional Shave",
    },
    {
        id: 6,
        src: "/textured-crop-haircut.png",
        alt: "Textured crop haircut",
        category: "Haircuts",
        title: "Textured Crop",
    },
    {
        id: 7,
        src: "/barber-tools-equipment.png",
        alt: "Professional barber tools",
        category: "Tools",
        title: "Professional Tools",
    },
    {
        id: 8,
        src: "/undercut-transformation.png",
        alt: "Undercut transformation",
        category: "Haircuts",
        title: "Modern Undercut",
    },
    {
        id: 9,
        src: "/mustache-grooming.png",
        alt: "Mustache grooming",
        category: "Grooming",
        title: "Mustache Styling",
    },
]

const categories = ["All", "Haircuts", "Beard Work", "Styling", "Shaving", "Grooming", "Shop", "Tools"]

export function GallerySection() {
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[0] | null>(null)

    const filteredImages =
        selectedCategory === "All" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

    return (
        <section className="py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-serif font-bold text-neutral-900 mb-4">Our Work Gallery</h2>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        Discover the artistry and precision that defines our craft. From classic cuts to modern styles, each piece
                        showcases our commitment to excellence.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                selectedCategory === category
                                    ? "bg-amber-500 text-white shadow-md"
                                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredImages.map((image) => (
                        <Card
                            key={image.id}
                            className="group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            onClick={() => setSelectedImage(image)}
                        >
                            <div className="relative overflow-hidden">
                                <Image
                                    src={image.src || "/placeholder.svg"}
                                    alt={image.alt} width={400} height={400}
                                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                                <div className="absolute top-3 left-3">
                                    <Badge variant="secondary" className="bg-white/90 text-neutral-800">
                                        {image.category}
                                    </Badge>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Modal for enlarged image */}
                {selectedImage && (
                    <div
                        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden">
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-neutral-800 rounded-full p-2 transition-colors"
                                aria-label="Close image"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <img
                                src={selectedImage.src || "/placeholder.svg"}
                                alt={selectedImage.alt}
                                className="w-full h-auto max-h-[80vh] object-contain"
                            />
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <Badge variant="secondary">{selectedImage.category}</Badge>
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-neutral-900">{selectedImage.title}</h3>
                            </div>
                        </div>
                    </div>
                )}

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-4">Ready for Your Transformation?</h3>
                    <p className="text-neutral-600 mb-6 max-w-xl mx-auto">
                        Book your appointment today and experience the craftsmanship that sets us apart.
                    </p>
                    <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg">
                        Book Appointment
                    </button>
                </div>
            </div>
        </section>
    )
}
