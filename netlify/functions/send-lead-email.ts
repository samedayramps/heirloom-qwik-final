import type { Handler } from "@netlify/functions";
import { ServerClient } from 'postmark';

// Initialize Postmark client
const postmarkClient = new ServerClient(process.env.POSTMARK_SERVER_TOKEN || '');

export const handler: Handler = async (event) => {
  // Log for debugging
  console.log('Received event:', event);

  // Check for required environment variable
  if (!process.env.POSTMARK_SERVER_TOKEN) {
    console.error('Missing required environment variable: POSTMARK_SERVER_TOKEN');
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Server configuration error" }),
    };
  }

  // Validate request body
  if (!event.body) {
    console.warn('Request body is null');
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Payload required" }),
    };
  }

  try {
    // Parse the request body
    const requestBody = JSON.parse(event.body);
    console.log('Parsed request body:', requestBody);

    // Validate required fields
    if (!requestBody.firstName || !requestBody.lastName || !requestBody.email) {
      console.warn('Missing required fields:', requestBody);
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing required fields" }),
      };
    }

    // Format the message content
    const messageContent = `
      New Lead Details:
      Name: ${requestBody.firstName} ${requestBody.lastName}
      Email: ${requestBody.email}
      Phone: ${requestBody.phoneNumber || 'Not provided'}
      Wedding Date: ${requestBody.weddingDate || 'Not provided'}
      Wedding Venue: ${requestBody.weddingVenue || 'Not provided'}
      Message: ${requestBody.message || 'No message provided'}
    `;

    // Send email using Postmark
    const response = await postmarkClient.sendEmail({
      From: "ty@heirloomweddingfilms.com",
      To: "ty@heirloomweddingfilms.com",
      Subject: "New Lead Form Submission - Heirloom Wedding Films",
      TextBody: messageContent,
      MessageStream: "outbound"
    });

    console.log('Email sent successfully:', response);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: "Lead notification sent successfully",
        emailId: response.MessageID 
      }),
    };

  } catch (error) {
    console.error('Error processing request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: error instanceof Error ? error.message : "Internal server error" 
      }),
    };
  }
}; 