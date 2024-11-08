import type { Handler } from "@netlify/functions";
import fetch from "node-fetch";

const handler: Handler = async (event) => {
  if (!process.env.NETLIFY_EMAILS_SECRET) {
    console.error('Missing required environment variable: NETLIFY_EMAILS_SECRET');
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Server configuration error" }),
    };
  }

  if (event.body === null) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Payload required" }),
    };
  }

  try {
    const requestBody = JSON.parse(event.body) as {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber?: string;
      weddingDate?: string;
      weddingVenue?: string;
      message?: string;
    };

    // Validate required fields
    if (!requestBody.firstName || !requestBody.lastName || !requestBody.email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing required fields" }),
      };
    }

    const siteUrl = 'https://heirloomweddingfilms.com';

    // Add a verification check
    const POSTMARK_VERIFIED = true; // Toggle this when verified

    if (!POSTMARK_VERIFIED) {
      console.log('Postmark not verified yet. Would have sent email with:', requestBody);
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          message: "Form submitted successfully (email sending temporarily disabled)" 
        }),
      };
    }

    // Send notification email to you
    const notificationResponse = await fetch(`${siteUrl}/.netlify/functions/emails/lead-notification`, {
      headers: {
        "netlify-emails-secret": process.env.NETLIFY_EMAILS_SECRET,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        from: "ty@heirloomweddingfilms.com",
        fromName: "HEIRLOOM Wedding Films",
        to: "ty@heirloomweddingfilms.com",
        subject: "New Lead Form Submission",
        parameters: {
          name: `${requestBody.firstName} ${requestBody.lastName}`,
          email: requestBody.email,
          phone: requestBody.phoneNumber || 'Not provided',
          weddingDate: requestBody.weddingDate || 'Not provided',
          weddingVenue: requestBody.weddingVenue || 'Not provided',
          message: requestBody.message || 'No message provided',
          date: new Date().toLocaleString()
        },
      }),
    });

    if (!notificationResponse.ok) {
      const errorText = await notificationResponse.text();
      console.error('Notification email error:', errorText);
      throw new Error(`Notification email failed: ${errorText}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Notification email sent successfully" }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: error instanceof Error ? error.message : "Error sending email" 
      }),
    };
  }
};

export { handler }; 