import { Resend } from 'resend';
import pool from '../../lib/db';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

// Generate a secure token for unsubscribe links
function generateUnsubscribeToken(email) {
  const secret = process.env.UNSUBSCRIBE_SECRET || 'your-secret-key';
  return crypto
    .createHmac('sha256', secret)
    .update(email)
    .digest('hex');
}

// Verify the unsubscribe token
function verifyUnsubscribeToken(email, token) {
  const expectedToken = generateUnsubscribeToken(email);
  return crypto.timingSafeEqual(
    Buffer.from(token),
    Buffer.from(expectedToken)
  );
}

export default async function handler(req, res) {
  // Handle both GET and POST requests
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let email, token;

    if (req.method === 'GET') {
      // For GET requests, get email and token from query parameters
      email = req.query.email;
      token = req.query.token;
    } else {
      // For POST requests, get email and token from body
      const body = JSON.parse(req.body);
      email = body.email;
      token = body.token;
    }

    if (!email || !token) {
      return res.status(400).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Unsubscribe Error</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                max-width: 600px;
                margin: 40px auto;
                padding: 20px;
                line-height: 1.6;
                color: #333;
              }
              .error {
                color: #dc3545;
                padding: 20px;
                background: #f8d7da;
                border-radius: 8px;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <h1>Unsubscribe Error</h1>
            <div class="error">
              <p>Email and token are required to unsubscribe.</p>
            </div>
          </body>
        </html>
      `);
    }

    // Verify the token
    if (!verifyUnsubscribeToken(email, token)) {
      return res.status(400).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Invalid Unsubscribe Link</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                max-width: 600px;
                margin: 40px auto;
                padding: 20px;
                line-height: 1.6;
                color: #333;
              }
              .error {
                color: #dc3545;
                padding: 20px;
                background: #f8d7da;
                border-radius: 8px;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <h1>Invalid Unsubscribe Link</h1>
            <div class="error">
              <p>The unsubscribe link is invalid or has expired.</p>
            </div>
          </body>
        </html>
      `);
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Delete the subscriber
      await client.query(
        'DELETE FROM subscribers WHERE email = $1',
        [email]
      );

      // Remove from Resend contacts
      await resend.contacts.remove({
        email: email,
        audienceId: process.env.RESEND_AUDIENCE_ID,
      });

      await client.query('COMMIT');

      // Return success HTML page
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Successfully Unsubscribed</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                max-width: 600px;
                margin: 40px auto;
                padding: 20px;
                line-height: 1.6;
                color: #333;
              }
              .success {
                color: #198754;
                padding: 20px;
                background: #d1e7dd;
                border-radius: 8px;
                margin: 20px 0;
              }
              .button {
                display: inline-block;
                padding: 10px 20px;
                background: #000;
                color: white;
                text-decoration: none;
                border-radius: 4px;
                margin-top: 20px;
              }
              .button:hover {
                opacity: 0.9;
              }
            </style>
          </head>
          <body>
            <h1>Successfully Unsubscribed</h1>
            <div class="success">
              <p>You have been successfully unsubscribed from Jacob Roush's Blog newsletter.</p>
              <p>You will no longer receive updates from this newsletter.</p>
            </div>
            <p>If this was a mistake, you can always resubscribe:</p>
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/subscribe" class="button">Resubscribe</a>
          </body>
        </html>
      `);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Error</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              max-width: 600px;
              margin: 40px auto;
              padding: 20px;
              line-height: 1.6;
              color: #333;
            }
            .error {
              color: #dc3545;
              padding: 20px;
              background: #f8d7da;
              border-radius: 8px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <h1>Error</h1>
          <div class="error">
            <p>An error occurred while processing your unsubscribe request.</p>
            <p>Please try again later or contact support if the problem persists.</p>
          </div>
        </body>
      </html>
    `);
  }
} 