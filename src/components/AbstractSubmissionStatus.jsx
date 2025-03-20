import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AbstractSubmissionStatus.css";

const AbstractSubmissionStatus = () => {
  const [abstract, setAbstract] = useState(null);
  const [status, setStatus] = useState("Pending");
  const [isFinalized, setIsFinalized] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [finalizing, setFinalizing] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [updatedAbstract, setUpdatedAbstract] = useState({});
  
  // Retrieve token and UID from sessionStorage
  const token = sessionStorage.getItem("token");
  const uid = sessionStorage.getItem("uid");

  useEffect(() => {
    const fetchAbstract = async () => {
      try {
        const response = await axios.get(
          `https://stisv.onrender.com/get-abstract/${uid}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setAbstract(response.data.abstract);
        setUpdatedAbstract(response.data.abstract || {});

        if (response.data.abstract) {
          setStatus(response.data.abstract.status || "Pending");
          setIsFinalized(response.data.abstract.isFinalized || false);
        }
      } catch (err) {
        setError("Failed to fetch abstract");
      } finally {
        setLoading(false);
      }
    };

    if (uid && token) {
      fetchAbstract();
    } else {
      setError("User not authenticated.");
      setLoading(false);
    }
  }, [uid, token]);

  // Handle Abstract Updates
  const handleUpdate = async () => {
    setUpdating(true);
    try {
      await axios.put(
        `https://stisv.onrender.com/update-abstract`,
        { uid, ...updatedAbstract },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAbstract(updatedAbstract);
      setEditMode(false);
    } catch (error) {
      setError("Error updating abstract.");
    } finally {
      setUpdating(false);
    }
  };

  // Handle Finalization (Disable Editing)
  const handleFinalize = async () => {
    setFinalizing(true);
    try {
      await axios.post(
        `https://stisv.onrender.com/finalize-abstract`,
        { uid },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsFinalized(true);
      setEditMode(false);
    } catch (error) {
      setError("Error finalizing submission.");
    } finally {
      setFinalizing(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="abstract-status-container">
      <h2>Abstract Submission Status</h2>
      
      {/* ✅ Abstract Code Display */}
      {abstract && (
        <div className="abstract-row">
          <strong>Abstract Code:</strong> <span className="abstract-code">{abstract.abstractCode}</span>
        </div>
      )}

      {abstract ? (
        <div className="abstract-details">
          {/* ✅ Abstract Details */}
          <div className="abstract-row">
            <strong>Title:</strong>
            {editMode ? (
              <input
                type="text"
                value={updatedAbstract.title}
                onChange={(e) => setUpdatedAbstract({ ...updatedAbstract, title: e.target.value })}
              />
            ) : (
              <span>{abstract.title}</span>
            )}
          </div>

          <div className="abstract-row">
            <strong>Theme:</strong>
            {editMode ? (
              <input
                type="text"
                value={updatedAbstract.scope}
                onChange={(e) => setUpdatedAbstract({ ...updatedAbstract, scope: e.target.value })}
              />
            ) : (
              <span>{abstract.scope}</span>
            )}
          </div>

          <div className="abstract-row">
            <strong>Presenting Type:</strong>
            {editMode ? (
              <select
                value={updatedAbstract.presentingType}
                onChange={(e) => setUpdatedAbstract({ ...updatedAbstract, presentingType: e.target.value })}
              >
                <option value="Oral">Oral</option>
                <option value="Poster">Poster</option>
              </select>
            ) : (
              <span>{abstract.presentingType}</span>
            )}
          </div>

          <div className="abstract-row">
            <strong>Status:</strong>
            <span
              className={
                status === "Approved"
                  ? "status-accepted"
                  : status === "Rejected"
                  ? "status-rejected"
                  : "status-pending"
              }
            >
              {status}
            </span>
          </div>

          {/* ✅ Download Abstract File (if available) */}
          {abstract.abstractFile && (
            <div className="abstract-row">
              <strong>Abstract File:</strong>
              <a
                href={abstract.abstractFile}
                target="_blank"
                rel="noopener noreferrer"
                className="download-link"
              >
                Download
              </a>
            </div>
          )}

          {/* ✅ Edit & Update Buttons */}
          {!isFinalized && (
            <div className="abstract-actions">
              {editMode ? (
                <>
                  <button className="save-button" onClick={handleUpdate} disabled={updating}>
                    {updating ? "Saving..." : "Save Changes"}
                  </button>
                  <button className="cancel-button" onClick={() => setEditMode(false)}>
                    Cancel
                  </button>
                </>
              ) : (
                <button className="edit-button" onClick={() => setEditMode(true)}>
                  Edit Abstract
                </button>
              )}
            </div>
          )}

          {/* ✅ Finalize Submission Button */}
          {!isFinalized && (
            <button className="finalize-button" onClick={handleFinalize} disabled={finalizing}>
              {finalizing ? "Finalizing..." : "Finalize Submission"}
            </button>
          )}

          {/* ✅ Show "Pay Now" Button If Approved */}
          {status === "Approved" && isFinalized && (
            <button className="pay-button">Pay Now</button>
          )}
        </div>
      ) : (
        <p>No abstract submitted yet.</p>
      )}
    </div>
  );
};

export default AbstractSubmissionStatus;
