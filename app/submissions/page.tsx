"use client";

import { Amplify } from 'aws-amplify';
import './submissions.css';
import outputs from "@/amplify_outputs.json";

Amplify.configure(outputs);

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  submittedAt: string;
}

const mockSubmissions: Submission[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Solutions',
    subject: 'Product Inquiry',
    message: 'I am very interested in your company\'s products and would like to learn more detailed information, including pricing, features, and after-sales service.',
    submittedAt: '2024-01-15 14:30:25'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@innovatetech.com',
    phone: '+1 (555) 987-6543',
    company: 'InnovateTech Solutions',
    subject: 'Partnership Proposal',
    message: 'Our company is very interested in establishing a partnership with your company. We have noticed your excellent performance in the industry and hope to discuss potential cooperation opportunities.',
    submittedAt: '2024-01-14 09:15:42'
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'm.chen@designhub.com',
    phone: '+1 (555) 456-7890',
    company: 'DesignHub Studio',
    subject: 'Technical Support',
    message: 'We have encountered some technical issues while using your company\'s services and hope to receive timely technical support and solutions.',
    submittedAt: '2024-01-13 16:45:18'
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma.wilson@globaltrade.com',
    phone: '+44 20 7946 0958',
    company: 'Global Trade Ltd.',
    subject: 'Business Discussion',
    message: 'We are an international trading company very interested in your company\'s products and services. We hope to arrange a meeting to discuss specific cooperation details.',
    submittedAt: '2024-01-12 11:20:33'
  },
  {
    id: '5',
    name: 'David Kim',
    email: 'david.kim@startupventures.com',
    phone: '+1 (555) 321-0987',
    company: 'Startup Ventures Inc.',
    subject: 'Investment Consultation',
    message: 'As a startup, we are currently looking for investment opportunities. Having learned about your company\'s expertise in the investment field, we hope to receive relevant consultation and advice.',
    submittedAt: '2024-01-11 13:55:47'
  }
];

export default function SubmissionsPage() {
  return (
    <main className="submissions-main">
      <div className="container">
        <div className="content-wrapper">
          <div className="header-section">
            <h1 className="title">
              Submission Management
            </h1>
            <p className="subtitle">
              View and manage all contact form submissions, track processing status.
            </p>
          </div>

          <SubmissionsTable submissions={mockSubmissions} />
        </div>
      </div>
    </main>
  )
}

function SubmissionsTable({ submissions }: { submissions: Submission[] }) {
  return (
    <div className="submissions-card">
      <div className="card-header">
        <h2 className="card-title">Submissions</h2>
        <p className="card-description">
          Total {submissions.length} submissions
        </p>
      </div>
      <div className="card-content">
        <div className="table-container">
          <table className="submissions-table">
            <thead>
              <tr>
                <th>Submission Time</th>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Subject</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id}>
                  <td className="submission-time">{submission.submittedAt}</td>
                  <td className="submission-name">{submission.name}</td>
                  <td className="submission-email">
                    <a href={`mailto:${submission.email}`}>{submission.email}</a>
                  </td>
                  <td className="submission-company">{submission.company}</td>
                  <td className="submission-subject">{submission.subject}</td>
                  <td className="submission-actions">
                    <button className="view-button">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}