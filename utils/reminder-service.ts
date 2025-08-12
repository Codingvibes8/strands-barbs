interface ReminderData {
  appointmentId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  serviceName: string
  barberName: string
  appointmentDate: Date
  appointmentTime: string
  duration: string
  price: number
  notes?: string
}

interface ReminderTemplate {
  subject: string
  emailBody: string
  smsBody: string
}

export class ReminderService {
  private static readonly SHOP_NAME = "BarberPro"
  private static readonly SHOP_PHONE = "(208) 123-4567"
  private static readonly SHOP_ADDRESS = "123 Main Street, Downtown"
  private static readonly SHOP_EMAIL = "appointments@barberpro.com"

  // Generate reminder templates
  static generateReminderTemplates(
    data: ReminderData,
    reminderType: "24hour" | "1hour" | "confirmation",
  ): ReminderTemplate {
    const formatDate = (date: Date): string => {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    }

    const appointmentDateTime = `${formatDate(data.appointmentDate)} at ${data.appointmentTime}`

    switch (reminderType) {
      case "confirmation":
        return {
          subject: `Appointment Confirmed - ${this.SHOP_NAME}`,
          emailBody: this.generateConfirmationEmail(data, appointmentDateTime),
          smsBody: this.generateConfirmationSMS(data, appointmentDateTime),
        }

      case "24hour":
        return {
          subject: `Reminder: Your appointment tomorrow at ${this.SHOP_NAME}`,
          emailBody: this.generate24HourEmail(data, appointmentDateTime),
          smsBody: this.generate24HourSMS(data, appointmentDateTime),
        }

      case "1hour":
        return {
          subject: `Your appointment is in 1 hour - ${this.SHOP_NAME}`,
          emailBody: this.generate1HourEmail(data, appointmentDateTime),
          smsBody: this.generate1HourSMS(data, appointmentDateTime),
        }

      default:
        throw new Error("Invalid reminder type")
    }
  }

