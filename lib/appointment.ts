export interface Appointment {
    id: string
    service: string
    date: string
    time: string
    name: string
    email: string
    phone: string
    notes?: string
    status: "pending" | "confirmed" | "cancelled"
    createdAt: string
}

export const saveAppointment = (appointment: Omit<Appointment, "id" | "createdAt" | "status">): Appointment => {
    const newAppointment: Appointment = {
        ...appointment,
        id: crypto.randomUUID(),
        status: "pending",
        createdAt: new Date().toISOString(),
    }

    // Get existing appointments from localStorage
    const existingAppointments = getAppointments()
    const updatedAppointments = [...existingAppointments, newAppointment]

    // Save to localStorage
    localStorage.setItem("barber_appointments", JSON.stringify(updatedAppointments))

    return newAppointment
}

export const getAppointments = (): Appointment[] => {
    if (typeof window === "undefined") return []

    const stored = localStorage.getItem("barber_appointments")
    return stored ? JSON.parse(stored) : []
}

export const updateAppointmentStatus = (id: string, status: Appointment["status"]): void => {
    const appointments = getAppointments()
    const updatedAppointments = appointments.map((apt) => (apt.id === id ? { ...apt, status } : apt))

    localStorage.setItem("barber_appointments", JSON.stringify(updatedAppointments))
}
