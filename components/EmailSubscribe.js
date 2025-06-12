import path from "path";
import { useState } from 'react';
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import matter from "gray-matter";
import Image from "next/legacy/image";
import { NextSeo } from "next-seo";

export default function EmailSubscribe({ frontMatter, mdxContent }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [interests, setInterests] = useState({
    code: true,
    essays: true,
    misc: true
  });

  const handleInterestChange = (interest) => {
    setInterests(prev => ({
      ...prev,
      [interest]: !prev[interest]
    }));
  };

  console.log('test');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    const selectedInterests = Object.entries(interests)
      .filter(([_, selected]) => selected)
      .map(([interest]) => interest);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify({ 
          email,
          interests: selectedInterests
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Subscription failed');
      }

      setStatus('success');
      setEmail('');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  return (
    <>
      <div className="subscribe-wrapper">
        <div className="subscribe-container">
          <h3>Subscribe to the Newsletter</h3>
          <p>Get notified when new articles are published</p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={status === 'loading'}
            />
            <div className="interests-container">
              <label>
                <input
                  type="checkbox"
                  checked={interests.code}
                  onChange={() => handleInterestChange('code')}
                  disabled={status === 'loading'}
                />
                🚀 Deep Tech Dives
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={interests.essays}
                  onChange={() => handleInterestChange('essays')}
                  disabled={status === 'loading'}
                />
                💡 Tech Meets Business
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={interests.misc}
                  onChange={() => handleInterestChange('misc')}
                  disabled={status === 'loading'}
                />
                🎯 Life & Side Projects
              </label>
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {status === 'success' && (
            <p className="success">Thanks for subscribing!</p>
          )}
          {status === 'error' && (
            <p className="error">{error || 'Something went wrong. Please try again.'}</p>
          )}
        </div>
      </div>

      <style jsx>{`
        .subscribe-wrapper {
          margin: 4rem 0;
        }
        .subscribe-container {
          padding: 2rem;
          background: #f8f9fa;
          border-radius: 8px;
          max-width: 500px;
          margin: 0 auto;
        }
        h3 {
          margin: 0 0 0.5rem 0;
        }
        p {
          margin: 0 0 1.5rem 0;
          color: #6c757d;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        input[type="email"] {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid #dee2e6;
          border-radius: 4px;
          font-size: 1rem;
        }
        .interests-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .interests-container label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }
        button {
          padding: 0.75rem 1.5rem;
          background: #000;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        button:hover {
          opacity: 0.9;
        }
        button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .success {
          color: #198754;
          margin-top: 1rem;
        }
        .error {
          color: #dc3545;
          margin-top: 1rem;
        }
      `}</style>
    </>
  );
}
