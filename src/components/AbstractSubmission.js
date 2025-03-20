import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AbstractSubmission.css';

const AbstractSubmission = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [hasSubmittedAbstract, setHasSubmittedAbstract] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const uid = sessionStorage.getItem('uid');

    if (token) {
      setIsAuthenticated(true);
      
      // ✅ Fetch user's abstract submission status
      axios.get(`https://stisv.onrender.com/get-abstract/${uid}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        if (response.data.abstract && response.data.abstract.abstractCode) {
          setHasSubmittedAbstract(true); // ✅ Abstract exists (has `abstractCode`)
        } else {
          setHasSubmittedAbstract(false);
        }
      })
      .catch(error => {
        console.error("Error fetching abstract:", error);
        setHasSubmittedAbstract(false);
      });
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleRedirect = () => {
    if (isAuthenticated) {
      navigate('/submit-abstract'); // Redirect to Abstract Submission page
    } else {
      setErrorMessage('Please log in first before submitting an abstract.');
      setTimeout(() => {
        navigate('/conference-registration'); // Redirect to Login page after 2 seconds
      }, 2000);
    }
  };

  const handleViewStatus = () => {
    navigate('/AbstractSubmissionStatus'); // Redirect to Abstract Status page
  };

  return (
    <div className="abstract-submission-container">
      <h1 className="abstract-title">Submission of Abstract</h1>
      <p>
        Authors are requested to submit abstracts within 250 words with all contact details
        including the full postal address on any aspect given in the scope of the conference.
        All abstracts will be peer-reviewed and the authors will be notified accordingly.
      </p>

      {hasSubmittedAbstract ? (
        <div>
          <button className="view-status-button" onClick={handleViewStatus}>
            View Abstract Status
          </button>
          <button className="submit-abstract-button" onClick={handleRedirect}>
            Submit Another Abstract
          </button>
        </div>
      ) : (
        <button className="submit-abstract-button" onClick={handleRedirect}>
          Submit Abstract here
        </button>
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <h1 className="abstract-title" style={{ marginTop: '20px' }}>Instruction to Authors</h1>
      <ul>
        <li><a href="/assets/Abstract-Template.docx" download>Abstract Template</a></li>
      </ul>
    </div>
  );
};

export default AbstractSubmission;
