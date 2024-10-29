import type { Handler } from "@netlify/functions";
import fetch from "node-fetch";

const handler: Handler = async (event) => {
  if (event.body === null) {
    return {
      statusCode: 400,
      body: JSON.stringify("Payload required"),
    };
  }

  const requestBody = JSON.parse(event.body) as {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    weddingDate?: string;
    weddingVenue?: string;
    message?: string;
    referralSource?: string;
  };

  try {
    // Send email using Netlify Email function with Postmark
    await fetch(`${process.env.URL}/.netlify/functions/emails/lead-notification`, {
      headers: {
        "netlify-emails-secret": process.env.NETLIFY_EMAILS_SECRET as string,
      },
      method: "POST",
      body: JSON.stringify({
        from: "hello@heirloomweddingfilms.com", // Update with your verified Postmark sender
        to: "ty@heirloomweddingfilms.com",      // Update with your recipient email
        subject: "New Lead Form Submission",
        parameters: {
          name: `${requestBody.firstName} ${requestBody.lastName}`,
          email: requestBody.email,
          phone: requestBody.phoneNumber || 'Not provided',
          weddingDate: requestBody.weddingDate || 'Not provided',
          weddingVenue: requestBody.weddingVenue || 'Not provided',
          message: requestBody.message || 'No message provided',
          referralSource: requestBody.referralSource || 'Not provided',
          date: new Date().toLocaleString()
        },
      }),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully" }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error sending email" }),
    };
  }
};

export { handler }; 