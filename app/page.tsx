
import { PricingSection } from "@/components/pricing-section"
import {Hero}  from "@/components/hero"
import { Services } from "@/components/services"
import {GallerySection} from "@/components/gallery-section";
import {ContactSection} from "@/components/contact-section";



export default function Home() {
  return (
      <section>
        <Hero/>
        {/* Services Section */}
        <section id="services">
          <Services/>
        </section>
          {/* Pricing Section */}
          <section id="pricing">
            <PricingSection/>
          </section>

          {/* Gallery Section */}
          <section id="gallery">
            <GallerySection/>
          </section>

          {/* Contact Section */}
          <section id="contact">
            <ContactSection/>
          </section>
        </section>
        )
        }
