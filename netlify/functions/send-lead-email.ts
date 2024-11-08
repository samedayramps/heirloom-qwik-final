import type { Handler } from "@netlify/functions";
import fetch from "node-fetch";

const handler: Handler = async (event) => {
  console.log('Received event:', event);

  if (!process.env.NETLIFY_EMAILS_SECRET) {
    console.error('Missing required environment variable: NETLIFY_EMAILS_SECRET');
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Server configuration error" }),
    };
  }

  if (event.body === null) {
    console.warn('Request body is null');
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Payload required" }),
    };
  }

  let requestBody;
  try {
    requestBody = JSON.parse(event.body);
    console.log('Parsed request body:', requestBody);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid JSON input" }),
    };
  }

  // Validate required fields
  if (!requestBody.firstName || !requestBody.lastName || !requestBody.email) {
    console.warn('Missing required fields:', requestBody);
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

  try {
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

    console.log('Notification email sent successfully');

    // Send Pushover notification
    const pushoverResponse = await fetch('https://api.pushover.net/1/messages.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: process.env.PUSHOVER_API_TOKEN,
        user: process.env.PUSHOVER_USER_KEY,
        message: `New lead from ${requestBody.firstName} ${requestBody.lastName}`,
        title: 'New Lead Submission',
        url: siteUrl,
        url_title: 'View Lead Details'
      }),
    });

    if (!pushoverResponse.ok) {
      const errorText = await pushoverResponse.text();
      console.error('Pushover notification error:', errorText);
      throw new Error(`Pushover notification failed: ${errorText}`);
    }

    console.log('Pushover notification sent successfully');

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Notification email and Pushover notification sent successfully" }),
    };
  } catch (error) {
    console.error('Error sending email or Pushover notification:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: error instanceof Error ? error.message : "Error sending email or Pushover notification" 
      }),
    };
  }
};

export { handler }; 