"use client";

import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
import { Amplify } from 'aws-amplify';
import './submissions.css';
import outputs from "@/amplify_outputs.json";
import { useAuthenticator } from '@aws-amplify/ui-react';

Amplify.configure(outputs);

const client = generateClient<Schema>();

type Submission = Schema['Submission']['type'];

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const { user, signOut } = useAuthenticator();

  function listSubmissions() {
    client.models.Submission.observeQuery().subscribe({
      next: (data) => setSubmissions([...data.items]),
    });
  }

  function deleteSubmission(id: string) {
    client.models.Submission.delete({ id });
  }

  useEffect(() => {
    listSubmissions();
  }, []);

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
            <div className="user-info">
              <span>Welcome, {user?.signInDetails?.loginId}</span>
              <button onClick={signOut} className="sign-out-button">Sign out</button>
            </div>
          </div>

          <SubmissionsTable 
            submissions={submissions} 
            onDeleteSubmission={deleteSubmission}
          />
        </div>
      </div>
    </main>
  )
}

function SubmissionsTable({ submissions, onDeleteSubmission }: { 
  submissions: Submission[], 
  onDeleteSubmission: (id: string) => void 
}) {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (submission: Submission) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSubmission(null);
  };

  const handleDelete = () => {
    if (selectedSubmission) {
      onDeleteSubmission(selectedSubmission.id);
      closeModal();
    }
  };

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
                  <td className="submission-time">{submission.createdAt || '—'}</td>
                  <td className="submission-name">{submission.name}</td>
                  <td className="submission-email">
                    <a href={`mailto:${submission.email}`}>{submission.email}</a>
                  </td>
                  <td className="submission-company">{submission.company || '—'}</td>
                  <td className="submission-subject">{submission.subject}</td>
                  <td className="submission-actions">
                    <button 
                      className="view-button" 
                      onClick={() => handleViewDetails(submission)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && selectedSubmission && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Submission Details</h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <strong>Name:</strong> {selectedSubmission.name}
              </div>
              <div className="detail-row">
                <strong>Email:</strong> {selectedSubmission.email}
              </div>
              <div className="detail-row">
                <strong>Phone:</strong> {selectedSubmission.phone || '—'}
              </div>
              <div className="detail-row">
                <strong>Company:</strong> {selectedSubmission.company || '—'}
              </div>
              <div className="detail-row">
                <strong>Subject:</strong> {selectedSubmission.subject}
              </div>
              <div className="detail-row">
                <strong>Submission Time:</strong> {selectedSubmission.createdAt || '—'}
              </div>
              <div className="detail-row">
                <strong>Message:</strong>
                <div className="message-content">{selectedSubmission.message}</div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-button delete-button" onClick={handleDelete}>
                Delete
              </button>
              <button className="modal-button" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}