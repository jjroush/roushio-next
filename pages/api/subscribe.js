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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, interests = ['code', 'essays', 'misc'] } = JSON.parse(req.body);
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      await client.query(`
        CREATE TABLE IF NOT EXISTS subscribers (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          interests TEXT[] DEFAULT ARRAY['code', 'essays', 'misc'],
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);

      const insertQuery = `
        INSERT INTO subscribers (email, interests)
        VALUES ($1, $2)
        ON CONFLICT (email)
        DO UPDATE SET interests = $2, updated_at = CURRENT_TIMESTAMP;
      `;

      await client.query(insertQuery, [email, interests]);
      await client.query('COMMIT');

      await resend.contacts.create({
        email: email,
        audienceId: process.env.RESEND_AUDIENCE_ID,
      });

      // Generate unsubscribe token
      const unsubscribeToken = generateUnsubscribeToken(email);
      const unsubscribeUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/unsubscribe?email=${encodeURIComponent(email)}&token=${unsubscribeToken}`;

      await resend.emails.send({
        from: 'onboarding@learning.roush.io',
        to: email,
        subject: 'Welcome to Jacob Roush\'s Blog',
        html: `
          <h1>Thanks for subscribing!</h1>
          <p>You'll now receive updates when new posts are published.</p>
          <p>You've subscribed to the following topics: ${interests.join(', ')}</p>
          <p>If you wish to unsubscribe, you can <a href="${unsubscribeUrl}">click here</a>.</p>
        `,
        headers: {
          'List-Unsubscribe': unsubscribeUrl,
        },
      });

      res.status(200).json({ success: true });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Subscribe error:', error);
    res.status(500).json({ error: 'Error subscribing' });
  }
}
