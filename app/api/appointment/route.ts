import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Validate required fields
        const { service, date, time, name, email, phone } = body

        if (!service || !date || !time || !name || !email || !phone) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
        }

        // Create appointment object
        const appointment = {
            id: crypto.randomUUID(),
            service,
            date,
            time,
            name,
            email,
            phone,
            notes: body.notes || "",
            status: "pending" as const,
            createdAt: new Date().toISOString(),
        }

        // In a real app, this would save to a database
        // For now, we'll just return the appointment
        return NextResponse.json({
            success: true,
            appointment,
            message: "Appointment booked successfully!",
        })
    } catch (error) {
        console.error("Error creating appointment:", error)
        return NextResponse.json({ error: "Failed to book appointment" }, { status: 500 })
    }
}

export async function GET() {
    try {
        // In a real app, this would fetch from a database
        // For now, return empty array
        return NextResponse.json({
            appointments: [],
            message: "Appointments retrieved successfully",
        })
    } catch (error) {
        console.error("Error fetching appointments:", error)
        return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 })
    }
}
