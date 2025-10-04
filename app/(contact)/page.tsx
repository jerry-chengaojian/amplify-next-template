"use client";

import { useState, useRef } from 'react';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
import './contact.css';
import outputs from "@/amplify_outputs.json";

Amplify.configure(outputs);

const client = generateClient<Schema>({
  authMode: 'apiKey',
});

export default function ContactPage() {
  return (
    <main className="contact-main">
      <div className="container">
        <div className="content-wrapper">
          <div className="header-section">
            <h1 className="title">
              Get in touch with us
            </h1>
            <p className="subtitle">
              We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>

          <ContactForm />
        </div>
      </div>
    </main>
  )
}

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const formValues = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      await client.models.Submission.create(formValues);
      setSubmitStatus('success');
      if (formRef.current) {
        formRef.current.reset(); // 使用useRef重置表单
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-card">
      <div className="card-header">
        <h2 className="card-title">Contact Information</h2>
        <p className="card-description">
          Please provide your details and we'll be in touch shortly.
        </p>
      </div>
      <div className="card-content">
        <form className="contact-form" onSubmit={handleSubmit} ref={formRef}>
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name <span className="required">*</span>
            </label>
            <input 
              id="name" 
              name="name" 
              type="text" 
              placeholder="John Doe" 
              required 
              className="form-input"
            />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address <span className="required">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              required
              className="form-input"
            />
          </div>

          {/* Phone Field */}
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input 
              id="phone" 
              name="phone" 
              type="tel" 
              placeholder="+1 (555) 000-0000" 
              className="form-input"
            />
          </div>

          {/* Company Field */}
          <div className="form-group">
            <label htmlFor="company" className="form-label">
              Company Name
            </label>
            <input 
              id="company" 
              name="company" 
              type="text" 
              placeholder="Acme Inc." 
              className="form-input"
            />
          </div>

          {/* Subject Field */}
          <div className="form-group">
            <label htmlFor="subject" className="form-label">
              Subject <span className="required">*</span>
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="How can we help you?"
              required
              className="form-input"
            />
          </div>

          {/* Message Field */}
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Message <span className="required">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Tell us more about your inquiry..."
              required
              className="form-textarea"
              rows={6}
            />
          </div>

          {/* Submit Button */}
          <div className="submit-section">
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Form'}
            </button>
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="success-message">
              Thank you for your submission! We'll get back to you soon.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="error-message">
              There was an error submitting your form. Please try again.
            </div>
          )}

          {/* Privacy Notice */}
          <p className="privacy-notice">
            By submitting this form, you agree to our privacy policy and terms of service.
          </p>
        </form>
      </div>
    </div>
  )
}