  // Confirmation email template
  private static generateConfirmationEmail(data: ReminderData, appointmentDateTime: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background-color: #D2B48C; color: #000; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .appointment-details { background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .footer { background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; }
        .button { background-color: #D2B48C; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="header">
        <h1>${this.SHOP_NAME}</h1>
        <h2>Appointment Confirmed!</h2>
    </div>
    
    <div class="content">
        <p>Dear ${data.customerName},</p>
        
        <p>Thank you for booking with ${this.SHOP_NAME}! Your appointment has been confirmed.</p>
        
        <div class="appointment-details">
            <h3>Appointment Details:</h3>
            <p><strong>Service:</strong> ${data.serviceName}</p>
            <p><strong>Barber:</strong> ${data.barberName}</p>
            <p><strong>Date & Time:</strong> ${appointmentDateTime}</p>
            <p><strong>Duration:</strong> ${data.duration}</p>
            <p><strong>Price:</strong> $${data.price}</p>
            ${data.notes ? `<p><strong>Special Requests:</strong> ${data.notes}</p>` : ""}
        </div>
        
        <h3>Important Information:</h3>
        <ul>
            <li>Please arrive 10 minutes early for your appointment</li>
            <li>Bring a valid ID for verification</li>
            <li>Payment can be made by cash, card, or mobile payment</li>
            <li>24-hour cancellation notice required</li>
        </ul>
        
        <h3>Location:</h3>
        <p>${this.SHOP_ADDRESS}</p>
        
        <p>We'll send you reminder notifications 24 hours and 1 hour before your appointment.</p>
        
        <p>If you need to reschedule or cancel, please call us at ${this.SHOP_PHONE}.</p>
        
        <p>We look forward to seeing you!</p>
        
        <p>Best regards,<br>The ${this.SHOP_NAME} Team</p>
    </div>
    
    <div class="footer">
        <p>${this.SHOP_NAME} | ${this.SHOP_ADDRESS} | ${this.SHOP_PHONE}</p>
        <p>Email: ${this.SHOP_EMAIL}</p>
    </div>
</body>
</html>
    `.trim()
  }

  // Confirmation SMS template
  private static generateConfirmationSMS(data: ReminderData, appointmentDateTime: string): string {
    return `${this.SHOP_NAME}: Appointment confirmed! ${data.serviceName} with ${data.barberName} on ${appointmentDateTime}. Please arrive 10 min early. Location: ${this.SHOP_ADDRESS}. Questions? Call ${this.SHOP_PHONE}`
  }

  // 24-hour reminder email
  private static generate24HourEmail(data: ReminderData, appointmentDateTime: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background-color: #D2B48C; color: #000; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .appointment-details { background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .footer { background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>${this.SHOP_NAME}</h1>
        <h2>Appointment Reminder</h2>
    </div>
    
    <div class="content">
        <p>Dear ${data.customerName},</p>
        
        <p>This is a friendly reminder that you have an appointment with us tomorrow!</p>
        
        <div class="appointment-details">
            <h3>Tomorrow's Appointment:</h3>
            <p><strong>Service:</strong> ${data.serviceName}</p>
            <p><strong>Barber:</strong> ${data.barberName}</p>
            <p><strong>Date & Time:</strong> ${appointmentDateTime}</p>
            <p><strong>Duration:</strong> ${data.duration}</p>
        </div>
        
        <h3>Reminders:</h3>
        <ul>
            <li>Arrive 10 minutes early</li>
            <li>Bring a valid ID</li>
            <li>We're located at ${this.SHOP_ADDRESS}</li>
        </ul>
        
        <p>Need to reschedule? Call us at ${this.SHOP_PHONE} (24-hour notice required).</p>
        
        <p>We're excited to see you tomorrow!</p>
        
        <p>Best regards,<br>The ${this.SHOP_NAME} Team</p>
    </div>
    
    <div class="footer">
        <p>${this.SHOP_NAME} | ${this.SHOP_ADDRESS} | ${this.SHOP_PHONE}</p>
    </div>
</body>
</html>
    `.trim()
  }

  // 24-hour reminder SMS
  private static generate24HourSMS(data: ReminderData, appointmentDateTime: string): string {
    return `${this.SHOP_NAME}: Reminder! You have an appointment tomorrow - ${data.serviceName} with ${data.barberName} at ${data.appointmentTime}. Please arrive 10 min early. Need to reschedule? Call ${this.SHOP_PHONE}`
  }

  // 1-hour reminder email
  private static generate1HourEmail(data: ReminderData, appointmentDateTime: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background-color: #D2B48C; color: #000; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .urgent { background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .footer { background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>${this.SHOP_NAME}</h1>
        <h2>Your Appointment is in 1 Hour!</h2>
    </div>
    
    <div class="content">
        <p>Dear ${data.customerName},</p>
        
        <div class="urgent">
            <h3>⏰ Your appointment is starting soon!</h3>
            <p><strong>Service:</strong> ${data.serviceName} with ${data.barberName}</p>
            <p><strong>Time:</strong> ${data.appointmentTime} (in 1 hour)</p>
            <p><strong>Location:</strong> ${this.SHOP_ADDRESS}</p>
        </div>
        
        <p><strong>Please start heading our way!</strong> Remember to arrive 10 minutes early.</p>
        
        <p>If you're running late or need to cancel, please call us immediately at ${this.SHOP_PHONE}.</p>
        
        <p>See you soon!</p>
        
        <p>The ${this.SHOP_NAME} Team</p>
    </div>
    
    <div class="footer">
        <p>${this.SHOP_NAME} | ${this.SHOP_PHONE}</p>
    </div>
</body>
</html>
    `.trim()
  }

  // 1-hour reminder SMS
  private static generate1HourSMS(data: ReminderData, appointmentDateTime: string): string {
    return `${this.SHOP_NAME}: Your appointment is in 1 HOUR! ${data.serviceName} with ${data.barberName} at ${data.appointmentTime}. Please head our way now. ${this.SHOP_ADDRESS}. Running late? Call ${this.SHOP_PHONE}`
  }

  // Schedule reminders (this would integrate with your backend/email service)
  static async scheduleReminders(data: ReminderData): Promise<void> {
    try {
      // Calculate reminder times
      const appointmentDateTime = new Date(data.appointmentDate)
      const [timeStr, period] = data.appointmentTime.split(" ")
      const [hours, minutes] = timeStr.split(":").map(Number)
      let hour24 = hours

      if (period === "PM" && hours !== 12) {
        hour24 += 12
      } else if (period === "AM" && hours === 12) {
        hour24 = 0
      }

      appointmentDateTime.setHours(hour24, minutes, 0, 0)

      const twentyFourHoursBefore = new Date(appointmentDateTime.getTime() - 24 * 60 * 60 * 1000)
      const oneHourBefore = new Date(appointmentDateTime.getTime() - 60 * 60 * 1000)

      // Send confirmation immediately
      await this.sendReminder(data, "confirmation")

      // Schedule 24-hour reminder
      if (twentyFourHoursBefore > new Date()) {
        await this.scheduleReminderAt(data, "24hour", twentyFourHoursBefore)
      }

      // Schedule 1-hour reminder
      if (oneHourBefore > new Date()) {
        await this.scheduleReminderAt(data, "1hour", oneHourBefore)
      }

      console.log("Reminders scheduled successfully")
    } catch (error) {
      console.error("Error scheduling reminders:", error)
      throw error
    }
  }

  // Send immediate reminder
  private static async sendReminder(data: ReminderData, type: "confirmation" | "24hour" | "1hour"): Promise<void> {
    const templates = this.generateReminderTemplates(data, type)

    // Send email (integrate with your email service)
    await this.sendEmail({
      to: data.customerEmail,
      subject: templates.subject,
      html: templates.emailBody,
    })

    // Send SMS (integrate with your SMS service)
    await this.sendSMS({
      to: data.customerPhone,
      message: templates.smsBody,
    })
  }

  // Schedule reminder for specific time
  private static async scheduleReminderAt(
    data: ReminderData,
    type: "24hour" | "1hour",
    scheduledTime: Date,
  ): Promise<void> {
    // This would integrate with a job scheduler like node-cron, Bull Queue, or cloud functions
    console.log(`Scheduling ${type} reminder for ${scheduledTime.toISOString()}`)

    // Example implementation with setTimeout (for demo purposes)
    // In production, use a proper job scheduler
    const delay = scheduledTime.getTime() - Date.now()
    if (delay > 0) {
      setTimeout(async () => {
        await this.sendReminder(data, type)
      }, delay)
    }
  }

  // Email service integration (replace with your email provider)
  private static async sendEmail(emailData: { to: string; subject: string; html: string }): Promise<void> {
    // Example integration with email service
    console.log("Sending email:", {
      to: emailData.to,
      subject: emailData.subject,
    })

    // Simulate email sending
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Email sent to ${emailData.to}`)
        resolve()
      }, 1000)
    })

    // Real implementation would use services like:
    // - SendGrid: await sgMail.send(emailData)
    // - Nodemailer: await transporter.sendMail(emailData)
    // - AWS SES: await ses.sendEmail(emailData).promise()
  }

  // SMS service integration (replace with your SMS provider)
  private static async sendSMS(smsData: { to: string; message: string }): Promise<void> {
    // Example integration with SMS service
    console.log("Sending SMS:", {
      to: smsData.to,
      message: smsData.message.substring(0, 50) + "...",
    })

    // Simulate SMS sending
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`SMS sent to ${smsData.to}`)
        resolve()
      }, 1000)
    })

    // Real implementation would use services like:
    // - Twilio: await client.messages.create({ to: smsData.to, body: smsData.message, from: twilioNumber })
    // - AWS SNS: await sns.publish({ PhoneNumber: smsData.to, Message: smsData.message }).promise()
  }

  // Generate appointment ID
  static generateAppointmentId(): string {
    return `BP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }
}
