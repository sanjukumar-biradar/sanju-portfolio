import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY as string,
      },
      body: JSON.stringify({
        // IMPORTANT: The sender email MUST be the email address you registered with on Brevo.
        sender: {
          name: name,
          email: process.env.CONTACT_EMAIL || 'sanjukumar@email.com', 
        },
        to: [
          {
            email: process.env.CONTACT_EMAIL || 'sanjukumar@email.com', // Your email where you want to receive messages
            name: 'Portfolio Owner',
          },
        ],
        replyTo: {
          email: email,
          name: name,
        },
        subject: `New Portfolio Message from ${name}`,
        htmlContent: `
          <html>
            <body style="font-family: sans-serif; line-height: 1.6;">
              <h2>New Message from Portfolio Contact Form</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <hr />
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </body>
          </html>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo API Error:', errorData);
      return res.status(500).json({ message: 'Failed to send email via Brevo' });
    }

    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
