"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { navItems } from "@/lib/navLinks"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Get all sections with header offset
      const sections = ["home", "services", "pricing", "gallery", "contact"]
      const headerHeight = 80 // Account for fixed header
      const scrollPosition = window.scrollY + headerHeight

      // Find which section is currently in view
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Call once to set initial state
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    const targetId = href.substring(1)
    const element = document.getElementById(targetId)
    if (element) {
      const headerHeight = 80
      const elementPosition = element.offsetTop - headerHeight

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
      setActiveSection(targetId)
    }
    setIsMobileMenuOpen(false)
  }

  return (
      <header
          className={`fixed h-16 top-0 w-full z-50 transition-all duration-300 ${
              isScrolled ? "bg-orange-600 shadow-lg shadow-slate-900/20" : "bg-blue-500"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="text-[20px] font-bold text-slate-200 flex items-center gap-2">
              <Image
                  src={"/icons/scissors.svg"}
                  alt="scissors logo"
                  width={30}
                  height={30}
                  className={"bg-white p-1 rounded-full mr-0 ring-blue-800 ring-4"}
              />
              <span className="text-yellow-200">StrandsX</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1)
                return (
                    <button
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        className={`group px-4 py-2 rounded-lg transition-all duration-200 relative ${
                            isActive
                                ? "text-white font-semibold"
                                : "text-amber-50 hover:text-white hover:bg-blue-800/30 hover:font-bold"
                        }`}
                    >
                      <div className="text-sm">{item.name}</div>
                      <div
                          className={`pointer-events-none absolute left-2 right-2 bottom-0 h-0.5 rounded-full bg-amber-200 transform transition-all duration-300 origin-center ${
                              isActive
                                  ? "opacity-100 scale-x-100"
                                  : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                          }`}
                      />
                    </button>
                )
              })}
              <Button className="ml-4 bg-blue-600 hover:bg-blue-700 text-slate-200 font-semibold ring-2 ring-amber-50">
                Book Now
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-amber-50" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
              <nav className="md:hidden bg-black/95 backdrop-blur-sm border-t border-amber-200/20">
                <div className="px-4 py-4 space-y-2">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.href.substring(1)
                    return (
                        <button
                            key={item.name}
                            onClick={() => handleNavClick(item.href)}
                            className={`group block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 relative ${
                                isActive ? "text-black bg-amber-200 font-semibold" : "text-amber-50 hover:text-amber-200"
                            }`}
                        >
                          {item.name}
                          <div
                              className={`pointer-events-none absolute left-4 right-4 bottom-1 h-0.5 rounded-full bg-amber-200 transform transition-all duration-300 origin-center ${
                                  isActive
                                      ? "opacity-100 scale-x-100"
                                      : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                              }`}
                          />
                        </button>
                    )
                  })}
                  <Button className="w-full mt-4 bg-yellow-600 hover:bg-yellow-700 text-black font-semibold">
                    Book Now
                  </Button>
                </div>
              </nav>
          )}
        </div>
      </header>
  )
}
