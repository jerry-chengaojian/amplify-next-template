"use client";

import { Amplify } from 'aws-amplify';
import './contact.css';
import outputs from "@/amplify_outputs.json";

Amplify.configure(outputs);

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
  return (
    <div className="contact-card">
      <div className="card-header">
        <h2 className="card-title">Contact Information</h2>
        <p className="card-description">
          Please provide your details and we'll be in touch shortly.
        </p>
      </div>
      <div className="card-content">
        <form className="contact-form">
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
            >
              Submit Form
            </button>
          </div>

          {/* Privacy Notice */}
          <p className="privacy-notice">
            By submitting this form, you agree to our privacy policy and terms of service.
          </p>
        </form>
      </div>
    </div>
  )
}