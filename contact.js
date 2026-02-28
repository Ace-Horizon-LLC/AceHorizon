import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, message } = req.body;

  try {
    await resend.emails.send({
      from: "Ace Horizon <onboarding@resend.dev>",
      to: "acehorizon3107@gmail.com",
      subject: `New Transmission from ${name}`,
      html: `<p>${message}</p>`
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to send email" });
  }
}